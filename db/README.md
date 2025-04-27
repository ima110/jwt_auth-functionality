# Database Section

This readme describe schema of our database 

- Our database contain three tables Admin, User and Courses

- Admin table contain Username (string) , Password (alphanumeric with special characters), Token (which will be stored after first login) and Flag (Which will contain secret key used to generate jwt)

- User table contain Username (string), Password (alphanumeric with special characters), Token (which will be stored after first login),Flag (Which will contain secret key used to generate jwt) and purchased(list) contain all purchased courses
