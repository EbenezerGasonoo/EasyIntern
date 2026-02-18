-- Run in Supabase SQL Editor if you already have the "companies" table.
-- Adds: benefits, companySize, contactEmail for improved company profiles.

ALTER TABLE "companies" ADD COLUMN IF NOT EXISTS "benefits" TEXT;
ALTER TABLE "companies" ADD COLUMN IF NOT EXISTS "companySize" TEXT;
ALTER TABLE "companies" ADD COLUMN IF NOT EXISTS "contactEmail" TEXT;
