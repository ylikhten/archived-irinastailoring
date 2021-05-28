const{check} = require('express-validator/check');
var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production'){
    apiOptions.server = "https://damp-cove-26290.herokuapp.com"
}

/* GET homepage */
module.exports.homelist = function (req, res) {
    res.render('mainpage', {
        title: 'Irina\'s Tailoring',
        pageHeader: {
            title: 'Irina\'s Tailoring',
            strapline: 'We\'re a small, family owned business looking to offer the best alteration services in town and around.'
        }
    
    });
};

/* GET location/hours page */
module.exports.locationHours = function (req, res) {
    res.render('index', {title: 'Location and Hours'});
};

/* GET services pages  */
module.exports.serviceInfo = function (req, res) {
    res.render('index', {title: 'Our Services'});
};

var renderReviews = function(req, res, body){
    res.render('guestbook', {
        title: 'Guestbook',
        pageHeader: {
            title: 'Guestbook and Reviews',
            strapline: 'Hi leave nice review pls'
        },
        reviews: body // maybe add error trapping when loading reviews page
    });

};

/* GET guestbook page  */
module.exports.guestBook = function (req, res) {
    var requestOptions, path;
    path = '/api/reviews';
    requestOptions = {
        url : apiOptions.server + path,
        method: "GET",
        json : {},
    };
    request(
        requestOptions,
        function(err, response, body){
            renderReviews(req, res, body);
        }
    ); 
};

var _showError = function(req, res, status) {
    var message, error, content;
    if (status === 404) {
        message= "404, page not found";
        content = "Can't find requested page.";
        error= "404";
    } else {
        message = status + ", something's gone wrong";
        content = "Something went wrong.";
        error = "other";
    }
    res.status(status);
    res.render('error', {
        message: message,
        error: error,
        content: content
    });
};

/* POST review */
module.exports.doAddReview = function(req, res){
    var requestOptions, path, postdata;
    path = "/api/reviews/new";
    postdata = {
        name : req.body.name,
        email : req.body.email,
        review : req.body.review
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json : postdata
    };
    if(!postdata.name || !postdata.review){
        res.redirect('/guest_book/add_review/?err=val');
    } else if ((postdata.email != "" && !check('postdata.email').isEmail())){
        res.redirect('guest_book/add_review/?err=email');// email error trapping does not work correctly
    } else{
        request(
            requestOptions,
            function(err, response, body){
                if (response.statusCode == 201){
                    res.redirect('/guest_book');
                } else {
                    _showError(req, res, response.statusCode);
                }
            }
        );
    }
};
var renderReviewForm = function(req, res){
    res.render('add_review', {
        title: 'New Review',
        pageHeader: 'Add a new review for Irina\'s Tailoring',
        error: req.query.err
    });

};

/* GET add review page */
module.exports.addReview = function (req, res){
    renderReviewForm(req, res);
};

