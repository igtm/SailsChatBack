/**
* Chat.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    schema: true,

  attributes: {
      user_id:{
          type:'number',
          unique: true,
          required:true
      },
      user_name:{
          type:'string',
          required:true
      },
      room_id:{
          type:'number',
          required:true
      },
      message:{
          type:'string',
          required:true
      }
  }
};

