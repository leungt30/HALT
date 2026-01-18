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

- **`itemId`**: The unique ID of the product (e.g., `p1`, `p2`). Required for products.
- **`variant`**: The visual template to use. One of:
  - `single`: 1x1 standard block.
  - `double`: 2x1 wide block.
  - `flyer`: 4x1 full-width featured block.
- **`description`**: The product description (helper field for AI context).

**OR** (for Category Headers):

- **`type`**: Must be `"category"`.
- **`name`**: Display name (e.g., "Tech Essentials").
- **`id`**: Anchor ID for navigation (e.g., "tech-essentials").

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

### Layout History & Flags

#### `POST /api/flags`
Tags the current (latest) layout with a specific flag name. This marks a significant version or checkpoint in the layout history.

**Request Body**
```json
{
  "flag": "v1.0-launch"
}
```

**Response**
```json
{
  "success": true,
  "flag": "v1.0-launch"
}
```

#### `GET /api/layouts/history`
Retrieves a segment of the layout history based on flags.

**Query Parameters**
- `flag` (optional): The starting flag for the history segment.

**Behavior**
- If `flag` is **omitted**: Returns all layouts from the **latest** version back to the **most recent flag**.
- If `flag` is **provided**: Returns all layouts between the specified `flag` (inclusive) and the **next newer flag** (or the latest version if no newer flag exists).

**Response**
Returns an array of layout documents, where each document contains:
- `items`: The layout configuration array.
- `createdAt`: Timestamp of creation.
- `flag`: The flag string (if present).

```json
[
  {
    "items": [...],
    "createdAt": "2024-05-20T10:00:00.000Z",
    "flag": "v1.1-update"
  },
  {
    "items": [...],
    "createdAt": "2024-05-20T09:30:00.000Z"
  }
]
```

### Customer Actions

#### `POST /api/flags` (Updated)
Now also inserts a `FLAG` event into the customer action stream, synchronizing layout history with user behavior analysis.

#### `GET /api/customer-actions`
Retrieves a segment of the customer action history based on flags.

**Query Parameters**
- `flag` (optional): The starting flag for the action segment.

**Behavior**
- Functions identically to layout history:
    - No flag: Actions from latest back to most recent flag.
    - Flag provided: Actions from that flag forward to the next flag.

**Response**
Returns an array of customer action objects.

#### `POST /api/CustomerAction`
Saves a user interaction event.

**Request Body**
```json
{
  "actionType": "CLICK",
  "actionSubject": "p1",
  "sessionId": "...",
  ...
}
```
