/**
* Room.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    schema: true,
    autosubscribe: ['add:users','remove:users','message'],

  attributes: {
    name:{
        type: 'string',
        required: true
    },
      users:{
          collection: 'User',
          via: 'rooms'
      }
  }
};

