/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    public: function(req, res, next) {
        console.log('public');
        console.log(req.param('from'));
        User.findOne(req.param('from'), function(e, sender) {
            if(e)return next(e);
            console.log(sender);
            Room.message(req.param('room_id'), {from: sender, msg: req.param('msg')}, req.socket);
        });
    }
};

