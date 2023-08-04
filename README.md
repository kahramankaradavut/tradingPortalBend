# trading-portal-backend
 COMP202 and COMP204 term project

<br/>

## Dependencies
* [CORS](https://www.npmjs.com/package/cors)
(v2.8.5) for cors policy restrictions
* [Express](https://www.npmjs.com/package/express)
(v4.18.2) for creating server
* [Helmet](https://www.npmjs.com/package/helmet)
(v6.1.2) for protecting header against attacks
* [dotenv](https://www.npmjs.com/package/dotenv)
(v16.0.3) for protecting sensitive data
* [mysql2](https://www.npmjs.com/package/mysql2)
(v3.2.0) for communicating with a MySQL database

<br/>

## Setup
To run this project, install it locally using npm. Keep in mind that you should be in the root directory before running these commands.
```
$ npm install
$ node index.js
```

<br/>

## MySQL Script to Get Started
### see db_get_started_script.sql file at the root of the project folder.

<br/>

## Environment Variables
Do not forget to create your own .env file at the root of the project folder. This is how it should looks like
```
$ PORT=3000
$ MYSQLPORT=3306
$ MYSQLHOST="localhost"
$ MYSQLUSER="your_mysql_user_name"
$ MYSQLPASSWORD="your_mysql_password"
$ MYSQLDATABASE="tradingdb"
```

<br/>

## Routes
Base url: https://trading-portal-backend-production.up.railway.app/

## USER

| HTTP Methods  | Endpoints                |
| ------------- | ------------------------ | 
| `POST`        | /api/auth/login | 
| `POST`        | /api/auth/register | 
| `GET`         | /api/users | 
| `GET`         | /api/users/:userId | 
| `GET`         | /api/users/:userId/products | 
| `GET`         | /api/users/:userId/transactions | 
| `PUT`         | /api/users/:userId/update | 
| `DELETE`      | /api/users/:userId/delete | 

## PRODUCT

* You should also send signed userId in the HTTP body section.

| HTTP Methods  | Endpoints                |
| ------------- | ------------------------ | 
| `POST*`        | /api/products             | 
| `GET`        | /api/products          | 
| `GET`        | /api/products/:productId         | 
| `PUT`        | /api/products/:productId/update         | 
| `POST*`        | /api/products/:productId/like        | 
| `DELETE*`        | /api/products/:productId/unlike         | 
| `POST*`        | /api/products/:productId/comment         | 
| `DELETE`        | /api/products/:productId/comments/:commentId/delete         |
| `DELETE`        | /api/products/:productId/delete         |  

## TRANSACTION

| HTTP Methods  | Endpoints                |
| ------------- | ------------------------ | 
| `POST`        | /api/transactions             | 
| `GET`        | /api/transactions          | 
| `GET`        | /api/transactions/:transactionId         | 
| `PUT`        | /api/transactions/:transactionId/update         | 
| `DELETE`        | /api/transactions/:transactionId/delete         |  

<br/>

## Sample data
You can use these sample data in HTTP request body.

### USER
```json
{
    "firstName": "Gerald",
    "lastName": "Mitchell",
    "email": "gerald.mitchell@example.com",
    "password": "kdsh7323£#05",
    "phoneNumber": "05111111111"
}
```
### PRODUCT
```json
{
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "image": "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
}
```

### TRANSACTION
```json
{
    "firstProductId": 112,
    "secondProductId": 897,
}
```

## Troubleshooting
### Problem: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
### Solution: https://stackoverflow.com/questions/52815608/er-not-supported-auth-mode-client-does-not-support-authentication-protocol-requ
