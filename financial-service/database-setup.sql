-- =====================================================
-- Financial Service Database Setup Script
-- =====================================================
-- This script creates the MySQL database and user for the financial service
-- Run this in phpMyAdmin or MySQL command line
-- =====================================================

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS financial_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_general_ci;

-- 2. Use the database
USE financial_db;

-- 3. Create a dedicated user for the application (RECOMMENDED for production)
-- Uncomment the lines below if you want to create a dedicated user instead of using root
-- CREATE USER IF NOT EXISTS 'financial_user'@'localhost' IDENTIFIED BY 'financial_password123';
-- GRANT ALL PRIVILEGES ON financial_db.* TO 'financial_user'@'localhost';
-- FLUSH PRIVILEGES;

-- =====================================================
-- Note: Tables will be auto-created by Hibernate
-- =====================================================
-- When you start the Spring Boot application with:
--   spring.jpa.hibernate.ddl-auto=update
-- 
-- Hibernate will automatically create these tables:
--   1. commission_invoices
--   2. transaction_history
--
-- If you want to see the expected schema, here it is:
-- =====================================================

-- Table: commission_invoices
/*
CREATE TABLE IF NOT EXISTS commission_invoices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    enquiry_id BIGINT NOT NULL UNIQUE,
    vendor_id BIGINT NOT NULL,
    listing_id BIGINT NOT NULL,
    category VARCHAR(50) NOT NULL,
    booking_value DECIMAL(12,2) NOT NULL,
    commission_rate DECIMAL(5,4) NOT NULL,
    amount_due DECIMAL(12,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    due_date DATE,
    created_at DATETIME,
    updated_at DATETIME,
    INDEX idx_enquiry (enquiry_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
*/

-- Table: transaction_history
/*
CREATE TABLE IF NOT EXISTS transaction_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    invoice_id BIGINT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    method VARCHAR(50),
    reference_no VARCHAR(255),
    timestamp DATETIME,
    FOREIGN KEY (invoice_id) REFERENCES commission_invoices(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
*/

-- =====================================================
-- Verification Queries
-- =====================================================
-- After starting the application, run these to verify:

-- Check if database exists
-- SHOW DATABASES LIKE 'financial_db';

-- Check tables
-- SHOW TABLES;

-- Check table structure
-- DESCRIBE commission_invoices;
-- DESCRIBE transaction_history;

-- =====================================================
-- Sample Data (Optional - for testing)
-- =====================================================
-- Uncomment to insert sample data after tables are created:

/*
INSERT INTO commission_invoices 
(enquiry_id, vendor_id, listing_id, category, booking_value, commission_rate, amount_due, status, due_date, created_at, updated_at)
VALUES
(1001, 501, 301, 'VENUES', 50000.00, 0.1000, 5000.00, 'DUE', DATE_ADD(CURDATE(), INTERVAL 30 DAY), NOW(), NOW()),
(1002, 502, 302, 'PHOTOGRAPHY', 25000.00, 0.1500, 3750.00, 'DUE', DATE_ADD(CURDATE(), INTERVAL 30 DAY), NOW(), NOW());
*/
