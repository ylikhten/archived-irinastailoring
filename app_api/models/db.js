var mongoose = require('mongoose');

var dbURI = "mongodb://127.0.0.1/reviews";
if(process.env.NODE_ENV == 'production'){
    //dbURI = process.env.MONGOLAB_URI;
    dbURI = "mongodb://ylikhten:ismfof4143@ds125385.mlab.com:25385/reviews";
}
mongoose.connect(dbURI, {useNewUrlParser : true});

mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ' +  dbURI);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error: ' +  err);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});

var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

require('./reviews');
