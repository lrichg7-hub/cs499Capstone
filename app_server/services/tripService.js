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

/**
 * Generate trip statistics grouped by destination.
 * Demonstrates MongoDB aggregation.
 */
const getDestinationStats = async () => {
    return await Trip.aggregate([
        {
            $group: {
                _id: '$resort',
                tripCount: { $sum: 1 },
                averagePrice: {
                    $avg: {
                        $convert: {
                            input: '$perPerson',
                            to: 'double',
                            onError: 0,
                            onNull: 0
                        }
                    }
                }
            }
        },
        {
            $sort: {
                averagePrice: 1
            }
        }
    ]);
};

/**
 * Retrieve trips one page at a time from MongoDB.
 * Uses skip() and limit() so the application does not
 * retrieve every database record for each page request.
 */
const getPaginatedTrips = async (page = 1, limit = 2) => {
    const currentPage = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.max(parseInt(limit, 10) || 2, 1);

    const skip = (currentPage - 1) * pageSize;

    const [trips, totalTrips] = await Promise.all([
        Trip.find({})
            .sort({ start: 1 })
            .skip(skip)
            .limit(pageSize)
            .lean(),

        Trip.countDocuments({})
    ]);

    const totalPages = Math.max(
        Math.ceil(totalTrips / pageSize),
        1
    );

    return {
        trips,
        totalTrips,
        totalPages,
        currentPage,
        hasPreviousPage: currentPage > 1,
        hasNextPage: currentPage < totalPages,
        previousPage: currentPage - 1,
        nextPage: currentPage + 1
    };
};

module.exports = {
    loadTrips,
    getAllTrips,
    getTripByCode,
    getDestinationStats,
    getPaginatedTrips
};