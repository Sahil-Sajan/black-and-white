# Product API Documentation

This document outlines the available API endpoints for managing products in the application. All endpoints are relative to the base URL of your application (e.g., `http://localhost:3000/api`).

---

## 1. Get All Products
Retrieves a list of all products sorted by creation date (newest first) along with basic inventory statistics. Supports optional filtering by brand and category.

- **URL**: `/api/products`
- **Method**: `GET`
- **Query Parameters**:
  - `brand` (Optional): Filter products by their brand name (e.g., `?brand=Elux`).
  - `category` (Optional): Filter products by their category (e.g., `?category=DISPOSABLE`).
- **Success Response**:
  - **Code**: `200 OK`
  - **Payload**:
    ```json
    {
      "products": [
        {
          "_id": "60d5ecb8b3b3b3b3b3b3b3b3",
          "name": "Strawberry Ice Disposable",
          "slug": "strawberry-ice-disposable",
          "brand": "Crystal",
          "category": "DISPOSABLE",
          "mg": "20mg",
          "price": 12.99,
          "description": "A sweet and cool strawberry vape.",
          "isInStock": true,
          "variants": [
            { "name": "Standard", "image": "https://example.com/image.png" }
          ],
          "createdAt": "2026-04-01T10:00:00Z",
          "updatedAt": "2026-04-01T10:00:00Z"
        }
      ],
      "stats": {
        "total": 1,
        "outOfStock": 0
      }
    }
    ```

---

## 2. Create Product
Creates a new product record in the database. The `slug` is automatically generated from the `name`.

- **URL**: `/api/products`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "name": "Blueberry Sour Raspberry",
    "brand": "Elux",
    "category": "DISPOSABLE",
    "mg": "20mg",
    "price": 5.99,
    "description": "Tangy blueberry meets sweet raspberry.",
    "isInStock": true,
    "variants": [
      {
        "name": "Classic",
        "image": "data:image/png;base64,..." 
      }
    ]
  }
  ```
- **Success Response**:
  - **Code**: `201 Created`
  - **Payload**:
    ```json
    {
      "success": true,
      "product": { ...createdProductData }
    }
    ```
- **Error Response**:
  - **Code**: `400 Bad Request` (e.g., Duplicate name/slug)
  - **Code**: `500 Internal Server Error`

---

## 3. Get Product by ID
Retrieves the full details of a specific product using its unique MongoDB ID.

- **URL**: `/api/products/[id]`
- **Method**: `GET`
- **Success Response**:
  - **Code**: `200 OK`
  - **Payload**:
    ```json
    {
      "product": { ...productData }
    }
    ```

---

## 4. Update Product
Updates an existing product by its ID. Can be used for partial updates (e.g., toggling stock) or full form updates.

- **URL**: `/api/products/[id]`
- **Method**: `PUT`
- **Payload**:
  ```json
  {
    "price": 6.99,
    "isInStock": false
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Payload**:
    ```json
    {
      "success": true,
      "product": { ...updatedProductData }
    }
    ```

---

## 5. Delete Product
Permanently removes a product from the database.

- **URL**: `/api/products/[id]`
- **Method**: `DELETE`
- **Success Response**:
  - **Code**: `200 OK`
  - **Payload**:
    ```json
    {
      "success": true,
      "message": "Product deleted successfully"
    }
    ```

---

## 6. Get Product by Slug
Retrieves product details using its SEO-friendly slug. Useful for public-facing product detail pages.

- **URL**: `/api/products/slug/[slug]`
- **Method**: `GET`
- **Success Response**:
  - **Code**: `200 OK`
  - **Payload**:
    ```json
    {
      "product": { ...productData }
    }
    ```

---

## Data Models

### Product Schema
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Yes | Display name of the product. |
| `slug` | String | Auto | Generated from `name`. Unique. |
| `brand` | String | Yes | Associated brand name. |
| `category` | String | Yes | Category enum (DISPOSABLE, KITS, etc). |
| `mg` | String | No | Nicotine strength. |
| `price` | Number | Yes | Base pricing for the product. |
| `description`| String | No | Full HTML or text description. |
| `isInStock` | Boolean | Default: true | Availability toggle. |
| `variants` | Array | Yes | List of flavor/color variants with images. |

### Variant Object
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Variation or flavor name. |
| `image` | String | URL or Base64 string of the image. |
