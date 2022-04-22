/*
  Warnings:

  - A unique constraint covering the columns `[report_id]` on the table `Hosts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Reports` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hosts_id]` on the table `Vuln` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[report_id]` on the table `Vuln` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `report_id` to the `Hosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `host_id` to the `Ports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hosts_id` to the `Vuln` table without a default value. This is not possible if the table is not empty.
  - Added the required column `report_id` to the `Vuln` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Hosts` ADD COLUMN `report_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Ports` ADD COLUMN `host_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Reports` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Vuln` ADD COLUMN `hosts_id` INTEGER NOT NULL,
    ADD COLUMN `report_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Hosts_report_id_key` ON `Hosts`(`report_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Reports_user_id_key` ON `Reports`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Vuln_hosts_id_key` ON `Vuln`(`hosts_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Vuln_report_id_key` ON `Vuln`(`report_id`);

-- AddForeignKey
ALTER TABLE `Reports` ADD CONSTRAINT `Reports_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hosts` ADD CONSTRAINT `Hosts_report_id_fkey` FOREIGN KEY (`report_id`) REFERENCES `Reports`(`report_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vuln` ADD CONSTRAINT `Vuln_report_id_fkey` FOREIGN KEY (`report_id`) REFERENCES `Reports`(`report_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vuln` ADD CONSTRAINT `Vuln_hosts_id_fkey` FOREIGN KEY (`hosts_id`) REFERENCES `Hosts`(`host_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ports` ADD CONSTRAINT `Ports_host_id_fkey` FOREIGN KEY (`host_id`) REFERENCES `Hosts`(`host_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
