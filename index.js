// imports
const { CompetitorData: CompetitorData,
        PLACE_NAME: PLACE_NAME } = require('./competitorData');
const fs = require('fs');

// constants
const resultsSourcePath = "results.json";
const arnakOutputPath = "arnak.txt";

// variables
/*
TODO: Implement this later to get more statistics
    let eventsPodiums = {};      // { event: [EVENT_NAME], podiums: { first: [COMP], second: [COMP], third: [COMP] } }
*/
let competitors = [];

run();


function run() {
    // load events array from results file
    loadCompetitors();
    sortCompetitors();
    fs.writeFileSync(arnakOutputPath, getOutput());
}


function loadCompetitors() {
    const EV_NAME_WRAPPER = "**";

    // load events array from results file
    const events = JSON.parse(fs.readFileSync(resultsSourcePath, 'utf8'));

    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        if (event.length == 0)
            continue;

        let lines = event.split('\n');
        let eventName = lines[0].split(EV_NAME_WRAPPER)[1];

        if (eventName == "") {
            console.log("Warning (loadEvents): Found empty event name, ignoring.");
            continue;
        }

        // console.log("event: " + event);
        updateCompetitor(getCompName(lines[1]), PLACE_NAME.first, eventName); // there's always a first place
    
        if (lines.length > 2) { // if there was a second place
            updateCompetitor(getCompName(lines[2]), PLACE_NAME.second, eventName);

            if (lines.length > 3) // if there was a third place
                updateCompetitor(getCompName(lines[3]), PLACE_NAME.third, eventName);
        }
    }

    function getCompName(line) {
        const spaceSplit = line.split(" ");

        let compName = "";
        let i = 1;

        do {
            compName += spaceSplit[i++] + " ";
        }
        while (compName[compName.length - 2] != ':');

        return compName.substring(0, compName.length - 2);
    }
}


// increments the competitor's [place] podium by 1
function updateCompetitor(name, place, event) {
    for (let i = 0; i < competitors.length; i++) {
        const competitor = competitors[i];
        if (competitor.name == name) {
            competitor.incrementPodium(place, event);
            return;
        }
    }
    
    // competitor doesn't have a podium yet
    competitors.push(new CompetitorData(name));
    updateCompetitor(name, place, event);
}

function sortCompetitors() {
    competitors.sort((a, b) => {
        if (a.numFirstPlaces !== b.numFirstPlaces)
            return b.numFirstPlaces - a.numFirstPlaces;

        if (a.numSecondPlaces !== b.numSecondPlaces)
            return b.numSecondPlaces - a.numSecondPlaces;

        if (a.numThirdPlaces !== b.numThirdPlaces)
            return b.numThirdPlaces - a.numThirdPlaces;

        if (a.numPodiums !== b.numPodiums)
            return b.numPodiums - a.numPodiums;
        
        // sort by name
        const nameA = a.name.toUpperCase();     // ignore upper and lowercase
        const nameB = b.name.toUpperCase();     // ignore upper and lowercase
        return (nameA < nameB) ? -1 : 1;
    });
}

function getOutput() {
    // [NAME] ([FIRST_PLACES] = [NUM_FIRST_PLACES], [SECOND_PLACES] = [NUM_SECOND_PLACES], [THIRD_PLACES] = [NUM_THIRD_PLACES])
    let output = "";

    competitors.forEach(comp => {
        let thirdStr = "0";
        if (comp.numThirdPlaces > 0)
            thirdStr = `[${comp.thirdPlaces.join(", ")}] = ${comp.numThirdPlaces}`;

        let secondStr = "0";
        if (comp.numSecondPlaces > 0)
            secondStr = `[${comp.secondPlaces.join(", ")}] = ${comp.numSecondPlaces}`;
        if (thirdStr != "")
                secondStr += ",\t";

        let firstStr = "0";
        if (comp.numFirstPlaces > 0)
            firstStr = `[${comp.firstPlaces.join(", ")}] = ${comp.numFirstPlaces}`;
        if (secondStr != "")
                firstStr += ",\t";
            

        output += `${comp.name} (${firstStr}${secondStr}${thirdStr}) = ${comp.numPodiums}\n`;
    });

    return output;
}