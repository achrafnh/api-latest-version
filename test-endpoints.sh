#!/bin/bash

# Base URL
API_URL="http://172.173.137.254:3000/api/v1"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Testing MonAvocat API Endpoints${NC}\n"

# 1. User Registration
echo -e "${GREEN}1. Testing User Registration:${NC}"
curl -X POST "${API_URL}/users/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123",
    "fullName": "John Doe",
    "phoneNumber": "+1234567890"
  }'

echo -e "\n\n${GREEN}2. Testing User Login:${NC}"
curl -X POST "${API_URL}/users/signin" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123"
  }'

# Save the token from the login response for subsequent requests
# TOKEN="your_token_here"

echo -e "\n\n${GREEN}3. Testing Lawyer Registration:${NC}"
curl -X POST "${API_URL}/lawyers/signup" \
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

echo -e "\n\n${GREEN}4. Testing Lawyer Login:${NC}"
curl -X POST "${API_URL}/lawyers/signin" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "lawyer@example.com",
    "password": "Password123"
  }'

echo -e "\n\n${GREEN}5. Testing User Signout:${NC}"
curl -X POST "${API_URL}/users/signout" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id_from_login_response"
  }'

echo -e "\n\n${GREEN}6. Testing Lawyer Signout:${NC}"
curl -X POST "${API_URL}/lawyers/signout" \
  -H "Content-Type: application/json" \
  -d '{
    "lawyerId": "lawyer_id_from_login_response"
  }'

echo -e "\n\n${GREEN}7. Testing Token Refresh:${NC}"
curl -X POST "${API_URL}/refresh-token" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "refresh_token_from_login",
    "userType": "user"
  }'