-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 03, 2024 at 07:11 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `personatab`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryID` int(11) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `eventID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryID`, `categoryName`, `eventID`) VALUES
(1, 'Best in Production Number', 1),
(2, 'Best in Sports Attire', 1),
(3, 'Best in Festival Attire', 1),
(4, 'Best in Long Gown/Formal Attire', 1),
(5, 'Question and Answer', 1),
(6, 'Web Development', 5);

-- --------------------------------------------------------

--
-- Table structure for table `contestants`
--

CREATE TABLE `contestants` (
  `idContestant` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `image` varchar(255) NOT NULL,
  `categoryID` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `contestantNo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contestants`
--

INSERT INTO `contestants` (`idContestant`, `name`, `age`, `address`, `gender`, `image`, `categoryID`, `rank`, `contestantNo`) VALUES
(1, 'DL Gamoso', 20, 'Candon', 'male', '../contestant_image/mepic.jpg', 1, 3, 'M1'),
(2, 'Phoebe Gabatino', 20, 'Candon City', 'female', '../contestant_image/mobe.jfif', 1, 1, 'F1'),
(3, 'DL', 20, 'Candon', 'male', '../contestant_image/mepic.jpg', 1, 6, 'M2'),
(4, 'Cyrell', 20, 'Narvacan', 'male', '../contestant_image/mepic.jpg', 1, 5, 'M3'),
(5, 'violet', 20, 'Candon', 'female', '../contestant_image/sw8.jfif', 1, 4, 'F2'),
(6, 'shanne takki', 20, 'Santa Maria', 'female', '../contestant_image/sw8.jfif', 1, 2, 'F3'),
(7, 'DL Gamoso', 20, 'Candon', 'male', '../contestant_image/sw8.jfif', 2, 4, ''),
(8, 'Phoebe Gabatino', 20, 'Candon', 'female', '../contestant_image/ispsc.png', 2, 3, ''),
(9, 'DL', 20, 'Candon', 'male', '../contestant_image/mepic.jpg', 2, 2, ''),
(10, 'Cyrell', 20, 'Narvacan', 'male', '../contestant_image/mepic.jpg', 2, 1, ''),
(11, 'violet', 20, 'Santa Maria', 'female', '../contestant_image/sw8.jfif', 2, 6, ''),
(12, 'shanne takki', 20, 'Santa Maria', 'female', '../contestant_image/sw8.jfif', 2, 5, ''),
(19, 'Test2', 12, 'asd', 'male', '../contestant_image/ispsc.png', 4, 2, 'M5'),
(20, 'Test3', 21, 'asd', 'male', '../contestant_image/ispsc.png', 3, 1, 'M6'),
(21, 'Test3', 21, 'asd', 'male', '../contestant_image/ispsc.png', 4, 1, 'M6'),
(22, 'Test3', 21, 'asd', 'male', '../contestant_image/ispsc.png', 5, 1, 'M6');

-- --------------------------------------------------------

--
-- Table structure for table `criteria`
--

CREATE TABLE `criteria` (
  `criteriaID` int(11) NOT NULL,
  `criteriaName` varchar(255) NOT NULL,
  `categoryID` int(11) DEFAULT NULL,
  `criteriaScore` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `criteria`
--

INSERT INTO `criteria` (`criteriaID`, `criteriaName`, `categoryID`, `criteriaScore`) VALUES
(1, 'Poise and Bearing', 1, 30),
(2, 'Mastery', 1, 30),
(3, 'Self-Introduction', 1, 30),
(4, 'Overall Impact', 1, 10),
(5, 'Figure', 2, 30),
(6, 'Sports Identity', 2, 20),
(7, 'Poise and Bearing', 2, 30),
(8, 'Overall Impact', 2, 10),
(9, 'Creative Design', 3, 20),
(10, 'Stage Presence', 3, 20),
(11, 'Poise and Bearing', 3, 30),
(12, 'Overall Impact', 3, 10),
(13, 'Design and Fitting', 4, 20),
(14, 'Stage Deportment', 4, 30),
(15, 'Poise and Bearing', 4, 40),
(16, 'Overall Impact', 4, 10),
(17, 'Wit and Content', 5, 40),
(18, 'Stage Presence', 5, 20),
(19, 'Projection & Delivery', 5, 30),
(20, 'Overall Impact', 5, 10);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `eventID` int(11) NOT NULL,
  `eventName` varchar(255) NOT NULL,
  `eventDescription` text DEFAULT NULL,
  `eventImage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventID`, `eventName`, `eventDescription`, `eventImage`) VALUES
(1, 'Beauty Testing', 'beauty testing', '../EventUploads/ispsc_5009.png'),
(2, 'Event Image', 'asd', '../EventUploads/ispsc_3952.png'),
(3, 'CBME', 'asd', '../EventUploads/ispsc_5009.png'),
(4, 'Event Image', 'asd', '../EventUploads/ispsc_2885.png'),
(5, 'CCS Web dev', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sit fugit quia odit a suscipit aut iste nisi earum porro quas asperiores labore nostrum, repellendus nobis. Impedit unde repellendus perferendis? Quisquam vitae iure blanditiis cum saepe suscipit. Repellat, aspernatur. Amet.', '../EventUploads/ccs_4303.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `judges`
--

CREATE TABLE `judges` (
  `judgeID` int(11) NOT NULL,
  `judgeName` varchar(255) NOT NULL,
  `judgePassword` varchar(255) DEFAULT NULL,
  `userType` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `judges`
--

INSERT INTO `judges` (`judgeID`, `judgeName`, `judgePassword`, `userType`) VALUES
(1, 'DL', '202cb962ac59075b964b07152d234b70', 'user'),
(2, 'Jeriel', '202cb962ac59075b964b07152d234b70', 'user'),
(3, 'Shanne', '202cb962ac59075b964b07152d234b70', 'user'),
(4, 'Rikzon', '202cb962ac59075b964b07152d234b70', 'user'),
(5, 'admin', '202cb962ac59075b964b07152d234b70', 'admin'),
(7, 'Mobe', '202cb962ac59075b964b07152d234b70', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `judge_categories`
--

CREATE TABLE `judge_categories` (
  `judgeID` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `judge_categories`
--

INSERT INTO `judge_categories` (`judgeID`, `categoryID`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(3, 1),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 5);

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `scoreID` int(11) NOT NULL,
  `judgeID` int(11) DEFAULT NULL,
  `contestantID` int(11) DEFAULT NULL,
  `categoryID` int(11) DEFAULT NULL,
  `criterionID` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`scoreID`, `judgeID`, `contestantID`, `categoryID`, `criterionID`, `score`, `rank`) VALUES
(1, 1, 1, 1, 1, 20, 6),
(2, 1, 1, 1, 2, 30, 6),
(3, 1, 1, 1, 3, 20, 6),
(4, 1, 1, 1, 4, 1, 6),
(5, 1, 2, 1, 1, 30, 5),
(6, 1, 2, 1, 2, 20, 5),
(7, 1, 2, 1, 3, 20, 5),
(8, 1, 2, 1, 4, 5, 5),
(9, 1, 3, 1, 1, 8, 4),
(10, 1, 3, 1, 2, 9, 4),
(11, 1, 3, 1, 3, 10, 4),
(12, 1, 3, 1, 4, 3, 4),
(13, 1, 4, 1, 1, 11, 3),
(14, 1, 4, 1, 2, 12, 3),
(15, 1, 4, 1, 3, 13, 3),
(16, 1, 4, 1, 4, 4, 3),
(17, 1, 5, 1, 1, 14, 2),
(18, 1, 5, 1, 2, 15, 2),
(19, 1, 5, 1, 3, 16, 2),
(20, 1, 5, 1, 4, 5, 2),
(21, 1, 6, 1, 1, 17, 1),
(22, 1, 6, 1, 2, 18, 1),
(23, 1, 6, 1, 3, 19, 1),
(24, 1, 6, 1, 4, 6, 1),
(25, 1, 7, 2, 5, 15, 4),
(26, 1, 7, 2, 6, 9, 4),
(27, 1, 7, 2, 7, 8, 4),
(28, 1, 7, 2, 8, 7, 4),
(29, 1, 8, 2, 5, 16, 3),
(30, 1, 8, 2, 6, 10, 3),
(31, 1, 8, 2, 7, 7, 3),
(32, 1, 8, 2, 8, 8, 3),
(33, 1, 9, 2, 5, 17, 2),
(34, 1, 9, 2, 6, 11, 2),
(35, 1, 9, 2, 7, 6, 2),
(36, 1, 9, 2, 8, 9, 2),
(37, 1, 10, 2, 5, 18, 1),
(38, 1, 10, 2, 6, 12, 1),
(39, 1, 10, 2, 7, 5, 1),
(40, 1, 10, 2, 8, 10, 1),
(41, 1, 11, 2, 5, 19, 6),
(42, 1, 11, 2, 6, 13, 6),
(43, 1, 11, 2, 7, 4, 6),
(44, 1, 11, 2, 8, 1, 6),
(45, 1, 12, 2, 5, 20, 5),
(46, 1, 12, 2, 6, 14, 5),
(47, 1, 12, 2, 7, 3, 5),
(48, 1, 12, 2, 8, 2, 5),
(49, 4, 1, 1, 1, 1, 6),
(50, 4, 1, 1, 2, 2, 6),
(51, 4, 1, 1, 3, 3, 6),
(52, 4, 1, 1, 4, 4, 6),
(53, 4, 2, 1, 1, 4, 1),
(54, 4, 2, 1, 2, 4, 1),
(55, 4, 2, 1, 3, 4, 1),
(56, 4, 2, 1, 4, 4, 1),
(57, 4, 3, 1, 1, 4, 2),
(58, 4, 3, 1, 2, 4, 2),
(59, 4, 3, 1, 3, 4, 2),
(60, 4, 3, 1, 4, 4, 2),
(61, 4, 4, 1, 1, 4, 3),
(62, 4, 4, 1, 2, 4, 3),
(63, 4, 4, 1, 3, 4, 3),
(64, 4, 4, 1, 4, 4, 3),
(65, 4, 5, 1, 1, 4, 4),
(66, 4, 5, 1, 2, 4, 4),
(67, 4, 5, 1, 3, 4, 4),
(68, 4, 5, 1, 4, 4, 4),
(69, 4, 6, 1, 1, 4, 5),
(70, 4, 6, 1, 2, 4, 5),
(71, 4, 6, 1, 3, 4, 5),
(72, 4, 6, 1, 4, 4, 5),
(73, 4, 7, 2, 5, 4, 1),
(74, 4, 7, 2, 6, 4, 1),
(75, 4, 7, 2, 7, 4, 1),
(76, 4, 7, 2, 8, 4, 1),
(77, 4, 8, 2, 5, 4, 2),
(78, 4, 8, 2, 6, 4, 2),
(79, 4, 8, 2, 7, 4, 2),
(80, 4, 8, 2, 8, 4, 2),
(81, 4, 9, 2, 5, 4, 3),
(82, 4, 9, 2, 6, 4, 3),
(83, 4, 9, 2, 7, 4, 3),
(84, 4, 9, 2, 8, 4, 3),
(85, 4, 10, 2, 5, 4, 4),
(86, 4, 10, 2, 6, 4, 4),
(87, 4, 10, 2, 7, 4, 4),
(88, 4, 10, 2, 8, 4, 4),
(89, 4, 11, 2, 5, 4, 5),
(90, 4, 11, 2, 6, 4, 5),
(91, 4, 11, 2, 7, 4, 5),
(92, 4, 11, 2, 8, 4, 5),
(93, 4, 12, 2, 5, 4, 6),
(94, 4, 12, 2, 6, 4, 6),
(95, 4, 12, 2, 7, 4, 6),
(96, 4, 12, 2, 8, 4, 6),
(97, 3, 1, 1, 1, 1, 6),
(98, 3, 1, 1, 2, 4, 6),
(99, 3, 1, 1, 3, 1, 6),
(100, 3, 1, 1, 4, 1, 6),
(101, 3, 2, 1, 1, 2, 5),
(102, 3, 2, 1, 2, 4, 5),
(103, 3, 2, 1, 3, 2, 5),
(104, 3, 2, 1, 4, 2, 5),
(105, 3, 3, 1, 1, 3, 4),
(106, 3, 3, 1, 2, 4, 4),
(107, 3, 3, 1, 3, 3, 4),
(108, 3, 3, 1, 4, 3, 4),
(109, 3, 4, 1, 1, 4, 3),
(110, 3, 4, 1, 2, 3, 3),
(111, 3, 4, 1, 3, 4, 3),
(112, 3, 4, 1, 4, 4, 3),
(113, 3, 5, 1, 1, 4, 2),
(114, 3, 5, 1, 2, 3, 2),
(115, 3, 5, 1, 3, 5, 2),
(116, 3, 5, 1, 4, 5, 2),
(117, 3, 6, 1, 1, 5, 1),
(118, 3, 6, 1, 2, 3, 1),
(119, 3, 6, 1, 3, 6, 1),
(120, 3, 6, 1, 4, 5, 1),
(121, 7, 2, 1, 1, 1, 2),
(122, 7, 2, 1, 2, 6, 2),
(123, 7, 2, 1, 3, 3, 2),
(124, 7, 2, 1, 4, 4, 2),
(125, 7, 5, 1, 1, 2, 5),
(126, 7, 5, 1, 2, 4, 5),
(127, 7, 5, 1, 3, 3, 5),
(128, 7, 5, 1, 4, 4, 5),
(129, 7, 6, 1, 1, 3, 6),
(130, 7, 6, 1, 2, 3, 6),
(131, 7, 6, 1, 3, 3, 6),
(132, 7, 6, 1, 4, 4, 6),
(133, 7, 1, 1, 1, 4, 3),
(134, 7, 1, 1, 2, 3, 3),
(135, 7, 1, 1, 3, 3, 3),
(136, 7, 1, 1, 4, 4, 3),
(137, 7, 3, 1, 1, 4, 4),
(138, 7, 3, 1, 2, 3, 4),
(139, 7, 3, 1, 3, 3, 4),
(140, 7, 3, 1, 4, 4, 4),
(141, 7, 4, 1, 1, 5, 1),
(142, 7, 4, 1, 2, 3, 1),
(143, 7, 4, 1, 3, 3, 1),
(144, 7, 4, 1, 4, 4, 1),
(145, 7, 8, 2, 5, 5, 1),
(146, 7, 8, 2, 6, 6, 1),
(147, 7, 8, 2, 7, 7, 1),
(148, 7, 8, 2, 8, 8, 1),
(149, 7, 11, 2, 5, 5, 2),
(150, 7, 11, 2, 6, 6, 2),
(151, 7, 11, 2, 7, 7, 2),
(152, 7, 11, 2, 8, 8, 2),
(153, 7, 12, 2, 5, 5, 3),
(154, 7, 12, 2, 6, 6, 3),
(155, 7, 12, 2, 7, 7, 3),
(156, 7, 12, 2, 8, 8, 3),
(157, 7, 7, 2, 5, 5, 4),
(158, 7, 7, 2, 6, 6, 4),
(159, 7, 7, 2, 7, 7, 4),
(160, 7, 7, 2, 8, 8, 4),
(161, 7, 9, 2, 5, 5, 5),
(162, 7, 9, 2, 6, 6, 5),
(163, 7, 9, 2, 7, 7, 5),
(164, 7, 9, 2, 8, 8, 5),
(165, 7, 10, 2, 5, 5, 6),
(166, 7, 10, 2, 6, 6, 6),
(167, 7, 10, 2, 7, 7, 6),
(168, 7, 10, 2, 8, 8, 6),
(169, 7, 20, 3, 9, 9, 1),
(170, 7, 20, 3, 10, 11, 1),
(171, 7, 20, 3, 11, 12, 1),
(172, 7, 20, 3, 12, 10, 1),
(173, 7, 19, 4, 13, 9, 2),
(174, 7, 19, 4, 14, 11, 2),
(175, 7, 19, 4, 15, 12, 2),
(176, 7, 19, 4, 16, 10, 2),
(177, 7, 21, 4, 13, 12, 1),
(178, 7, 21, 4, 14, 12, 1),
(179, 7, 21, 4, 15, 12, 1),
(180, 7, 21, 4, 16, 10, 1),
(181, 7, 22, 5, 17, 12, 1),
(182, 7, 22, 5, 18, 12, 1),
(183, 7, 22, 5, 19, 21, 1),
(184, 7, 22, 5, 20, 2, 1);

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
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `contestants`
--
ALTER TABLE `contestants`
  MODIFY `idContestant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `criteria`
--
ALTER TABLE `criteria`
  MODIFY `criteriaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `judges`
--
ALTER TABLE `judges`
  MODIFY `judgeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `scoreID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

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
