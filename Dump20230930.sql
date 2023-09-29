CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `responses`
--

DROP TABLE IF EXISTS `responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responses` (
  `ResponseId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Temperature` double NOT NULL,
  `CloseContact` varchar(3) NOT NULL,
  `DateTimeSent` text NOT NULL,
  PRIMARY KEY (`ResponseId`),
  UNIQUE KEY `ResponseId_UNIQUE` (`ResponseId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responses`
--

LOCK TABLES `responses` WRITE;
/*!40000 ALTER TABLE `responses` DISABLE KEYS */;
INSERT INTO `responses` VALUES (17,'testnew',37.7,'Yes','Thu Sep 28 2023 21:31:58 GMT+0800 (Singapore Standard Time)'),(18,'testttt',36.6,'No','Thu Sep 28 2023 21:44:49 GMT+0800 (Singapore Standard Time)'),(19,'hanyi',37,'No','Fri Sep 29 2023 00:03:42 GMT+0800 (Singapore Standard Time)'),(20,'a',37,'Yes','Fri Sep 29 2023 01:34:41 GMT+0800 (Singapore Standard Time)'),(21,'a',37,'Yes','Fri Sep 29 2023 01:35:10 GMT+0800 (Singapore Standard Time)'),(22,'a',37,'Yes','Fri Sep 29 2023 01:44:32 GMT+0800 (Singapore Standard Time)'),(23,'a',36,'Yes','Fri Sep 29 2023 02:36:41 GMT+0800 (Singapore Standard Time)'),(24,'test a',37.7,'No','Fri Sep 29 2023 20:29:45 GMT+0800 (Singapore Standard Time)'),(25,'test b',36.1,'Yes','Fri Sep 29 2023 20:36:47 GMT+0800 (Singapore Standard Time)'),(26,'test c',36.6,'Yes','Fri Sep 29 2023 22:07:20 GMT+0800 (Singapore Standard Time)');
/*!40000 ALTER TABLE `responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `symptoms`
--

DROP TABLE IF EXISTS `symptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `symptoms` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `ResponseId` int NOT NULL,
  `Symptom` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `responseId1_idx` (`ResponseId`),
  CONSTRAINT `responseId1` FOREIGN KEY (`ResponseId`) REFERENCES `responses` (`ResponseId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symptoms`
--

LOCK TABLES `symptoms` WRITE;
/*!40000 ALTER TABLE `symptoms` DISABLE KEYS */;
INSERT INTO `symptoms` VALUES (7,17,'Cough'),(8,18,'Breathing difficulties'),(9,19,'Smell/test impairment'),(10,19,'Sore throat'),(11,19,'Fever'),(12,19,'Breathing difficulties'),(13,19,'Cough'),(14,19,'Body aches'),(15,19,'Headaches'),(16,19,'Fatigue'),(17,19,'Runny nose'),(18,19,'Diarrhea'),(19,20,'None of the above'),(20,21,'Fever'),(21,21,'Fatigue'),(22,22,'Fever'),(23,22,'Fatigue'),(24,23,'Fever'),(25,24,'None of the above'),(26,25,'None of the above'),(27,26,'Fatigue'),(28,26,'Diarrhea');
/*!40000 ALTER TABLE `symptoms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-30  4:34:39
