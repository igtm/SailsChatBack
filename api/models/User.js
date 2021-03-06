/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    schema: true,

    autosubscribe: ['destroy'],

  attributes: {
      name: {
          type:'string',
          required: true
      },
      rooms: {
          collection: 'Room',
          via: 'users',
          dominant: true
      }
  }
};

