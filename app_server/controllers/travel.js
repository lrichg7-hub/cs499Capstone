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
            sort,
            page = 1
        } = req.query;

        let trips;
        let pagination = null;

        /*
         * When the user is searching or sorting, use the
         * algorithm features created for Milestone Three.
         * When no search options are being used, retrieve
         * trips directly from MongoDB using pagination.
         */
        const hasSearchOrSort =
            code ||
            destination ||
            maxPrice ||
            sort;

        // Exact trip-code search uses the Map.
        if (code) {
            const trip = await tripService.getTripByCode(code);
            trips = trip ? [trip] : [];

        } else if (hasSearchOrSort) {

            trips = await tripService.getAllTrips();

            // Filter by destination and maximum price.
            trips = filterTrips(
                trips,
                destination,
                maxPrice
            );

            // Sort by price using merge sort.
            if (sort === 'price-asc') {
                trips = mergeSortByPrice(trips);

            } else if (sort === 'price-desc') {
                trips = mergeSortByPrice(trips).reverse();
            }

        } else {

            /*
             * Default page uses MongoDB pagination.
             * Two records are retrieved per page so that
             * pagination can be demonstrated with the
             * current sample data.
             */
            pagination =
                await tripService.getPaginatedTrips(page, 2);

            trips = pagination.trips;
        }

        // MongoDB aggregation statistics.
        const destinationStats =
            await tripService.getDestinationStats();

        res.render('travel', {
            title: 'Travlr Getaways',
            trips,
            noTrips: trips.length === 0,
            destinationStats,
            pagination
        });

    } catch (err) {
        console.error('Error retrieving trips:', err);
        next(err);
    }
};

module.exports = {
    travel
};