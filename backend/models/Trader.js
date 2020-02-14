"use strict";
/**
* Trader Model
* @class
* @extends $.model
*/
class Trader extends $.collection('traders') {

    constructor() {
        super();

        this.setSchema(is => ({
            name: is.String(),
            created_at: is.Date(() => new Date())
        }));
    }

}


module.exports = Trader;
