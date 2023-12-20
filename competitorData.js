const PLACE_NAME = { first: "first", second: "second", third: "third" };


class CompetitorData {
    _name;
    _podiums;

    constructor(name, podiums) {
        // podiums: { first: [ event1, event2, ... ], second: [ event1, event2, ...], third: [ event1, event2, ...] }
        this._name = name;

        if (!CompetitorData.validPodiumsObject(podiums))
            podiums = { [PLACE_NAME.first]: [], [PLACE_NAME.second]: [], [PLACE_NAME.third]: [] };
        this._podiums = podiums;
    }

    /* methods */
    static validPodiumsObject(p) {
        return p != undefined && p.first != undefined && p.second != undefined && p.third != undefined;
    }

    incrementPodium(place, event) {
        this._podiums[place].push(event);
    }
    
    /* getters */
    get name() {
        return this._name;
    }

    get numFirstPlaces() {
        return this._podiums.first.length;
    }

    get numSecondPlaces() {
        return this._podiums.second.length;
    }

    get numThirdPlaces() {
        return this._podiums.third.length;
    }

    get numPodiums() {
        return this.numFirstPlaces + this.numSecondPlaces + this.numThirdPlaces;
    }

    get firstPlaces() {
        return this._podiums.first;
    }

    get secondPlaces() {
        return this._podiums.second;
    }

    get thirdPlaces() {
        return this._podiums.third;
    }
}

module.exports = {
    CompetitorData: CompetitorData,
    PLACE_NAME: PLACE_NAME
};
