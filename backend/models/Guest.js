"use strict";
/**
* Trader Model
* @class
* @extends $.model
*/
class Guest extends $.collection('guests') {

    constructor() {
        super();

        this.setSchema(is => ({
            name: is.String(),
            created_at: is.Date(() => new Date())
        }));
    }

}


module.exports = Guest;
