# Software Design and Engineering Enhancement

[Return to ePortfolio Home](index.md)

## Artifact Overview

The artifact selected for the Software Design and Engineering category is the Travlr Getaways full-stack web application that I originally developed during CS 465: Full Stack Development I at Southern New Hampshire University.

Travlr Getaways uses technologies including Node.js, Express, MongoDB, Mongoose, Angular, Handlebars, JavaScript, HTML, and CSS.

I selected this artifact because it represents one of the more complete applications I developed during the Computer Science program. It includes multiple layers of a full-stack system and provided an opportunity to improve the internal architecture of an existing application rather than simply add another isolated feature.

The Software Design and Engineering enhancement focused on improving:

- Application architecture
- Separation of responsibilities
- Database integration
- Asynchronous programming
- Error handling
- Maintainability
- Modularity
- Security-minded design

---

## Original Application

In the preserved original version of Travlr Getaways used for my CS 499 code review, the Travel controller retrieved trip information from a local JSON file.

The controller used Node.js file-system functionality similar to:

```javascript
var fs = require('fs');

var trips = JSON.parse(
    fs.readFileSync('./data/trips.json', 'utf8')
);
```

The controller then passed the trip collection directly to the Handlebars travel view.

This implementation worked for the original application, but it created several limitations.

The controller was responsible for both:

- Handling the HTTP request
- Retrieving data from a specific source

This tightly coupled the controller to the JSON file.

If the application later changed from JSON-file storage to MongoDB, the controller itself would need to be modified.

The original project already contained a Mongoose model and MongoDB database configuration, but the Travel controller was not yet taking advantage of those components.

During my CS 499 code review, I identified this as an opportunity to improve the application's architecture.

---

## Enhancement Goals

The primary goal of this enhancement was to create a clearer separation between the different responsibilities within the application.

I wanted the application to follow a structure closer to:

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

This design separates HTTP request handling from database operations.

The controller becomes responsible for managing the request and response.

The service becomes responsible for data-access operations.

The Mongoose model defines the structure of the stored information.

MongoDB stores the application data.

This structure provides a stronger foundation for future development.

---

# Service Layer

One of the most important changes was the addition of a service layer.

I created:

```text
app_server/services/tripService.js
```

The service is responsible for communicating with the Mongoose `Trip` model.

A basic service operation retrieves the trip collection from MongoDB:

```javascript
const Trip = require('../models/travlr');

const getAllTrips = async () => {
    return await Trip.find({}).lean();
};

module.exports = {
    getAllTrips
};
```

This moves the database query outside of the controller.

Instead of knowing exactly how trip records are stored or retrieved, the controller can simply request the information from the service.

This provides better separation of concerns.

---

# Controller Improvement

The Travel controller was updated so that it no longer reads the JSON file directly.

Instead, it imports the service:

```javascript
const tripService =
    require('../services/tripService');
```

The controller can then request trip information asynchronously:

```javascript
const travel = async (req, res, next) => {
    try {
        const trips =
            await tripService.getAllTrips();

        res.render('travel', {
            title: 'Travlr Getaways',
            trips
        });
    } catch (err) {
        console.error(
            'Error retrieving trips:',
            err
        );

        next(err);
    }
};
```

This change gives the controller a more focused responsibility.

It handles:

- The incoming request
- Calling the appropriate service
- Passing data to the view
- Forwarding errors

The controller no longer needs to know the details of how MongoDB retrieves the records.

---

# MongoDB Integration

The enhancement also replaced the original JSON-file data retrieval with MongoDB and Mongoose.

The project already contained a database configuration file and Mongoose model, so the enhancement connected the Travel functionality to that existing database layer.

The application initializes the database connection during startup using:

```javascript
require('./app_server/models/db');
```

This ensures that MongoDB is available to the application when database operations are needed.

The enhancement therefore moved the application from:

```text
Controller
   ↓
JSON File
```

to:

```text
Controller
   ↓
Service
   ↓
Mongoose Model
   ↓
MongoDB
```

This provides a more realistic architecture for a full-stack application.

---

# Asynchronous Programming

MongoDB operations are asynchronous.

Because of this, I used:

```javascript
async
```

and:

```javascript
await
```

