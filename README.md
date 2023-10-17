
# Login-Auth

A custom login API that takes in a email and password and generates a secure session cookie. All endpoints have error checking and input validation that will return a consistent response.




## Installation

Install Login-Auth with npm, this project was built using:

Node: v18.16.0 \
NPM: 9.8.0 

This will require that you have an instance of Redis running on your local machine, this can easily be done with docker. If you have docker installed on your local machine you can run the following command to pull a running container with Redis

```bash
docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
```
Once Redis is running, you can install and run this project using:

```bash
git clone git@github.com:aashack/login-auth.git
npm install
npm run start
```

The API will be ready to go when you see:
```bash
Listening on port 3000
Redis connected
Redis ready!
```

If you are using Postman for a API tool, I've included a json file you can import with the endpoints you can use.

These steps allow you to import the endpoints to your workspace
```bash
1. File --> Import
2. Select workspace
3. Select File.
4. Choose Auth-Login.postman_collection.json
```
## API Reference

#### Sign Up

```http
  Post /v1/users/signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Unique email  |
| `password`      | `string` | **Required**. Unique password |


#### Sign In

```http
  Post /v1/users/signup
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Previously signed up email  |
| `password`      | `string` | **Required**. Previously signed up password |


#### Get the current signed in user.

```http
  GET /v1/users/currentuser
```

#### Sign out Current User.

```http
  Post /v1/users/signout
```


## FAQ

#### Why did I use cookies instead of a bearer token or x-access-token?

I had in mind a solution that would work in a microservice system, where if the authentication service went down it wouldn't affect the other services. In my idea, each service would ultilize a shared library that validated the cookie without having to call the auth service.

#### What happens if a user is deleted and needs to be logged out and the Authentication service is down?

In the completed application there should be a event-bus or a event service that notifies it to the rest of the services, and the shared library would have a check. It could store a list in redis and the middleware library checks it before each validation.

#### using express-validator seems kindof lazy

Without using a api manager like Apollow or Redwood, it is fast and effective, it also allows you to capture and customize your errors if you need to incorperate logging or addition functionality. It is sometimes useful to use ultilize third party libraries, express has been around so long that they become commonplace.

#### how would the front end check get the logged in user?

My intention is that they would call and endpoint like '/v1/users/currentuser' and it would provide them with needed information, like the token or user info.

## Authors

- [@aashack](https://www.github.com/aashack)

