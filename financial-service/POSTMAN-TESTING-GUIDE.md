# Financial Service - Postman Testing Guide

## Base URL
```
http://localhost:8083/api/financial
```

---

## 📋 Available Endpoints

### 1. **Create Invoice** (POST)
### 2. **Get Vendor Invoices** (GET)
### 3. **Pay Invoice** (POST)
### 4. **Void Invoice** (PATCH)

---

## 🧪 Test Cases

### Test 1: Create a Commission Invoice

**Endpoint**: `POST http://localhost:8083/api/financial/invoices`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "enquiryId": 1001,
  "vendorId": 501,
  "listingId": 301,
  "category": "VENUE",
  "finalPrice": 50000.00
}
```

**Expected Response** (200 OK):
```json
{
  "id": 1,
  "enquiryId": 1001,
  "vendorId": 501,
  "listingId": 301,
  "category": "VENUE",
  "bookingValue": 50000.00,
  "commissionRate": 0.1000,
  "amountDue": 5000.00,
  "status": "DUE",
  "dueDate": "2025-12-21",
  "createdAt": "2025-12-14T00:15:00",
  "updatedAt": "2025-12-14T00:15:00"
}
```

**Notes**: 
- Commission rate for VENUE is 10% (0.1000)
- Amount due = 50000 × 0.10 = 5000.00

---

### Test 2: Create Invoice for Photography

**Endpoint**: `POST http://localhost:8083/api/financial/invoices`

**Request Body**:
```json
{
  "enquiryId": 1002,
  "vendorId": 502,
  "listingId": 302,
  "category": "PHOTOGRAPHY",
  "finalPrice": 25000.00
}
```

**Expected Response** (200 OK):
```json
{
  "id": 2,
  "enquiryId": 1002,
  "vendorId": 502,
  "listingId": 302,
  "category": "PHOTOGRAPHY",
  "bookingValue": 25000.00,
  "commissionRate": 0.1200,
  "amountDue": 3000.00,
  "status": "DUE",
  "dueDate": "2025-12-21",
  "createdAt": "2025-12-14T00:15:00",
  "updatedAt": "2025-12-14T00:15:00"
}
```

**Notes**: 
- Commission rate for PHOTOGRAPHY is 12% (0.1200)
- Amount due = 25000 × 0.12 = 3000.00

---

### Test 3: Get All Invoices for a Vendor

**Endpoint**: `GET http://localhost:8083/api/financial/invoices/vendor/me`

**Headers**:
```
X-Auth-User-Id: 501
```

**Expected Response** (200 OK):
```json
[
  {
    "id": 1,
    "enquiryId": 1001,
    "vendorId": 501,
    "listingId": 301,
    "category": "VENUE",
    "bookingValue": 50000.00,
    "commissionRate": 0.1000,
    "amountDue": 5000.00,
    "status": "DUE",
    "dueDate": "2025-12-21",
    "createdAt": "2025-12-14T00:15:00",
    "updatedAt": "2025-12-14T00:15:00"
  }
]
```

---

### Test 4: Get Invoices by Status

**Endpoint**: `GET http://localhost:8083/api/financial/invoices/vendor/me?status=DUE`

**Headers**:
```
X-Auth-User-Id: 501
```

**Query Parameters**:
- `status`: `DUE` | `PAID` | `OVERDUE` | `VOIDED` | `REFUNDED`

**Expected Response** (200 OK):
Returns only invoices with the specified status.

---

### Test 5: Pay an Invoice

**Endpoint**: `POST http://localhost:8083/api/financial/invoices/1/pay`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "method": "CARD",
  "referenceNo": "VISA-1234567890"
}
```

**Expected Response** (200 OK):
```json
{
  "id": 1,
  "enquiryId": 1001,
  "vendorId": 501,
  "listingId": 301,
  "category": "VENUE",
  "bookingValue": 50000.00,
  "commissionRate": 0.1000,
  "amountDue": 5000.00,
  "status": "PAID",
  "dueDate": "2025-12-21",
  "createdAt": "2025-12-14T00:15:00",
  "updatedAt": "2025-12-14T00:15:30"
}
```

**Payment Methods**:
- `CARD`
- `BANK_TRANSFER`
- `ONLINE_GATEWAY`

---

### Test 6: Void an Invoice (Cancellation)

**Endpoint**: `PATCH http://localhost:8083/api/financial/invoices/void?enquiryId=1001`

