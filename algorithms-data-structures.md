# Algorithms and Data Structures Enhancement

[Return to ePortfolio Home](index.md)

## Artifact Overview

The artifact selected for the Algorithms and Data Structures category is the Travlr Getaways full-stack web application that I originally developed during CS 465: Full Stack Development I at Southern New Hampshire University.

Travlr Getaways uses technologies including Node.js, Express, MongoDB, Mongoose, Angular, Handlebars, JavaScript, HTML, and CSS.

During CS 499, I first improved the application's architecture through the Software Design and Engineering enhancement. That work introduced MongoDB integration and a service layer between the controller and database model.

The Algorithms and Data Structures enhancement builds on that improved architecture by changing how the application searches, filters, sorts, and retrieves trip information.

I selected this artifact because it gave me an opportunity to apply algorithmic concepts to a working full-stack application instead of demonstrating them only through isolated examples.

The enhancement focused on:

- Efficient trip-code lookup
- Filtering by destination
- Filtering by maximum price
- Sorting by price
- JavaScript data structures
- Time-complexity analysis
- Algorithmic trade-offs
- User-interface integration

---

## Original Application

In the preserved original version of Travlr Getaways, the Travel controller retrieved a collection of trips and displayed those records to the user.

The application did not provide dedicated functionality for:

- Searching for an exact trip code
- Filtering trips by destination
- Filtering trips by maximum price
- Sorting trips by price
- Evaluating the efficiency of different search and sort approaches

The original application therefore provided a good foundation for demonstrating how algorithms and data structures can improve both functionality and performance.

During my CS 499 code review, I identified these limitations as opportunities for improvement.

---

# Enhancement Goals

The main goal of the Algorithms and Data Structures enhancement was to add useful search, filtering, and sorting functionality while also evaluating the performance characteristics of the selected solutions.

The enhancement introduced:

- A JavaScript `Map`
- Trip-code lookup
- Destination filtering
- Maximum-price filtering
- Merge sort
- Query-parameter processing
- Search and sorting controls
- Complexity analysis

Each solution was selected based on the type of problem being solved.

---

# Algorithm Utility Module

To keep the algorithm logic separate from the controller, I created:

```text
app_server/utils/tripAlgorithms.js
```

This file contains reusable algorithm functions for:

- Filtering trip records
- Sorting trip records by price

Separating these functions from the controller improves modularity because the controller does not need to contain the implementation details of each algorithm.

The controller can focus on deciding which operation should be performed.

---

# JavaScript Map for Trip-Code Lookup

One of the major enhancements was the use of a JavaScript `Map` for exact trip-code lookup.

The service layer maintains both a cached trip collection and a Map.

```javascript
let tripCache = null;
let tripMap = new Map();
```

When trips are loaded from MongoDB, the application builds the Map using the unique trip code as the key.

```javascript
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
```

This creates a direct relationship between a trip code and its corresponding trip object.

For example:

```text
GALR210214
    ↓
Matching Trip Record
```

A specific trip can then be retrieved using:

```javascript
const getTripByCode = async (code) => {
    if (!tripCache) {
        await loadTrips();
    }

    return tripMap.get(
        code.toUpperCase()
    ) || null;
};
```

---

# Map Complexity

Building the Map requires processing the trip collection.

If there are `n` trip records, constructing the Map requires approximately:

**O(n)**

time.

After the Map has been created, retrieving a value using its key has an average lookup complexity of:

**O(1)**

This makes the Map useful for repeated exact-code searches.

Without the Map, the application could search through the trip collection one record at a time until a matching code is found.

That type of search could require:

**O(n)**

time in the worst case.

The Map trades additional memory usage for faster repeated lookup performance.

---

# Filtering Algorithm

I also implemented a filtering algorithm that allows users to filter trip records by:

- Destination
- Maximum price

The filtering function is contained in:

```text
app_server/utils/tripAlgorithms.js
```

