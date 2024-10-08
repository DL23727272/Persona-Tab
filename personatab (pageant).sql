-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2024 at 04:24 PM
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
(5, 'Question and Answer', 1);

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
  `rank` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contestants`
--

INSERT INTO `contestants` (`idContestant`, `name`, `age`, `address`, `gender`, `image`, `categoryID`, `rank`) VALUES
(1, 'DL Gamoso', 20, 'Candon', 'male', '../contestant_image/LOGO.png', 1, 6),
(2, 'Phoebe Gabatino', 20, 'Candon', 'female', '../contestant_image/mobe.jfif', 1, 5),
(3, 'DL', 20, 'Candon', 'male', '../contestant_image/LOGO.png', 1, 4),
(4, 'Cyrell', 20, 'Narvacan', 'male', '../contestant_image/sw8.jfif', 1, 3),
(5, 'violet', 20, 'Candon', 'female', '../contestant_image/sw8.jfif', 1, 2),
(6, 'shanne takki', 20, 'Santa Maria', 'female', '../contestant_image/sw8.jfif', 1, 1),
(7, 'DL Gamoso', 20, 'Candon', 'male', '../contestant_image/sw8.jfif', 2, 4),
(8, 'Phoebe Gabatino', 20, 'Candon', 'female', '../contestant_image/ispsc.png', 2, 3),
(9, 'DL', 20, 'Candon', 'male', '../contestant_image/LOGO.png', 2, 2),
(10, 'Cyrell', 20, 'Narvacan', 'male', '../contestant_image/LOGO.png', 2, 1),
(11, 'violet', 20, 'Santa Maria', 'female', '../contestant_image/sw8.jfif', 2, 6),
(12, 'shanne takki', 20, 'Santa Maria', 'female', '../contestant_image/sw8.jfif', 2, 5);

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
  `eventDescription` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventID`, `eventName`, `eventDescription`) VALUES
(1, 'Beauty Testing', 'beauty testing');

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
(5, 'admin', '202cb962ac59075b964b07152d234b70', 'admin');

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
(1, 5);

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
(48, 1, 12, 2, 8, 2, 5);

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
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `contestants`
--
ALTER TABLE `contestants`
  MODIFY `idContestant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `criteria`
--
ALTER TABLE `criteria`
  MODIFY `criteriaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `judges`
--
ALTER TABLE `judges`
  MODIFY `judgeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `scoreID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

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
