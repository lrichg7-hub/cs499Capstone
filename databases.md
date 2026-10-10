# Database Enhancement

[Return to ePortfolio Home](index.md)

## Artifact Overview

The artifact selected for the Database category is the Travlr Getaways full-stack web application that I originally developed during CS 465: Full Stack Development I at Southern New Hampshire University.

Travlr Getaways uses MongoDB and Mongoose to store and retrieve travel information such as trip codes, destinations, dates, prices, descriptions, and images.

The Database enhancement builds on the earlier Software Design and Engineering and Algorithms and Data Structures enhancements completed during CS 499.

By this stage of the project, the application had already been improved through:

- MongoDB integration
- A dedicated service layer
- Asynchronous database operations
- Map-based trip-code lookup
- Destination filtering
- Maximum-price filtering
- Merge sort
- Search and sorting controls

The Database enhancement focused on making the data layer more reliable, efficient, scalable, and useful.

The main areas of improvement included:

- Schema validation
- Data integrity
- Unique values
- Data normalization
- Database indexes
- MongoDB aggregation
- Destination statistics
- Page navigation
- Efficient database retrieval
- Security-minded database design

---

# Original Database Implementation

The original Travlr Getaways project already contained a Mongoose model defining the structure of trip records.

This provided a useful foundation, but the schema could be improved through stronger validation and additional database controls.

The original design also provided an opportunity to improve the way records were retrieved and analyzed.

Some of the areas identified during the CS 499 code review included:

- Stronger field validation
- Prevention of duplicate trip codes
- More consistent string formatting
- Validation of price information
- Improved query performance
- Database-level data analysis
- More scalable retrieval of trip records

These areas became the foundation for the Database enhancement.

---

# Enhancement Goals

The primary goal of the Database enhancement was to improve the integrity, efficiency, and scalability of the MongoDB implementation.

The enhancement included:

- Stronger Mongoose schema validation
- Required field validation
- Unique trip codes
- Uppercase normalization
- String trimming
- Minimum and maximum lengths
- Custom price validation
- Database indexes
- MongoDB aggregation
- Destination statistics
- Page-based record retrieval
- Record counting
- Previous and Next navigation

These improvements demonstrate that database development involves more than simply storing and retrieving information.

Database design also affects:

- Reliability
- Performance
- Data quality
- Scalability
- Security
- Application usability

---

# Mongoose Schema Validation

One of the primary enhancements was strengthening the Mongoose schema located in:

```text
app_server/models/travlr.js
```

The trip code field was expanded with additional validation rules.

```javascript
code: {
    type: String,
    required: [
        true,
        'Trip code is required'
    ],
    unique: true,
    uppercase: true,
    trim: true,
    minlength: 3,
    maxlength: 20
}
```

These rules improve the reliability and consistency of trip codes stored in MongoDB.

---

# Required Trip Codes

The following rule:

```javascript
required: [
    true,
    'Trip code is required'
]
```

prevents a trip record from being stored without a trip code.

Because the trip code is used as an important identifier within the application, allowing records without codes could create problems during searching and retrieval.

---

# Unique Trip Codes

The schema includes:

```javascript
unique: true
```

This helps prevent duplicate trip codes.

Trip codes should uniquely identify trip records.

Duplicate identifiers could create ambiguity when the application attempts to retrieve a specific trip.

This is especially important because the Algorithms and Data Structures enhancement uses the trip code as the key for Map-based lookup.

---

# Data Normalization

The trip-code field also includes:

```javascript
uppercase: true,
trim: true
```

These options normalize values before storage.

For example, values such as:

```text
galr210214
```

and:

```text
GALR210214
```

are stored consistently.

Trimming also removes unnecessary spaces before or after the value.

Consistent formatting helps reduce problems caused by different representations of the same information.

---

# Length Restrictions

The trip code includes:

```javascript
minlength: 3,
maxlength: 20
```

Length restrictions help prevent unexpected values from being stored.

Similar validation was applied to other text fields where appropriate.

For example, the trip name includes validation similar to:

```javascript
name: {
    type: String,
    required: [
        true,
        'Trip name is required'
    ],
    trim: true,
    minlength: 3,
    maxlength: 100
}
```

This ensures that a trip has a meaningful name while also preventing unusually large values.

---

# Destination Validation

The destination field was also strengthened.

