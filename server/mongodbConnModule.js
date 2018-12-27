var mongoose = require('mongoose');

module.exports.connect = function() {
  mongoose.connect(
    'mongodb://localhost/finalProject',
    { useNewUrlParser: true }
  );

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('connected to db');
  });
  return db;
};
