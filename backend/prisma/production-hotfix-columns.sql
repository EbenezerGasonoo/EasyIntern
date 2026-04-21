-- Safe additive columns for existing MySQL production (skip if already applied).
ALTER TABLE `users` ADD COLUMN `scheduled_account_deletion_at` DATETIME(3) NULL;
ALTER TABLE `interns` ADD COLUMN `school_affiliation_document` VARCHAR(191) NULL;
