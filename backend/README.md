# HALT Backend Service

The backbone of the dynamic storefront, responsible for managing layout configuration and state.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Running the Server
```bash
# Start in development mode (hot-reload)
npm run dev

# Build and start in production
npm run build
npm start
```
The server defaults to port `3000`.

---

## API Reference

### Products

#### `GET /api/products`
Retrieves the full catalog of available products.

**Response**
Returns an array of product objects:
```json
[
  {
    "id": "p1",
    "name": "Neon Cyber Jacket",
    "price": 120.00,
    "image": "...",
    "description": "High-visibility streetwear..."
  },
  ...
]
```

### Layout Configuration

The core resource is the `Layout` configuration, which defines which items are shown and in what format.

#### `GET /api/layout`
Retrieves the current layout configuration, **enriched with product details**.

**Response**
Returns an array of layout objects joined with product descriptions:
```json
[
  {
    "itemId": "p1",
    "variant": "flyer",
    "description": "High-visibility streetwear..."
  },
  {
    "itemId": "p2",
    "variant": "single",
    "description": "Iridescent finish..."
  }
]
```

- **`itemId`**: The unique ID of the product (e.g., `p1`, `p2`).
- **`variant`**: The visual template to use. One of:
  - `single`: 1x1 standard block.
  - `double`: 2x1 wide block.
  - `flyer`: 4x1 full-width featured block.
- **`description`**: The product description (helper field for AI context).

#### `POST /api/layout`
Updates the global layout configuration. This is intended to be used by the Store Manager AI agent to dynamically reorganize the shop.

**Request Body**
Must be a JSON array of layout objects.
```json
[
  { "itemId": "p3", "variant": "double" },
  { "itemId": "p1", "variant": "single" }
]
```

**Response**
```json
{
  "success": true,
  "count": 2
}
```

**Validation**
- Body must be a valid JSON array.
- Invalid item IDs will be ignored by the frontend (but stored).
- Invalid variants will fallback to default or generic rendering on the frontend.
