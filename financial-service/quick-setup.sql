-- ================================================
-- QUICK START: Run this in phpMyAdmin SQL tab
-- ================================================

CREATE DATABASE IF NOT EXISTS financial_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_general_ci;

-- That's it! Now start your Spring Boot application
-- and the tables will be created automatically.

-- ================================================
-- VERIFICATION: After starting the app, check:
-- ================================================

USE financial_db;
SHOW TABLES;

-- You should see:
-- 1. commission_invoices
-- 2. transaction_history
