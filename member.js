export function construct(json) {
    const obj = {
        name: json.firstName + " " + json.lastName,
        dateOfBirth: json.dateOfBirth,
        _id: json.id,
        isActiveMember: (json.isActiveMember) ? "Ja" : "Nej",
        isJunior: function() {
            return this.age <= 18;
        },
        isSenior: function() {
            return this.age >= 18;
        }, 
        get group() {
            if(this.isJunior()) {
                return "Junior";
            } else if (this.isSenior()) {
                return "Senior";
            }
        },
        get id() {
            return this._id;
        },
        set id(newId) {
            console.log("Cannot change ID");
        },
        get age() {
            return Math.floor((Date.now() - new Date(json.dateOfBirth)) / 31556952000);
        }
      }

      Object.defineProperty(obj, 'name', {
        enumerable: false
      });
  
      return obj;
}