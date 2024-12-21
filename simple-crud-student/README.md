# Exercise Laravel 11 REST API CRUD Student
REST API for CRUD student.


## Prerequisite:

- Composer >= 2.8
- PHP >= 8.3


## Features

- CRUD Student


## Screenshots

![API Screenshot: List student](../Documentation/API/Add%20Student.png)
![API Screenshot: List student](../Documentation/API/List%20Student.png)


## Run Locally

Go to the backend directory

```bash
cd simple-crud-student
```

Install Dependencies (Laravel)

```bash
composer install
```

Migrate Database (make sure already setup your environment in the .env file)

```bash
php artisan migrate
```

Running Development

```bash
php artisan serve
```


## Testing Using API Client (Such as Postman)

### Routes
- GET http://localhost:8000/api/v1/students
- POST http://localhost:8000/api/v1/student
- PUT http://localhost:8000/api/v1/student/{id}
- DELETE http://localhost:8000/api/v1/student/{id}


## API Reference

Headers:
- Accept: application/json

### Get All Students

```http
GET /api/v1/students
```

### Add Student

```http
POST /api/v1/student
```

| Body     | Type        | Description                       |
| :------- | :-------    | :-------------------------------- |
| `name`   | `string`    | **Required**                      |
| `age`    | `integer`   | **Required**                      |
| `gender` | `string`    | **Required**. male OR female      |

### Update Student

```http
PUT /api/v1/student/{id}
```

| Params    | Type      | Description              |
| :-------- | :-------  | :----------------------- |
| `id`      | `integer` | **Required**. Id of item |

| Body      | Type      | Description                       |
| :-------- | :-------  | :-------------------------------- |
| `name`    | `string`  | **Required**                      |
| `age`     | `integer` | **Required**                      |
| `gender`  | `string`  | **Required**. male OR female      |

### Delete Student

```http
DELETE /api/v1/delete-article/{id}
```

| Params    | Type      | Description              |
| :-------- | :-------  | :----------------------- |
| `id`      | `integer` | **Required**. Id of item |

| Body      | Type      | Description                          |
| :-------- | :-------  | :---------------------------------   |
| `_method` | `DELETE`  | **Required**. DELETE method          |


## Tech Stack

**Server:** Laravel 11, MySQL, Git, Apache Web Server, VS Code, Windows 11


## Acknowledgements

 - [Laravel](https://laravel.com/docs/11.x)


## Authors

- [@brianajiks123](https://www.github.com/brianajiks123)
