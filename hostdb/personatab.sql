-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: fdb1030.awardspace.net
-- Generation Time: Oct 05, 2024 at 01:59 AM
-- Server version: 8.0.32
-- PHP Version: 8.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `4507842_personatab`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryID` int NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `eventID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryID`, `categoryName`, `eventID`) VALUES
(21, 'Best in Production', 19),
(22, 'Best in Type-A', 19),
(23, 'Best in Shorts Wear', 19),
(24, 'Best in Gown/Formal Attire', 19),
(25, 'Most Articulate', 19),
(26, 'Beauty & Poise', 19);

-- --------------------------------------------------------

--
-- Table structure for table `contestants`
--

CREATE TABLE `contestants` (
  `idContestant` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `address` varchar(255) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `image` varchar(255) NOT NULL,
  `categoryID` int DEFAULT NULL,
  `rank` int DEFAULT NULL,
  `contestantNo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `contestants`
--

INSERT INTO `contestants` (`idContestant`, `name`, `age`, `address`, `gender`, `image`, `categoryID`, `rank`, `contestantNo`) VALUES
(24, 'Rolan Valencia', 21, 'barangay nalasin', 'male', '../contestant_image/image.png.png', 9, NULL, 'M1'),
(25, 'Violet', 21, 'barangay nalasin', 'female', '../contestant_image/image.png.png', 9, NULL, 'F1'),
(26, 'secondTest', 21, 'barangay nalasin', 'female', '../contestant_image/image.png.png', 9, NULL, 'F2'),
(75, 'Daryll Joy E. Valdez', 19, 'BS-Development Communication', 'female', '../contestant_image/F1.1.jpg', 21, 13, 'F1'),
(76, 'Daryll Joy E. Valdez', 19, 'BS-Development Communication', 'female', '../contestant_image/F1.1.jpg', 22, 8, 'F1'),
(77, 'Daryll Joy E. Valdez', 19, 'BS-Development Communication', 'female', '../contestant_image/F1.1.jpg', 23, 9, 'F1'),
(78, 'Daryll Joy E. Valdez', 19, 'BS-Development Communication', 'female', '../contestant_image/F1.1.jpg', 24, 14, 'F1'),
(79, 'Daryll Joy E. Valdez', 19, 'BS-Development Communication', 'female', '../contestant_image/F1.1.jpg', 25, 2, 'F1'),
(80, 'Daryll Joy E. Valdez', 19, 'BS-Development Communication', 'female', '../contestant_image/F1.1.jpg', 26, 11, 'F1'),
(81, 'Lorie Anne M. Linggato', 21, 'BS-Agriculture', 'female', '../contestant_image/F2.jpg', 21, 14, 'F2'),
(82, 'Lorie Anne M. Linggato', 21, 'BS-Agriculture', 'female', '../contestant_image/F2.jpg', 22, 9, 'F2'),
(83, 'Lorie Anne M. Linggato', 21, 'BS-Agriculture', 'female', '../contestant_image/F2.jpg', 23, 2, 'F2'),
(84, 'Lorie Anne M. Linggato', 21, 'BS-Agriculture', 'female', '../contestant_image/F2.jpg', 24, 8, 'F2'),
(85, 'Lorie Anne M. Linggato', 21, 'BS-Agriculture', 'female', '../contestant_image/F2.jpg', 25, 13, 'F2'),
(86, 'Lorie Anne M. Linggato', 21, 'BS-Agriculture', 'female', '../contestant_image/F2.jpg', 26, 10, 'F2'),
(87, 'Lovely M. Britos', 21, 'BS-Agro Forestry', 'female', '../contestant_image/F3.jpg', 21, 5, 'F3'),
(88, 'Lovely M. Britos', 21, 'BS-Agro Forestry', 'female', '../contestant_image/F3.jpg', 22, 13, 'F3'),
(89, 'Lovely M. Britos', 21, 'BS-Agro Forestry', 'female', '../contestant_image/F3.jpg', 23, 14, 'F3'),
(90, 'Lovely M. Britos', 21, 'BS-Agro Forestry', 'female', '../contestant_image/F3.jpg', 24, 9, 'F3'),
(91, 'Lovely M. Britos', 21, 'BS-Agro Forestry', 'female', '../contestant_image/F3.jpg', 25, 10, 'F3'),
(92, 'Lovely M. Britos', 21, 'BS-Agro Forestry', 'female', '../contestant_image/F3.jpg', 26, 9, 'F3'),
(93, 'Mariecris L. Ordoñez', 21, 'BS-Agriculture', 'female', '../contestant_image/F4.jpg', 21, 3, 'F4'),
(94, 'Mariecris L. Ordoñez', 21, 'BS-Agriculture', 'female', '../contestant_image/F4.jpg', 22, 10, 'F4'),
(95, 'Mariecris L. Ordoñez', 21, 'BS-Agriculture', 'female', '../contestant_image/F4.jpg', 23, 3, 'F4'),
(96, 'Mariecris L. Ordoñez', 21, 'BS-Agriculture', 'female', '../contestant_image/F4.jpg', 24, 10, 'F4'),
(97, 'Mariecris L. Ordoñez', 21, 'BS-Agriculture', 'female', '../contestant_image/F4.jpg', 25, 7, 'F4'),
(98, 'Mariecris L. Ordoñez', 21, 'BS-Agriculture', 'female', '../contestant_image/F4.jpg', 26, 6, 'F4'),
(99, 'Anne Jenrich P. Buquing', 21, 'BS-Agricultural And Biosystems Engineering', 'female', '../contestant_image/F5.jpg', 21, 2, 'F5'),
(100, 'Anne Jenrich P. Buquing', 21, 'BS-Agricultural And Biosystems Engineering', 'female', '../contestant_image/F5.jpg', 22, 5, 'F5'),
(101, 'Anne Jenrich P. Buquing', 21, 'BS-Agricultural And Biosystems Engineering', 'female', '../contestant_image/F5.jpg', 23, 4, 'F5'),
(102, 'Anne Jenrich P. Buquing', 21, 'BS-Agricultural And Biosystems Engineering', 'female', '../contestant_image/F5.jpg', 24, 2, 'F5'),
(103, 'Anne Jenrich P. Buquing', 21, 'BS-Agricultural And Biosystems Engineering', 'female', '../contestant_image/F5.jpg', 25, 3, 'F5'),
(104, 'Anne Jenrich P. Buquing', 21, 'BS-Agricultural And Biosystems Engineering', 'female', '../contestant_image/F5.jpg', 26, 2, 'F5'),
(105, 'Rima P. Camading', 20, 'BS-Agro Forestry', 'female', '../contestant_image/F6.jpg', 21, 6, 'F6'),
(106, 'Rima P. Camading', 20, 'BS-Agro Forestry', 'female', '../contestant_image/F6.jpg', 22, 3, 'F6'),
(107, 'Rima P. Camading', 20, 'BS-Agro Forestry', 'female', '../contestant_image/F6.jpg', 23, 7, 'F6'),
(108, 'Rima P. Camading', 20, 'BS-Agro Forestry', 'female', '../contestant_image/F6.jpg', 24, 12, 'F6'),
(109, 'Rima P. Camading', 20, 'BS-Agro Forestry', 'female', '../contestant_image/F6.jpg', 25, 11, 'F6'),
(110, 'Rima P. Camading', 20, 'BS-Agro Forestry', 'female', '../contestant_image/F6.jpg', 26, 13, 'F6'),
(111, 'Micah Ellah D. Cabuag', 21, 'BS-Agriculture', 'female', '../contestant_image/F7.jpg', 21, 7, 'F7'),
(112, 'Micah Ellah D. Cabuag', 21, 'BS-Agriculture', 'female', '../contestant_image/F7.jpg', 22, 6, 'F7'),
(113, 'Micah Ellah D. Cabuag', 21, 'BS-Agriculture', 'female', '../contestant_image/F7.jpg', 23, 5, 'F7'),
(114, 'Micah Ellah D. Cabuag', 21, 'BS-Agriculture', 'female', '../contestant_image/F7.jpg', 24, 1, 'F7'),
(115, 'Micah Ellah D. Cabuag', 21, 'BS-Agriculture', 'female', '../contestant_image/F7.jpg', 25, 12, 'F7'),
(116, 'Micah Ellah D. Cabuag', 21, 'BS-Agriculture', 'female', '../contestant_image/F7.jpg', 26, 7, 'F7'),
(117, 'Bryan Loyd G. Palino', 21, 'BS-Development Communication', 'male', '../contestant_image/M1.jpg', 21, 8, 'M1'),
(118, 'Bryan Loyd G. Palino', 21, 'BS-Development Communication', 'male', '../contestant_image/M1.jpg', 22, 12, 'M1'),
(119, 'Bryan Loyd G. Palino', 21, 'BS-Development Communication', 'male', '../contestant_image/M1.jpg', 23, 8, 'M1'),
(120, 'Bryan Loyd G. Palino', 21, 'BS-Development Communication', 'male', '../contestant_image/M1.jpg', 24, 13, 'M1'),
(121, 'Bryan Loyd G. Palino', 21, 'BS-Development Communication', 'male', '../contestant_image/M1.jpg', 25, 14, 'M1'),
(122, 'Bryan Loyd G. Palino', 21, 'BS-Development Communication', 'male', '../contestant_image/M1.jpg', 26, 8, 'M1'),
(123, 'Nikko R. Polonio', 21, 'BS-Agriculture', 'male', '../contestant_image/M2.jpg', 21, 4, 'M2'),
(124, 'Nikko R. Polonio', 21, 'BS-Agriculture', 'male', '../contestant_image/M2.jpg', 22, 4, 'M2'),
(125, 'Nikko R. Polonio', 21, 'BS-Agriculture', 'male', '../contestant_image/M2.jpg', 23, 10, 'M2'),
(126, 'Nikko R. Polonio', 21, 'BS-Agriculture', 'male', '../contestant_image/M2.jpg', 24, 7, 'M2'),
(127, 'Nikko R. Polonio', 21, 'BS-Agriculture', 'male', '../contestant_image/M2.jpg', 25, 1, 'M2'),
(128, 'Nikko R. Polonio', 21, 'BS-Agriculture', 'male', '../contestant_image/M2.jpg', 26, 4, 'M2'),
(129, 'Joshua D. Lupadit', 21, 'BS-Agro Forestry', 'male', '../contestant_image/M3.jpg', 21, 1, 'M3'),
(130, 'Joshua D. Lupadit', 21, 'BS-Agro Forestry', 'male', '../contestant_image/M3.jpg', 22, 1, 'M3'),
(131, 'Joshua D. Lupadit', 21, 'BS-Agro Forestry', 'male', '../contestant_image/M3.jpg', 23, 1, 'M3'),
(132, 'Joshua D. Lupadit', 21, 'BS-Agro Forestry', 'male', '../contestant_image/M3.jpg', 24, 6, 'M3'),
(133, 'Joshua D. Lupadit', 21, 'BS-Agro Forestry', 'male', '../contestant_image/M3.jpg', 25, 6, 'M3'),
(134, 'Joshua D. Lupadit', 21, 'BS-Agro Forestry', 'male', '../contestant_image/M3.jpg', 26, 1, 'M3'),
(135, 'Hanz L. Baguingan', 21, 'BS-Agriculture', 'male', '../contestant_image/M4.jpg', 21, 9, 'M4'),
(136, 'Hanz L. Baguingan', 21, 'BS-Agriculture', 'male', '../contestant_image/M4.jpg', 22, 11, 'M4'),
(137, 'Hanz L. Baguingan', 21, 'BS-Agriculture', 'male', '../contestant_image/M4.jpg', 23, 11, 'M4'),
(138, 'Hanz L. Baguingan', 21, 'BS-Agriculture', 'male', '../contestant_image/M4.jpg', 24, 3, 'M4'),
(139, 'Hanz L. Baguingan', 21, 'BS-Agriculture', 'male', '../contestant_image/M4.jpg', 25, 4, 'M4'),
(140, 'Hanz L. Baguingan', 21, 'BS-Agriculture', 'male', '../contestant_image/M4.jpg', 26, 5, 'M4'),
(141, 'John Thomas Rigor', 21, 'BS-Agricultural and Biosystems Engineering', 'male', '../contestant_image/M5.jpg', 21, 10, 'M5'),
(142, 'John Thomas Rigor', 21, 'BS-Agricultural and Biosystems Engineering', 'male', '../contestant_image/M5.jpg', 22, 7, 'M5'),
(143, 'John Thomas Rigor', 21, 'BS-Agricultural and Biosystems Engineering', 'male', '../contestant_image/M5.jpg', 23, 6, 'M5'),
(144, 'John Thomas Rigor', 21, 'BS-Agricultural and Biosystems Engineering', 'male', '../contestant_image/M5.jpg', 24, 4, 'M5'),
(145, 'John Thomas Rigor', 21, 'BS-Agricultural and Biosystems Engineering', 'male', '../contestant_image/M5.jpg', 25, 9, 'M5'),
(146, 'John Thomas Rigor', 21, 'BS-Agricultural and Biosystems Engineering', 'male', '../contestant_image/M5.jpg', 26, 12, 'M5'),
(147, 'Eddie Boy Q. Rosendo', 21, 'BS-Agro Forestry', 'male', '../contestant_image/M6.jpg', 21, 11, 'M6'),
(148, 'Eddie Boy Q. Rosendo', 21, 'BS-Agro Forestry', 'male', '../contestant_image/M6.jpg', 22, 2, 'M6'),
(149, 'Eddie Boy Q. Rosendo', 21, 'BS-Agro Forestry', 'male', '../contestant_image/M6.jpg', 23, 12, 'M6'),
(150, 'Eddie Boy Q. Rosendo', 21, 'BS-Agro Forestry', 'male', '../contestant_image/M6.jpg', 24, 5, 'M6'),
(151, 'Eddie Boy Q. Rosendo', 21, 'BS-Agro Forestry', 'male', '../contestant_image/M6.jpg', 25, 5, 'M6'),
(152, 'Eddie Boy Q. Rosendo', 21, 'BS-Agro Forestry', 'male', '../contestant_image/M6.jpg', 26, 3, 'M6'),
(153, 'Jem Zeus D. Dumag', 21, 'BS-Agriculture', 'male', '../contestant_image/M7.jpg', 21, 12, 'M7'),
(154, 'Jem Zeus D. Dumag', 21, 'BS-Agriculture', 'male', '../contestant_image/M7.jpg', 22, 14, 'M7'),
(155, 'Jem Zeus D. Dumag', 21, 'BS-Agriculture', 'male', '../contestant_image/M7.jpg', 23, 13, 'M7'),
(156, 'Jem Zeus D. Dumag', 21, 'BS-Agriculture', 'male', '../contestant_image/M7.jpg', 24, 11, 'M7'),
(157, 'Jem Zeus D. Dumag', 21, 'BS-Agriculture', 'male', '../contestant_image/M7.jpg', 25, 8, 'M7'),
(158, 'Jem Zeus D. Dumag', 21, 'BS-Agriculture', 'male', '../contestant_image/M7.jpg', 26, 14, 'M7');

