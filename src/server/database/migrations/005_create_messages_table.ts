import { pool } from '../../config/database.js';
import { logger } from '../../config/logger.js';

export async function up() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id CHAR(36) PRIMARY KEY,
        sender_id CHAR(36) NOT NULL,
        receiver_id CHAR(36) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        read_at TIMESTAMP NULL,
        status ENUM('sent', 'delivered', 'read') DEFAULT 'sent',
        FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_sender (sender_id),
        INDEX idx_receiver (receiver_id),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    logger.info('Messages table created successfully');
  } catch (error) {
    logger.error('Error creating messages table:', error);
    throw error;
  }
}

export async function down() {
  try {
    await pool.query('DROP TABLE IF EXISTS messages');
    logger.info('Messages table dropped successfully');
  } catch (error) {
    logger.error('Error dropping messages table:', error);
    throw error;
  }
}