# Exercise Full Stack: Simple CRUD Student (Laravel 11 & ReactJS)
Simple CRUD website for student data by combining Laravel 11 and React Frameworks.


## Prerequisite:

- Composer >= 2.8
- PHP >= 8.3
- Node >= 22


## Screenshots

![App Screenshot: List student](./Documentation/Website/List%20Student.png)


## Features

- CRUD Student


## Run Locally

Clone the project

```bash
git clone https://github.com/brianajiks123/Simple-CRUD-Laravel-11-API-React.git
```

Go to the project directory

```bash
cd Simple-CRUD-Laravel-11-API-React
```

### Backend API

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

### Frontend API

Go to the backend directory

```bash
cd Simple-CRUD
```

Install Dependencies (Node)

```bash
npm install
```

Running Runtime

```bash
npm run dev
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


## Tech Stack:

- Frontend: ReactJS, TailwindCSS
- Backend: Laravel 11, MySQL, Git, Github


## Acknowledgements

 - [Laravel](https://laravel.com/docs/11.x)
 - [Vite](https://vite.dev/guide/)


## Authors

- [@brianajiks123](https://www.github.com/brianajiks123)
