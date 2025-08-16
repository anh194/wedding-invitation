-- Migration: Add after_party column to guests table
-- This script can be run safely on existing databases

-- Add the after_party column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'guests' AND column_name = 'after_party'
    ) THEN
        ALTER TABLE guests ADD COLUMN after_party BOOLEAN DEFAULT false;
        RAISE NOTICE 'Added after_party column to guests table';
    ELSE
        RAISE NOTICE 'after_party column already exists in guests table';
    END IF;
END $$;