-- --------------------------------------------------------

--
-- Table structure for table `criteria`
--

CREATE TABLE `criteria` (
  `criteriaID` int NOT NULL,
  `criteriaName` varchar(255) NOT NULL,
  `categoryID` int DEFAULT NULL,
  `criteriaScore` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `criteria`
--

INSERT INTO `criteria` (`criteriaID`, `criteriaName`, `categoryID`, `criteriaScore`) VALUES
(62, 'Best in Production', 21, 10),
(63, 'Best in Type-A', 22, 10),
(64, 'Best in Shorts Wear', 23, 10),
(65, 'Best in Gown/Formal Attire', 24, 20),
(66, 'Most Articulate', 25, 30),
(67, 'Beauty & Poise', 26, 20);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `eventID` int NOT NULL,
  `eventName` varchar(255) NOT NULL,
  `eventDescription` text,
  `eventImage` varchar(255) NOT NULL,
  `eventDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventID`, `eventName`, `eventDescription`, `eventImage`, `eventDate`) VALUES
(19, 'Mr. and Ms. CAFED 2024', 'Get ready to witness the talent, grace, and charisma of our incredible candidates at the College of Agriculture, Forestry, Engineering and Dev Com (CAFED) of the Ilocos Sur Polytechnic State College. ', '../EventUploads/IMG_2562_6473.png', '2024-10-04');

