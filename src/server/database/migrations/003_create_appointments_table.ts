import { pool } from '../../config/database.js';
import { logger } from '../../config/logger.js';

export async function up() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id CHAR(36) PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        lawyer_id CHAR(36) NOT NULL,
        appointment_date DATETIME NOT NULL,
        duration INT NOT NULL COMMENT 'Duration in minutes',
        status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
        type ENUM('consultation', 'meeting', 'court_appearance') NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (lawyer_id) REFERENCES lawyers(id) ON DELETE CASCADE,
        INDEX idx_user (user_id),
        INDEX idx_lawyer (lawyer_id),
        INDEX idx_date (appointment_date),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    logger.info('Appointments table created successfully');
  } catch (error) {
    logger.error('Error creating appointments table:', error);
    throw error;
  }
}

export async function down() {
  try {
    await pool.query('DROP TABLE IF EXISTS appointments');
    logger.info('Appointments table dropped successfully');
  } catch (error) {
    logger.error('Error dropping appointments table:', error);
    throw error;
  }
}