```javascript
resort: {
    type: String,
    required: [
        true,
        'Destination is required'
    ],
    trim: true,
    maxlength: 100
}
```

This ensures that each trip contains destination information and that the stored value is normalized.

Other required information includes fields such as:

- Trip length
- Start date
- Price per person
- Image
- Description

Requiring important fields reduces the possibility of incomplete records entering the database.

---

# Price Validation

One design issue in the existing Travlr data was that the `perPerson` price value was stored as a string.

Changing the field directly to a different data type could require modifications to the existing data and other parts of the application.

Instead, I implemented a custom validator that verifies that the stored string can be converted into a valid nonnegative number.

```javascript
perPerson: {
    type: String,
    required: [
        true,
        'Price per person is required'
    ],
    validate: {
        validator: function(value) {
            const price = Number(value);

            return (
                !Number.isNaN(price) &&
                price >= 0
            );
        },
        message:
            'Price per person must be a valid positive number'
    }
}
```

The validator converts the value using:

```javascript
Number(value)
```

and verifies that the result is numeric.

It also checks that the value is not negative.

---

# Price Validation Trade-Off

This approach demonstrates a database-design trade-off.

One option would have been to completely change the database field from a string to a number.

However, doing so could affect compatibility with existing records and application logic.

The custom validator allowed me to improve data integrity while preserving compatibility with the existing project.

This demonstrated that database improvements sometimes need to balance ideal design with existing application requirements.

---

# Database Indexes

Another part of the enhancement was adding MongoDB indexes.

The following indexes were added before the Mongoose model was created:

```javascript
tripSchema.index({
    resort: 1
});

tripSchema.index({
    start: 1
});
```

The `resort` index supports operations involving destinations.

The `start` index supports operations involving trip start dates and the ordering used during database retrieval.

---

# Index Benefits

Without an appropriate index, MongoDB may need to examine many documents when locating or ordering data.

Indexes provide MongoDB with an additional structure that can improve retrieval performance.

As the database grows, indexes can reduce the amount of work required for commonly performed queries.

For the Travlr application, destination and start date are meaningful fields for organizing trip information.

---

# Index Trade-Offs

Indexes provide performance benefits, but they also introduce costs.

Indexes:

- Require additional storage
- Must be updated when data changes
- Add some overhead to insert and update operations

Because of these costs, every database field should not automatically receive an index.

Indexes should be selected based on how the application actually queries and organizes its data.

This demonstrates another example of evaluating design trade-offs.

---

# MongoDB Aggregation

Another major enhancement was the addition of MongoDB aggregation.

I created a database service operation in:

```text
app_server/services/tripService.js
```

that groups trip records by destination and calculates useful statistics.

The function is similar to:

```javascript
const getDestinationStats =
    async () => {
        return await Trip.aggregate([
            {
                $group: {
                    _id: '$resort',

                    tripCount: {
                        $sum: 1
                    },

                    averagePrice: {
                        $avg: {
                            $convert: {
                                input:
                                    '$perPerson',
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
```

This operation demonstrates several MongoDB aggregation features.

---

# Grouping Records

The aggregation pipeline uses:

```javascript
$group
```

to organize trip records according to destination.

The grouping key is:

```javascript
_id: '$resort'
```

This creates one aggregation group for each destination.

---

# Counting Trips

Inside each destination group, the pipeline uses:

```javascript
tripCount: {
    $sum: 1
}
```

This counts how many trip records exist for each destination.

The resulting information can be displayed to users as destination statistics.

---

# Calculating Average Price

The aggregation also calculates the average trip price.

```javascript
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
```

Because the existing `perPerson` field is stored as a string, MongoDB first converts the value to a numeric type.

The `$convert` operation includes:

```javascript
onError: 0,
onNull: 0
```

so that invalid or missing values do not cause the entire aggregation operation to fail.

The converted values can then be processed by:

```javascript
$avg
```

to calculate the average price for each destination.

---

# Sorting Aggregation Results

After grouping and calculating statistics, the results are sorted.

```javascript
$sort: {
    averagePrice: 1
}
```

This organizes destination statistics from the lowest average price to the highest.

The aggregation therefore performs several operations inside MongoDB before returning the result to the application.

---

# Destination Statistics

The aggregation results are displayed on the Travel page.

The destination statistics include:

