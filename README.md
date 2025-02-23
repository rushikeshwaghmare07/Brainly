# Backend API Documentation

## **Register User** -

### Overview

This API handles the registration of new users for the application.

---

### Endpoints

- ### URL: `URL: /api/v1/users/signup`
- ### Method: `POST`

---

### Request Body:

The request body should be in JSON format and include the following fields:

```json
{
  "username": "test_username",
  "email": "test@test.com",
  "password": "securePassword"
}
```

---

### Example Response:

- **Success (201) -**

```json
{
  "success": true,
  "message": "User registered successfully.",
  "data": {
    "_id": "64c1234abcd567ef9012gh34",
    "username": "test_username",
    "email": "test@test.com"
  }
}
```

- **Error response (400)**

```json
{
  "success": false,
  "message": "User already exists."
}
```

- **Error response (500) - Server Error**

```json
{
  "success": false,
  "message": "Something went wrong while registering the user."
}
```

### **Error Handling**

- **Validation Errors:** A `400` status is returned with a list of validation errors.
- **Existing User:** A `400` status is returned if the username or email already exists.
- **Missing Fields or Server Issues:** A `500` status is returned with an appropriate message.

---

### **Behavior**

1. Validates the incoming request using.
2. Checks if a user with the given email or username already exists.
3. Hashes the user's password securely using `bcrypt`.
4. Saves the user to the database.
5. Returns the user object (excluding the password) upon successful registration.
---
