import { pool } from '../../config/database.js';
import { logger } from '../../config/logger.js';

export async function up() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id CHAR(36) PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        lawyer_id CHAR(36) NOT NULL,
        rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (lawyer_id) REFERENCES lawyers(id) ON DELETE CASCADE,
        UNIQUE KEY unique_review (user_id, lawyer_id),
        INDEX idx_user (user_id),
        INDEX idx_lawyer (lawyer_id),
        INDEX idx_rating (rating)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    logger.info('Reviews table created successfully');
  } catch (error) {
    logger.error('Error creating reviews table:', error);
    throw error;
  }
}

export async function down() {
  try {
    await pool.query('DROP TABLE IF EXISTS reviews');
    logger.info('Reviews table dropped successfully');
  } catch (error) {
    logger.error('Error dropping reviews table:', error);
    throw error;
  }
}