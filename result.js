const dict = {
    competition: "konkurrence",
    training: "træning",
    freestyle: "frisvømning",
    backstroke: "rygsvømning",
    breaststroke: "brystsvømning",
    butterfly: "fly"
}

export function construct(result, member) {
  	const obj = {
    	date: new Date(result.date).toLocaleDateString("da-DK", {day: "numeric", month: "short", year: "numeric"}),
    	name: member.name,
    	discipline: dict[result.discipline],
    	resultType: dict[result.resultType],
		_id: result.id,
		_time: result.time,
		member,
		isTraining: function() {
			return result.resultType === "training";
		},
		isCompetition: function() {
			return result.resultType === "competition"
		},
		get id() {
            return this._id;
        },
        set id(newId) {
            console.log("Cannot change ID");
        },
		set time(newTime) {
			this._time = newTime;
		},
		get time() {
			return this._time;
		}
	}
    

    return obj;
}
  