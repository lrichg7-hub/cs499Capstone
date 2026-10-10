# Professional Self-Assessment

[Return to ePortfolio Home](index.md)

## Introduction

Completing my Bachelor of Science in Computer Science has been a long-term goal that represents persistence, growth, and a commitment to improving myself professionally and personally.

My path through college was not completely straightforward. I attended multiple institutions over the years and had periods when I stopped and later returned to school. I began attending Southern New Hampshire University in September 2024 with the goal of finally completing my Computer Science degree.

Reaching the CS 499 Computer Science Capstone gave me the opportunity to look back at the work I completed throughout the program and recognize how much my understanding of computing has developed.

When I first began working with programming and information technology, I often focused mainly on whether something worked. Throughout the Computer Science program, I developed a broader understanding of software development that includes architecture, efficiency, maintainability, security, testing, communication, data management, and the trade-offs involved in technical decisions.

This ePortfolio represents that growth.

---

## Computer Science Experience

Throughout the Computer Science program, I worked with several areas of computing, including:

- Software development
- Full-stack web development
- Algorithms and data structures
- Database design
- Application architecture
- Software testing
- Security
- Version control
- Problem solving
- Technical communication

The Travlr Getaways application included in this portfolio is especially valuable because it brings many of these areas together within one project.

I originally developed Travlr Getaways during CS 465: Full Stack Development I. The project uses technologies from the MEAN stack and includes Node.js, Express, MongoDB, Mongoose, Angular, Handlebars, JavaScript, HTML, and CSS.

During CS 499, I returned to the application and evaluated it from a more experienced perspective.

Instead of simply asking whether the application worked, I examined questions such as:

- Is the application organized in a maintainable way?
- Are responsibilities clearly separated?
- Are the algorithms appropriate for the operations being performed?
- Can the database handle growth efficiently?
- Is incoming data validated?
- Are errors handled appropriately?
- Are security concerns considered throughout the design?
- Can the reasoning behind technical decisions be clearly communicated?

These questions helped me move beyond simply writing code and toward thinking more like a software professional.

---

## Career Interests and Professional Goals

My professional interests include information technology, software development, and cybersecurity.

I have previous experience in technology and have also spent many years in leadership and operations roles. My professional experience has required me to work with teams, solve problems, communicate expectations, adapt to changing situations, and make decisions that affect both people and operations.

My long-term goal is to combine that professional experience with the technical skills I have developed through my Computer Science degree.

Cybersecurity is an area that especially interests me because it combines technical problem solving, systems knowledge, risk management, and continuous learning.

I also recognize that technology changes quickly. Completing this degree is not the end of my learning. I plan to continue developing my technical skills through professional experience, independent learning, projects, and potentially additional industry certifications.

---

# Collaboration and Organizational Decision Making

One of the Computer Science program outcomes focuses on creating collaborative environments that allow diverse audiences to support organizational decision making.

My professional experience has helped me understand that technical decisions rarely affect only one person.

In leadership positions, I have worked with associates, managers, and other stakeholders who may have different responsibilities, experience levels, and priorities. Effective leadership requires listening to different perspectives, clearly explaining expectations, and helping people work toward a shared goal.

The same idea applies to software development.

A developer may understand the technical implementation of a solution, but managers, customers, testers, security professionals, and other stakeholders may need different information before they can evaluate that solution.

The code review process used during CS 499 demonstrates this type of decision making.

Before implementing the enhancements to Travlr Getaways, I reviewed the original application and identified areas where the design could be improved.

Rather than immediately changing the application, I first evaluated the existing implementation and considered the benefits and trade-offs of different approaches.

For example, I considered:

- Whether database operations should remain in the controller
- Whether a service layer would improve maintainability
- Which data structure would be appropriate for exact trip-code lookup
- Whether filtering required a different approach than exact lookup
- Which sorting algorithm could demonstrate predictable performance
- Which database fields would benefit from indexes
- How page navigation could improve database scalability
- How stronger validation could improve data integrity

This process demonstrates that technical decisions should be based on both the problem being solved and the needs of the people or organization using the system.

---

# Professional Communication

Professional communication is an important skill in computer science because technical knowledge has limited value if it cannot be clearly communicated to others.

Throughout CS 499, I practiced several forms of technical communication.

These include:

- A recorded code review
- Written enhancement narratives
- Technical explanations
- Source-code documentation
- Complexity analysis
- Reflection
- Professional self-assessment
- GitHub documentation
- This final ePortfolio

The code review required me to examine an existing application and explain both its current design and the changes I planned to make.

The enhancement narratives required me to explain not only what I changed, but why I made those changes and how they relate to the Computer Science program outcomes.

