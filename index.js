const fs = require('fs');
const resultsSourcePath = "results.json";
const arnakOutputPath = "arnak.txt";
let arnak = [];      /* [ { name: "Guy Taragano", podiums: 25 } ] */


generateArnak();
sortArnak();
saveArnak();



/*  ----  FUNCTIONS    ----  */


/* generates an (unsorted) arnak from the results json file */
function generateArnak() {
    // Load results from file
    const results = JSON.parse(fs.readFileSync(resultsSourcePath, 'utf8'));

    // First line in every 'result' is the event name
    for (const result of results) {
        const lines = result.split('\n');
        if (lines.length == 0)      // 0 lines?     (Probably won't happen)
            console.log("INVALID EVENT - EMPTY");
        else
            handleEvent(lines);
    }
}


/* handles the event given the results.
    Given results are seperated by '\n', and the first line is the event name. */
function handleEvent(results) {
    let max = (results.length > 4) ? 3 : results.length - 1;
    for (let i = 1; i <= max; i++) {
        let colonIndex = results[i].indexOf(':');
        const name = results[i].substring(3, colonIndex);
        incrementCompetitor(name);
    }

    /*
    -- MAY BE USED LATER FOR OTHER STATS --
    if (results.length >= 4) {          // At least 3 places

    }
    if (results.length >= 3) {          // At least 2 places

    }
    if (results.length >= 2) {          // At least 1 person competed

    }
    else {                              // Nobody competed
        
    }
    */
}


/* sort the arnak by number of podiums (bubble sort).
    On the arnak, sort competitors with the same number of podiums by alphabetical order. */
function sortArnak() {
    // arnak.sort((a, b) => b.podiums - a.podiums);
    arnak.sort((a, b) => {
        if (a.podiums != b.podiums)
            return b.podiums - a.podiums; // keep original order

        // sort by name
        const nameA = a.name.toUpperCase();     // ignore upper and lowercase
        const nameB = b.name.toUpperCase();     // ignore upper and lowercase

        if (nameA < nameB)
            return -1;
        else
            return 1;
    });
}


/* increments the number of podiums for a competitor given their name */
function incrementCompetitor(competitorName) {
    for (let i in arnak) {
        if (arnak[i].name == competitorName) {
            arnak[i].podiums++;
            return;
        }
    }

    // The competitor does not yet have data in the arnak
    arnak.push({ name: competitorName, podiums: 1 });
}


/* trim asterisks (*) from the start and end of the string (returns the output) */
/*
USED TO REMOVE ASTERISKS SURROUNDING EVENT NAMES - MAY BE USED IN THE FUTURE
function trimAst(str) {
    if (str.length == 0)
        return str;

    let start = 0;
    while (str[start] == '*')
        start++;

    let end = str.length - 1;
    while (str[end] == '*')
        end--;

    return str.substring(start, end + 1);
}
*/


/* save the arnak into the output file */
function saveArnak() {
    let output = "";
    for (const data of arnak)
        output += `${data.name}: ${data.podiums}\n`;
    
    fs.writeFileSync(arnakOutputPath, output);
}


/*
Ideas:
    * number of people competed in each event
    * people who got the most last (3) places
    * the event competed in the most
    * the event competed in the least

*/

/*
    TODO: Include JDOC documentation
*/