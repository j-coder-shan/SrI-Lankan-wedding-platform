# Analytics Service - Testing Guide

## Service Information
- **Port**: 8087
- **Base URL**: `http://localhost:8087/api/analytics`
- **Database**: PostgreSQL (wedding_analytics on port 5432)
- **Dependencies**: Kafka (for event consumption), PostgreSQL

## Prerequisites

### 1. Create PostgreSQL Database
The database has been created. If you need to recreate it:
```bash
docker exec -it postgres-container psql -U postgres -c "CREATE DATABASE wedding_analytics;"
```

### 2. Start the Service
Run the Analytics Service from your IDE or using:
```bash
cd analytics-service
# Use Run Configuration in your IDE to start AnalyticsServiceApplication.java
```

### 3. Verify Service Status
The service should start on port 8087. Check the console for:
```
Tomcat initialized with port(s): 8087 (http)
```

## API Endpoints

### 1. GET /api/analytics/vendor/performance
Get performance analytics for the authenticated vendor.

**Headers:**
- `X-Auth-User-Id: 1` (Vendor's user ID)

**Query Parameters:**
- `period` (optional): `LAST_7_DAYS`, `LAST_30_DAYS`, `LAST_90_DAYS`, `ALL_TIME`
  - Default: `ALL_TIME`

**Request Example:**
```bash
curl -X GET "http://localhost:8087/api/analytics/vendor/performance?period=LAST_7_DAYS" \
  -H "X-Auth-User-Id: 1"
```

**Response Example:**
```json
{
  "vendorId": 1,
  "period": "LAST_7_DAYS",
  "totalBookings": 15,
  "paidInvoices": 12,
  "unpaidInvoices": 3,
  "totalRevenue": 45000.00,
  "averageInvoiceValue": 3750.00,
  "conversionRate": 80.0
}
```

**Response Fields:**
- `vendorId`: ID of the vendor
- `period`: The time period analyzed
- `totalBookings`: Total number of bookings
- `paidInvoices`: Number of paid invoices
- `unpaidInvoices`: Number of unpaid invoices
- `totalRevenue`: Total revenue from paid invoices
- `averageInvoiceValue`: Average value per invoice
- `conversionRate`: Percentage of paid vs total invoices

---

### 2. GET /api/analytics/admin/revenue
Get platform-wide revenue report (admin only).

**Headers:**
- `X-Auth-User-Id: 999` (Admin user ID)

**Query Parameters:**
- `period` (optional): `LAST_7_DAYS`, `LAST_30_DAYS`, `LAST_90_DAYS`, `ALL_TIME`
  - Default: `ALL_TIME`

**Request Example:**
```bash
curl -X GET "http://localhost:8087/api/analytics/admin/revenue?period=LAST_30_DAYS" \
  -H "X-Auth-User-Id: 999"
```

**Response Example:**
```json
{
  "period": "LAST_30_DAYS",
  "totalRevenue": 250000.00,
  "totalBookings": 85,
  "averageInvoiceValue": 2941.18,
  "topVendors": [
    {
      "vendorId": 1,
      "revenue": 45000.00,
      "bookingCount": 15
    },
    {
      "vendorId": 2,
      "revenue": 38000.00,
      "bookingCount": 12
    }
  ]
}
```

**Response Fields:**
- `period`: The time period analyzed
- `totalRevenue`: Total platform revenue
- `totalBookings`: Total bookings across all vendors
- `averageInvoiceValue`: Average invoice value across platform
- `topVendors`: Array of top performing vendors with their metrics

---

## How Analytics Data is Generated

The Analytics Service consumes Kafka events:

### 1. Booking Events
When an enquiry is created or updated, booking events are published and consumed.

### 2. Invoice Events
When an invoice is paid via Financial Service, `invoice-paid` events are published:
```json
{
  "invoiceId": 1,
  "vendorId": 1,
  "amount": 3500.00,
  "paidAt": "2024-01-15T10:30:00"
}
```

### 3. Data Storage
Events are processed and stored in PostgreSQL tables:
- `booking_analytics`: Stores booking metrics
- `revenue_analytics`: Stores revenue and invoice metrics

---

## Testing with Postman

### Import Collection
1. Import `Analytics-Service-Postman-Collection.json`
2. Collection includes 2 requests:
   - Get Vendor Performance
   - Get Admin Revenue Report

### Test Scenario 1: Vendor Analytics
1. Set `X-Auth-User-Id: 1` (vendor user)
2. Call GET `/vendor/performance?period=LAST_7_DAYS`
3. Verify response contains vendor metrics

### Test Scenario 2: Admin Analytics
1. Set `X-Auth-User-Id: 999` (admin user)
2. Call GET `/admin/revenue?period=LAST_30_DAYS`
3. Verify response contains platform-wide metrics

---

## Seeding Test Data

To generate analytics data for testing:

### 1. Create Enquiries (via Enquiry Service - Port 8084)
```bash
curl -X POST http://localhost:8084/api/enquiries \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 101" \
  -d '{
    "vendorId": 1,
    "eventDate": "2024-02-15",
    "message": "Looking for wedding venue"
  }'
```

### 2. Create and Pay Invoices (via Financial Service - Port 8083)
```bash
# Create invoice
curl -X POST http://localhost:8083/api/invoices \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 1" \
  -d '{
    "coupleId": 101,
    "category": "VENUE",
    "description": "Wedding venue booking",
    "amount": 5000.00,
    "dueDate": "2024-02-01"
  }'

# Pay invoice
curl -X POST http://localhost:8083/api/invoices/1/pay \
  -H "Content-Type: application/json" \
  -d '{
    "paymentMethod": "CARD",
    "transactionRef": "TXN123456"
  }'
```

These actions will trigger Kafka events that the Analytics Service consumes.

---

## Common Issues

### Issue 1: Empty Analytics Data
**Cause**: No Kafka events have been consumed yet.
**Solution**: Create bookings and pay invoices to generate data.

### Issue 2: Service Won't Start
**Cause**: Database "wedding_analytics" doesn't exist.
**Solution**: Run the database creation command shown in Prerequisites.

### Issue 3: Kafka Connection Errors
**Cause**: Kafka not running.
**Solution**: Start Kafka via docker-compose:
```bash
docker-compose up -d kafka zookeeper
```

---

## Period Options Explained

- `LAST_7_DAYS`: Data from the last 7 days
- `LAST_30_DAYS`: Data from the last 30 days
- `LAST_90_DAYS`: Data from the last 90 days (quarterly)
- `ALL_TIME`: All available historical data

---

## Database Schema

### booking_analytics Table
```sql
CREATE TABLE booking_analytics (
    id BIGSERIAL PRIMARY KEY,
    vendor_id BIGINT NOT NULL,
    booking_date DATE NOT NULL,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);
```

### revenue_analytics Table
```sql
CREATE TABLE revenue_analytics (
    id BIGSERIAL PRIMARY KEY,
    vendor_id BIGINT NOT NULL,
    invoice_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    paid_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

Note: Tables are auto-created by Hibernate when the service starts (spring.jpa.hibernate.ddl-auto=update).

---

## Summary

✅ **Database Created**: wedding_analytics in PostgreSQL
✅ **Port**: 8087
✅ **Endpoints**: 2 GET endpoints for vendor and admin analytics
✅ **Postman Collection**: Analytics-Service-Postman-Collection.json created
✅ **Dependencies**: Requires Kafka events from Enquiry and Financial services

**To test fully**:
1. Start the service from your IDE
2. Create bookings via Enquiry Service
3. Create and pay invoices via Financial Service
4. Query analytics endpoints to see aggregated data
