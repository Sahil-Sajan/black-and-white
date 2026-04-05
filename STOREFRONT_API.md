# Black & White - Storefront API Guide 🛒

This documentation is specifically for the **Storefront (Public)** features. It includes all endpoints required to build the product listing, product details, and checkout experience.

---

## 🏗️ Base URL
`http://localhost:3000/api`

---

## 1. Product Catalog (Listing)
Retrieve the list of all products to display on your shop page.

- **URL**: `/api/products`
- **Method**: `GET`
- **Optional Filters**:
  - `brand`: Filter by brand name (e.g., `?brand=Crystal`)
  - `category`: Filter by category (e.g., `?category=DISPOSABLE`)

### **📦 Example Success Response**
```json
{
  "products": [
    {
      "_id": "60d5ecb8b3b3b3b3b3b3b3b3",
      "name": "Strawberry Burst",
      "slug": "strawberry-burst",
      "brand": "Crystal",
      "category": "DISPOSABLE",
      "price": 12.99,
      "isInStock": true,
      "variants": [
        {
          "name": "Standard",
          "image": "https://example.com/images/strawberry.jpg"
        }
      ],
      "description": "Sweet strawberry flavor.",
      "createdAt": "2026-04-01T10:00:00Z"
    }
  ],
  "stats": {
    "total": 1,
    "outOfStock": 0
  }
}
```

---

## 2. Product Details (Slug-Based)
Retrieve full details for a single product using its unique SEO-friendly slug.

- **URL**: `/api/products/slug/[slug]`
- **Method**: `GET`
- **Example**: `/api/products/slug/strawberry-burst`

### **📦 Example Success Response**
```json
{
  "product": {
    "_id": "60d5ecb8b3b3b3b3b3b3b3b3",
    "name": "Strawberry Burst",
    "slug": "strawberry-burst",
    "brand": "Crystal",
    "category": "DISPOSABLE",
    "price": 12.99,
    "isInStock": true,
    "variants": [...],
    "description": "Full product description here...",
    "createdAt": "2026-04-01T10:00:00Z"
  }
}
```

---

## 3. Customer Checkout (Order Placement)
Submit a customer's order for processing. This API performs **Real-Time Stock Validation**.

- **URL**: `/api/checkout`
- **Method**: `POST`

### **📤 Example Request Payload**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "customer@example.com",
  "phoneNo": "07123456789",
  "address": "123 High Street",
  "state": "London",
  "zipCode": "E1 6AN",
  "country": "UK",
  "paymentMethod": "COD",
  "deliveryCharges": 5.00,
  "totalPrice": 17.99,
  "items": [
    {
      "productId": "60d5ecb8b3b3b3b3b3b3b3b3",
      "name": "Strawberry Burst",
      "price": 12.99,
      "variant": "Standard",
      "quantity": 1,
      "image": "https://example.com/images/strawberry.jpg"
    }
  ]
}
```

### **📦 Example Success Response**
```json
{
  "success": true,
  "message": "Order placed successfully!",
  "order": {
    "orderId": "ORD-54321",
    "firstName": "John",
    "lastName": "Doe",
    "email": "customer@example.com",
    "items": [...],
    "totalPrice": 17.99,
    "status": "PENDING"
  }
}
```

---

## 🛑 Common Error Responses

### **Stock Error (400 Bad Request)**
Returned if any item in the order is currently out of stock.
```json
{ "error": "Item 'Strawberry Burst' is currently out of stock." }
```

### **Not Found (404 Not Found)**
Returned if a product slug or ID does not exist in the database.
```json
{ "error": "Product not found" }
```