when retrieving records.

For example:

```javascript
const trips =
    await tripService.getAllTrips();
```

Using `async` and `await` makes the asynchronous flow easier to read than deeply nested callbacks.

The controller can wait for the database operation to complete before rendering the page.

This also makes structured error handling easier to implement.

---

# Error Handling

The enhancement improved error handling by placing asynchronous operations inside a `try` and `catch` block.

```javascript
try {
    const trips =
        await tripService.getAllTrips();

    res.render('travel', {
        title: 'Travlr Getaways',
        trips
    });
} catch (err) {
    console.error(
        'Error retrieving trips:',
        err
    );

    next(err);
}
```

If a database error occurs, the controller forwards the error to Express using:

```javascript
next(err);
```

This allows the application's centralized Express error-handling middleware to process the failure.

Centralized error handling is preferable to allowing individual components to handle failures inconsistently.

It also improves maintainability because error-processing logic can be managed in a more predictable location.

---

# Separation of Responsibilities

One of the main concepts demonstrated by this enhancement is separation of concerns.

After the enhancement, the responsibilities are divided more clearly.

## Route

The route determines which controller should respond to a request.

## Controller

The controller:

- Receives the request
- Calls the appropriate service
- Prepares information for the view
- Handles request-level errors

## Service

The service:

- Performs data-access operations
- Communicates with the Mongoose model
- Returns requested information to the controller

## Model

The model:

- Defines the structure of trip records
- Defines validation behavior
- Provides the connection between the application and MongoDB

## Database

MongoDB stores the application records.

Separating these responsibilities makes the application easier to understand and maintain.

---

# Maintainability

The service-layer design improves maintainability because future database operations can be added to the service instead of expanding the controller with additional database logic.

For example, later CS 499 enhancements added functionality such as:

- Trip-code lookup
- Destination statistics
- Page-based database retrieval

Those operations could be added to the service while allowing the controller to remain focused on request handling.

This demonstrates one of the major benefits of improving the architecture before continuing to add functionality.

---

# Modularity

The enhancement also improves modularity.

Instead of one component containing multiple unrelated responsibilities, the application is divided into smaller components with clearer purposes.

This provides several benefits:

- Code is easier to locate
- Changes can be made in more focused areas
- Database logic can be reused
- Testing can be performed at more specific layers
- Future enhancements are easier to integrate
- Errors are easier to troubleshoot

Modularity becomes increasingly important as an application grows.

---

# Security Considerations

Although the primary focus of this enhancement was software architecture, the design also supports a stronger security mindset.

Separating database operations from presentation logic makes it easier to consistently apply security controls.

Security-related considerations include:

- Validating incoming information before storage
- Handling errors consistently
- Preventing unnecessary internal details from being exposed
- Keeping database operations organized in a dedicated layer
- Supporting future authentication and authorization controls
- Reducing tightly coupled code that can become difficult to audit

The service layer alone does not make an application secure, but a clearer architecture makes security controls easier to understand and maintain.

---

# Testing the Enhancement

After making the architectural changes, I tested the application to confirm that the Travel page continued to display trip information correctly.

The important goal was to improve the internal implementation without changing the expected customer-facing behavior.

Testing included verifying that:

- The application started successfully
- MongoDB connected successfully
- Trip records could be retrieved
- The Travel page displayed the expected information
- Errors could be passed to Express error handling
- Existing page functionality continued to work

This demonstrated that the application's internal structure could be improved without removing the original functionality.

---

# Skills Demonstrated

This enhancement demonstrates several software design and engineering skills.

These include:

- Full-stack web development
- Node.js
- Express
- MongoDB
- Mongoose
- MVC architecture
- Service-layer architecture
- Separation of concerns
- Asynchronous programming
- `async` and `await`
- Error handling
- Refactoring
- Database integration
- Modular development
- Maintainability
- Technical documentation
- Testing
- Security-minded software design

The enhancement helped me understand that improving software does not always require adding a visible feature.

Improving the internal architecture can make future development significantly easier.

---

# Course Outcome Alignment

This enhancement primarily supports Course Outcomes 2, 4, and 5.

## Outcome Two

