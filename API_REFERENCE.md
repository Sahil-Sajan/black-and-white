# Black & White - Professional API Reference 📘

This document provides a comprehensive guide to all backend API endpoints available for the **Black & White** application.

---

## 🏗️ Base Configuration
- **Base URL**: `http://localhost:3000/api`
- **Content-Type**: `application/json`

---

## 🗂️ Table of Contents
1. [Product Management](#1-product-management)
2. [Customer Checkout](#2-customer-checkout)
3. [Order Management (Admin)](#3-order-management-admin)
4. [Customer Aggregation (Admin)](#4-customer-aggregation-admin)
5. [Data Models](#-data-models)

---

## 1. Product Management

### **GET** `/api/products`
Retrieves all products with real-time stock stats. Supports filtering.
- **Query Params**: 
  - `brand`: e.g. `?brand=Crystal`
  - `category`: e.g. `?category=DISPOSABLE`
- **Response**:
  ```json
  { 
    "products": [...], 
    "stats": { "total": 12, "outOfStock": 2 } 
  }
  ```

### **POST** `/api/products`
Creates a new product. Slug is auto-generated.
- **Payload**:
  ```json
  {
    "name": "Strawberry Burst",
    "brand": "Crystal",
    "category": "DISPOSABLE",
    "price": 9.99,
    "isInStock": true,
    "variants": [{ "name": "Standard", "image": "base64/url" }]
  }
  ```

### **GET** `/api/products/slug/[slug]`
Fetch a specific product's full detail by its unique slug.
- **Example**: `/api/products/slug/strawberry-burst`

### **PUT** `/api/products/[id]`
Partial or full update of a product.
- **Use Case**: Quick stock toggling or price updates.

---

## 2. Customer Checkout

### **POST** `/api/checkout`
Processes a new purchase with **Real-Time Stock Validation**. 
- Orders only succeed if all items are `isInStock: true`.
- **Payload**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phoneNo": "07123456789",
    "address": "10 Downing St",
    "state": "London",
    "zipCode": "SW1A 2AA",
    "country": "UK",
    "paymentMethod": "COD",
    "items": [
      {
        "productId": "60d...",
        "name": "Strawberry Ice",
        "price": 12.99,
        "variant": "Standard",
        "quantity": 1,
        "image": "..."
      }
    ]
  }
  ```

---

## 3. Order Management (Admin)

### **GET** `/api/orders`
Fetches all orders with overall business metrics.
- **Response**: 
  ```json
  {
    "orders": [...],
    "stats": { "totalRevenue": 2400.00, "pendingOrders": 4 }
  }
  ```

### **PUT** `/api/orders/[id]`
Transitions an order between fulfillment stages.
- **Payload**: `{ "status": "SHIPPED" }`
- **Allowed Statuses**: `PENDING`, `SHIPPED`, `DELIVERED`, `CANCELLED`

---

## 4. Customer Aggregation (Admin)

### **GET** `/api/customers`
Aggregates unique customer data from the entire order history.
- **Metrics**: Total Spent, Order Count, and Last Order Date.
- **Grouping**: Email-based aggregation.

---

## 🎨 Data Models

### **Product Schema** (`src/models/Product.ts`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Unique product name. |
| `brand` | String | Brand identifier. |
| `price` | Number | Active retail price. |
| `isInStock`| Boolean | Availability flag. |

### **Order Schema** (`src/models/Order.ts`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `orderId` | String | Readable ID (e.g. `ORD-12345`). |
| `email` | String | Customer contact. |
| `items` | Array | Snapshots of products at time of purchase. |
| `status` | String | Workflow status (Default: PENDING). |

---

## 🛑 Error Handling
| Code | Meaning | Reason |
| :--- | :--- | :--- |
| `400` | Bad Request | Missing fields or stock validation fails. |
| `404` | Not Found | Item or Page does not exist. |
| `500` | Internal Error | Database connection or logic failure. |

---
**Last Updated**: April 2026
