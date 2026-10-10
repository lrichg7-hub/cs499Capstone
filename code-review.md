# CS 499 Code Review

[Return to ePortfolio Home](index.md)

## Code Review Overview

The code review examines the original Travlr Getaways application before the CS 499 enhancements were implemented.

Travlr Getaways is a full-stack travel application originally developed during CS 465: Full Stack Development I at Southern New Hampshire University. The project uses technologies including Node.js, Express, MongoDB, Mongoose, Handlebars, JavaScript, HTML, and CSS.

The purpose of the code review was to examine the existing application, identify opportunities for improvement, and plan enhancements in three major areas:

- Software Design and Engineering
- Algorithms and Data Structures
- Databases

The review also considers maintainability, efficiency, testing, documentation, security, and the five Computer Science program outcomes.

---

## Existing Functionality

The original Travlr Getaways application displays travel packages to users through a customer-facing travel page.

The application uses an Express-based structure with routes, controllers, views, and supporting data and model files.

In the original version used for the code review, the Travel controller reads trip information from a local JSON file and passes that information to the Handlebars view.

The project also contains MongoDB and Mongoose components, providing a foundation for additional database integration and improvement.

The code review identified several areas where the existing application could be strengthened while preserving its original functionality.

---

## Software Design and Engineering Review

The first major area identified for enhancement was the structure of the application.

In the original Travel controller, trip information is loaded directly from:

`data/trips.json`

using Node's file system functionality.

This creates a design limitation because the controller is responsible for both handling the HTTP request and obtaining data from a specific source.

The application already contains a Mongoose model and database configuration, making it possible to improve the architecture by connecting the controller to MongoDB.

The planned Software Design and Engineering improvements included:

- Replacing direct JSON-file access with MongoDB data access
- Introducing a service layer
- Separating controller responsibilities from database operations
- Using asynchronous operations with `async` and `await`
- Improving error handling with `try`, `catch`, and Express error middleware
- Improving modularity and maintainability
- Initializing the database connection as part of application startup

The intended architecture becomes:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Mongoose Model
  ↓
