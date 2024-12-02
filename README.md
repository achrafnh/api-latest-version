# MonAvocat API Testing Guide

## API Endpoints Documentation

### Base URL
```
http://172.173.137.254:3000/api/v1
```

### Authentication Endpoints

#### 1. User Registration
```bash
curl -X POST "http://172.173.137.254:3000/api/v1/users/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123",
    "fullName": "John Doe",
    "phoneNumber": "+1234567890"
  }'
```

Expected Response:
```json
{
  "accessToken": "eyJhbG...",
  "refreshToken": "eyJhbG..."
}
```

#### 2. User Login
```bash
curl -X POST "http://172.173.137.254:3000/api/v1/users/signin" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123"
  }'
```

#### 3. Lawyer Registration
```bash
curl -X POST "http://172.173.137.254:3000/api/v1/lawyers/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "lawyer@example.com",
    "password": "Password123",
    "fullName": "Jane Smith",
    "licenseNumber": "LAW123456",
    "specialization": "Corporate Law",
    "yearsOfExperience": 5,
    "phoneNumber": "+1987654321"
  }'
```

#### 4. Lawyer Login
```bash
curl -X POST "http://172.173.137.254:3000/api/v1/lawyers/signin" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "lawyer@example.com",
    "password": "Password123"
  }'
```

#### 5. User Signout
```bash
curl -X POST "http://172.173.137.254:3000/api/v1/users/signout" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id_from_login_response"
  }'
```

#### 6. Lawyer Signout
```bash
curl -X POST "http://172.173.137.254:3000/api/v1/lawyers/signout" \
  -H "Content-Type: application/json" \
  -d '{
    "lawyerId": "lawyer_id_from_login_response"
  }'
```

#### 7. Refresh Token
```bash
curl -X POST "http://172.173.137.254:3000/api/v1/refresh-token" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "refresh_token_from_login",
    "userType": "user"
  }'
```

## Error Responses

### Validation Error
```json
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Authentication Error
```json
{
  "error": "Invalid credentials"
}
```

### Rate Limit Error
```json
{
  "error": "Too many requests, please try again later"
}
```

## Testing Script

To run all test endpoints automatically:

1. Make the script executable:
```bash
chmod +x test-endpoints.sh
```

2. Run the script:
```bash
./test-endpoints.sh
```

Note: Replace any placeholder values (like user_id_from_login_response) with actual values from previous responses.