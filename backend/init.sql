-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create guests table
CREATE TABLE IF NOT EXISTS guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    team VARCHAR(10) NOT NULL CHECK (team IN ('BRIDE', 'GROOM')),
    plus_one BOOLEAN NOT NULL,
    created TIMESTAMP DEFAULT NOW()
);

-- Create request_logs table
CREATE TABLE IF NOT EXISTS request_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payload TEXT NOT NULL,
    created TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_guests_team ON guests(team);
CREATE INDEX IF NOT EXISTS idx_guests_created ON guests(created);
CREATE INDEX IF NOT EXISTS idx_request_logs_created ON request_logs(created);

-- Insert some sample data for testing (optional)
INSERT INTO guests (name, team, plus_one) VALUES 
    ('John Doe', 'BRIDE', true),
    ('Jane Smith', 'GROOM', false),
    ('Alice Johnson', 'BRIDE', true)
ON CONFLICT DO NOTHING; 