-- --------------------------------------------------------

--
-- Table structure for table `judges`
--

CREATE TABLE `judges` (
  `judgeID` int NOT NULL,
  `judgeName` varchar(255) NOT NULL,
  `judgePassword` varchar(255) DEFAULT NULL,
  `userType` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `judges`
--

INSERT INTO `judges` (`judgeID`, `judgeName`, `judgePassword`, `userType`) VALUES
(5, 'adminDL', '202cb962ac59075b964b07152d234b70', 'admin'),
(21, 'adminPersonaTab', '202cb962ac59075b964b07152d234b70', 'admin'),
(29, 'cafedAdmin', '202cb962ac59075b964b07152d234b70', 'admin'),
(30, 'cafjudge', '202cb962ac59075b964b07152d234b70', 'user'),
(31, 'judge1', '202cb962ac59075b964b07152d234b70', 'user'),
(32, 'Phoebe Gabatino', '202cb962ac59075b964b07152d234b70', 'user'),
(33, 'Rb Caceres', '202cb962ac59075b964b07152d234b70', 'user'),
(34, 'Mart Hizon', '202cb962ac59075b964b07152d234b70', 'user'),
(35, 'Iya Albayalde', '202cb962ac59075b964b07152d234b70', 'user'),
(36, 'dec1', '202cb962ac59075b964b07152d234b70', 'user'),
(37, 'dec2', '202cb962ac59075b964b07152d234b70', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `judge_categories`
--

CREATE TABLE `judge_categories` (
  `judgeID` int NOT NULL,
  `categoryID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `judge_categories`
--

INSERT INTO `judge_categories` (`judgeID`, `categoryID`) VALUES
(9, 9),
(33, 21),
(34, 21),
(35, 21),
(33, 22),
(34, 22),
(35, 22),
(33, 23),
(34, 23),
(35, 23),
(33, 24),
(34, 24),
(35, 24),
(33, 25),
(34, 25),
(35, 25),
(33, 26),
(34, 26),
(35, 26);

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `scoreID` int NOT NULL,
  `judgeID` int DEFAULT NULL,
  `contestantID` int DEFAULT NULL,
  `categoryID` int DEFAULT NULL,
  `criterionID` int DEFAULT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  `rank` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`scoreID`, `judgeID`, `contestantID`, `categoryID`, `criterionID`, `score`, `rank`) VALUES
(661, 33, 75, 21, 62, 8.00, 8),
(662, 33, 81, 21, 62, 8.00, 9),
(663, 33, 87, 21, 62, 9.00, 3),
(664, 33, 93, 21, 62, 9.00, 4),
(665, 33, 99, 21, 62, 10.00, 1),
(666, 33, 105, 21, 62, 9.00, 5),
(667, 33, 111, 21, 62, 9.00, 6),
(668, 33, 117, 21, 62, 8.00, 10),
(669, 33, 123, 21, 62, 9.00, 7),
(670, 33, 129, 21, 62, 10.00, 2),
(671, 33, 135, 21, 62, 8.00, 11),
(672, 33, 141, 21, 62, 8.00, 12),
(673, 33, 147, 21, 62, 8.00, 13),
(674, 33, 153, 21, 62, 8.00, 14),
(675, 33, 76, 22, 63, 8.00, 9),
(676, 33, 82, 22, 63, 8.00, 10),
(677, 33, 88, 22, 63, 8.00, 11),
(678, 33, 94, 22, 63, 9.00, 6),
(679, 33, 100, 22, 63, 10.00, 1),
(680, 33, 106, 22, 63, 9.00, 7),
(681, 33, 112, 22, 63, 10.00, 2),
(682, 33, 118, 22, 63, 7.00, 14),
(683, 33, 124, 22, 63, 10.00, 3),
(684, 33, 130, 22, 63, 8.00, 12),
(685, 33, 136, 22, 63, 10.00, 4),
(686, 33, 142, 22, 63, 9.00, 8),
(687, 33, 148, 22, 63, 10.00, 5),
(688, 33, 154, 22, 63, 8.00, 13),
(689, 33, 77, 23, 64, 8.00, 4),
(690, 33, 83, 23, 64, 8.00, 5),
(691, 33, 89, 23, 64, 7.00, 14),
(692, 33, 95, 23, 64, 8.00, 6),
(693, 33, 101, 23, 64, 8.00, 7),
(694, 33, 107, 23, 64, 8.00, 8),
(695, 33, 113, 23, 64, 9.00, 2),
(696, 33, 119, 23, 64, 8.00, 9),
(697, 33, 125, 23, 64, 8.00, 10),
(698, 33, 131, 23, 64, 10.00, 1),
(699, 33, 137, 23, 64, 9.00, 3),
(700, 33, 143, 23, 64, 8.00, 11),
(701, 33, 149, 23, 64, 8.00, 12),
(702, 33, 155, 23, 64, 8.00, 13),
(703, 33, 78, 24, 65, 8.00, 9),
(704, 33, 84, 24, 65, 9.00, 4),
(705, 33, 90, 24, 65, 8.00, 10),
(706, 33, 96, 24, 65, 9.00, 5),
(707, 33, 102, 24, 65, 10.00, 1),
(708, 33, 108, 24, 65, 8.00, 11),
(709, 33, 114, 24, 65, 10.00, 2),
(710, 33, 120, 24, 65, 8.00, 12),
(711, 33, 126, 24, 65, 10.00, 3),
(712, 33, 132, 24, 65, 9.00, 6),
(713, 33, 138, 24, 65, 9.00, 7),
(714, 33, 144, 24, 65, 8.00, 13),
(715, 33, 150, 24, 65, 9.00, 8),
(716, 33, 156, 24, 65, 8.00, 14),
(717, 33, 79, 25, 66, 28.00, 1),
(718, 33, 85, 25, 66, 15.00, 13),
(719, 33, 91, 25, 66, 17.00, 11),
(720, 33, 97, 25, 66, 20.00, 5),
(721, 33, 103, 25, 66, 25.00, 2),
(722, 33, 109, 25, 66, 17.00, 12),
(723, 33, 115, 25, 66, 20.00, 6),
(724, 33, 121, 25, 66, 0.00, 14),
(725, 33, 127, 25, 66, 25.00, 3),
(726, 33, 133, 25, 66, 20.00, 7),
(727, 33, 139, 25, 66, 23.00, 4),
(728, 33, 145, 25, 66, 18.00, 9),
(729, 33, 151, 25, 66, 20.00, 8),
(730, 33, 157, 25, 66, 18.00, 10),
(731, 33, 80, 26, 67, 17.00, 9),
(732, 33, 86, 26, 67, 17.00, 10),
(733, 33, 92, 26, 67, 17.00, 11),
(734, 33, 98, 26, 67, 18.00, 8),
(735, 33, 104, 26, 67, 19.00, 4),
(736, 33, 110, 26, 67, 17.00, 12),
(737, 33, 116, 26, 67, 20.00, 1),
(738, 33, 122, 26, 67, 19.00, 5),
(739, 33, 128, 26, 67, 20.00, 2),
(740, 33, 134, 26, 67, 20.00, 3),
(741, 33, 140, 26, 67, 19.00, 6),
(742, 33, 146, 26, 67, 17.00, 13),
(743, 33, 152, 26, 67, 19.00, 7),
(744, 33, 158, 26, 67, 17.00, 14),
(745, 34, 75, 21, 62, 7.00, 11),
(746, 34, 81, 21, 62, 7.00, 12),
(747, 34, 87, 21, 62, 7.00, 13),
(748, 34, 93, 21, 62, 9.00, 3),
(749, 34, 99, 21, 62, 10.00, 1),
(750, 34, 105, 21, 62, 8.00, 8),
(751, 34, 111, 21, 62, 8.00, 9),
(752, 34, 117, 21, 62, 9.00, 4),
(753, 34, 123, 21, 62, 9.00, 5),
(754, 34, 129, 21, 62, 10.00, 2),
(755, 34, 135, 21, 62, 9.00, 6),
(756, 34, 141, 21, 62, 8.00, 10),
(757, 34, 147, 21, 62, 9.00, 7),
(758, 34, 153, 21, 62, 7.00, 14),
(759, 34, 76, 22, 63, 9.00, 7),
(760, 34, 82, 22, 63, 10.00, 2),
(761, 34, 88, 22, 63, 7.00, 13),
(762, 34, 94, 22, 63, 8.00, 9),
(763, 34, 100, 22, 63, 10.00, 3),
(764, 34, 106, 22, 63, 10.00, 4),
(765, 34, 112, 22, 63, 9.00, 8),
(766, 34, 118, 22, 63, 8.00, 10),
(767, 34, 124, 22, 63, 10.00, 5),
(768, 34, 130, 22, 63, 18.00, 1),
(769, 34, 136, 22, 63, 8.00, 11),
(770, 34, 142, 22, 63, 8.00, 12),
(771, 34, 148, 22, 63, 10.00, 6),
(772, 34, 154, 22, 63, 7.00, 14),
(773, 34, 77, 23, 64, 9.00, 5),
(774, 34, 83, 23, 64, 10.00, 1),
(775, 34, 89, 23, 64, 7.00, 13),
(776, 34, 95, 23, 64, 9.00, 6),
(777, 34, 101, 23, 64, 10.00, 2),
(778, 34, 107, 23, 64, 9.00, 7),
(779, 34, 113, 23, 64, 10.00, 3),
(780, 34, 119, 23, 64, 8.00, 9),
(781, 34, 125, 23, 64, 8.00, 10),
(782, 34, 131, 23, 64, 10.00, 4),
(783, 34, 137, 23, 64, 7.00, 14),
(784, 34, 143, 23, 64, 9.00, 8),
(785, 34, 149, 23, 64, 8.00, 11),
(786, 34, 155, 23, 64, 8.00, 12),
(787, 34, 78, 24, 65, 15.00, 14),
(788, 34, 84, 24, 65, 18.00, 7),
(789, 34, 90, 24, 65, 17.00, 11),
(790, 34, 96, 24, 65, 18.00, 8),
(791, 34, 102, 24, 65, 19.00, 4),
(792, 34, 108, 24, 65, 17.00, 12),
(793, 34, 114, 24, 65, 20.00, 1),
(794, 34, 120, 24, 65, 18.00, 9),
(795, 34, 126, 24, 65, 17.00, 13),
(796, 34, 132, 24, 65, 18.00, 10),
(797, 34, 138, 24, 65, 19.00, 5),
(798, 34, 144, 24, 65, 20.00, 2),
(799, 34, 150, 24, 65, 20.00, 3),
(800, 34, 156, 24, 65, 19.00, 6),
(801, 34, 79, 25, 66, 27.00, 2),
(802, 34, 85, 25, 66, 10.00, 12),
(803, 34, 91, 25, 66, 25.00, 4),
(804, 34, 97, 25, 66, 24.00, 7),
(805, 34, 103, 25, 66, 25.00, 5),
(806, 34, 109, 25, 66, 15.00, 11),
(807, 34, 115, 25, 66, 10.00, 13),
(808, 34, 121, 25, 66, 0.00, 14),
(809, 34, 127, 25, 66, 28.00, 1),
(810, 34, 133, 25, 66, 27.00, 3),
(811, 34, 139, 25, 66, 24.00, 8),
(812, 34, 145, 25, 66, 20.00, 10),
(813, 34, 151, 25, 66, 25.00, 6),
(814, 34, 157, 25, 66, 23.00, 9),
(815, 34, 80, 26, 67, 16.00, 11),
(816, 34, 86, 26, 67, 17.00, 8),
(817, 34, 92, 26, 67, 18.00, 6),
(818, 34, 98, 26, 67, 19.00, 4),
(819, 34, 104, 26, 67, 20.00, 1),
(820, 34, 110, 26, 67, 15.00, 13),
(821, 34, 116, 26, 67, 17.00, 9),
(822, 34, 122, 26, 67, 17.00, 10),
(823, 34, 128, 26, 67, 18.00, 7),
(824, 34, 134, 26, 67, 20.00, 2),
(825, 34, 140, 26, 67, 19.00, 5),
(826, 34, 146, 26, 67, 16.00, 12),
(827, 34, 152, 26, 67, 20.00, 3),
(828, 34, 158, 26, 67, 15.00, 14),
(829, 35, 75, 21, 62, 8.00, 7),
(830, 35, 81, 21, 62, 8.00, 8),
(831, 35, 87, 21, 62, 9.00, 3),
(832, 35, 93, 21, 62, 10.00, 1),
(833, 35, 99, 21, 62, 9.00, 4),
(834, 35, 105, 21, 62, 8.00, 9),
(835, 35, 111, 21, 62, 8.00, 10),
(836, 35, 117, 21, 62, 8.00, 11),
(837, 35, 123, 21, 62, 8.00, 12),
(838, 35, 129, 21, 62, 10.00, 2),
(839, 35, 135, 21, 62, 8.00, 13),
(840, 35, 141, 21, 62, 9.00, 5),
(841, 35, 147, 21, 62, 8.00, 14),
(842, 35, 153, 21, 62, 9.00, 6),
(843, 35, 76, 22, 63, 9.00, 6),
(844, 35, 82, 22, 63, 8.00, 11),
(845, 35, 88, 22, 63, 9.00, 7),
(846, 35, 94, 22, 63, 9.00, 8),
(847, 35, 100, 22, 63, 8.00, 12),
(848, 35, 106, 22, 63, 10.00, 1),
(849, 35, 112, 22, 63, 9.00, 9),
(850, 35, 118, 22, 63, 10.00, 2),
(851, 35, 124, 22, 63, 9.00, 10),
(852, 35, 130, 22, 63, 10.00, 3),
(853, 35, 136, 22, 63, 8.00, 13),
(854, 35, 142, 22, 63, 10.00, 4),
(855, 35, 148, 22, 63, 10.00, 5),
(856, 35, 154, 22, 63, 8.00, 14),
(857, 35, 77, 23, 64, 8.00, 12),
(858, 35, 83, 23, 64, 10.00, 1),
(859, 35, 89, 23, 64, 9.00, 6),
(860, 35, 95, 23, 64, 10.00, 2),
(861, 35, 101, 23, 64, 9.00, 7),
(862, 35, 107, 23, 64, 9.00, 8),
(863, 35, 113, 23, 64, 8.00, 13),
(864, 35, 119, 23, 64, 10.00, 3),
(865, 35, 125, 23, 64, 9.00, 9),
(866, 35, 131, 23, 64, 10.00, 4),
(867, 35, 137, 23, 64, 9.00, 10),
(868, 35, 143, 23, 64, 10.00, 5),
(869, 35, 149, 23, 64, 9.00, 11),
(870, 35, 155, 23, 64, 8.00, 14),
(871, 35, 78, 24, 65, 17.00, 14),
(872, 35, 84, 24, 65, 18.00, 10),
(873, 35, 90, 24, 65, 20.00, 1),
(874, 35, 96, 24, 65, 18.00, 11),
(875, 35, 102, 24, 65, 19.00, 6),
(876, 35, 108, 24, 65, 19.00, 7),
(877, 35, 114, 24, 65, 20.00, 2),
(878, 35, 120, 24, 65, 18.00, 12),
(879, 35, 126, 24, 65, 19.00, 8),
(880, 35, 132, 24, 65, 20.00, 3),
(881, 35, 138, 24, 65, 20.00, 4),
(882, 35, 144, 24, 65, 20.00, 5),
(883, 35, 150, 24, 65, 19.00, 9),
(884, 35, 156, 24, 65, 18.00, 13),
(885, 35, 79, 25, 66, 27.00, 3),
(886, 35, 85, 25, 66, 10.00, 13),
(887, 35, 91, 25, 66, 18.00, 11),
(888, 35, 97, 25, 66, 22.00, 8),
(889, 35, 103, 25, 66, 28.00, 2),
(890, 35, 109, 25, 66, 20.00, 9),
(891, 35, 115, 25, 66, 15.00, 12),
(892, 35, 121, 25, 66, 10.00, 14),
(893, 35, 127, 25, 66, 30.00, 1),
(894, 35, 133, 25, 66, 20.00, 10),
(895, 35, 139, 25, 66, 25.00, 5),
(896, 35, 145, 25, 66, 23.00, 7),
(897, 35, 151, 25, 66, 26.00, 4),
(898, 35, 157, 25, 66, 25.00, 6),
(899, 35, 80, 26, 67, 20.00, 1),
(900, 35, 86, 26, 67, 20.00, 2),
(901, 35, 92, 26, 67, 20.00, 3),
(902, 35, 98, 26, 67, 20.00, 4),
(903, 35, 104, 26, 67, 20.00, 5),
(904, 35, 110, 26, 67, 20.00, 6),
(905, 35, 116, 26, 67, 20.00, 7),
(906, 35, 122, 26, 67, 20.00, 8),
(907, 35, 128, 26, 67, 20.00, 9),
(908, 35, 134, 26, 67, 20.00, 10),
(909, 35, 140, 26, 67, 20.00, 11),
(910, 35, 146, 26, 67, 20.00, 12),
(911, 35, 152, 26, 67, 20.00, 13),
(912, 35, 158, 26, 67, 20.00, 14);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryID`),
  ADD KEY `eventID` (`eventID`);

--
-- Indexes for table `contestants`
--
ALTER TABLE `contestants`
  ADD PRIMARY KEY (`idContestant`),
  ADD KEY `fk_category` (`categoryID`);

--
-- Indexes for table `criteria`
--
ALTER TABLE `criteria`
  ADD PRIMARY KEY (`criteriaID`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`eventID`);

--
-- Indexes for table `judges`
--
ALTER TABLE `judges`
  ADD PRIMARY KEY (`judgeID`),
  ADD UNIQUE KEY `judgeName` (`judgeName`);

--
-- Indexes for table `judge_categories`
--
ALTER TABLE `judge_categories`
  ADD PRIMARY KEY (`judgeID`,`categoryID`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`scoreID`),
  ADD UNIQUE KEY `unique_score` (`judgeID`,`contestantID`,`criterionID`,`categoryID`),
  ADD KEY `contestantID` (`contestantID`),
  ADD KEY `criterionID` (`criterionID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `contestants`
--
ALTER TABLE `contestants`
  MODIFY `idContestant` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT for table `criteria`
--
ALTER TABLE `criteria`
  MODIFY `criteriaID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `judges`
--
ALTER TABLE `judges`
  MODIFY `judgeID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `scoreID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=913;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`eventID`) REFERENCES `events` (`eventID`);

--
-- Constraints for table `contestants`
--
ALTER TABLE `contestants`
  ADD CONSTRAINT `contestants_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`categoryID`),
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`categoryID`);

--
-- Constraints for table `criteria`
--
ALTER TABLE `criteria`
  ADD CONSTRAINT `criteria_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`categoryID`);

--
-- Constraints for table `judge_categories`
--
ALTER TABLE `judge_categories`
  ADD CONSTRAINT `judge_categories_ibfk_1` FOREIGN KEY (`judgeID`) REFERENCES `judges` (`judgeID`),
  ADD CONSTRAINT `judge_categories_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`categoryID`);

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`contestantID`) REFERENCES `contestants` (`idContestant`),
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`criterionID`) REFERENCES `criteria` (`criteriaID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
