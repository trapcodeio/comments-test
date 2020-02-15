"use strict";
const Trader = $.use.model('Trader');
const Comment = $.use.model('Comment');
const Guest = $.use.model('Guest');
const Reply = $.use.model('Reply');

/**
* CommentsController
* @class
* @extends $.controller
*/
class CommentsController extends $.controller {

    /**
    * middleware - Set Middleware
    * @returns {Object}
    */
    static middleware() {
        return {}
    }


    /**
     * Boot method runs on every request.
     * 
     * Here we load the only trader used in this test
     */
    static async boot() {
        let trader = await Trader.findOne();

        if (!trader) trader = await Trader.new({ name: 'App Developer' });

        return { trader }
    }

    async index(http, { trader }) {
        // Get all guests
        const guests = await Guest.find();

        // Get all comments
        const comments = await Comment.toArray(q => q.aggregate(
            [
                {
                    $lookup:
                    {
                        from: 'guests',
                        localField: 'author',
                        foreignField: '_id',
                        as: 'author'
                    }
                },
                {
                    $lookup:
                    {
                        from: 'replies',
                        localField: '_id',
                        foreignField: 'comment',
                        as: 'replies'
                    }
                },
                {$unwind: '$author'},
            ]
        ));

        return http.view('comments', { trader, guests, comments })
    }

    async create(http, { trader }) {

        const { name, comment, guest } = http.req.body;
        let newGuest;

        if (guest == 'none') {
            // Save Guest
            newGuest = await Guest.new({ name })
        } else {
            newGuest = await Guest.findById(guest);

        }


        // console.log(newGuest);

        await Comment.new({
            trader: trader.id(),
            author: newGuest.id(),
            comment
        })

        return http.redirectToRoute('comments')
    }


    async post_reply(http, { trader }) {
        const { reply, comment, user } = http.req.body;

        let is_trader = user === 'trader';
        let author;

        if (is_trader) {
            author = trader.id()
        } else {
            author = Reply.id(user);
        }


        const newReply = await Reply.new({
            comment: Reply.id(comment),
            author,
            is_trader,
            reply
        });

        return http.redirectToRoute('comments')
    }

}


module.exports = CommentsController;
