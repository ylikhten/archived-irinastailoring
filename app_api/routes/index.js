var express = require('express');
var router = express.Router();
var ctrlReviews = require('../controllers/reviews');


//reviews
router.get('/reviews', ctrlReviews.reviewList);
router.post('/reviews/new', ctrlReviews.addReview);
// so far, I'm just trying to mimic the website as it exists
// that is, users can leave reviews, no need to login, and
// they can't delete reviews or update them

module.exports = router;
