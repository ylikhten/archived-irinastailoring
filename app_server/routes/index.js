var express = require('express');
var router = express.Router();
var ctrlRendezvous = require('../controllers/rendezvous');
var ctrlOthers = require('../controllers/others');

/* Get rendezvous pages */
router.get('/', ctrlOthers.angularApp); // Homepage
router.get('/location_hours', ctrlRendezvous.locationHours); // location/ hours page
router.get('/services', ctrlRendezvous.serviceInfo); // Services page
router.get('/guest_book', ctrlRendezvous.guestBook); // Guest book page
router.get('/guest_book/add_review', ctrlRendezvous.addReview); // Add Review page
router.post('/guest_book/add_review', ctrlRendezvous.doAddReview);

module.exports = router;
