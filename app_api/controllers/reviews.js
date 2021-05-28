var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

var mongoose = require('mongoose');
var Rev = mongoose.model('Review');

module.exports.reviewList = function (req, res) {
    Rev.find().select('name _id date email review').exec(function(err, Rev){ sendJsonResponse(res, 200, Rev); });
};

module.exports.addReview = function (req, res) {
    Rev.create({
        name: req.body.name,
        email: req.body.email,
        review: req.body.review
    }, function(err, review){
        if(err){
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, review);
        }
    });
};
