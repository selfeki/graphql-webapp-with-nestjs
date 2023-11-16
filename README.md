## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test
```

## Overview

This documentation provides guidance on how to interact with the GraphQL API for a system managing `Users` and `Products`. The API allows you to insert data into `Users` and `Products` entities using GraphQL mutations and to query users along with their associated product information.

## Getting Started

Before you begin, ensure that you have the GraphQL endpoint URL provided by the server. This endpoint is used for all GraphQL queries and mutations.

### Common Endpoint

All GraphQL requests should be sent to the following endpoint once the app is [running](#running-the-app):

```bash
POST http://localhost:3000/graphql
```

## 1. Inserting Data Using GraphQL Mutations

### a. Adding a User

To add a new user, you will use a GraphQL mutation. Here is a sample mutation request:

```graphql
mutation {
  createOneUser(input: {
    name: "John Johnson",
    email: "john.johnson@example.com",
    age: 29
  }) {
    id
    name
    email
    age
  }
}

```

### b. Adding a Product

To add a new product, use a mutation structured as follows:

```graphql
mutation {
  createOneProduct(input: {
    product: {
      name: "Newspaper",
      price: 9.99
    }
  }) {
      id
      name
      price
  }
}
```

## 2. Querying Users with Their Orders

To query users and their associated products listed under the "order" field, use the following query structure:

```graphql
query GetUsersWithOrders {
  getUsersWithOrder {
    id
    name
    email
    age
    order {
      id
      name
      price
    }
  }
}
```
This query will return a list of users along with their orders, including the details of each product in their orders.

#### Sample Response:

```json
{
  "data": {
    "getUsersWithOrder": [
      {
        "id": "1",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "age": 30,
        "order": [
          {
            "id": "101",
            "name": "Product Name",
            "price": 99.99
          }
          // ... more products
        ]
      }
      // ... more users
    ]
  }
}
```
