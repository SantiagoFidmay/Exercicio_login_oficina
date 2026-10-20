-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: db_autofix
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `agendamentos`
--

DROP TABLE IF EXISTS `agendamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamentos` (
  `codAgendamento` int NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `tipo` enum('REVISAO','MANUTENCAO','INSTALACAO') NOT NULL,
  `idVeiculo` int NOT NULL,
  `idCliente` int NOT NULL,
  PRIMARY KEY (`codAgendamento`),
  KEY `idVeiculo` (`idVeiculo`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`idVeiculo`) REFERENCES `veiculos` (`codVeiculo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `agendamentos_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`codCliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamentos`
--

LOCK TABLES `agendamentos` WRITE;
/*!40000 ALTER TABLE `agendamentos` DISABLE KEYS */;
INSERT INTO `agendamentos` VALUES (1,'2026-10-20','08:54:00','REVISAO',1,6);
/*!40000 ALTER TABLE `agendamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `codCliente` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cpf` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `endereco` varchar(50) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  PRIMARY KEY (`codCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Roberto','roberto@gmail.com','U2FsdGVkX1+pHFMWo9GNiUe7eIaSD7g7JKOU+GxvNds=','U2FsdGVkX1+nH711x4BdbhilJdIQRE0TCuj7/o5KKvQ=','rua abc, 5','47912345678'),(2,'ana','ana@gmail.com','U2FsdGVkX1+RPoRfuNjnks+h3+CN8+WjnnHI8K4cglU=','U2FsdGVkX1+dHgbi40CMQqKyh5T5P16Ba+7dD3fZu/E=','rua abc, 5','47912345678'),(4,'Ana','ana@gmail.com','U2FsdGVkX1+R3d6YnUDJP9hhBoOmQbmWEK9ZbR3XJDs=','U2FsdGVkX196KQ7Pc9UNWz1Rvr0Cl128UJjuJdjNPpQ=','rua abc, 5','47912345678'),(5,'Ana','ana@gmail.com','U2FsdGVkX1/xuDnQ+LVwKvP7EBWKre953nklUa49+s0=','U2FsdGVkX19ogLXJQrkvvI4AtGvEzv38QBuufM625MQ=','rua abc, 5','47912345678'),(6,'Santiago','santiago@gmail.com','U2FsdGVkX19RLaCX+T5lK4hSd2F0P9kC4K68FV0ErsE=','U2FsdGVkX1/vWf+pF/hKGsNiZNtuHoiyOqbfclDpy/s=','244','47999999999');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veiculos`
--

DROP TABLE IF EXISTS `veiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veiculos` (
  `codVeiculo` int NOT NULL AUTO_INCREMENT,
  `modelo` varchar(50) NOT NULL,
  `placa` varchar(50) NOT NULL,
  `codRastreador` varchar(100) NOT NULL,
  `idCliente` int NOT NULL,
  `marca` varchar(50) NOT NULL,
  PRIMARY KEY (`codVeiculo`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `veiculos_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`codCliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veiculos`
--

LOCK TABLES `veiculos` WRITE;
/*!40000 ALTER TABLE `veiculos` DISABLE KEYS */;
INSERT INTO `veiculos` VALUES (1,'Civic','rxx6a68','U2FsdGVkX19HyA+LMNUZokRwX7nUuEeCnjsBj7TNI5o=',6,'Honda');
/*!40000 ALTER TABLE `veiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-20  9:22:25