- Destination
- Number of trips
- Average trip price

This demonstrates that MongoDB can provide more than basic record storage.

The database can also analyze stored information and return summarized results.

This can reduce the amount of processing that must be performed within application code.

---

# Page-Based Database Retrieval

Another important enhancement was improving how the application retrieves trip records.

The original design could retrieve an entire collection at once.

That may be acceptable when a database contains only a few records.

However, retrieving every document becomes less efficient as the database grows.

To address this, I added page-based database retrieval.

The service function is similar to:

```javascript
const getPaginatedTrips =
    async (
        page = 1,
        limit = 2
    ) => {
        const currentPage =
            Math.max(
                parseInt(page, 10) || 1,
                1
            );

        const pageSize =
            Math.max(
                parseInt(limit, 10) || 2,
                1
            );

        const skip =
            (
                currentPage - 1
            ) * pageSize;

        const [
            trips,
            totalTrips
        ] = await Promise.all([
            Trip.find({})
                .sort({
                    start: 1
                })
                .skip(skip)
                .limit(pageSize)
                .lean(),

            Trip.countDocuments({})
        ]);

        const totalPages =
            Math.max(
                Math.ceil(
                    totalTrips /
                    pageSize
                ),
                1
            );

        return {
            trips,
            totalTrips,
            totalPages,
            currentPage,
            hasPreviousPage:
                currentPage > 1,
            hasNextPage:
                currentPage <
                totalPages,
            previousPage:
                currentPage - 1,
            nextPage:
                currentPage + 1
        };
    };
```

This allows the database to retrieve only the records needed for the current page.

---

# Calculating Records to Skip

The service determines how many records should be skipped using:

```javascript
const skip =
    (currentPage - 1) *
    pageSize;
```

For example, if two records are displayed per page:

```text
Page 1 → Skip 0 records
Page 2 → Skip 2 records
Page 3 → Skip 4 records
```

MongoDB then uses:

```javascript
.skip(skip)
.limit(pageSize)
```

to retrieve the correct records.

---

# Sorting Database Results

The query also sorts trips by start date.

```javascript
.sort({
    start: 1
})
```

This provides a predictable order when users move between pages.

Predictable ordering is important because page-based retrieval should not return records in an inconsistent sequence.

---

# Counting Documents

The application also needs to know how many trip records exist.

I used:

```javascript
Trip.countDocuments({})
```

to determine the total number of records.

The service performs the record retrieval and counting operations using:

```javascript
Promise.all()
```

This allows both asynchronous operations to be performed together.

---

# Calculating Total Pages

The total number of pages is calculated using:

```javascript
Math.ceil(
    totalTrips / pageSize
)
```

This value allows the application to determine whether additional pages exist.

The service also returns:

- Current page
- Total pages
- Whether a previous page exists
- Whether a next page exists
- Previous page number
- Next page number

This information is passed to the view.

---

# Page Navigation Interface

The Handlebars Travel view was enhanced so that users can move between sets of database results.

The interface provides:

- Previous page navigation
- Current page number
- Total number of pages
- Next page navigation

For demonstration purposes, the application displays two trip records per page.

Using a small page size makes the functionality easy to demonstrate with the existing dataset.

In a larger production system, the number of records displayed per page could be increased or made configurable.

---

# Controller Integration

The Travel controller was updated so that it works with both the Algorithms and Data Structures enhancement and the new Database enhancement.

When a user supplies search or sorting criteria, the application uses the algorithm functionality.

For example, the application can use:

- Trip-code lookup
- Destination filtering
- Maximum-price filtering
- Price sorting

When the user opens the standard Travel page without search or sorting criteria, the application can retrieve page-based results directly from MongoDB.

This design preserves the earlier algorithm enhancement while also introducing more scalable database retrieval.

---

# Destination Statistics Integration

The controller also retrieves the destination statistics.

The service is called using logic similar to:

```javascript
const destinationStats =
    await tripService
        .getDestinationStats();
```

The statistics are then passed to the Handlebars view along with the trip information.

This allows the Travel page to display both:

- Individual trip records
- Database-generated summary information

---

# Data Integrity

Data integrity was an important goal of the enhancement.

Schema validation helps ensure that stored records follow expected rules.

The enhancement helps prevent:

- Missing trip codes
- Missing trip names
- Missing destinations
- Invalid price values
- Duplicate trip codes
- Excessively long values
- Inconsistent trip-code formatting

