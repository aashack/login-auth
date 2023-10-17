
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
npm install
npm run start
```

The API will be ready to go when you see:
```bash
Listening on port 3000
Redis connected
Redis ready!
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


## Authors

- [@aashack](https://www.github.com/aashack)


## FAQ

#### Question 1

Answer 1

#### Question 2

Answer 2

