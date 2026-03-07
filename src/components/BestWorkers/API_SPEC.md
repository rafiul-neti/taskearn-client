# Best Workers API Specification

## Overview
Defines the expected API endpoints and data contracts for fetching top-performing workers.

---

## Endpoint: Get Best Workers

### Request
```
GET /api/workers/best
```

### Query Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | integer | No | 6 | Number of workers to return (max: 50) |
| `sortBy` | string | No | "rating" | Sort criteria: "rating", "tasks", "earnings" |
| `skills` | string | No | - | Comma-separated skill filter (e.g., "Design,Writing") |
| `minRating` | number | No | 4.5 | Minimum rating threshold (0-5) |

### Example Request
```bash
GET /api/workers/best?limit=6&sortBy=rating&minRating=4.7
```

---

## Response

### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "workers": [
      {
        "id": "worker_001",
        "name": "Sarah Chen",
        "avatar": "https://cdn.taskearn.com/avatars/worker_001.jpg",
        "isVerified": true,
        "rating": 4.9,
        "reviewCount": 247,
        "stats": {
          "tasksCompleted": 1250,
          "successRate": 98,
          "totalEarnings": 15420
        },
        "skills": ["Data Entry", "Research", "Translation"],
        "joinedDate": "2024-01-15T00:00:00Z",
        "responseTime": "< 2 hours"
      }
    ],
    "total": 156,
    "page": 1,
    "limit": 6
  },
  "timestamp": "2026-03-07T10:30:00Z"
}
```

### Error Response (400 Bad Request)
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Limit must be between 1 and 50",
    "field": "limit"
  },
  "timestamp": "2026-03-07T10:30:00Z"
}
```

### Error Response (500 Internal Server Error)
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Failed to fetch workers"
  },
  "timestamp": "2026-03-07T10:30:00Z"
}
```

---

## Data Model

### Worker Object
```typescript
interface Worker {
  id: string;                    // Unique worker identifier
  name: string;                  // Full name
  avatar: string;                // Profile image URL
  isVerified: boolean;           // Verification status
  rating: number;                // Average rating (0-5, decimal)
  reviewCount: number;           // Total number of reviews
  stats: WorkerStats;            // Performance statistics
  skills: string[];              // Array of skill names
  joinedDate: string;            // ISO 8601 date string
  responseTime: string;          // Average response time (human-readable)
}

interface WorkerStats {
  tasksCompleted: number;        // Lifetime completed tasks
  successRate: number;           // Success percentage (0-100)
  totalEarnings: number;         // Total earnings in USD (dollars or cents)
}
```

---

## Alternative Endpoint: Get Worker by ID

### Request
```
GET /api/workers/:workerId
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `workerId` | string | Yes | Unique worker identifier |

### Example Request
```bash
GET /api/workers/worker_001
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "worker_001",
    "name": "Sarah Chen",
    "avatar": "https://cdn.taskearn.com/avatars/worker_001.jpg",
    "isVerified": true,
    "rating": 4.9,
    "reviewCount": 247,
    "stats": {
      "tasksCompleted": 1250,
      "successRate": 98,
      "totalEarnings": 15420
    },
    "skills": ["Data Entry", "Research", "Translation"],
    "joinedDate": "2024-01-15T00:00:00Z",
    "responseTime": "< 2 hours",
    "bio": "Experienced data specialist with 3+ years...",
    "languages": ["English", "Mandarin"],
    "availability": "Full-time"
  },
  "timestamp": "2026-03-07T10:30:00Z"
}
```

### Error Response (404 Not Found)
```json
{
  "success": false,
  "error": {
    "code": "WORKER_NOT_FOUND",
    "message": "Worker with ID 'worker_001' not found"
  },
  "timestamp": "2026-03-07T10:30:00Z"
}
```

---

## Implementation Notes

### Backend Requirements
1. Implement caching (Redis) for best workers list (TTL: 5 minutes)
2. Add rate limiting: 100 requests per minute per IP
3. Ensure avatar URLs are CDN-hosted for performance
4. Calculate `responseTime` from median of last 30 days
5. Filter out inactive workers (no activity in 90 days)

### Security Considerations
- Sanitize all query parameters
- Implement pagination to prevent large data dumps
- Don't expose sensitive worker information (email, phone)
- Use HTTPS only

### Performance Optimization
- Index database on `rating`, `tasksCompleted`, `totalEarnings`
- Pre-compute worker rankings daily via cron job
- Use database views for complex aggregations
- Implement CDN caching for static responses

---

## Integration Example

### React Component (Next.js)
```javascript
// app/api/workers/best/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit')) || 6;
  
  // Fetch from database
  const workers = await db.workers.findMany({
    where: { rating: { gte: 4.5 } },
    orderBy: { rating: 'desc' },
    take: limit
  });
  
  return Response.json({
    success: true,
    data: { workers, total: workers.length, page: 1, limit }
  });
}
```

### Client-Side Fetching
```javascript
// components/BestWorkers/BestWorkers.jsx
async function fetchBestWorkers(limit = 6) {
  const response = await fetch(`/api/workers/best?limit=${limit}`);
  const { data } = await response.json();
  return data.workers;
}

// Usage in Server Component
const workers = await fetchBestWorkers(6);
<BestWorkers workers={workers} />
```
