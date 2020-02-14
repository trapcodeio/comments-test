"use strict";
const Comment = $.use.model('Comment');
const Trader = $.use.model('Trader');
/**
* Comment Model
* @class
* @extends $.model
*/
class Reply extends $.collection('replies') {

    static relationships = {
        author: {
            type: 'hasOne',
            model: Comment,
            where: {_id: 'comment'}
        } 
    }

    constructor(){
        super()

        this.setSchema(is => ({
            comment: is.ObjectId(),
            author: is.ObjectId(),
            reply: is.String(),
            is_trader: is.Boolean(() => true),
            created_at: is.Date(() =>  new Date())
        }));
    }
}

module.exports = Reply;
