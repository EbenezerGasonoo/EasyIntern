-- Add UNIVERSITY user type and student verification workflow tables.
ALTER TABLE `users`
  MODIFY `userType` ENUM('COMPANY', 'INTERN', 'UNIVERSITY', 'ADMIN') NOT NULL;

ALTER TABLE `interns`
  ADD COLUMN `enrollment_year` INTEGER NULL,
  ADD COLUMN `course` VARCHAR(191) NULL,
  ADD COLUMN `graduation_date` DATETIME(3) NULL,
  ADD COLUMN `student_verification_status` ENUM('NOT_SUBMITTED', 'PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'NOT_SUBMITTED',
  ADD COLUMN `student_verification_notes` VARCHAR(191) NULL,
  ADD COLUMN `university_id` VARCHAR(191) NULL;

CREATE TABLE `universities` (
  `id` VARCHAR(191) NOT NULL,
  `user_id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `website` VARCHAR(191) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  UNIQUE INDEX `universities_user_id_key`(`user_id`),
  INDEX `universities_name_idx`(`name`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `university_student_catalog` (
  `id` VARCHAR(191) NOT NULL,
  `university_id` VARCHAR(191) NOT NULL,
  `enrollment_year` INTEGER NOT NULL,
  `student_id` VARCHAR(191) NOT NULL,
  `course` VARCHAR(191) NOT NULL,
  `graduation_date` DATETIME(3) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  UNIQUE INDEX `university_student_catalog_university_id_student_id_key`(`university_id`, `student_id`),
  INDEX `university_student_catalog_university_id_enrollment_year_idx`(`university_id`, `enrollment_year`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `student_verification_requests` (
  `id` VARCHAR(191) NOT NULL,
  `intern_id` VARCHAR(191) NOT NULL,
  `university_id` VARCHAR(191) NOT NULL,
  `catalog_record_id` VARCHAR(191) NULL,
  `status` ENUM('NOT_SUBMITTED', 'PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
  `requested_student_id` VARCHAR(191) NOT NULL,
  `requested_enrollment_year` INTEGER NULL,
  `requested_course` VARCHAR(191) NULL,
  `requested_graduation_date` DATETIME(3) NULL,
  `notes` VARCHAR(191) NULL,
  `reviewed_at` DATETIME(3) NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL,

  INDEX `student_verification_requests_university_id_status_idx`(`university_id`, `status`),
  INDEX `student_verification_requests_intern_id_status_idx`(`intern_id`, `status`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `interns`
  ADD CONSTRAINT `interns_university_id_fkey`
  FOREIGN KEY (`university_id`) REFERENCES `universities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `universities`
  ADD CONSTRAINT `universities_user_id_fkey`
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `university_student_catalog`
  ADD CONSTRAINT `university_student_catalog_university_id_fkey`
  FOREIGN KEY (`university_id`) REFERENCES `universities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `student_verification_requests`
  ADD CONSTRAINT `student_verification_requests_intern_id_fkey`
  FOREIGN KEY (`intern_id`) REFERENCES `interns`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_verification_requests_university_id_fkey`
  FOREIGN KEY (`university_id`) REFERENCES `universities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_verification_requests_catalog_record_id_fkey`
  FOREIGN KEY (`catalog_record_id`) REFERENCES `university_student_catalog`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
