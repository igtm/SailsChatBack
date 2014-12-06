/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    enter: function(req, res, next) {
        console.log('enter!!');
        var room_id = req.param('room_id');
        var id = req.param('id');
        Room.findOne(room_id, function(e, room) {
            console.log(room.users);
            if(room.users.indexOf(id) === -1){
                room.users.add(id);
                room.save();
                //Room.watch(req.socket);
                Room.subscribe(req.socket, room_id, ['create', 'destroy', 'message']);
                User.findOne(id, function(e, user) {
                    user.rooms.add(room_id);
                    user.save(function(e, user) {
                        var enteringUser = _.extend(user,{enterTheRoom: room_id});
                        Room.publishCreate(enteringUser, req.socket);
                        return res.json({room_id: room_id});
                    });
                });
            }
        });
        /*
        User.findOne(id, function(e, user) {
            if(e)return next(e);

            if (!(_.isUndefined(user.room_id)) && user.room_id.indexOf(room_id) !== -1){ return res.send(200);}
            else{
                User.find(function(e, users) {
                    var thisRoomUsers = _.where(users, {'room_id': [room_id]});
                    console.log(thisRoomUsers);
                    if(thisRoomUsers){
                        User.subscribe(req.socket, room_id, ['update']);
                    }
                    console.log(user);
                    if(user.room_id){
                        user.room_id.push(room_id);
                    }else{
                        user.room_id = room_id;
                    }
                    console.log(user);
                    user.save(function(e, user) {
                        if(e)return next(e);
                        var enteringUser = _.extend(user,{enterTheRoom: room_id});
                        User.publishUpdate(id, enteringUser, req.socket);
                        return res.json({room_id: room_id});
                    });
                });
            }
        });
        */
    },

    exit: function(req, res, next) {

    }

};

