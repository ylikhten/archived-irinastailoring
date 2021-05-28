var express = require('express');
var router = express.Router();
var ctrlRendezvous = require('../controllers/rendezvous');
var ctrlOthers = require('../controllers/others');

/* Get rendezvous pages */
router.get('/', ctrlRendezvous.homelist); // Homepage
router.get('/location_hours', ctrlRendezvous.locationHours); // location/ hours page
router.get('/services', ctrlRendezvous.serviceInfo); // Services page
router.get('/guestbook', ctrlRendezvous.guestbook); // Guest book page
router.get('/guestbook/add_review', ctrlRendezvous.addReview); // Add Review page
router.post('/guestbook/add_review', ctrlRendezvous.doAddReview);

module.exports = router;