**Query Parameters**:
- `enquiryId`: The enquiry ID to void

**Expected Response** (200 OK):
Empty response with status 200

**Note**: 
- If invoice status is `DUE`, it will be marked as `VOIDED`
- If invoice status is `PAID`, it will be marked as `REFUNDED`

---

## 🧪 Complete Test Workflow

### Step-by-Step Testing:

1. **Create Invoice #1**:
   ```
   POST /api/financial/invoices
   Body: {enquiryId: 1001, vendorId: 501, category: "VENUE", finalPrice: 50000}
   Expected: Invoice created with status "DUE"
   ```

2. **Create Invoice #2**:
   ```
   POST /api/financial/invoices
   Body: {enquiryId: 1002, vendorId: 502, category: "PHOTOGRAPHY", finalPrice: 25000}
   Expected: Invoice created with status "DUE"
   ```

3. **Get All Invoices for Vendor 501**:
   ```
   GET /api/financial/invoices/vendor/me
   Header: X-Auth-User-Id: 501
   Expected: Array with 1 invoice (enquiryId: 1001)
   ```

4. **Pay Invoice #1**:
   ```
   POST /api/financial/invoices/1/pay
   Body: {method: "CARD", referenceNo: "VISA-123"}
   Expected: Invoice status changed to "PAID"
   ```

5. **Verify Payment**:
   ```
   GET /api/financial/invoices/vendor/me?status=PAID
   Header: X-Auth-User-Id: 501
   Expected: Array with 1 paid invoice
   ```

6. **Void Invoice #2**:
   ```
   PATCH /api/financial/invoices/void?enquiryId=1002
   Expected: 200 OK (invoice marked as VOIDED)
   ```

---

## ✅ Verification Checklist

After running tests, verify in **phpMyAdmin**:

### Check `commission_invoices` table:
```sql
SELECT * FROM financial_db.commission_invoices;
```

You should see:
- Invoice records with correct commission rates
- Status changes (DUE → PAID, DUE → VOIDED)
- Timestamps (createdAt, updatedAt)

### Check `transaction_history` table:
```sql
SELECT * FROM financial_db.transaction_history;
```

You should see:
- Transaction record for paid invoices
- Payment method (CARD, BANK_TRANSFER, etc.)
- Reference numbers
- Correct amounts

---

## 🚨 Common Errors

### Error 1: Missing Header
```json
{
  "timestamp": "2025-12-14T00:15:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "User ID header missing"
}
```
**Fix**: Add `X-Auth-User-Id` header to GET requests

### Error 2: Duplicate Invoice
```json
{
  "timestamp": "2025-12-14T00:15:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Invoice already exists for Enquiry ID: 1001"
}
```
**Fix**: Use a different `enquiryId` (invoices are unique per enquiry)

### Error 3: Invalid Category
```json
{
  "timestamp": "2025-12-14T00:15:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Cannot deserialize value of type..."
}
```
**Fix**: Use valid categories: `VENUE`, `PHOTOGRAPHY`, `SALON`, `DRESS`, `DECOR`

---

## 📊 Expected Commission Rates

| Category | Rate | Example Calculation |
|----------|------|---------------------|
| VENUE | 10% (0.1000) | ₹50,000 × 0.10 = ₹5,000 |
| PHOTOGRAPHY | 12% (0.1200) | ₹25,000 × 0.12 = ₹3,000 |
| SALON | 8% (0.0800) | ₹15,000 × 0.08 = ₹1,200 |
| DRESS | 8% (0.0800) | ₹30,000 × 0.08 = ₹2,400 |
| DECOR | 8% (0.0800) | ₹20,000 × 0.08 = ₹1,600 |

---

## 🎯 Quick Health Check

**Simple test to verify service is running**:

```
GET http://localhost:8083/api/financial/invoices/vendor/me
Header: X-Auth-User-Id: 999
```

**Expected**: 
- Status: `200 OK`
- Body: `[]` (empty array - no invoices for vendor 999)

If you get this response, your service is **working correctly**! ✅

---

**Happy Testing!** 🚀
