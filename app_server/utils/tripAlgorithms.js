/**
 * Filter trips by destination and maximum price.
 * This requires a linear scan through the trip collection: O(n).
 */
const filterTrips = (trips, destination, maxPrice) => {
    return trips.filter((trip) => {
        const matchesDestination =
            !destination ||
            trip.resort.toLowerCase().includes(destination.toLowerCase());

        const matchesPrice =
            !maxPrice ||
            parseFloat(trip.perPerson) <= parseFloat(maxPrice);

        return matchesDestination && matchesPrice;
    });
};

/**
 * Merge two sorted arrays by trip price.
 * Uses index pointers so the merge step is O(n).
 */
const mergeByPrice = (left, right) => {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (
        leftIndex < left.length &&
        rightIndex < right.length
    ) {
        if (
            parseFloat(left[leftIndex].perPerson) <=
            parseFloat(right[rightIndex].perPerson)
        ) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
};

/**
 * Sort trips by price using merge sort.
 * Time complexity: O(n log n).
 */
const mergeSortByPrice = (trips) => {
    if (trips.length <= 1) {
        return trips;
    }

    const middle = Math.floor(trips.length / 2);

    const left = mergeSortByPrice(trips.slice(0, middle));
    const right = mergeSortByPrice(trips.slice(middle));

    return mergeByPrice(left, right);
};

module.exports = {
    filterTrips,
    mergeSortByPrice
};