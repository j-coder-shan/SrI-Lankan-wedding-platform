# Calendar Service - Complete Testing Guide

## Overview
This guide provides step-by-step instructions for testing the Calendar Service using the included Postman collection.

---

## Postman Collection
**File:** `Calendar-Service-Postman-Collection.json`

Import this file into Postman to access all pre-configured test requests.

---

## Service Configuration
- **Port:** 8082
- **Base URL:** `http://localhost:8082`
- **Database:** MySQL (database: `calender`)
- **API Prefix:** `/api/calendar`

---

## Testing Workflow

### **Phase 1: Initial Availability Checks**
Test that availability checking works correctly for new dates.

#### Test 1.1: Check Morning Slot
**Request:** `GET /api/calendar/check?vendorId=201&date=2025-12-25&slot=MORNING`

**Expected Response:**
```json
true
```

#### Test 1.2: Check Evening Slot
**Request:** `GET /api/calendar/check?vendorId=201&date=2025-12-25&slot=EVENING`

**Expected Response:**
```json
true
```

#### Test 1.3: Check Full Day
**Request:** `GET /api/calendar/check?vendorId=201&date=2025-12-26&slot=FULL_DAY`

**Expected Response:**
```json
true
```

---

### **Phase 2: Register Bookings**
Test booking registration functionality.

#### Test 2.1: Register Morning Booking
**Request:** `POST /api/calendar/register-booking`

**Body:**
```json
{
  "vendorId": 201,
  "enquiryId": 1001,
  "date": "2025-12-25",
  "timeSlot": "MORNING"
}
```

**Expected Response:** `200 OK`
```json
{
  "id": 1,
  "vendorId": 201,
  "enquiryId": 1001,
  "date": "2025-12-25",
  "timeSlot": "MORNING",
  "type": "BOOKING"
}
```

#### Test 2.2: Register Evening Booking (Different Vendor)
**Request:** `POST /api/calendar/register-booking`

**Body:**
```json
{
  "vendorId": 202,
  "enquiryId": 1002,
  "date": "2025-12-25",
  "timeSlot": "EVENING"
}
```

**Expected Response:** `200 OK` with event details

#### Test 2.3: Register Full Day Booking
**Request:** `POST /api/calendar/register-booking`

**Body:**
```json
{
  "vendorId": 203,
  "enquiryId": 1003,
  "date": "2025-12-28",
  "timeSlot": "FULL_DAY"
}
```

**Expected Response:** `200 OK` with event details

#### Test 2.4: Attempt Double Booking (Should Fail)
**Request:** `POST /api/calendar/register-booking`

**Body:**
```json
{
  "vendorId": 201,
  "enquiryId": 1004,
  "date": "2025-12-25",
  "timeSlot": "MORNING"
}
```

**Expected Response:** `409 Conflict` or `500 Internal Server Error`
```json
{
  "error": "Date already booked for this slot"
}
```

---

### **Phase 3: Block Dates**
Test vendor date blocking functionality.

#### Test 3.1: Block Full Day (Holiday)
**Request:** `POST /api/calendar/block`

**Body:**
```json
{
  "vendorId": 201,
  "date": "2025-12-31",
  "timeSlot": "FULL_DAY"
}
```

**Expected Response:** `200 OK`
```json
{
  "id": 4,
  "vendorId": 201,
  "enquiryId": null,
  "date": "2025-12-31",
  "timeSlot": "FULL_DAY",
  "type": "BLOCK"
}
```

#### Test 3.2: Block Morning Slot Only
**Request:** `POST /api/calendar/block`

**Body:**
```json
{
  "vendorId": 201,
  "date": "2025-12-30",
  "timeSlot": "MORNING"
}
```

**Expected Response:** `200 OK` with block event

#### Test 3.3: Block Evening Slot
**Request:** `POST /api/calendar/block`

**Body:**
```json
{
  "vendorId": 202,
  "date": "2025-12-30",
  "timeSlot": "EVENING"
}
```

**Expected Response:** `200 OK` with block event

---

### **Phase 4: Conflict Tests**
Verify that booking/blocking logic prevents conflicts correctly.

#### Test 4.1: Check Morning After Booking
**Request:** `GET /api/calendar/check?vendorId=201&date=2025-12-25&slot=MORNING`

**Expected Response:**
```json
false
```
✅ Morning slot was booked in Test 2.1

#### Test 4.2: Check Evening After Morning Booking
**Request:** `GET /api/calendar/check?vendorId=201&date=2025-12-25&slot=EVENING`

**Expected Response:**
```json
true
```
✅ Evening is still available (only morning was booked)

#### Test 4.3: Check Full Day After Partial Booking
**Request:** `GET /api/calendar/check?vendorId=201&date=2025-12-25&slot=FULL_DAY`

**Expected Response:**
```json
false
```
✅ FULL_DAY requires all slots to be free

#### Test 4.4: Check Morning When Full Day Blocked
**Request:** `GET /api/calendar/check?vendorId=201&date=2025-12-31&slot=MORNING`

**Expected Response:**
```json
false
```
✅ FULL_DAY block prevents all individual slots

#### Test 4.5: Check Evening When Full Day Blocked
**Request:** `GET /api/calendar/check?vendorId=201&date=2025-12-31&slot=EVENING`

**Expected Response:**
```json
false
```
✅ FULL_DAY block prevents all individual slots

---

### **Phase 5: Multi-Vendor Tests**
Verify that different vendors can book the same date/slot.

#### Test 5.1: Book Same Date - Different Vendor
**Request:** `POST /api/calendar/register-booking`

