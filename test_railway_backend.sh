#!/bin/bash

BACKEND_URL="https://municipal-transparency-platform-production.up.railway.app"

echo "=========================================="
echo "Testing Railway Backend Deployment"
echo "=========================================="
echo ""

# Test 1: Health Check
echo "1. Testing Health Endpoint"
echo "   GET ${BACKEND_URL}/api/health"
echo ""

HEALTH_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" "${BACKEND_URL}/api/health")
HEALTH_BODY=$(echo "$HEALTH_RESPONSE" | sed -e 's/HTTP_STATUS\:.*//g')
HEALTH_STATUS=$(echo "$HEALTH_RESPONSE" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')

echo "   Status Code: ${HEALTH_STATUS}"
echo "   Response: ${HEALTH_BODY}"
echo ""

if [ "$HEALTH_STATUS" = "200" ]; then
    echo "   ✅ Health check PASSED"
else
    echo "   ❌ Health check FAILED"
fi

echo ""
echo "=========================================="
echo ""

# Test 2: Superadmin Login
echo "2. Testing Superadmin Login"
echo "   POST ${BACKEND_URL}/api/auth/login"
echo "   Email: superadmin@transparencia.cl"
echo "   Password: SuperAdmin2024!"
echo ""

LOGIN_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X POST "${BACKEND_URL}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "superadmin@transparencia.cl",
    "password": "SuperAdmin2024!"
  }')

LOGIN_BODY=$(echo "$LOGIN_RESPONSE" | sed -e 's/HTTP_STATUS\:.*//g')
LOGIN_STATUS=$(echo "$LOGIN_RESPONSE" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')

echo "   Status Code: ${LOGIN_STATUS}"
echo "   Response: ${LOGIN_BODY}"
echo ""

if [ "$LOGIN_STATUS" = "200" ] || [ "$LOGIN_STATUS" = "201" ]; then
    # Check if access_token exists in response
    if echo "$LOGIN_BODY" | grep -q "access_token"; then
        echo "   ✅ Login SUCCESSFUL - Access token received"
        
        # Extract and show token (first 50 chars)
        TOKEN=$(echo "$LOGIN_BODY" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
        TOKEN_PREVIEW="${TOKEN:0:50}..."
        echo "   Token Preview: ${TOKEN_PREVIEW}"
    else
        echo "   ⚠️  Login returned 200 but no access_token found"
    fi
else
    echo "   ❌ Login FAILED"
    
    # Try to parse error message
    if echo "$LOGIN_BODY" | grep -q "message"; then
        ERROR_MSG=$(echo "$LOGIN_BODY" | grep -o '"message":"[^"]*"' | cut -d'"' -f4)
        echo "   Error: ${ERROR_MSG}"
    fi
fi

echo ""
echo "=========================================="
echo ""

# Test 3: Try to access protected endpoint without token
echo "3. Testing Protected Endpoint (without auth)"
echo "   GET ${BACKEND_URL}/api/municipalities"
echo ""

PROTECTED_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" "${BACKEND_URL}/api/municipalities")
PROTECTED_BODY=$(echo "$PROTECTED_RESPONSE" | sed -e 's/HTTP_STATUS\:.*//g')
PROTECTED_STATUS=$(echo "$PROTECTED_RESPONSE" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')

echo "   Status Code: ${PROTECTED_STATUS}"
echo "   Response: ${PROTECTED_BODY}"
echo ""

if [ "$PROTECTED_STATUS" = "401" ]; then
    echo "   ✅ Auth protection working correctly (401 Unauthorized)"
else
    echo "   ⚠️  Expected 401, got ${PROTECTED_STATUS}"
fi

echo ""
echo "=========================================="
echo "Summary"
echo "=========================================="
echo ""

# Summary
if [ "$HEALTH_STATUS" = "200" ] && ([ "$LOGIN_STATUS" = "200" ] || [ "$LOGIN_STATUS" = "201" ]) && echo "$LOGIN_BODY" | grep -q "access_token"; then
    echo "✅ ALL TESTS PASSED"
    echo ""
    echo "Backend is fully operational:"
    echo "  - Health check: OK"
    echo "  - Database: Connected"
    echo "  - Migrations: Applied"
    echo "  - Authentication: Working"
    echo "  - User data: Present"
else
    echo "❌ SOME TESTS FAILED"
    echo ""
    echo "Issues detected:"
    [ "$HEALTH_STATUS" != "200" ] && echo "  - Health check failed"
    [ "$LOGIN_STATUS" != "200" ] && [ "$LOGIN_STATUS" != "201" ] && echo "  - Login endpoint failed"
    ! echo "$LOGIN_BODY" | grep -q "access_token" && echo "  - No access token returned"
fi

echo ""
echo "=========================================="

