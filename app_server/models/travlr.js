const mongoose = require('mongoose');

// Define the trip schema
const tripSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Trip code is required'],
        unique: true,
        uppercase: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },

    name: {
        type: String,
        required: [true, 'Trip name is required'],
        trim: true,
        minlength: 3,
        maxlength: 100
    },

    length: {
        type: String,
        required: [true, 'Trip length is required'],
        trim: true
    },

    start: {
        type: Date,
        required: [true, 'Start date is required']
    },

    resort: {
        type: String,
        required: [true, 'Destination is required'],
        trim: true,
        maxlength: 100
    },

    perPerson: {
        type: String,
        required: [true, 'Price per person is required'],
        validate: {
            validator: function(value) {
                const price = Number(value);
                return !Number.isNaN(price) && price >= 0;
            },
            message: 'Price per person must be a valid positive number'
        }
    },

    image: {
        type: String,
        required: [true, 'Trip image is required'],
        trim: true
    },

    description: {
        type: String,
        required: [true, 'Trip description is required'],
        trim: true,
        minlength: 10
    }
});
// Index commonly searched fields to improve query performance.
tripSchema.index({ resort: 1 });
tripSchema.index({ start: 1 });

// Create and export the Trip model after the schema is fully configured.
const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;