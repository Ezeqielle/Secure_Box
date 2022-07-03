-- Adminer 4.8.1 MySQL 8.0.28 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `secureBox` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `secureBox`;

DROP TABLE IF EXISTS `Hosts`;
CREATE TABLE `Hosts` (
  `host_id` int NOT NULL AUTO_INCREMENT,
  `host_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_ip` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_port` int NOT NULL,
  `host_os` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_mac_addr` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `report_id` int NOT NULL,
  PRIMARY KEY (`host_id`),
  UNIQUE KEY `Hosts_report_id_key` (`report_id`),
  CONSTRAINT `Hosts_report_id_fkey` FOREIGN KEY (`report_id`) REFERENCES `Reports` (`report_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Ports`;
CREATE TABLE `Ports` (
  `port_id` int NOT NULL AUTO_INCREMENT,
  `port_number` int NOT NULL,
  `port_protocol` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `port_version` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `application_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `host_id` int NOT NULL,
  PRIMARY KEY (`port_id`),
  KEY `Ports_host_id_fkey` (`host_id`),
  CONSTRAINT `Ports_host_id_fkey` FOREIGN KEY (`host_id`) REFERENCES `Hosts` (`host_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Reports`;
CREATE TABLE `Reports` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `report_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `report_date` datetime(3) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`report_id`),
  UNIQUE KEY `Reports_user_id_key` (`user_id`),
  CONSTRAINT `Reports_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_token` varchar(191) COLLATE utf8mb4_unicode_ci NULL,
  `role_id` int NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `Users_user_email_key` (`user_email`),
  UNIQUE KEY `Users_role_id_key` (`role_id`),
  CONSTRAINT `Users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles` (`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `Vuln`;
CREATE TABLE `Vuln` (
  `vuln_idd` int NOT NULL AUTO_INCREMENT,
  `vuln_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vuln_desc` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vuln_criticality` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vuln_date` datetime(3) NOT NULL,
  `vuln_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vuln_attack_vector` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vuln_attack_complexity` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vuln_impact_avaibility` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vuln_impact_integrity` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0524c43e-ffba-490f-8c7b-644a0b4fb764',	'79bf8cc1dcf7051d81318c343a969243b2c594d79900f8d233bd6497047c5eea',	'2022-04-04 13:17:45.474',	'20220404131745_init',	NULL,	NULL,	'2022-04-04 13:17:45.463',	1),
('16c14bb4-c05f-429b-be1e-736da47d90be',	'd29f5c00cd195fec9c442267aee63113fa3648cebcb491cef70ebdf7c97588cd',	'2022-04-05 16:55:26.810',	'20220405165526_add_tables',	NULL,	NULL,	'2022-04-05 16:55:26.736',	1),
('a692655a-ca46-4e81-adca-3f011b5032f4',	'c979ffc66bb78e185423a5f9056c796748877317db37ea8cd92a4cddf93cc473',	'2022-04-06 14:06:21.115',	'20220406140620_update_schem',	NULL,	NULL,	'2022-04-06 14:06:20.974',	1);

-- 2022-04-07 07:59:42
