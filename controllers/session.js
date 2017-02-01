var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var sessionStore;

//setup mongo connection values
var user = process.env.MONGODB_USER;
var password = process.env.MONGODB_PASSWORD;
var host = process.env.MONGODB_SERVICE_HOST;
var port = process.env.MONGODB_SERVICE_PORT;
var database = process.env.MONGODB_DATABASE;

//if we have all the required information, set up a connection to the database
if(user && password && host && port && database){
  var connectionstring = user + ":" + password + "@" + host + ":" + port + "/" + database;

    sessionStore = new MongoDBStore(
    {
        uri: 'mongodb://' + connectionstring,
        collection: 'sessions'
    }
  );
  // Catch errors
  sessionStore.on('error', function(error) {
    console.log('Mongo session error: ' + error);
  });
}



var sessionOptions = {
  saveUninitialized: false, // saved new sessions
  resave: false, // do not automatically write to the session store
  store: sessionStore,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    maxAge: 1800000,
  },
};

module.exports = session(sessionOptions);
