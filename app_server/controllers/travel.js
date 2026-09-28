const tripService = require('../services/tripService');

/* GET travel view */
const travel = async (req, res, next) => {
    try {
        const trips = await tripService.getAllTrips();

        res.render('travel', {
            title: 'Travlr Getaways',
            trips
        });
    } catch (err) {
        console.error('Error retrieving trips:', err);
        next(err);
    }
};

module.exports = {
    travel
};