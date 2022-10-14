const router = require('express').Router();
const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => { //indicates a bad request and sends an error to let the client know they made a bad request
    res.status(400).end();
});

module.exports = router;