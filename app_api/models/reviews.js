var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
    name: {type:String, required:true},
    date: {type:Date, "default":Date.now},
    email: {type:String, "default":""},
    review: {type:String, required:true}

});

mongoose.model('Review', reviewSchema);
