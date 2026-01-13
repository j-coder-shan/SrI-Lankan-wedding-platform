# Financial Service MySQL Database Setup Guide

## Prerequisites ✅

1. **XAMPP installed** with MySQL running
2. **phpMyAdmin accessible** at `http://localhost/phpmyadmin`
3. **MySQL connector added** to `pom.xml` ✅ (Already done)
4. **Application configuration updated** ✅ (Already done)

---

## Step 1: Start MySQL Server

1. Open **XAMPP Control Panel**
2. Click **Start** button next to **MySQL**
3. Wait for the status to turn green
4. Verify it's running (port 3306)

---

## Step 2: Create Database using phpMyAdmin

### Method A: Using phpMyAdmin Interface (Easiest)

1. Open browser and go to: `http://localhost/phpmyadmin`
2. Click on **"Databases"** tab
3. Enter database name: `financial_db`
4. Select collation: `utf8mb4_general_ci`
5. Click **"Create"** button

### Method B: Using SQL Script (Recommended)

1. Open `http://localhost/phpmyadmin`
2. Click on **"SQL"** tab at the top
3. Copy and paste the content from `database-setup.sql`
4. Click **"Go"** button to execute
5. You should see: "1 row affected" or "Database created successfully"

---

## Step 3: Verify Database Creation

1. In phpMyAdmin, check the left sidebar
2. You should see **`financial_db`** listed
3. Click on it to select the database
4. Currently, it will be empty (no tables yet)

---

## Step 4: Configure Application Password (If Needed)

The `application.properties` is already configured with:
- **Username**: `root`
- **Password**: `` (empty - default for XAMPP)
- **Database**: `financial_db`
- **Port**: `3306`

**If your MySQL has a password:**
1. Open `application.properties`
2. Update line 10: `spring.datasource.password=YOUR_MYSQL_PASSWORD`

---

## Step 5: Start the Financial Service

The application will automatically create tables when it starts!

### Using Maven:
```bash
cd "c:\Users\ANUKA\Desktop\wed plat\SrI-Lankan-wedding-platform\financial-service"
mvnw spring-boot:run
```

### Or using your IDE:
Run `FinancialApplication.java`

---

## Step 6: Verify Tables Were Created

1. Go back to phpMyAdmin
2. Select `financial_db` from the left sidebar
3. You should now see **2 tables**:
   - `commission_invoices`
   - `transaction_history`

4. Click on each table to see the structure

---

## Expected Database Schema

### Table: `commission_invoices`
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key (auto-increment) |
| enquiry_id | BIGINT | Unique booking reference |
| vendor_id | BIGINT | Vendor identifier |
| listing_id | BIGINT | Listing identifier |
| category | VARCHAR(50) | Listing category (ENUM) |
| booking_value | DECIMAL(12,2) | Total booking amount |
| commission_rate | DECIMAL(5,4) | Commission % (e.g., 0.1000 = 10%) |
| amount_due | DECIMAL(12,2) | Commission amount owed |
| status | VARCHAR(20) | Invoice status (DUE, PAID, etc.) |
| due_date | DATE | Payment due date |
| created_at | DATETIME | Creation timestamp |
| updated_at | DATETIME | Last update timestamp |

### Table: `transaction_history`
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key (auto-increment) |
| invoice_id | BIGINT | Foreign key to commission_invoices |
| amount | DECIMAL(12,2) | Payment amount |
| method | VARCHAR(50) | Payment method (CARD, BANK, etc.) |
| reference_no | VARCHAR(255) | Transaction reference |
| timestamp | DATETIME | Transaction timestamp |

---

## Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"
**Solution**: Update the password in `application.properties`

### Error: "Unknown database 'financial_db'"
**Solution**: Run the database creation script in phpMyAdmin

### Error: "Communications link failure"
**Solution**: Make sure MySQL is running in XAMPP Control Panel

### Error: "Table already exists"
**Solution**: This is fine! The application is trying to create tables that already exist

### Tables not appearing in phpMyAdmin
**Solution**: 
1. Make sure the application started successfully
2. Check the console logs for any Hibernate errors
3. Refresh phpMyAdmin (F5)

---

## Testing the Database Connection

### View Data in phpMyAdmin
1. Select `financial_db` database
2. Click on `commission_invoices` table
3. Click **"Browse"** tab to see data
4. Initially it will be empty

### Insert Sample Data (Optional)
Click on `financial_db` → SQL tab and run:

```sql
INSERT INTO commission_invoices 
(enquiry_id, vendor_id, listing_id, category, booking_value, commission_rate, amount_due, status, due_date, created_at, updated_at)
VALUES
(1001, 501, 301, 'VENUES', 50000.00, 0.1000, 5000.00, 'DUE', DATE_ADD(CURDATE(), INTERVAL 30 DAY), NOW(), NOW());
```

Then check if it appears in the table!

---

## Configuration Summary

✅ **Database Name**: `financial_db`  
✅ **MySQL Port**: `3306`  
✅ **Username**: `root`  
✅ **Password**: `` (empty)  
✅ **Service Port**: `8083`  
✅ **Eureka**: Enabled and will register at `http://localhost:8761/eureka/`  
✅ **Auto-create tables**: Enabled (`spring.jpa.hibernate.ddl-auto=update`)  
✅ **Show SQL**: Enabled (you'll see queries in console)  

---

## Next Steps

1. ✅ Create the database in phpMyAdmin
2. ✅ Start the financial service application
3. ✅ Verify tables are created
4. ✅ Check Eureka dashboard for service registration
5. 🔄 Test API endpoints
6. 🔄 Monitor database activity in phpMyAdmin

---

## Useful phpMyAdmin Features

- **Browse**: View all records in a table
- **Structure**: See table schema and indexes
- **SQL**: Run custom queries
- **Search**: Find specific records
- **Export**: Backup your database
- **Import**: Restore from backup
- **Operations**: Rename, copy, or drop tables

---

Good luck! 🚀
