"use strict";
const Guest = $.use.model('Guest');
/**
* Comment Model
* @class
* @extends $.model
*/
class Comment extends $.collection('comments') {

    static relationships = {
        author: {
            type: 'hasOne',
            model: Guest,
            where: {_id: 'author'}
        } 
    }

    constructor(){
        super()

        this.setSchema(is => ({
            trader: is.ObjectId(),
            author: is.ObjectId(),
            comment: is.String(),
            created_at: is.Date(() =>  new Date())
        }));
    }
}

module.exports = Comment;
