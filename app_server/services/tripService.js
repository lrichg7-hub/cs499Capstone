const Trip = require('../models/travlr');

let tripCache = null;
let tripMap = new Map();

/**
 * Load trips from MongoDB and build an in-memory Map
 * using the unique trip code as the key.
 *
 * Building the Map: O(n)
 */
const loadTrips = async () => {
    const trips = await Trip.find({}).lean();

    tripCache = trips;

    tripMap = new Map(
        trips.map((trip) => [
            trip.code.toUpperCase(),
            trip
        ])
    );

    return trips;
};

/**
 * Return all trips.
 */
const getAllTrips = async () => {
    if (!tripCache) {
        await loadTrips();
    }

    return [...tripCache];
};

/**
 * Find a trip by its unique code.
 *
 * Map lookup average time complexity: O(1)
 */
const getTripByCode = async (code) => {
    if (!tripCache) {
        await loadTrips();
    }

    return tripMap.get(code.toUpperCase()) || null;
};

module.exports = {
    loadTrips,
    getAllTrips,
    getTripByCode
};