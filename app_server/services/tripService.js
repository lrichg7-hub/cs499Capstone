const Trip = require('../models/travlr');

/**
 * Retrieve all trips from the database.
 * The service layer keeps database logic separate
 * from the controller and presentation logic.
 */
const getAllTrips = async () => {
    return await Trip.find({}).lean();
};

module.exports = {
    getAllTrips
};