**Body:**
```json
{
  "vendorId": 204,
  "enquiryId": 1005,
  "date": "2025-12-25",
  "timeSlot": "MORNING"
}
```

**Expected Response:** `200 OK` with event details
✅ Different vendor can book same date/slot

#### Test 5.2: Check Vendor 204 Availability
**Request:** `GET /api/calendar/check?vendorId=204&date=2025-12-25&slot=MORNING`

**Expected Response:**
```json
false
```
✅ Vendor 204's morning slot is now booked

---

### **Phase 6: Health Check**
Verify service is running properly.

#### Test 6.1: Service Health
**Request:** `GET /actuator/health`

**Expected Response:** `200 OK`
```json
{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP",
      "details": {
        "database": "MySQL",
        "validationQuery": "isValid()"
      }
    }
  }
}
```

---

## Database Verification

After running all tests, verify data in MySQL:

```sql
-- Connect to MySQL
mysql -h localhost -P 3307 -u root -p

-- Use calendar database
USE calender;

-- View all events
SELECT * FROM vendor_events ORDER BY date, vendor_id;

-- Expected results (after all tests):
-- +----+-----------+------------+------------+----------+---------+
-- | id | vendor_id | enquiry_id | date       | time_slot| type    |
-- +----+-----------+------------+------------+----------+---------+
-- | 1  | 201       | 1001       | 2025-12-25 | MORNING  | BOOKING |
-- | 2  | 202       | 1002       | 2025-12-25 | EVENING  | BOOKING |
-- | 3  | 203       | 1003       | 2025-12-28 | FULL_DAY | BOOKING |
-- | 4  | 201       | NULL       | 2025-12-31 | FULL_DAY | BLOCK   |
-- | 5  | 201       | NULL       | 2025-12-30 | MORNING  | BLOCK   |
-- | 6  | 202       | NULL       | 2025-12-30 | EVENING  | BLOCK   |
-- | 7  | 204       | 1005       | 2025-12-25 | MORNING  | BOOKING |
-- +----+-----------+------------+------------+----------+---------+

-- View bookings for a specific vendor
SELECT * FROM vendor_events WHERE vendor_id = 201;

-- View all bookings (exclude blocks)
SELECT * FROM vendor_events WHERE type = 'BOOKING';

-- View all blocks (holidays)
SELECT * FROM vendor_events WHERE type = 'BLOCK';

-- Check for conflicts on a specific date
SELECT * FROM vendor_events 
WHERE vendor_id = 201 AND date = '2025-12-25';
```

---

## Expected Test Results Summary

| Test Phase | Test Cases | Expected Passes |
|------------|------------|-----------------|
| Phase 1: Availability Checks | 3 | 3 |
| Phase 2: Register Bookings | 4 | 4 |
| Phase 3: Block Dates | 3 | 3 |
| Phase 4: Conflict Tests | 5 | 5 |
| Phase 5: Multi-Vendor Tests | 2 | 2 |
| Phase 6: Health Check | 1 | 1 |
| **Total** | **18** | **18** |

---

## Time Slot Rules

### **MORNING**
- Time: 9:00 AM - 1:00 PM
- Can be booked independently

### **EVENING**
- Time: 2:00 PM - 6:00 PM
- Can be booked independently

### **FULL_DAY**
- Covers both MORNING and EVENING
- Can only be booked if date has NO events
- Blocks both individual slots

---

## Booking Logic

### **Availability Rules:**
1. **FULL_DAY request** → Fails if ANY event exists on that date
2. **FULL_DAY exists** → Blocks all individual slots (MORNING & EVENING)
3. **MORNING booked** → MORNING unavailable, EVENING available
4. **EVENING booked** → EVENING unavailable, MORNING available
5. **Different vendors** → Can book same date/slot independently

### **Unique Constraint:**
Database enforces: `(vendorId, date, timeSlot)` must be unique

This prevents double-booking at the database level.

---

## Common Error Scenarios

| Error | Cause | HTTP Code |
|-------|-------|-----------|
| Date already booked | Attempting to book same vendorId+date+slot | 500 or 409 |
| Invalid date format | Date not in YYYY-MM-DD format | 400 |
| Invalid time slot | TimeSlot not MORNING/EVENING/FULL_DAY | 400 |
| Database connection error | MySQL not running | 500 |

---

## Troubleshooting

### Service not responding
```bash
# Check if service is running
netstat -ano | findstr :8082

# If not running, check Docker MySQL
docker ps | findstr mysql

# Start MySQL if stopped
docker-compose up -d mysql-db
```

### Database connection errors
```bash
# Verify MySQL credentials
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.url=jdbc:mysql://localhost:3307/calender
```

### Port conflict
```bash
# Check what's using port 8082
netstat -ano | findstr :8082

# Change port in application.properties
server.port=8082
```

---

## Next Steps After Testing

1. **Integrate with Enquiry Service**
   - Enquiry Service should call `/register-booking` after payment

2. **Add Vendor Dashboard**
   - Frontend should call `/check` before showing availability
   - Vendor can call `/block` to mark holidays

3. **Add Query Endpoints** (Optional)
   - GET `/api/calendar/events/{vendorId}` - Get all events for vendor
   - GET `/api/calendar/month/{vendorId}/{year}/{month}` - Get monthly calendar

---

## Summary

This testing suite covers:
✅ Basic availability checking  
✅ Booking registration  
✅ Manual date blocking  
✅ Conflict prevention  
✅ Multi-vendor scenarios  
✅ Database integrity  
✅ Service health monitoring

All 18 test cases should pass if the Calendar Service is configured correctly.
