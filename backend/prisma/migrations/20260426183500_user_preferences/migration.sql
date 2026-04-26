-- CreateTable
CREATE TABLE `user_preferences` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `profile_visibility` VARCHAR(191) NOT NULL DEFAULT 'public',
    `show_contact_info` BOOLEAN NOT NULL DEFAULT true,
    `notify_job_recommendations` BOOLEAN NOT NULL DEFAULT true,
    `notify_application_updates` BOOLEAN NOT NULL DEFAULT true,
    `notify_new_applicants` BOOLEAN NOT NULL DEFAULT true,
    `notification_channel_email` BOOLEAN NOT NULL DEFAULT true,
    `notification_channel_in_app` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_preferences_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_preferences` ADD CONSTRAINT `user_preferences_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
