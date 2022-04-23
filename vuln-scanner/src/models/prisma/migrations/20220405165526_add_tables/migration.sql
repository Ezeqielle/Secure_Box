/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `user_password` VARCHAR(191) NOT NULL,
    `role_id` INTEGER NOT NULL,

    UNIQUE INDEX `Users_user_email_key`(`user_email`),
    UNIQUE INDEX `Users_role_id_key`(`role_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reports` (
    `report_id` INTEGER NOT NULL AUTO_INCREMENT,
    `report_name` VARCHAR(191) NOT NULL,
    `report_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`report_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hosts` (
    `host_id` INTEGER NOT NULL AUTO_INCREMENT,
    `host_name` VARCHAR(191) NOT NULL,
    `host_ip` VARCHAR(191) NOT NULL,
    `host_port` INTEGER NOT NULL,
    `host_os` VARCHAR(191) NOT NULL,
    `host_mac_addr` VARCHAR(191) NOT NULL,
    `host_status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`host_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vuln` (
    `vuln_idd` INTEGER NOT NULL AUTO_INCREMENT,
    `vuln_name` VARCHAR(191) NOT NULL,
    `vuln_desc` VARCHAR(191) NOT NULL,
    `vuln_criticality` VARCHAR(191) NOT NULL,
    `vuln_date` DATETIME(3) NOT NULL,
    `vuln_url` VARCHAR(191) NOT NULL,
    `vuln_attack_vector` VARCHAR(191) NOT NULL,
    `vuln_attack_complexity` VARCHAR(191) NOT NULL,
    `vuln_impact_avaibility` VARCHAR(191) NOT NULL,
    `vuln_impact_integrity` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`vuln_idd`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ports` (
    `port_id` INTEGER NOT NULL AUTO_INCREMENT,
    `port_number` INTEGER NOT NULL,
    `port_protocol` VARCHAR(191) NOT NULL,
    `port_version` VARCHAR(191) NOT NULL,
    `application_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`port_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
