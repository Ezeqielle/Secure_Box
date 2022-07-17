-- Adminer 4.8.1 MySQL 8.0.28 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Hosts`;
CREATE TABLE `Hosts` (
  `host_id` int NOT NULL AUTO_INCREMENT,
  `host_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_ip` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_port` int NOT NULL,
  `host_os` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_mac_addr` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `report_id` int NOT NULL,
  PRIMARY KEY (`host_id`),
  UNIQUE KEY `Hosts_report_id_key` (`report_id`),
  CONSTRAINT `Hosts_report_id_fkey` FOREIGN KEY (`report_id`) REFERENCES `Reports` (`report_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Ports`;
CREATE TABLE `Ports` (
  `port_id` int NOT NULL AUTO_INCREMENT,
  `port_number` int NOT NULL,
  `port_protocol` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `port_version` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `application_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_id` int NOT NULL,
  PRIMARY KEY (`port_id`),
  KEY `Ports_host_id_fkey` (`host_id`),
  CONSTRAINT `Ports_host_id_fkey` FOREIGN KEY (`host_id`) REFERENCES `Hosts` (`host_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Reports`;
CREATE TABLE `Reports` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `report_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `report_date` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`report_id`),
  UNIQUE KEY `Reports_user_id_key` (`user_id`),
  CONSTRAINT `Reports_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Roles` (`role_id`, `role_name`) VALUES
(1,	'admin'),
(2,	'reader'),
(3,	'scan');

DROP TABLE IF EXISTS `ScanTypes`;
CREATE TABLE `ScanTypes` (
  `scan_type_id` int NOT NULL AUTO_INCREMENT,
  `scan_type_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`scan_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `Scans`;
CREATE TABLE `Scans` (
  `scan_id` int NOT NULL AUTO_INCREMENT,
  `scan_name` int NOT NULL,
  `scan_target` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `scan_start_date` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `scan_end_date` timestamp NULL DEFAULT NULL,
  `scan_type_id` int NOT NULL,
  `report_id` int NOT NULL,
  PRIMARY KEY (`scan_id`),
  KEY `Scans_report_id_fkey` (`report_id`),
  KEY `Scans_type_id_fkey` (`scan_type_id`),
  CONSTRAINT `Scans_report_id_fkey` FOREIGN KEY (`report_id`) REFERENCES `Reports` (`report_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Scans_type_id_fkey` FOREIGN KEY (`scan_type_id`) REFERENCES `ScanTypes` (`scan_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_firstname` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_lastname` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_token` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `Users_user_email_key` (`user_email`),
  KEY `Users_role_id_key` (`role_id`),
  CONSTRAINT `Users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles` (`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Users` (`user_id`, `user_firstname`, `user_lastname`, `user_name`, `user_email`, `user_password`, `user_token`, `role_id`) VALUES
(1,	'Peter',	'Balivet',	'peter',	'peterbalivet@gmail.com',	'1fe3c926b3cae59adb4c13e8df903ae72ea29f9cbef47070ba9be112b7d90e5b820b19bcb1a45318fc467d48fe36da808bf1601320e295949235948e2dcd1868',	'28030e0691a5022e08edc89b6880810ae12e5307f33ecb07d9990ce59e0c08bc54a3a3c09bae9cb39d4be88b2ed4c35a2e608eecc5062d52bb949f9993da73f7',	1),
(6,	'James',	'Deen',	'james',	'james@test.com',	'4f712a2c8c42ca2ddd1c246be6b666cdaca128f447e7d4b4bbbf4fd9dc1305faa623e656e32dcbf5ce36d4b20e5d8ed7ef71afdf322cf7fed6771457f207c067',	'9cdc8579fcfe2ffbe2fc3d2ca61204c7122d391d31e49ead45ab48f208fd8c2775abb2e0400565443520aad76b94165b9d7b1aaa1322dcb068d2add549ecb539',	2);

DROP TABLE IF EXISTS `Vuln`;
CREATE TABLE `Vuln` (
  `vuln_idd` int NOT NULL AUTO_INCREMENT,
  `vuln_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `vuln_desc` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `vuln_criticality` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `vuln_date` datetime(3) NOT NULL,
  `vuln_url` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `vuln_attack_vector` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `vuln_attack_complexity` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `vuln_impact_avaibility` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `vuln_impact_integrity` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hosts_id` int NOT NULL,
  `report_id` int NOT NULL,
  PRIMARY KEY (`vuln_idd`),
  UNIQUE KEY `Vuln_hosts_id_key` (`hosts_id`),
  UNIQUE KEY `Vuln_report_id_key` (`report_id`),
  CONSTRAINT `Vuln_hosts_id_fkey` FOREIGN KEY (`hosts_id`) REFERENCES `Hosts` (`host_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Vuln_report_id_fkey` FOREIGN KEY (`report_id`) REFERENCES `Reports` (`report_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0524c43e-ffba-490f-8c7b-644a0b4fb764',	'79bf8cc1dcf7051d81318c343a969243b2c594d79900f8d233bd6497047c5eea',	'2022-04-04 13:17:45.474',	'20220404131745_init',	NULL,	NULL,	'2022-04-04 13:17:45.463',	1),
('16c14bb4-c05f-429b-be1e-736da47d90be',	'd29f5c00cd195fec9c442267aee63113fa3648cebcb491cef70ebdf7c97588cd',	'2022-04-05 16:55:26.810',	'20220405165526_add_tables',	NULL,	NULL,	'2022-04-05 16:55:26.736',	1),
('a692655a-ca46-4e81-adca-3f011b5032f4',	'c979ffc66bb78e185423a5f9056c796748877317db37ea8cd92a4cddf93cc473',	'2022-04-06 14:06:21.115',	'20220406140620_update_schem',	NULL,	NULL,	'2022-04-06 14:06:20.974',	1);

-- 2022-07-14 18:11:20