The function uses JavaScript's `filter()` operation.

```javascript
const filterTrips = (
    trips,
    destination,
    maxPrice
) => {
    return trips.filter((trip) => {
        const matchesDestination =
            !destination ||
            trip.resort
                .toLowerCase()
                .includes(
                    destination.toLowerCase()
                );

        const matchesPrice =
            !maxPrice ||
            parseFloat(trip.perPerson) <=
            parseFloat(maxPrice);

        return (
            matchesDestination &&
            matchesPrice
        );
    });
};
```

The algorithm evaluates each trip and determines whether it satisfies the requested conditions.

---

# Filtering Complexity

Filtering differs from exact trip-code lookup.

A destination search may return multiple matching records.

For example, several trips may share a destination or satisfy the same maximum-price requirement.

Because each record may need to be examined, the filtering algorithm has a time complexity of:

**O(n)**

where `n` is the number of trip records.

This is appropriate for the current operation because the algorithm must determine which records satisfy the requested conditions.

---

# Merge Sort

For sorting trips by price, I implemented merge sort.

Merge sort uses a divide-and-conquer approach.

The collection is repeatedly divided into smaller sections until each section contains one or fewer values.

The smaller sections are then merged back together in sorted order.

The implementation consists of two main functions:

- `mergeByPrice()`
- `mergeSortByPrice()`

---

# Merge Function

The merge function compares records from two already sorted arrays.

```javascript
const mergeByPrice = (
    left,
    right
) => {
    const result = [];

    let leftIndex = 0;
    let rightIndex = 0;

    while (
        leftIndex < left.length &&
        rightIndex < right.length
    ) {
        if (
            parseFloat(
                left[leftIndex].perPerson
            ) <=
            parseFloat(
                right[rightIndex].perPerson
            )
        ) {
            result.push(
                left[leftIndex]
            );

            leftIndex++;
        } else {
            result.push(
                right[rightIndex]
            );

            rightIndex++;
        }
    }

    return result
        .concat(
            left.slice(leftIndex)
        )
        .concat(
            right.slice(rightIndex)
        );
};
```

This version uses index pointers rather than repeatedly removing the first item from an array.

Using indexes avoids unnecessary array shifting during the merge process.

---

# Merge Sort Function

The recursive merge-sort function divides the collection and then combines the sorted results.

```javascript
const mergeSortByPrice = (trips) => {
    if (trips.length <= 1) {
        return trips;
    }

    const middle =
        Math.floor(trips.length / 2);

    const left =
        mergeSortByPrice(
            trips.slice(0, middle)
        );

    const right =
        mergeSortByPrice(
            trips.slice(middle)
        );

    return mergeByPrice(
        left,
        right
    );
};
```

The base case occurs when an array contains one or fewer records.

At that point, the array is already considered sorted.

The algorithm then merges the smaller sorted arrays back together.

---

# Merge Sort Complexity

Merge sort has a time complexity of:

**O(n log n)**

This provides predictable performance as the number of records increases.

Merge sort also requires additional memory because temporary arrays are created while dividing and merging the data.

This produces an important trade-off.

The algorithm offers predictable sorting performance but requires more memory than some in-place sorting algorithms.

For the Travlr application, this was an appropriate choice because the enhancement was intended to demonstrate both algorithm implementation and analysis.

---

# Controller Integration

The Travel controller was updated so that it can select the appropriate data operation based on the user's request.

The controller processes query parameters such as:

- `code`
- `destination`
- `maxPrice`
- `sort`

For an exact trip-code search, the controller uses the Map-based lookup.

```javascript
if (code) {
    const trip =
        await tripService.getTripByCode(
            code
        );

    trips = trip ? [trip] : [];
}
```

This allows the application to take advantage of the efficient key-based lookup.

---

# Filtering Integration

When a destination or maximum price is supplied, the application applies the filtering algorithm.

```javascript
trips = filterTrips(
    trips,
    destination,
    maxPrice
);
```

