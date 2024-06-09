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

### Install NPM packages:
 ```bash
npm run install
  ```

###  Set up database
```bash
npm run seed
  ```

### Run the server:
  ```bash
npm run start
  ```

### Usage

All the endpoints are available in postman collections. There is user auth endpoints where you can register and login user. Logout and delete users functionalities are not provided yet. For log out going to use redis to save and check user token. For user delete functionality need to handle chat and messages for deleted users.

### Built With
Node.js
Express
Sequelize
Socket.io