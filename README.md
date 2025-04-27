## Create a course selling website

## Routes

### Admin Routes:

- POST /admin/signup
  Description: Creates a new admin account.
  Input Body: { username: 'admin', password: 'pass' }

- POST /admin/signin
  Description: Logs in an admin account.
  Input Body: { username: 'admin', password: 'pass' }
  Return Token whuch will be stored in DB under Token field

- POST /admin/courses
  Description: Creates a new course.
  Input: Headers: { 'Authorization': 'Bearer <your-token>', Username }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }

- GET /admin/courses
  Description: Returns all the courses.
  Input: Headers: { 'Authorization': 'Bearer <your-token>' courses}

- Patch /courses/launch/:id 
  Description: Launch course and will be avilable for user 

### User routes

- POST /admin/signup
  Description: Creates a new admin account.
  Input Body: { username: 'admin', password: 'pass' }

- POST /admin/signin
  Description: Logs in an admin account.
  Input Body: { username: 'admin', password: 'pass' }
  Return Token whuch will be stored in DB under Token field

- GET /users/courses
  Description: Lists all the courses which are launched.
  Input: No authorization required
  
- POST /users/courses/:courseId
  Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
  Input: Headers: { 'Authorization': 'Bearer <your-token>' username }
  
- GET /users/purchasedCourses
  Description: Lists all the courses purchased by the user.
  Input: Headers: { 'Authorization': 'Bearer <your-token>' username }
  
### Silent Features 

- Token will be only valide for one hour, after that user again need to signin

- User don't need authenticate to just see available courses.But can see only launched courses 

- Key required to generate jwt are created using hash code whose logic are written in saperate file and key generate is umique for each user 

