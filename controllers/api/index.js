const router = require('express').Router();
const userRoutes = require('./userRoutes');
const storyRoutes = require('./storyoutes');

router.use('/users', userRoutes);
router.use('/story', storyRoutes);

module.exports = router;
