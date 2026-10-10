# Luis Garcia
## Computer Science ePortfolio

Welcome to my Computer Science ePortfolio.

This ePortfolio was created as part of **CS 499: Computer Science Capstone** at Southern New Hampshire University. It represents the knowledge, technical skills, problem-solving abilities, and professional growth I have developed throughout the Computer Science program.

My portfolio is centered on the **Travlr Getaways** full-stack web application, which I originally developed during CS 465: Full Stack Development I. During CS 499, I reviewed the original application, identified opportunities for improvement, and completed enhancements in three major areas of computer science:

- Software Design and Engineering
- Algorithms and Data Structures
- Databases

The portfolio also includes my professional self-assessment and recorded code review. Together, these components demonstrate my growth in software development, problem solving, database design, communication, security, and professional computing practices.

---

# Professional Self-Assessment

My professional self-assessment serves as the introduction to my ePortfolio and reflects on my experience throughout the Computer Science program.

It discusses the skills I have developed, my professional experience, my career interests in information technology, software development, and cybersecurity, and how the artifacts in this portfolio demonstrate the five Computer Science program outcomes.

[View Professional Self-Assessment](professional-self-assessment.md)

---

# Code Review

Before completing the CS 499 enhancements, I conducted a code review of the original Travlr Getaways application.

The review examines the original application's functionality, structure, maintainability, algorithms, database implementation, testing considerations, documentation, and security.

The review also identifies the improvements that became the foundation for the three enhancement categories completed during the capstone.

[View Written Code Review](code-review.md)

