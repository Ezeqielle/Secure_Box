-- Adminer 4.8.1 MySQL 8.0.28 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `CVE`;
CREATE TABLE `CVE` (
  `cve_id` int NOT NULL AUTO_INCREMENT,
  `cve_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cve_summary` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cve_access_auth` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cve_access_complexity` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cve_access_vector` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cve_impact_avaibility` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cve_impact_confidentiality` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cve_impact_integrity` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cve_cvss_three` float NOT NULL,
  `cve_cvss` int NOT NULL,
  `cve_exploitability_score` float NOT NULL,
  `cve_impact_score` float NOT NULL,
  `cve_references` json NOT NULL,
  `cve_cwe` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `port_id` int NOT NULL,
  PRIMARY KEY (`cve_id`),
  KEY `port_id` (`port_id`),
  CONSTRAINT `CVE_ibfk_1` FOREIGN KEY (`port_id`) REFERENCES `Ports` (`port_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Hosts`;
CREATE TABLE `Hosts` (
  `host_id` int NOT NULL AUTO_INCREMENT,
  `host_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_ip` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_os` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_mac` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `scan_id` int NOT NULL,
  PRIMARY KEY (`host_id`),
  KEY `Hosts_report_id_key` (`scan_id`),
  CONSTRAINT `Hosts_ibfk_1` FOREIGN KEY (`scan_id`) REFERENCES `Scans` (`scan_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Ports`;
CREATE TABLE `Ports` (
  `port_id` int NOT NULL AUTO_INCREMENT,
  `port_number` int NOT NULL,
  `port_protocol` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_version` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_product` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
  KEY `Reports_user_id_key` (`user_id`),
  CONSTRAINT `Reports_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Reports` (`report_id`, `report_name`, `report_date`, `user_id`) VALUES
(1,	'Best Project',	'2022-07-21 17:17:46',	1),
(3,	'Test',	'2022-07-23 12:08:13',	1);

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

INSERT INTO `ScanTypes` (`scan_type_id`, `scan_type_name`) VALUES
(1,	'Aggressive'),
(2,	'Normal');

DROP TABLE IF EXISTS `Scans`;
CREATE TABLE `Scans` (
  `scan_id` int NOT NULL AUTO_INCREMENT,
  `scan_name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `scan_target` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `scan_start_date` timestamp NULL DEFAULT NULL,
  `scan_end_date` timestamp NULL DEFAULT NULL,
  `scan_type_id` int NOT NULL,
  `report_id` int NOT NULL,
  PRIMARY KEY (`scan_id`),
  KEY `Scans_report_id_fkey` (`report_id`),
  KEY `Scans_type_id_fkey` (`scan_type_id`),
  CONSTRAINT `Scans_report_id_fkey` FOREIGN KEY (`report_id`) REFERENCES `Reports` (`report_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Scans_type_id_fkey` FOREIGN KEY (`scan_type_id`) REFERENCES `ScanTypes` (`scan_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Scans` (`scan_id`, `scan_name`, `scan_target`, `scan_start_date`, `scan_end_date`, `scan_type_id`, `report_id`) VALUES
(2,	'Best Scan',	'192.168.1.0/24',	'2022-07-23 17:00:08',	NULL,	2,	1),
(3,	'Peter',	'192.168.1.42',	'2022-07-23 14:39:30',	NULL,	2,	1),
(4,	'Best scan',	'192.168.1.0/24',	NULL,	NULL,	2,	3);

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
(1,	'Peter',	'Balivet',	'peter',	'peterbalivet@gmail.com',	'1fe3c926b3cae59adb4c13e8df903ae72ea29f9cbef47070ba9be112b7d90e5b820b19bcb1a45318fc467d48fe36da808bf1601320e295949235948e2dcd1868',	'47921a75d1012a27e0f1d5d6630a0e025f00a385871daf8c35b681a24dbdb3e27e3d7e9d2c584423c77c44218cf2356d6604c30823a68b3dae4bdcfe94af01cc',	1),
(6,	'James',	'Deen',	'james',	'james@test.com',	'4f712a2c8c42ca2ddd1c246be6b666cdaca128f447e7d4b4bbbf4fd9dc1305faa623e656e32dcbf5ce36d4b20e5d8ed7ef71afdf322cf7fed6771457f207c067',	'9cdc8579fcfe2ffbe2fc3d2ca61204c7122d391d31e49ead45ab48f208fd8c2775abb2e0400565443520aad76b94165b9d7b1aaa1322dcb068d2add549ecb539',	2);


-- 2022-07-23 18:08:35