This process helped me improve my ability to communicate with both technical and nontechnical audiences.

For a technical audience, I can discuss concepts such as O(1) lookup, O(n) filtering, O(n log n) sorting, database indexes, aggregation, asynchronous programming, and schema validation.

For a less technical audience, I can explain those same concepts in terms of faster searches, cleaner application organization, better data quality, improved reliability, and scalability.

Learning to adjust communication to the audience is an important professional skill that I plan to continue developing.

---

# Algorithms and Data Structures

The Algorithms and Data Structures enhancement demonstrates one of the areas where my understanding of computer science developed significantly.

Earlier in my programming experience, I often focused primarily on getting the correct output.

During CS 499, I had to think more carefully about how efficiently a solution works and whether another approach might be better suited to the problem.

The Travlr enhancement demonstrates several different approaches.

## Map-Based Lookup

I implemented a JavaScript `Map` for exact trip-code lookup.

Creating the Map requires processing the trip collection, which has an initial:

**O(n)**

cost.

After the Map has been created, an exact lookup can generally be performed in:

**O(1) average time**

This makes the Map useful when repeatedly retrieving records by a unique key.

## Filtering

Filtering by destination or maximum price requires checking trip records against the requested criteria.

This requires:

**O(n)**

time because each record may need to be examined.

This approach is appropriate because a filter may return multiple matching records rather than one exact result.

## Merge Sort

I also implemented merge sort for sorting trips by price.

Merge sort has a time complexity of:

**O(n log n)**

The algorithm offers predictable sorting performance but requires additional memory while merging temporary arrays.

These examples taught me that selecting a data structure or algorithm involves trade-offs.

The fastest solution in one situation may not be appropriate in another.

Understanding those trade-offs allows developers to design solutions that are appropriate for the actual problem rather than choosing techniques simply because they are familiar.

---

# Software Design and Engineering

The Software Design and Engineering enhancement demonstrates my growth in application architecture and maintainability.

The original Travlr application contained a Travel controller that retrieved trip information directly from a local JSON file.

During the enhancement, I improved the architecture by integrating MongoDB and adding a dedicated service layer.

The updated structure separates responsibilities more clearly:

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

The controller handles the HTTP request and response.

The service handles data-access operations.

The Mongoose model defines the structure of the stored data.

MongoDB stores the application records.

I also improved asynchronous database operations using `async` and `await` and added structured error handling using `try`, `catch`, and Express error middleware.

This enhancement taught me that good software design involves more than making an application function correctly.

Software should also be understandable, maintainable, testable, and adaptable to future changes.

---

# Database Development

The Database enhancement demonstrates my ability to work with MongoDB and Mongoose beyond basic data storage.

The original application already contained a MongoDB and Mongoose foundation.

During CS 499, I strengthened the database implementation through:

- Required field validation
- String normalization
- Unique trip codes
- Length restrictions
- Price validation
- Database indexes
- MongoDB aggregation
- Destination statistics
- Page navigation
- Document counting

Schema validation improved the reliability of the stored information by reducing the possibility of incomplete or unexpected records.

Indexes were added to fields such as destination and start date.

Indexes can improve query performance, although they also require additional storage and maintenance.

This demonstrates an important database trade-off.

I also implemented MongoDB aggregation to group trips by destination and calculate information such as the number of trips and average trip price.

Page navigation was implemented using:

```javascript
skip()
limit()
countDocuments()
```

This prevents the application from needing to retrieve an entire large collection every time a page is requested.

Working through these enhancements strengthened my understanding of data integrity, query performance, scalability, and database-driven application design.

---

# Security Mindset

Security is an area I have become increasingly interested in throughout my Computer Science studies.

One of the most important lessons I have learned is that security should not be treated as something added only after an application is finished.

Security should influence decisions throughout software design, database development, testing, and deployment.

The Travlr enhancements demonstrate several security-minded practices.

These include:

- Validating incoming data
- Requiring important fields
- Preventing duplicate trip codes
- Normalizing stored values
- Restricting unexpected input lengths
- Validating price information
- Improving error handling
- Protecting data integrity
- Considering authentication and authorization for administrative functionality

Validation does not eliminate every possible security risk, but it provides an important layer of protection.

A secure system should not assume that incoming data is trustworthy.

The application should verify information before processing or storing it.

Error handling is also important because poorly managed errors can expose unnecessary internal application information.

Authentication and authorization are additional considerations when administrative features allow users to create, modify, or delete information.

Developing this security mindset is especially important to me because cybersecurity is one of the areas I am interested in pursuing professionally.

---

# How the ePortfolio Artifacts Work Together

The artifacts in this ePortfolio are different parts of the same overall development process.

The code review represents the evaluation stage.

