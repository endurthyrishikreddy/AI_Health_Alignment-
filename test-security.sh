#!/bin/bash

# SECURITY TESTING SCRIPT FOR CONTACT API
# Run: bash ./test-security.sh

API_URL="${1:-http://localhost:3000/api}"
ADMIN_TOKEN="${2:-your-secret-admin-token}"

# Remove trailing slash from API_URL if present
API_URL="${API_URL%/}"
echo "CONTACT API SECURITY TESTING SUITE"
echo "========================================"
echo "API URL: $API_URL"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_RUN=0
TESTS_PASSED=0
TESTS_FAILED=0

# Helper function to run tests
run_test() {
  local test_name=$1
  local http_method=$2
  local endpoint=$3
  local data=$4
  local expected_status=$5
  local auth_token=$6

  TESTS_RUN=$((TESTS_RUN + 1))
  echo -n "[$TESTS_RUN] Testing: $test_name ... "

  if [ "$http_method" == "POST" ]; then
    response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL$endpoint" \
      -H "Content-Type: application/json" \
      -d "$data" 2>/dev/null)
  else
    if [ -z "$auth_token" ]; then
      response=$(curl -s -w "\n%{http_code}" -X GET "$API_URL$endpoint" 2>/dev/null)
    else
      response=$(curl -s -w "\n%{http_code}" -X GET "$API_URL$endpoint" \
        -H "Authorization: Bearer $auth_token" 2>/dev/null)
    fi
  fi

  http_code=$(echo "$response" | tail -n1)

  if [ "$http_code" == "$expected_status" ]; then
    echo -e "${GREEN}PASSED${NC} (HTTP $http_code)"
    TESTS_PASSED=$((TESTS_PASSED + 1))
  else
    echo -e "${RED}FAILED${NC} (Expected $expected_status, got $http_code)"
    TESTS_FAILED=$((TESTS_FAILED + 1))
  fi
}

# ============================================
# 1. VALID REQUEST TEST
# ============================================
echo ""
echo "=== VALID REQUEST TESTS ==="
run_test "Valid submission" "POST" "/contact" \
  '{"name":"John Doe","email":"john@example.com","organization":"Test Org","role":"Clinician","message":"Test message"}' \
  "201"

# ============================================
# 2. XSS PREVENTION TESTS
# ============================================
echo ""
echo "=== XSS PREVENTION TESTS ==="
run_test "XSS - Script tag in name" "POST" "/contact" \
  '{"name":"<script>alert(\"XSS\")</script>","email":"test@example.com","organization":"Test","role":"Clinician","message":"Test"}' \
  "201"

run_test "XSS - Event handler in organization" "POST" "/contact" \
  '{"name":"John Doe","email":"test@example.com","organization":"<img src=x onerror=\"alert(XSS)\">","role":"Clinician","message":"Test"}' \
  "201"

run_test "XSS - JavaScript URL in message" "POST" "/contact" \
  '{"name":"John Doe","email":"test@example.com","organization":"Test","role":"Clinician","message":"<a href=\"javascript:alert(XSS)\">Click</a>"}' \
  "201"

# ============================================
# 3. INPUT VALIDATION TESTS
# ============================================
echo ""
echo "=== INPUT VALIDATION TESTS ==="
run_test "Missing name field" "POST" "/contact" \
  '{"email":"test@example.com","organization":"Test","role":"Clinician","message":"Test"}' \
  "400"

run_test "Missing email field" "POST" "/contact" \
  '{"name":"John Doe","organization":"Test","role":"Clinician","message":"Test"}' \
  "400"

run_test "Invalid email format (no @)" "POST" "/contact" \
  '{"name":"John Doe","email":"testexample.com","organization":"Test","role":"Clinician","message":"Test"}' \
  "400"

run_test "Invalid email format (no domain)" "POST" "/contact" \
  '{"name":"John Doe","email":"test@","organization":"Test","role":"Clinician","message":"Test"}' \
  "400"

run_test "Name too short (1 char)" "POST" "/contact" \
  '{"name":"J","email":"test@example.com","organization":"Test","role":"Clinician","message":"Test"}' \
  "400"

# ============================================
# 4. METHOD NOT ALLOWED TESTS
# ============================================
echo ""
echo "=== METHOD NOT ALLOWED TESTS ==="
run_test "GET request to /contact (should be POST)" "GET" "/contact" \
  "" \
  "405"

run_test "POST request to /contacts (GET-only endpoint)" "POST" "/contacts" \
  '{}' \
  "405"

# ============================================
# 5. AUTHORIZATION TESTS
# ============================================
echo ""
echo "=== AUTHORIZATION TESTS ==="
run_test "GET contacts without token" "GET" "/contacts" \
  "" \
  "401" \
  ""

run_test "GET contacts with invalid token" "GET" "/contacts" \
  "" \
  "401" \
  "invalid-token-12345"

run_test "GET contacts with valid token" "GET" "/contacts" \
  "" \
  "200" \
  "$ADMIN_TOKEN"

# ============================================
# 6. SECURITY HEADERS TEST
# ============================================
echo ""
echo "=== SECURITY HEADERS TEST ==="
echo "Checking response headers..."

headers=$(curl -s -i -X POST "$API_URL/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"test@example.com","organization":"Test","role":"Clinician","message":"Test"}' 2>/dev/null)

TESTS_RUN=$((TESTS_RUN + 1))
if echo "$headers" | grep -q "X-Content-Type-Options: nosniff"; then
  echo -e "[$TESTS_RUN] X-Content-Type-Options... ${GREEN}PASSED${NC}"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "[$TESTS_RUN] X-Content-Type-Options... ${RED}FAILED${NC}"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi

TESTS_RUN=$((TESTS_RUN + 1))
if echo "$headers" | grep -q "X-Frame-Options: DENY"; then
  echo -e "[$TESTS_RUN] X-Frame-Options... ${GREEN}PASSED${NC}"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "[$TESTS_RUN] X-Frame-Options... ${RED}FAILED${NC}"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi

TESTS_RUN=$((TESTS_RUN + 1))
if echo "$headers" | grep -q "X-XSS-Protection:"; then
  echo -e "[$TESTS_RUN] X-XSS-Protection... ${GREEN}PASSED${NC}"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "[$TESTS_RUN] X-XSS-Protection... ${RED}FAILED${NC}"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# ============================================
# RESULTS SUMMARY
# ============================================
echo ""
echo "========================================"
echo "TEST RESULTS SUMMARY"
echo "========================================"
echo "Total Tests Run:   $TESTS_RUN"
echo -e "Tests Passed:      ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed:      ${RED}$TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ ALL SECURITY TESTS PASSED!${NC}"
  exit 0
else
  echo -e "${RED}✗ SOME TESTS FAILED - REVIEW SECURITY IMPLEMENTATION${NC}"
  exit 1
fi