These controls improve the reliability of the stored information.

---

# Security Considerations

Database validation also supports a stronger security mindset.

Applications should not assume that all incoming information is safe or correct.

Validation provides an additional layer of protection by checking information before it is stored.

Security-minded database practices demonstrated in this enhancement include:

- Required values
- Unique identifiers
- Input normalization
- Length restrictions
- Numeric validation
- Controlled error handling
- Data-integrity protections

Schema validation does not replace application-level security.

However, it provides another layer of defense within the application's architecture.

A strong system should validate information at multiple layers.

---

# Performance and Scalability

Several parts of this enhancement address database performance and scalability.

## Indexes

Indexes can improve the performance of frequently used queries.

## Aggregation

Aggregation allows MongoDB to process and summarize information before returning the result.

## Page-Based Retrieval

Page-based retrieval limits the number of documents returned during a single request.

## Document Counting

`countDocuments()` provides the information needed to calculate available pages without retrieving every document.

Together, these techniques demonstrate how database design affects application performance as the amount of stored data increases.

---

# Testing the Enhancement

After implementing the Database enhancement, I tested the application to confirm that the new functionality worked correctly.

Testing included verifying that:

- MongoDB connected successfully
- Valid trip records were retrieved
- Destination statistics appeared correctly
- Trip counts were calculated correctly
- Average prices were calculated
- Results were sorted correctly
- Page 1 displayed the expected records
- Page 2 displayed the expected records
- Previous navigation worked
- Next navigation worked
- Existing search functionality continued to work
- Existing sorting functionality continued to work

Testing was especially important because the Database enhancement needed to work alongside the previous enhancements.

---

# Skills Demonstrated

This enhancement demonstrates several database-development skills.

These include:

- MongoDB
- Mongoose
- Schema design
- Required field validation
- Custom validators
- Data normalization
- Unique identifiers
- Database indexes
- Query design
- MongoDB aggregation
- `$group`
- `$sum`
- `$avg`
- `$convert`
- `$sort`
- `skip()`
- `limit()`
- `countDocuments()`
- `Promise.all()`
- Asynchronous database operations
- Page-based database retrieval
- Database performance
- Scalability
- Data integrity
- Security-minded database design
- Full-stack integration
- Testing

These improvements demonstrate that database development affects the reliability, performance, usability, and security of an application.

---

# Course Outcome Alignment

This enhancement primarily supports Course Outcomes 2, 3, 4, and 5.

## Outcome Two

**Design, develop, and deliver professional-quality oral, written, and visual communications that are coherent, technically sound, and appropriately adapted to specific audiences and contexts.**

I demonstrate this outcome through the database enhancement narrative, technical explanations, code review, and documentation.

The database concepts are explained in terms of both their technical implementation and their value to the overall application.

---

## Outcome Three

**Design and evaluate computing solutions that solve a given problem using algorithmic principles and computer science practices and standards appropriate to its solution, while managing the trade-offs involved in design choices.**

The Database enhancement required evaluating several trade-offs.

Indexes improve retrieval performance but require additional storage and maintenance.

Page-based retrieval improves scalability but introduces additional query and navigation logic.

Maintaining the existing price field as a string preserved compatibility but required additional validation and conversion.

These decisions demonstrate the importance of evaluating solutions rather than assuming that one approach is always best.

---

## Outcome Four

**Demonstrate an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals.**

The enhancement demonstrates the use of MongoDB and Mongoose features including:

- Schema validation
- Custom validators
- Indexes
- Aggregation
- Data conversion
- Document counting
- Page-based retrieval

These techniques improve a working full-stack application and provide useful features to the user.

---

## Outcome Five

**Develop a security mindset that anticipates adversarial exploits in software architecture and designs to expose potential vulnerabilities, mitigate design flaws, and ensure privacy and enhanced security of data and resources.**

The Database enhancement supports this outcome through:

- Required field validation
- Unique trip codes
- String normalization
- Length restrictions
- Price validation
- Data-integrity controls
- Controlled database access
- Error-handling considerations

These features reduce the likelihood that unexpected or invalid information will be stored in the application database.

---

# Reflection

This enhancement helped me better understand how much responsibility belongs to the database layer of an application.

Earlier in my development experience, I often thought of databases primarily as places where applications stored information.