During the review, I examined the original Travlr Getaways application and identified opportunities for improvement.

The Software Design and Engineering enhancement addresses application architecture and maintainability.

The Algorithms and Data Structures enhancement focuses on efficient searching, filtering, sorting, and evaluating complexity.

The Database enhancement focuses on validation, data integrity, indexing, aggregation, and scalable data retrieval.

Together, these artifacts demonstrate that software development requires multiple areas of computer science to work together.

An efficient algorithm is less useful if the surrounding application is poorly organized.

A well-designed application can still have problems if the database allows invalid information.

A secure database does not solve every problem if errors are handled poorly.

Professional software development requires considering the system as a whole.

---

# Computer Science Program Outcomes

My CS 499 ePortfolio demonstrates progress toward the five Computer Science program outcomes.

## Outcome One

**Employ strategies for building collaborative environments that enable diverse audiences to support organizational decision making in the field of computer science.**

My professional leadership experience and the CS 499 code-review process demonstrate my ability to evaluate alternatives, communicate technical decisions, consider different perspectives, and support informed decision making.

## Outcome Two

**Design, develop, and deliver professional-quality oral, written, and visual communications that are coherent, technically sound, and appropriately adapted to specific audiences and contexts.**

The recorded code review, enhancement narratives, documentation, professional self-assessment, and final ePortfolio demonstrate my ability to communicate technical information through multiple formats.

## Outcome Three

**Design and evaluate computing solutions that solve a given problem using algorithmic principles and computer science practices and standards appropriate to its solution, while managing the trade-offs involved in design choices.**

The Algorithms and Data Structures enhancement demonstrates this outcome through Map-based lookup, filtering, merge sort, complexity analysis, and evaluation of performance and memory trade-offs.

Database indexing and page navigation also required evaluating efficiency and scalability trade-offs.

## Outcome Four

**Demonstrate an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals.**

The Travlr enhancements demonstrate the use of technologies and techniques including:

- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose
- Angular
- Handlebars
- Service-layer architecture
- Asynchronous programming
- Algorithms and data structures
- Database aggregation
- Database indexing
- Git and GitHub

These tools were applied to improve an existing application rather than being used only as isolated classroom exercises.

## Outcome Five

**Develop a security mindset that anticipates adversarial exploits in software architecture and designs to expose potential vulnerabilities, mitigate design flaws, and ensure privacy and enhanced security of data and resources.**

The enhancements demonstrate this outcome through schema validation, data-integrity controls, improved error handling, input validation, unique identifiers, and consideration of authentication and authorization.

---

# Professional Growth and Future Goals

Completing the Computer Science program has strengthened both my technical skills and the way I approach problems.

I have learned that computer science is not simply about knowing programming languages.

It involves understanding systems, analyzing requirements, evaluating alternatives, considering trade-offs, protecting information, testing solutions, and communicating decisions.

My professional background has helped me develop leadership, organization, communication, adaptability, and problem-solving skills.

My Computer Science education adds a technical foundation to those abilities.

Together, they give me a combination of experience that I hope to apply in future technology roles.

I am especially interested in continuing to develop my knowledge in:

- Information technology
- Cybersecurity
- Software development
- Networking
- Systems administration
- Cloud technologies
- Security tools and practices

I also plan to continue learning beyond graduation through professional experience, independent study, hands-on projects, and potentially additional industry certifications.

One of the most important things I will take away from completing this degree is the confidence that I can continue learning unfamiliar technologies.

Technology will continue changing, and no degree can teach every tool that I will encounter during my career.

The ability to research, experiment, troubleshoot, evaluate solutions, and continue learning will remain one of the most valuable skills I developed throughout the program.

---

# Conclusion

This ePortfolio represents more than one application or one course.

It represents the progress I have made throughout my Computer Science education.

Returning to the Travlr Getaways application during CS 499 allowed me to compare how I approached software earlier in the program with how I evaluate software today.

I now think more carefully about architecture, maintainability, algorithms, database performance, security, testing, documentation, and the people who will ultimately use or maintain a system.

Completing my degree required persistence, but the experience strengthened both my technical abilities and my confidence in continuing to grow within the technology field.

The artifacts contained in this ePortfolio demonstrate the foundation I have built and the skills I plan to continue developing as I move forward in my professional career.

---

## AI Use Acknowledgment

I used ChatGPT, an OpenAI generative AI tool, to assist with reviewing assignment requirements, organizing ideas, improving clarity, preparing portions of the code-review process, and supporting the development of portions of this ePortfolio.

I reviewed the resulting content and made decisions about the final material based on my own coursework, project work, professional experiences, career goals, and understanding of the Computer Science program.

---

[Return to ePortfolio Home](index.md)