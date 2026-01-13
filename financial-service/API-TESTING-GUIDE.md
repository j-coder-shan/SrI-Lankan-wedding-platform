# Financial Service API Testing Guide

## Postman Collection

Import the `Financial-Service-Postman-Collection.json` file into Postman to test all endpoints.

## Available Endpoints

### 1. Create Invoice
**POST** `http://localhost:8083/api/financial/invoices`

Creates a new commission invoice when a booking is confirmed.

**Request Body:**
```json
{
  "enquiryId": 1001,
  "vendorId": 5,
  "listingId": 200,
  "category": "VENUE",
  "finalPrice": 150000.00
}
```

**Valid Categories:**
- `VENUE`
- `PHOTOGRAPHY`
- `CATERING`
- `DECORATION`
- `MUSIC`
- `TRANSPORTATION`

---

### 2. Get Vendor Invoices (All)
**GET** `http://localhost:8083/api/financial/invoices/vendor/me`

Retrieves all invoices for a specific vendor.

**Headers:**
- `X-Auth-User-Id: 5` (Vendor ID)

---

### 3. Get Vendor Invoices (By Status)
**GET** `http://localhost:8083/api/financial/invoices/vendor/me?status=DUE`

Retrieves vendor invoices filtered by status.

**Headers:**
- `X-Auth-User-Id: 5` (Vendor ID)

**Query Parameters:**
- `status`: `DUE` | `PAID` | `VOIDED` | `REFUNDED`

---

### 4. Pay Invoice
**POST** `http://localhost:8083/api/financial/invoices/{invoiceId}/pay`

Process payment for an invoice.

**Path Parameters:**
- `invoiceId`: ID of the invoice to pay

**Request Body:**
```json
{
  "method": "BANK_TRANSFER",
  "referenceNo": "TXN123456789"
}
```

**Valid Payment Methods:**
- `CREDIT_CARD`
- `DEBIT_CARD`
- `BANK_TRANSFER`
- `CASH`
- `ONLINE_PAYMENT`

---

### 5. Void Invoice
**PATCH** `http://localhost:8083/api/financial/invoices/void?enquiryId=1001`

Void or refund an invoice (used when a booking is cancelled).

**Query Parameters:**
- `enquiryId`: Enquiry ID associated with the invoice

---

## Testing Workflow

### Step 1: Create Test Invoices
Use the "Create Invoice" endpoints to create multiple invoices:

1. **Venue Invoice**
```json
{
  "enquiryId": 1001,
  "vendorId": 5,
  "listingId": 200,
  "category": "VENUE",
  "finalPrice": 150000.00
}
```

2. **Photography Invoice**
```json
{
  "enquiryId": 1002,
  "vendorId": 12,
  "listingId": 305,
  "category": "PHOTOGRAPHY",
  "finalPrice": 75000.00
}
```

3. **Catering Invoice**
```json
{
  "enquiryId": 1003,
  "vendorId": 8,
  "listingId": 410,
  "category": "CATERING",
  "finalPrice": 250000.00
}
```

### Step 2: Retrieve Invoices
Get all invoices for vendor ID 5:
- Use "Get Vendor Invoices (All)" endpoint
- Set header: `X-Auth-User-Id: 5`

### Step 3: Filter by Status
Get only DUE invoices:
- Use "Get Vendor Invoices (By Status)" endpoint
- Set header: `X-Auth-User-Id: 5`
- Set query param: `status=DUE`

### Step 4: Process Payment
Pay invoice #1:
- Use "Pay Invoice" endpoint
- Replace `{invoiceId}` with actual invoice ID from Step 1 response
```json
{
  "method": "BANK_TRANSFER",
  "referenceNo": "TXN123456789"
}
```

### Step 5: Verify Payment
Retrieve invoices again and confirm status changed to `PAID`

### Step 6: Void an Invoice
Cancel a booking and void its invoice:
- Use "Void Invoice" endpoint
- Set query param: `enquiryId=1002`

---

## Commission Rates by Category

The system automatically calculates commission based on category:

- **VENUE**: 10%
- **PHOTOGRAPHY**: 12%
- **CATERING**: 8%
- **DECORATION**: 15%
- **MUSIC**: 12%
- **TRANSPORTATION**: 10%

**Example Calculation:**
- Booking Value: Rs. 150,000
- Category: VENUE (10%)
- Commission Due: Rs. 15,000

---

## Database Verification

After testing the endpoints, you can verify the data directly in MySQL:

### Check Invoices
```sql
USE financial_db;
SELECT * FROM commission_invoices;
```

### Check Transaction History
```sql
SELECT * FROM transaction_history;
```

### View Invoice with Transaction Details
```sql
SELECT 
    i.id AS invoice_id,
    i.enquiry_id,
    i.vendor_id,
    i.category,
    i.booking_value,
    i.commission_rate,
    i.amount_due,
    i.status,
    t.method AS payment_method,
    t.reference_no,
    t.timestamp AS payment_time
FROM commission_invoices i
LEFT JOIN transaction_history t ON i.id = t.invoice_id
ORDER BY i.created_at DESC;
```

---

## Expected Responses

### Successful Invoice Creation (200 OK)
```json
{
  "id": 1,
  "enquiryId": 1001,
  "vendorId": 5,
  "listingId": 200,
  "category": "VENUE",
  "bookingValue": 150000.00,
  "commissionRate": 0.1000,
  "amountDue": 15000.00,
  "status": "DUE",
  "dueDate": "2025-12-22",
  "createdAt": "2025-12-15T20:35:00",
  "updatedAt": "2025-12-15T20:35:00"
}
```

### Successful Payment (200 OK)
```json
{
  "id": 1,
  "enquiryId": 1001,
  "vendorId": 5,
  "listingId": 200,
  "category": "VENUE",
  "bookingValue": 150000.00,
  "commissionRate": 0.1000,
  "amountDue": 15000.00,
  "status": "PAID",
  "dueDate": "2025-12-22",
  "createdAt": "2025-12-15T20:35:00",
  "updatedAt": "2025-12-15T20:40:00"
}
```

---

## Error Scenarios to Test

### 1. Duplicate Invoice Creation
Try creating an invoice with the same `enquiryId`:
- Should return existing invoice
- Console should log: "Invoice already exists for Enquiry ID: {id}"

### 2. Missing Vendor ID Header
Get invoices without `X-Auth-User-Id` header:
- Should return error: "User ID header missing"

### 3. Pay Already Paid Invoice
Try paying an invoice that's already paid:
- Should return error: "Invoice {id} is already PAID"

### 4. Void Non-existent Invoice
Try voiding with invalid `enquiryId`:
- Should return error: "No invoice found for Enquiry: {id}"

---

## Notes

- **Port**: Default is 8083 (change in application.properties if needed)
- **Database**: MySQL at `localhost:3307`
- **Database Name**: `financial_db`
- **Eureka**: Service registers with Eureka at `http://localhost:8761`

**Important**: Ensure MySQL is running before starting the Financial Service.
