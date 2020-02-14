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

    async index(http) {
        // fetch guests.
        const trader = await Trader.findOne();


        const guests = await Guest.find();
        const comments = await Comment.find();

        for (const index in comments) {
            const c = Comment.use(comments[index])
            await c.hasOne('author');

            // get replies
            const replies = await Reply.find({comment: c.id()})

            c.set('replies', replies)

            comments[index] = c.data;

        }

        return http.view('comments', { trader, guests, comments })
    }

    async create(http) {

        const trader = await Trader.findOne();

        const { name, comment, guest } = http.req.body;
        let newGuest;

        if (guest == 'none') {
            // Save Guest
            newGuest = await Guest.new({ name })
        } else {
            newGuest = await Guest.findById(guest);

        }

        await Comment.new({
            trader: trader.id(),
            author: newGuest.id(),
            comment
        })

        return http.redirectToRoute('comments')
    }


    async post_reply(http) {
        const trader = await Trader.findOne();

        const { reply, comment, user } = http.req.body;

        let is_trader = user === 'trader';
        let author;

        if(is_trader) {
            author = trader.id()
        } else {
            author = Reply.id(user);
        }
        

        const newReply = Reply.new({
            comment: Reply.id(comment),
            author,
            is_trader,
            reply
        });

        return http.redirectToRoute('comments')
    }

}


module.exports = CommentsController;
