-- ========================================
-- QUICK FIX: Create Financial Database
-- ========================================
-- Just run this entire script in phpMyAdmin SQL tab
-- ========================================

CREATE DATABASE IF NOT EXISTS financial_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_general_ci;

-- Verify it was created
SHOW DATABASES LIKE 'financial_db';

-- That's it! Now restart your Spring Boot application.
-- The tables will be created automatically by Hibernate.
