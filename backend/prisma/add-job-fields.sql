-- Run in Supabase SQL Editor if you already have the "jobs" table.
-- Adds: responsibilities, benefits (arrays) for in-depth job details.

ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "responsibilities" TEXT[] DEFAULT '{}';
ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "benefits" TEXT[] DEFAULT '{}';
