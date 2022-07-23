-- Adminer 4.8.1 MySQL 8.0.28 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `secureBox`;
CREATE DATABASE `secureBox` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `secureBox`;

DROP TABLE IF EXISTS `Hosts`;
CREATE TABLE `Hosts` (
  `host_id` int NOT NULL AUTO_INCREMENT,
  `host_ip` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_os` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_mac` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `scan_id` int NOT NULL,
  PRIMARY KEY (`host_id`),
  UNIQUE KEY `Hosts_report_id_key` (`scan_id`),
  CONSTRAINT `Hosts_report_id_fkey` FOREIGN KEY (`scan_id`) REFERENCES `Reports` (`report_id`) ON DELETE RESTRICT ON UPDATE CASCADE
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


-- 2022-07-23 16:08:02