**Design, develop, and deliver professional-quality oral, written, and visual communications that are coherent, technically sound, and appropriately adapted to specific audiences and contexts.**

I demonstrate this outcome through the code review, enhancement narrative, technical documentation, and explanation of the architectural decisions made during the enhancement.

Being able to explain why an architectural change was made is an important part of professional software development.

---

## Outcome Four

**Demonstrate an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals.**

The service-layer architecture, MongoDB integration, asynchronous database operations, and improved controller design demonstrate my ability to apply software-engineering practices to improve an existing application.

The changes provide value by making the application easier to maintain, expand, and troubleshoot.

---

## Outcome Five

**Develop a security mindset that anticipates adversarial exploits in software architecture and designs to expose potential vulnerabilities, mitigate design flaws, and ensure privacy and enhanced security of data and resources.**

This enhancement contributes to a security mindset through:

- Improved separation of application responsibilities
- Consistent error handling
- Organized database access
- Preparation for stronger validation
- Consideration of future authentication and authorization
- Reduced coupling between presentation and data-access logic

A structured application provides a stronger foundation for consistently applying security controls.

---

# Reflection

One of the most important lessons I learned from this enhancement was that working software can still benefit significantly from architectural improvement.

The original Travlr application was able to display travel information from a JSON file.

Because the application worked, it would have been easy to focus only on adding more visible features.

Instead, the CS 499 code review encouraged me to evaluate the quality of the underlying design.

The original controller was closely tied to its data source.

Changing the data source meant changing the controller itself.

Introducing the service layer helped me understand why professional applications separate responsibilities among different components.

The enhancement also helped me better understand asynchronous programming.

Moving to MongoDB meant the application needed to handle database operations asynchronously.

Using `async`, `await`, `try`, and `catch` made those operations easier to follow and provided a clear way to handle failures.

One challenge was improving the internal structure without breaking the existing application.

After replacing JSON-file access with MongoDB and introducing the service layer, I tested the application to make sure the Travel page continued to function correctly.

The successful result demonstrated that internal architecture can be improved while maintaining expected application behavior.

This enhancement strengthened my understanding of:

- Software architecture
- Separation of concerns
- Service-layer design
- MongoDB integration
- Asynchronous programming
- Error handling
- Maintainability
- Modular development
- Testing
- Security-minded design

It also created a stronger foundation for the Algorithms and Data Structures and Database enhancements completed later in CS 499.

---

# Artifact Links

## Original Artifact

The original artifact represents the Travlr Getaways application immediately before the CS 499 enhancements began.

This preserved version contains the original JSON-based Travel controller and provides the baseline used to compare the application before and after the Software Design and Engineering enhancement.

[Download Original Travlr Getaways Artifact](artifacts/travlr-original.zip)

## Enhanced Artifact

The enhanced artifact contains the Software Design and Engineering improvements completed during CS 499.

The enhancement includes:

- MongoDB integration
- A dedicated service layer
- Separation of controller and database responsibilities
- Asynchronous database access
- Improved error handling
- Improved application startup and database initialization
- Better maintainability and modularity

[Download Software Design and Engineering Enhanced Artifact](artifacts/software-design-enhanced.zip)

The enhancement can also be reviewed directly in the CS 499 GitHub repository.

[View Software Design and Engineering Branch on GitHub](https://github.com/lrichg7-hub/cs499Capstone/tree/milestone-two-software-design)

---

# Connection to Other Portfolio Enhancements

The Software Design and Engineering enhancement created the architectural foundation used by the later enhancements.

The service layer was expanded during the Algorithms and Data Structures enhancement to support more advanced trip retrieval.

It was expanded again during the Database enhancement to support aggregation and page-based database operations.

[View Algorithms and Data Structures Enhancement](algorithms-data-structures.md)

[View Database Enhancement](databases.md)

---

## AI Use Acknowledgment

I used ChatGPT, an OpenAI generative AI tool, to assist with reviewing assignment requirements, understanding software-design concepts, organizing portions of the enhancement process, troubleshooting code, and improving the clarity of my documentation.

I reviewed and tested the resulting work to ensure that the final implementation reflects my project, coursework, enhancement decisions, and understanding of the software-design concepts demonstrated.

---

[Return to ePortfolio Home](index.md)