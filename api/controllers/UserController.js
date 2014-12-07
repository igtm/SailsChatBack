/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    // socket post
    subscribe: function(req, res, next) {
        console.log('subscribe');
        console.log(req.session);
        var id = req.param('id');
        User.find(function(err, users){
            if(err) return next(err);

            User.watch(req.socket);
            User.subscribe(req.socket, users);
            User.findOne(id, function(e, user) {
                User.publishCreate(user,req.socket);
            });
        });
    },
    // post model.fetch
    login: function(req, res, next) {
        console.log('login');
        User.create(req.params.all(), function(err, user){
            if(err)return res.send(200);// うまくmodel.fetchのerrorの方に渡りながら、jsonを渡せるえらーの吐き方がわからないなー

            req.session.authenticated = true;
            req.session.User = user;
            return res.json(user);
        });
    }
};

