# DearFutureMe Database Schema

## Users Collection
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| username | String | Yes | User's name |
| email | String | Yes | Email (unique) |
| password | String | Yes | Hashed password |
| role | String | No | user / admin (default: user) |
| friends | [ObjectId] | No | List of friends |
| createdAt | Date | Auto | Created date |

## Capsules Collection
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| userId | ObjectId | Yes | Reference to User |
| title | String | Yes | Capsule title |
| content | String | Yes | Capsule content |
| openDate | Date | Yes | Opening date |
| isOpened | Boolean | No | Whether opened (default: false) |
| createdAt | Date | Auto | Created date |