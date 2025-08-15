import { Pool, PoolClient } from 'pg';
import { databaseConfig } from '../config';

class Database {
  private pool: Pool;

  constructor() {
    // Log all environment variables for debugging
    console.log('🔍 Database Connection Environment Variables:');
    console.log('  DB_HOST:', process.env.DB_HOST);
    console.log('  DB_PORT:', process.env.DB_PORT);
    console.log('  DB_NAME:', process.env.DB_NAME);
    console.log('  DB_USER:', process.env.DB_USER);
    console.log('  DB_PASSWORD:', process.env.DB_PASSWORD ? '***SET***' : '***NOT SET***');
    
    // Log the resolved database config
    console.log('🔧 Resolved Database Configuration:');
    console.log('  Host:', databaseConfig.host);
    console.log('  Port:', databaseConfig.port);
    console.log('  Database:', databaseConfig.database);
    console.log('  User:', databaseConfig.user);
    console.log('  Password:', databaseConfig.password ? '***SET***' : '***NOT SET***');

    this.pool = new Pool({
      host: databaseConfig.host,
      port: databaseConfig.port,
      database: databaseConfig.database,
      user: databaseConfig.user,
      password: databaseConfig.password,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 30000, // Increased from 2s to 30s for cloud connections
      statement_timeout: 60000, // 60 seconds for query execution
      query_timeout: 60000, // 60 seconds for query timeout
      // Add SSL configuration for RDS
      ssl: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });

    this.pool.on('error', (err) => {
      console.error('❌ Unexpected error on idle client', err);
      process.exit(-1);
    });

    // Log connection pool creation
    console.log('✅ Database connection pool created successfully');
  }

  async getClient(): Promise<PoolClient> {
    console.log('🔌 Attempting to get database client...');
    try {
      const client = await this.pool.connect();
      console.log('✅ Database client connected successfully');
      return client;
    } catch (error) {
      console.error('❌ Failed to get database client:', error);
      throw error;
    }
  }

  async query(text: string, params?: any[]): Promise<any> {
    console.log('🔍 Executing database query:', text.substring(0, 100) + (text.length > 100 ? '...' : ''));
    if (params && params.length > 0) {
      console.log('📝 Query parameters:', params.map(p => typeof p === 'string' ? p : typeof p));
    }
    
    const client = await this.getClient();
    try {
      const result = await client.query(text, params);
      console.log('✅ Query executed successfully, rows affected:', result.rowCount);
      return result;
    } catch (error) {
      console.error('❌ Query execution failed:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async initializeTables(): Promise<void> {
    console.log('🚀 Starting database table initialization...');
    try {
      // Create guests table
      console.log('📋 Creating guests table...');
      await this.query(`
        CREATE TABLE IF NOT EXISTS guests (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          team VARCHAR(10) NOT NULL CHECK (team IN ('BRIDE', 'GROOM')),
          plus_one BOOLEAN NOT NULL,
          created TIMESTAMP DEFAULT NOW()
        )
      `);
      console.log('✅ Guests table created/verified successfully');

      // Create request_logs table
      console.log('📋 Creating request_logs table...');
      await this.query(`
        CREATE TABLE IF NOT EXISTS request_logs (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          payload TEXT NOT NULL,
          created TIMESTAMP DEFAULT NOW()
        )
      `);
      console.log('✅ Request logs table created/verified successfully');

      // Create indexes
      console.log('📋 Creating database indexes...');
      await this.query('CREATE INDEX IF NOT EXISTS idx_guests_team ON guests(team)');
      await this.query('CREATE INDEX IF NOT EXISTS idx_guests_created ON guests(created)');
      await this.query('CREATE INDEX IF NOT EXISTS idx_request_logs_created ON request_logs(created)');
      console.log('✅ Database indexes created/verified successfully');

      console.log('🎉 Database initialization completed successfully!');
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

export const db = new Database(); 