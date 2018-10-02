### DATABASE user data consists of The followinig
  - id : **_this is the normal mongodb id_**
  - email : **_this is the user email_**
  - password : **_this is the user's salted password_**
  - photo : **_this is the user image, it is randomly generated for the user, this is done by gravatar api_**

   Authenticated user has access to any of the above properties

## API ROUTES INCLUDE:
- http://localhost:8080/auth/signup -- **signup user,** this registers the user in the database and generates a random token for the user
- http://localhost:8080/auth/signin -- **signin user,** this verifies the user's email and password and generates a random token for the user
- http://localhost:8080/auth/logout-- **logout user,** logs out the user
- http://localhost:8080/user -- **user,** if authenticated, the user details will be available.

## TODOS
Create a reactjs frontend which :
- logs the user in
- signs the user in
- logs the user out
- shows the user's photo and email when the user is logged in.