[Watch the CS 499 Code Review Video](https://youtu.be/6Cxy277j06U)

---

# Software Design and Engineering

The first enhancement focused on improving the internal architecture of the Travlr Getaways application.

The original Travel controller retrieved trip information directly from a local JSON file. During the enhancement, I improved the application by integrating MongoDB and introducing a service layer between the controller and database model.

The enhancement included:

- MongoDB integration
- A dedicated service layer
- Separation of controller and data-access responsibilities
- Asynchronous programming with `async` and `await`
- Improved error handling
- Database initialization during application startup
- Improved maintainability and modularity

These changes created a cleaner architecture that better separates the responsibilities of the application's components.

[View Software Design and Engineering Enhancement](software-design.md)

### Artifacts

[Download Original Travlr Getaways Artifact](artifacts/travlr-original.zip)

[Download Software Design and Engineering Enhanced Artifact](artifacts/software-design-enhanced.zip)

[View Software Design and Engineering Branch on GitHub](https://github.com/lrichg7-hub/cs499Capstone/tree/milestone-two-software-design)

---

# Algorithms and Data Structures

The second enhancement focused on improving how the Travlr Getaways application searches, filters, sorts, and retrieves trip information.

The enhancement introduced several algorithms and data structures, including:

- JavaScript `Map` for trip-code lookup
- Destination filtering
- Maximum-price filtering
- Merge sort for organizing trips by price
- Query-parameter processing
- Search and sorting controls in the user interface
- Time-complexity analysis
- Evaluation of algorithmic trade-offs

The Map provides an average **O(1)** lookup time after construction, filtering operates in **O(n)** time, and merge sort provides **O(n log n)** sorting performance.

[View Algorithms and Data Structures Enhancement](algorithms-data-structures.md)

### Artifacts

[Download Original Travlr Getaways Artifact](artifacts/travlr-original.zip)

[Download Algorithms and Data Structures Enhanced Artifact](artifacts/algorithms-data-structures-enhanced.zip)

[View Algorithms and Data Structures Branch on GitHub](https://github.com/lrichg7-hub/cs499Capstone/tree/milestone-three-algorithms)

---

# Databases

The third enhancement focused on improving the MongoDB and Mongoose implementation used by the Travlr Getaways application.

The enhancement included:

- Stronger Mongoose schema validation
- Required field validation
- Unique trip codes
- String normalization
- Price validation
- Database indexes
- MongoDB aggregation
- Destination statistics
- Page navigation using `skip()` and `limit()`
- Document counting with `countDocuments()`
- Improved data integrity and database performance

The final database-enhanced version also integrates the Software Design and Engineering and Algorithms and Data Structures improvements completed earlier in the course.

[View Database Enhancement](databases.md)

### Artifacts

[Download Original Travlr Getaways Artifact](artifacts/travlr-original.zip)

[Download Database Enhanced Artifact](artifacts/database-enhanced.zip)

[View Database Enhancement Branch on GitHub](https://github.com/lrichg7-hub/cs499Capstone/tree/milestone-four-databases)

---

# Original and Final Enhanced Artifacts

The original Travlr Getaways artifact was preserved from the project baseline immediately before the CS 499 enhancements began.

This provides a direct comparison between the original application and the enhanced versions developed during the capstone.

### Original Application

[Download Original Travlr Getaways Artifact](artifacts/travlr-original.zip)

### Final Enhanced Application

The database-enhanced artifact represents the most complete version of the application because it includes the earlier Software Design and Engineering and Algorithms and Data Structures improvements in addition to the final database enhancements.

[Download Final Enhanced Travlr Getaways Artifact](artifacts/database-enhanced.zip)

---

# Computer Science Program Outcomes

The work presented in this ePortfolio demonstrates my progress toward the five Computer Science program outcomes.

## Outcome One

Employ strategies for building collaborative environments that enable diverse audiences to support organizational decision making in the field of computer science.

## Outcome Two

Design, develop, and deliver professional-quality oral, written, and visual communications that are coherent, technically sound, and appropriately adapted to specific audiences and contexts.

## Outcome Three

Design and evaluate computing solutions that solve a given problem using algorithmic principles and computer science practices and standards appropriate to its solution, while managing the trade-offs involved in design choices.

## Outcome Four

Demonstrate an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals.

## Outcome Five

Develop a security mindset that anticipates adversarial exploits in software architecture and designs to expose potential vulnerabilities, mitigate design flaws, and ensure privacy and enhanced security of data and resources.

The professional self-assessment, code review, enhancement narratives, source code, and supporting artifacts throughout this portfolio demonstrate how these outcomes were applied during my CS 499 capstone experience.

---

# Technologies and Skills Demonstrated

The projects and enhancements contained in this ePortfolio demonstrate experience with:

- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose
- Angular
- Handlebars
- HTML and CSS
- Full-stack web development
- MVC architecture
- Service-layer architecture
- Asynchronous programming
- Algorithms and data structures
- JavaScript `Map`
- Searching and filtering
- Merge sort
- Time-complexity analysis
- Database schema design
- Data validation
- Database indexing
- MongoDB aggregation
- Page navigation
- Error handling
- Security-minded software design
- Git and GitHub
- GitHub Pages
- Technical documentation
- Code review
- Software testing and troubleshooting

---

# Portfolio Repository

The source code, enhancement branches, and development history for this project are maintained in my CS 499 GitHub repository.

[View CS 499 Capstone Repository on GitHub](https://github.com/lrichg7-hub/cs499Capstone)

---

# Closing Statement

Completing this ePortfolio allowed me to revisit an application from earlier in the Computer Science program and evaluate it from a more experienced perspective.

Instead of simply creating additional features, I focused on understanding why changes were needed, evaluating different approaches, considering performance and security, and improving the quality of the overall application.

The Travlr Getaways enhancements demonstrate my growth in software engineering, algorithms and data structures, databases, security, technical communication, and problem solving.

This portfolio represents both the technical skills I have developed and the foundation I plan to continue building upon as I pursue opportunities in information technology, software development, and cybersecurity.

---

## AI Use Acknowledgment

I used ChatGPT, an OpenAI generative AI tool, to assist with reviewing assignment requirements, organizing portfolio content, clarifying technical concepts, troubleshooting portions of the development process, preparing the code-review recording, and improving the clarity of my written documentation.

I reviewed the final material and made decisions about the content based on my own coursework, project work, professional experiences, career goals, and understanding of the Computer Science program.