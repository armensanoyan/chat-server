# Chat Server

This is a chat server built with Node.js, Express, and Sequelize.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chat-server.git
```
### Install NPM packages:
 ```bash
npm run install
  ```

###  Set up database
Before setting the schema you will need to create database with corresponding name and add that name in environment variables
```bash
npm run seed
  ```
### Set environment variables
There is a .envExample file with example variables you can rename it file to .env or create a new file with name .env and fill the variables
### Run the server:
  ```bash
npm run start
  ```

### Usage

All the endpoints are available in postman collections. There is user auth endpoints where you can register and login user. Logout and delete users functionalities are not provided yet. For log out going to use redis to save and check user token. For user delete functionality need to handle chat and messages for deleted users. 
Since exporting socket collections is not possible in postman, that are not included in collections. For socket connection same host and port is used

Here is a body example for socket create and delete events

### Create
```json
{
    "userId": 1,
    "chatId": 1,
    "message": "comment to first socket message",
    "action": "delete"
}
```
### Delete
```json
{
    "messageId": 4,
    "action": "delete"
}
```

### Built With
Node.js
Express
Sequelize
Socket.io