# Todo Application

This is a Grocery API built using Express.js for the backend. The backend uses PostgreSQL as the database

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Setup Instructions](#setup-instructions)
  - [Local Setup](#local-setup)
  - [Docker Setup](#docker-setup)
- [Developed on system](#developed-on-system)
- [License](#license)

## Features

- User sign up and login
- Grocery creation, retrieval, updating, and deletion by superuser only
- order creation by users

## API Endpoints

### Authentication

- **POST** `/auth/signup`

  - **Description:** Sign up a new user.
  - **Body Parameters:**
    - `name` (string): User's name.
    - `email` (string): User's email.
    - `password` (string): User's password.

- **POST** `/auth/login`
  - **Description:** Log in an existing user.
  - **Body Parameters:**
    - `email` (string): User's email.
    - `password` (string): User's password.

### Grocery

- **POST** `/grocery`

  - **Description:** Create a new grocery item.
  - **Body Parameters:**
    - `name` (string): Name of the grocery.
    - `price` (number): Nunber of grocery Items.
    - `inventoryLevel` (int): Number of grocery items in the inventory

- **GET** `/grocery`

  - **Description:** Get all groceries.

- **DELETE** `/grocery/:groceryId`

  - **Description:** Delete a specific grocery by its ID.

- **PUT** `/grocery/:groceryId`
  - **Description:** Update the column of a grocery.
  - **Body Parameters:**
    - `inventoryLevel` (number): new number of grocery items.
    - `name` (string): name of the grocery item

### **POST** `/orders`

- **Description:** Create a new order.
- **Body Parameters:**
  - `status` (string): The current status of the order (e.g., "pending", "completed").
  - `totalQuantity` (number): Total number of items in the order.
  - `totalPrice` (number): Total price of the order.
  - `orderItems` (array of objects): List of items in the order.
    - Each object in `orderItems` should have:
      - `itemId` (number): ID of the grocery item.
      - `quantity` (number): Quantity of the grocery item in the order.

### **DELETE** `/orders/:orderId`

- **Description:** Delete a specific order by its ID.
- **Path Parameters:**
  - `orderId` (string): ID of the order to delete.

### **GET** `/orders`

- **Description:** Retrieve a list of all orders.

### Example Request Body for Creating an Order

```json
{
  "status": "pending",
  "totalQuantity": 2,
  "totalPrice": 10,
  "orderItems": [
    {
      "itemId": 1,
      "quantity": 2
    }
  ]
}
```

## Setup Instructions

- Clone the repository and proceed with the way more suitable for you

```bash
  git clone https://github.com/saradchhetri07/GroceryShoppingAPI.git
```

- Create an new `.env` file inside `server` based on the `.env.example` file

### Local setup

- Ensure the system is has node and postres installed for runnning the application locally on the machine

#### Backend Setup (Express.js)

1. Run migrations:
   ```bash
   npm run migrate
   ```
1. Start the backend server:
   ```bash
   npm start
   ```

## Docker Setup

1. Ensure you have Docker installed. You can follow [Docker's installation guide](https://docs.docker.com/get-docker/).

1. After completing the basic setup of `.env` file

   - Go to the root directory where `docker-compose.yaml` file is located
   - Run the following command to start docker instance of `backend` and `database`

     ```bash
     docker compose up --build
     ```

   - To run on detach mode run the command
     ```bash
     docker compose up --build -d
     ```

1. The backend (Express) will be running with PostgreSQL inside Docker.

## Developed on system

### Local

- Node: `v18.17.0`
- npm: `v10.8.3`
- PostgreSQL: `postgres (PostgreSQL) 16.3 (Postgres.app)`

### Docker

- Docker Version: `Docker version 26.0.0, build 2ae903e`
  - Node Inside docker: `node:18-alpine3.19`
  - PostgreSQL inside docker: `16.3-alpine3.19`

## License

This project is licensed under the MIT License.
