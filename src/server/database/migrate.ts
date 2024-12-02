import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../config/logger.js';
import { testConnection } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

async function migrate(direction: 'up' | 'down') {
  try {
    await testConnection();

    const migrationsDir = join(__dirname, 'migrations');
    const migrationFiles = readdirSync(migrationsDir)
      .filter(f => f.endsWith('.ts'))
      .sort();

    if (direction === 'down') {
      migrationFiles.reverse();
    }

    for (const file of migrationFiles) {
      const migration = await import(join(migrationsDir, file));
      
      try {
        await migration[direction]();
        logger.info(`Migration ${file} ${direction} completed successfully`);
      } catch (error) {
        logger.error(`Migration ${file} ${direction} failed:`, error);
        throw error;
      }
    }

    logger.info(`All migrations ${direction} completed successfully`);
  } catch (error) {
    logger.error(`Migration ${direction} failed:`, error);
    process.exit(1);
  }
}

// Run migrations based on command line argument
const direction = process.argv[2] as 'up' | 'down';
if (!direction || !['up', 'down'].includes(direction)) {
  console.error('Please specify migration direction: up or down');
  process.exit(1);
}

migrate(direction);