During this enhancement, I gained a stronger understanding of how database design affects:

- Validation
- Performance
- Scalability
- Data analysis
- Data integrity
- Security
- User experience

Strengthening the Mongoose schema demonstrated how the model itself can help protect database quality.

The custom price validator also taught me about compatibility trade-offs.

Changing an existing field type might create a cleaner theoretical design, but it could also require changes to existing records and other application components.

The validator allowed me to improve reliability without unnecessarily breaking the existing implementation.

Adding indexes helped me better understand how database performance can be improved while also recognizing that indexes have costs.

MongoDB aggregation was especially valuable because it demonstrated how a database can perform calculations and data analysis before returning information to the application.

The destination statistics made the database enhancement visible to the user while also demonstrating more advanced MongoDB functionality.

Page-based retrieval helped me think more carefully about scalability.

Retrieving every document may work when a database contains only a few records, but the same design can become inefficient with hundreds or thousands of records.

One challenge was integrating the Database enhancement without breaking the Software Design and Engineering and Algorithms and Data Structures enhancements that had already been completed.

The controller needed to support both search and sorting functionality as well as page-based database retrieval.

After implementing the enhancement, I tested the application and confirmed that MongoDB connected successfully, destination statistics appeared correctly, and Previous and Next navigation displayed the appropriate records.

This enhancement strengthened my understanding of:

- MongoDB
- Mongoose
- Schema design
- Validation
- Indexing
- Aggregation
- Page-based data retrieval
- Database performance
- Scalability
- Data integrity
- Security-minded database design

---

# Instructor Feedback

The Database enhancement was submitted as Milestone Four in CS 499 and received full credit.

The instructor indicated that the enhancements were well thought out and implemented appropriately within the existing software.

This feedback reinforced that the database improvements were placed in appropriate parts of the application and successfully met the goals of the milestone.

---

# Artifact Links

## Original Artifact

The original artifact represents the Travlr Getaways application immediately before the CS 499 enhancements began.

This preserved version provides the baseline for comparing the original application with the completed database improvements.

[Download Original Travlr Getaways Artifact](artifacts/travlr-original.zip)

## Enhanced Artifact

The enhanced artifact contains the Database improvements completed during CS 499.

The enhancement includes:

- Stronger Mongoose validation
- Required field validation
- Unique trip codes
- Data normalization
- Custom price validation
- Database indexes
- MongoDB aggregation
- Destination statistics
- Page-based database retrieval
- Document counting
- Previous and Next navigation
- Improved data integrity
- Improved database scalability

[Download Database Enhanced Artifact](artifacts/database-enhanced.zip)

The enhancement can also be reviewed directly in the CS 499 GitHub repository.

[View Database Enhancement Branch on GitHub](https://github.com/lrichg7-hub/cs499Capstone/tree/milestone-four-databases)

---

# Final Enhanced Application

The Database enhancement represents the most complete version of the Travlr Getaways application produced during CS 499.

This version includes the earlier:

- Software Design and Engineering enhancements
- Algorithms and Data Structures enhancements

as well as the final Database improvements.

For this reason, the Database enhanced artifact also serves as the final enhanced version of the application in this ePortfolio.

[Download Final Enhanced Travlr Getaways Application](artifacts/database-enhanced.zip)

---

# Connection to Other Portfolio Enhancements

The Database enhancement builds directly on the earlier work completed during CS 499.

The Software Design and Engineering enhancement introduced the service layer and MongoDB architecture used by the database service.

The Algorithms and Data Structures enhancement introduced search, filtering, sorting, and Map-based lookup.

The Database enhancement completes the progression by adding stronger validation, indexing, aggregation, and more scalable database retrieval.

[View Software Design and Engineering Enhancement](software-design.md)

[View Algorithms and Data Structures Enhancement](algorithms-data-structures.md)

---

## AI Use Acknowledgment

I used ChatGPT, an OpenAI generative AI tool, to assist with reviewing assignment requirements, understanding database concepts, organizing portions of the enhancement process, troubleshooting code, evaluating design decisions, and improving the clarity of my documentation.

I reviewed and tested the resulting work to ensure that the final implementation reflects my project, coursework, enhancement decisions, instructor feedback, and understanding of the database concepts demonstrated.

---

[Return to ePortfolio Home](index.md)