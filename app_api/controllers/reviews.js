var mongoose = require('mongoose');
var Rev = mongoose.model('Review');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};


module.exports.reviewList = function (req, res) {
  var revs = [];
  Rev.find({}, function(err, allReviews) {
    if (err) {
      console.log(err);
      sendJsonResponse(res, 404, err);
    } else {
      revs = allReviews;
      console.log(revs);
      sendJsonResponse(res, 200, revs);
    }
  });
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