This allows a user to combine criteria.

For example, a user could search for trips matching:

```text
Destination: Cancun
Maximum Price: 1500
```

The filtering algorithm evaluates the trip collection and returns only the matching records.

---

# Sorting Integration

The controller also supports sorting by price.

For ascending price:

```javascript
if (sort === 'price-asc') {
    trips =
        mergeSortByPrice(trips);
}
```

For descending price:

```javascript
else if (
    sort === 'price-desc'
) {
    trips =
        mergeSortByPrice(
            trips
        ).reverse();
}
```

This allows the same merge-sort implementation to support both ascending and descending results.

---

# User Interface Improvements

The Travel page was updated so users can interact with the new algorithm functionality.

The interface includes controls for:

- Trip code
- Destination
- Maximum price
- Price sorting

Users can enter search criteria and submit the form.

The application then processes the query parameters and applies the appropriate operation.

If no matching records are found, the application displays a no-results message.

This makes the algorithms visible and useful to the user rather than leaving them as internal programming exercises.

---

# Complexity Summary

The enhancement demonstrates several different complexity characteristics.

## Map Construction

```text
O(n)
```

The application must process the trip collection to construct the Map.

## Exact Map Lookup

```text
O(1) average
```

After construction, an exact trip-code lookup can generally be completed in constant average time.

## Filtering

```text
O(n)
```

Each trip may need to be checked against the requested criteria.

## Merge Sort

```text
O(n log n)
```

Merge sort repeatedly divides and merges the collection.

---

# Design Trade-Offs

A major part of this enhancement was evaluating trade-offs rather than simply selecting the first solution that worked.

## Map Trade-Off

The Map improves exact lookup speed.

However, it requires additional memory because the application stores a separate key-value structure.

The Map must also be created or refreshed when the underlying trip data changes.

## Filtering Trade-Off

Filtering performs a linear scan of the collection.

This is appropriate because multiple records may match the search conditions.

A direct key lookup would not provide the same flexibility.

## Merge Sort Trade-Off

Merge sort provides predictable O(n log n) time complexity.

However, it requires additional memory during the merging process.

The enhancement demonstrates that performance decisions involve balancing:

- Speed
- Memory
- Simplicity
- Maintainability
- Type of operation
- Expected size of the dataset

---

# Testing the Enhancement

I tested the application after implementing the algorithms and data structures enhancement.

Testing included:

- Searching for a valid trip code
- Searching for an invalid trip code
- Filtering by destination
- Filtering by maximum price
- Combining destination and price criteria
- Sorting prices in ascending order
- Sorting prices in descending order
- Confirming that no-results messages appeared correctly
- Confirming that the original Travel page continued to function

Testing helped ensure that the algorithms worked correctly when integrated into the full-stack application.

---

# Skills Demonstrated

This enhancement demonstrates several Algorithms and Data Structures skills.

These include:

- JavaScript `Map`
- Key-value data structures
- Search operations
- Filtering
- Recursive algorithms
- Merge sort
- Divide-and-conquer algorithms
- Time-complexity analysis
- Space-complexity considerations
- Algorithm selection
- Performance trade-offs
- Query processing
- Full-stack integration
- Modular development
- Testing
- Problem solving

The enhancement helped me move beyond simply asking whether an algorithm works.

I also had to consider why the algorithm was appropriate and what advantages and disadvantages it introduced.

---

# Course Outcome Alignment

This enhancement primarily supports Course Outcomes 2, 3, and 4.

## Outcome Two

**Design, develop, and deliver professional-quality oral, written, and visual communications that are coherent, technically sound, and appropriately adapted to specific audiences and contexts.**

I demonstrate this outcome through the explanation of each algorithm, the complexity analysis, the recorded code review, and this enhancement narrative.

The narrative explains both how the algorithms work and why they were selected.

---

## Outcome Three

