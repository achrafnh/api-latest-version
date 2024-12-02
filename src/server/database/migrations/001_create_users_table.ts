import { pool } from '../../config/database.js';
import { logger } from '../../config/logger.js';

export async function up() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id CHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20),
        profile_image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
        refresh_token TEXT,
        INDEX idx_email (email),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    logger.info('Users table created successfully');
  } catch (error) {
    logger.error('Error creating users table:', error);
    throw error;
  }
}

export async function down() {
  try {
    await pool.query('DROP TABLE IF EXISTS users');
    logger.info('Users table dropped successfully');
  } catch (error) {
    logger.error('Error dropping users table:', error);
    throw error;
  }
}