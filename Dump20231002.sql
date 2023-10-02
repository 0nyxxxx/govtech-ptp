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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responses`
--

LOCK TABLES `responses` WRITE;
/*!40000 ALTER TABLE `responses` DISABLE KEYS */;
INSERT INTO `responses` VALUES (1,'Emily Johnson',37.5,'Yes','Mon Oct 02 2023 11:13:17 GMT+0800 (Singapore Standard Time)'),(2,'Alexander Davis',38.2,'No','Mon Oct 02 2023 11:23:10 GMT+0800 (Singapore Standard Time)'),(3,'Sophia Martinez',36.8,'Yes','Mon Oct 02 2023 11:23:54 GMT+0800 (Singapore Standard Time)'),(4,'William Anderson',39.1,'No','Mon Oct 02 2023 11:24:26 GMT+0800 (Singapore Standard Time)'),(5,'Olivia Robinson',37.7,'Yes','Mon Oct 02 2023 11:25:52 GMT+0800 (Singapore Standard Time)'),(6,'John Doe',37.2,'Yes','Mon Oct 02 2023 11:27:16 GMT+0800 (Singapore Standard Time)');
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symptoms`
--

LOCK TABLES `symptoms` WRITE;
/*!40000 ALTER TABLE `symptoms` DISABLE KEYS */;
INSERT INTO `symptoms` VALUES (1,1,'Cough'),(2,1,'Fever'),(3,1,'Sore throat'),(4,2,'Smell/test impairment'),(5,2,'Fatigue'),(6,2,'Runny nose'),(7,3,'Fever'),(8,3,'Body aches'),(9,3,'Sore throat'),(10,4,'None of the above'),(11,5,'Breathing difficulties'),(12,5,'Headaches'),(13,5,'Diarrhea'),(14,6,'Cough'),(15,6,'Smell/test impairment'),(16,6,'Fever');
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

-- Dump completed on 2023-10-02 12:05:15