**Design and evaluate computing solutions that solve a given problem using algorithmic principles and computer science practices and standards appropriate to its solution, while managing the trade-offs involved in design choices.**

This is the primary outcome demonstrated by this enhancement.

The application uses different solutions for different problems.

The JavaScript Map provides efficient exact lookup.

Filtering provides flexible multi-record matching.

Merge sort provides predictable sorting performance.

Each approach involves different time, memory, and implementation trade-offs.

---

## Outcome Four

**Demonstrate an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals.**

The enhancement integrates algorithms and data structures directly into the Travlr Getaways application.

Instead of demonstrating the techniques only in isolated examples, the application uses them to provide useful customer-facing functionality.

This includes searching, filtering, and sorting travel information.

---

# Reflection

This enhancement helped change the way I think about programming problems.

Earlier in my programming experience, I often focused mainly on whether the code produced the expected result.

During this enhancement, I had to think more carefully about how efficiently the solution worked and whether another approach might be better suited to the problem.

Implementing the Map helped me understand how choosing a different data structure can significantly change the performance characteristics of an operation.

The Map requires an initial O(n) construction step, but repeated exact lookups can then be completed in O(1) average time.

Filtering helped demonstrate why an O(n) operation can still be the appropriate solution.

Because multiple records may match a destination or price requirement, the application needs to examine the collection rather than retrieve only one exact key.

Implementing merge sort was also valuable because it required me to work through the divide-and-conquer process instead of relying only on a built-in sorting function.

One challenge was integrating these algorithms into the existing full-stack application without breaking earlier functionality.

The controller had to process query parameters, select the correct operation, and pass the resulting data to the Handlebars view.

I tested the application using different combinations of search, filtering, and sorting criteria.

The enhancement strengthened my understanding of:

- Data structures
- Algorithm design
- Recursion
- Time complexity
- Space complexity
- Performance trade-offs
- Full-stack integration
- Modular software development
- Testing

It also prepared the application for the Database enhancement completed later in CS 499.

---

# Artifact Links

## Original Artifact

The original artifact represents the Travlr Getaways application immediately before the CS 499 enhancements began.

This version provides the baseline used to compare the original functionality with the Algorithms and Data Structures improvements.

[Download Original Travlr Getaways Artifact](artifacts/travlr-original.zip)

## Enhanced Artifact

The enhanced artifact contains the Algorithms and Data Structures improvements completed during CS 499.

The enhancement includes:

- JavaScript Map-based trip-code lookup
- Destination filtering
- Maximum-price filtering
- Merge sort
- Search and sorting controls
- Query-parameter processing
- Complexity analysis
- Evaluation of algorithmic trade-offs

[Download Algorithms and Data Structures Enhanced Artifact](artifacts/algorithms-data-structures-enhanced.zip)

The enhancement can also be reviewed directly in the CS 499 GitHub repository.

[View Algorithms and Data Structures Branch on GitHub](https://github.com/lrichg7-hub/cs499Capstone/tree/milestone-three-algorithms)

---

# Connection to Other Portfolio Enhancements

This enhancement builds on the service-layer architecture introduced during the Software Design and Engineering enhancement.

The service layer was expanded to support the Map-based trip lookup while the controller uses the algorithm utility functions for filtering and sorting.

The later Database enhancement builds on this work by introducing stronger validation, indexing, aggregation, and page-based database retrieval.

[View Software Design and Engineering Enhancement](software-design.md)

[View Database Enhancement](databases.md)

---

## AI Use Acknowledgment

I used ChatGPT, an OpenAI generative AI tool, to assist with reviewing assignment requirements, understanding algorithm concepts, organizing portions of the enhancement process, troubleshooting code, analyzing complexity, and improving the clarity of my documentation.

I reviewed and tested the resulting work to ensure that the final implementation reflects my project, coursework, enhancement decisions, and understanding of the algorithms and data structures demonstrated.

---

[Return to ePortfolio Home](index.md)