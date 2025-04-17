# Full Stack Development with MEAN

## Architecture

Travlr Getaways is a full-stack web application that uses the MEAN stack. The MEAN stack uses MongoDB for the database, Express for routing, Angular for the front end, and Node.js for the server. Handlebars is used as the templating engine. MongoDB was chosen over an SQL database because MongoDB was more straightforward to use, and the trip data did not need to be structured.

The customer-facing side of the application allows customers to view and book vacation trips. Users can navigate to different site pages using the routing provided by Express. When the user navigates to a route, the server uses Handlebars to dynamically generate HTML for the user based on information stored in the database. 

## Functionality

JSON (JavaScript Object Notation) is a format used for data exchange, while JavaScript is a programming language. In this application, the back end retrieves data from the database and sends it as JSON to the front end. This data is used by the SPA to render the trip details.

One example of optimizing functionality is implementing the Handlebars templating engine to display trip data instead of making hard-coded HTML pages that would need to be modified by hand. Another example is creating Angular components for the SPA, which allowed me to construct pages within the SPA piece by piece without copying and pasting the same code.

## Testing

While developing the functionality to retrieve and edit trips, I tested the API by making manual GET and PUT requests using Postman. I checked the response codes in the server log to see if the requests went through. With the GET requests, I checked that the correct response was returned. With the PUT requests, I examined the database using MongoDB Compass to ensure the data was correctly edited. Once I ensured the requests worked properly in Postman, I wrote the code necessary for the application to make those requests. I also used Postman to ensure the JSON web tokens and login functionality worked properly.

## Reflection

This course has helped me understand how a full-stack application works and how to develop one properly. I was particularly interested in learning how single-page applications work. Full-stack web developers are in high demand in the software engineering field, and I know what I learned in this course will help me in my future career.
