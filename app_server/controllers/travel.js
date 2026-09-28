const tripService = require('../services/tripService');
const {
    filterTrips,
    mergeSortByPrice
} = require('../utils/tripAlgorithms');

/* GET travel view */
const travel = async (req, res, next) => {
    try {
        const {
            code,
            destination,
            maxPrice,
            sort
        } = req.query;

        let trips;

        // Exact trip-code searches use the Map for O(1)
        // average lookup after the Map has been built.
        if (code) {
            const trip = await tripService.getTripByCode(code);
            trips = trip ? [trip] : [];
        } else {
            trips = await tripService.getAllTrips();

            // Filtering requires a linear O(n) scan.
            trips = filterTrips(
                trips,
                destination,
                maxPrice
            );

            // Merge sort provides O(n log n) sorting.
            if (sort === 'price-asc') {
                trips = mergeSortByPrice(trips);
            } else if (sort === 'price-desc') {
                trips = mergeSortByPrice(trips).reverse();
            }
        }

        res.render('travel', {
            title: 'Travlr Getaways',
            trips,
            noTrips: trips.length === 0
        });

    } catch (err) {
        console.error('Error retrieving trips:', err);
        next(err);
    }
};

module.exports = {
    travel
};