MongoDB
```

This design provides clearer separation of responsibilities and makes future changes easier to manage.

---

## Code Quality, Testing, and Documentation

The code review also considered maintainability and testing.

The original application contains working code, but some areas could benefit from additional documentation explaining the purpose of important operations and design decisions.

Testing was planned as an incremental process.

For example:

- After replacing JSON-file access with MongoDB, the Travel page should still display the expected trip information.
- Search functionality should be tested with both valid and invalid requests.
- Filtering should be tested using destination and maximum-price criteria.
- Sorting should be tested in both ascending and descending order.
- Page navigation should be tested to ensure that the correct records appear on each page.
- Existing functionality should be checked after each enhancement.

Testing each enhancement individually reduces the chance that one change will unexpectedly break functionality that already works.

---

## Algorithms and Data Structures Review

The original application retrieves and displays a collection of trips but does not provide dedicated functionality for efficiently searching, filtering, or sorting those records.

The Algorithms and Data Structures enhancement was planned around three major techniques.

### Map-Based Lookup

A JavaScript `Map` was planned for exact trip-code lookup.

Trip codes can be used as keys so that a specific trip can be retrieved efficiently.

Building the Map requires processing the original collection, resulting in an initial:

**O(n)**

operation.

After construction, exact trip-code lookup can generally be performed in:

**O(1) average time**

This is more efficient for repeated exact-code searches than scanning through every trip record.

### Filtering

Filtering by destination or maximum price may require examining each trip record.

This results in:

**O(n)**

time complexity.

Filtering is appropriate in this case because multiple trip records may match the requested criteria.

### Merge Sort

Merge sort was selected for sorting trips by price.

Merge sort uses a divide-and-conquer strategy by dividing the collection into smaller sections and then merging those sections back together in sorted order.

Its time complexity is:

**O(n log n)**

A trade-off is that merge sort requires additional memory for temporary arrays.

These planned enhancements demonstrate that different problems require different algorithmic approaches rather than one universal solution.

---

## Database Review

The original application already contains a Mongoose schema that defines the structure of a trip record.

The code review identified opportunities to strengthen the database implementation through additional validation and more advanced MongoDB features.

Planned improvements included:

- Stronger schema validation
- Unique trip codes
- String normalization
- Length restrictions
- Numeric validation for trip prices
- Database indexes
- MongoDB aggregation
- Page navigation
- Improved query efficiency
- Improved data integrity

The existing `perPerson` price value is stored as a string.

Instead of immediately changing the data type and potentially breaking compatibility with existing records, the planned enhancement included validating that the string can be converted into a valid nonnegative number.

Database indexes were also planned for fields such as destination and start date.

Indexes can improve query performance, although they also require additional storage and maintenance.

MongoDB aggregation was planned to calculate useful destination statistics such as:

- Number of trips
- Average trip price

Page navigation was planned using operations such as:

```javascript
skip()
limit()
countDocuments()
```

This allows the application to retrieve only the records required for the current page instead of loading an entire large collection during every request.

---

## Security Review

Security was considered throughout the code review rather than being treated as a separate feature added only at the end.

Important areas included:

- Validating incoming information
- Protecting data integrity
- Preventing incomplete or unexpected records
- Using unique trip codes
- Improving error handling
- Avoiding unnecessary exposure of internal application details
- Considering authentication and authorization for administrative functionality

The database model can provide an additional layer of protection by rejecting invalid data before it is stored.

Security considerations should exist throughout the application's architecture, database design, and request-processing logic.

---

## Connection to the Five Computer Science Program Outcomes

The code review and planned enhancements support the five Computer Science program outcomes.

### Outcome One

The review demonstrates how technical decisions can be evaluated and communicated to support collaboration and organizational decision making.

Reviewing existing code and explaining possible improvements allows developers, managers, and other stakeholders to better understand technical choices.

### Outcome Two

The code review, enhancement narratives, documentation, and final ePortfolio demonstrate professional technical communication.

The information is presented in a way that explains both the implementation and the reasoning behind the design choices.

### Outcome Three

The Algorithms and Data Structures enhancement demonstrates the design and evaluation of computing solutions using algorithmic principles.

The Map, filtering logic, merge sort, database indexes, and page-navigation approach require consideration of performance and design trade-offs.

### Outcome Four

The enhancements demonstrate the use of appropriate computing techniques and tools to improve an existing full-stack application.

These include:

- Node.js
- Express
- MongoDB
- Mongoose
- JavaScript
- Service-layer architecture
- Algorithms and data structures
- Database aggregation
- Database indexing
- Page navigation

### Outcome Five

The review demonstrates a security mindset through validation, data-integrity controls, error handling, and consideration of authentication and authorization.

---

## Code Review Video

The following video contains my recorded CS 499 code review of the original Travlr Getaways application.

The review examines the existing application and identifies planned improvements in Software Design and Engineering, Algorithms and Data Structures, Databases, testing, documentation, maintainability, and security.

[Watch the CS 499 Code Review Video](https://youtu.be/6Cxy277j06U)

---

## Connection to the Final Enhancements

The areas identified during the code review became the foundation for the three enhancements completed during CS 499.

### Software Design and Engineering

The application was improved through MongoDB integration, a service layer, asynchronous database operations, clearer separation of responsibilities, and improved error handling.

[View Software Design and Engineering Enhancement](software-design.md)

### Algorithms and Data Structures

The application was enhanced with Map-based trip lookup, filtering, merge sort, and complexity analysis.

[View Algorithms and Data Structures Enhancement](algorithms-data-structures.md)

### Databases

The application was enhanced with stronger Mongoose validation, indexes, MongoDB aggregation, and page navigation.

[View Database Enhancement](databases.md)

---

## AI Use Acknowledgment

I used ChatGPT, an OpenAI generative AI tool, to assist with reviewing assignment requirements, organizing portions of the code-review process, preparing a recording outline, clarifying technical concepts, and improving the clarity of my written documentation.

I reviewed the final content and recording to ensure that they reflect my project, coursework, enhancement decisions, and understanding of the concepts discussed.

---

[Return to ePortfolio Home](index.md)