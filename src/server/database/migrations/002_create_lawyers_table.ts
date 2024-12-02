import { pool } from '../../config/database.js';
import { logger } from '../../config/logger.js';

export async function up() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lawyers (
        id CHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        license_number VARCHAR(50) UNIQUE NOT NULL,
        specialization VARCHAR(255),
        years_of_experience INT,
        phone_number VARCHAR(20),
        profile_image VARCHAR(255),
        office_address TEXT,
        bio TEXT,
        hourly_rate DECIMAL(10,2),
        languages_spoken VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        status ENUM('active', 'inactive', 'pending', 'suspended') DEFAULT 'pending',
        refresh_token TEXT,
        INDEX idx_email (email),
        INDEX idx_license (license_number),
        INDEX idx_status (status),
        INDEX idx_specialization (specialization)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    logger.info('Lawyers table created successfully');
  } catch (error) {
    logger.error('Error creating lawyers table:', error);
    throw error;
  }
}

export async function down() {
  try {
    await pool.query('DROP TABLE IF EXISTS lawyers');
    logger.info('Lawyers table dropped successfully');
  } catch (error) {
    logger.error('Error dropping lawyers table:', error);
    throw error;
  }
}