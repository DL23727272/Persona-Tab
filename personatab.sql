-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 23, 2024 at 06:53 PM
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
(1, 'Best in Sports Attire', 1),
(2, 'Question and Answer', 1),
(3, 'Web Development', 1);

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
(1, 'Shanne Cabotaje', 20, 'Santa Maria', 'female', '../contestant_image/sw8.jfif', 1, 1),
(3, 'Mhariz Adona', 20, 'Narvacan', 'female', '../contestant_image/ispsc.png', 2, 2),
(4, 'violet', 21, 'Candon', 'female', '../contestant_image/sw8.jfif', 2, 1),
(5, 'Dran Leynard', 21, 'asd', 'male', '../contestant_image/DL.png', 3, NULL);

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
(1, 'Figure', 1, 30),
(2, 'Sports Identity', 1, 20),
(3, 'Poise and Bearing', 1, 40),
(4, 'Overall Impact', 1, 10),
(5, 'Wit and Content', 2, 40),
(6, 'Stage Presence', 2, 20),
(7, 'Projection & Delivery', 2, 30),
(8, 'Overall Impact', 2, 10),
(9, 'Design', 3, 40),
(10, 'Functionality', 3, 60);

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
(1, 'CCS', 'CCS WEEK');

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
(1, 3),
(4, 1),
(4, 2);

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
(1, 4, 1, 1, 1, 1, 1),
(2, 4, 1, 1, 2, 2, 1),
(3, 4, 1, 1, 3, 3, 1),
(4, 4, 1, 1, 4, 4, 1),
(5, 4, 3, 2, 5, 5, 2),
(6, 4, 3, 2, 6, 20, 2),
(7, 4, 3, 2, 7, 17, 2),
(8, 4, 3, 2, 8, 8, 2),
(9, 4, 4, 2, 5, 1, 1),
(10, 4, 4, 2, 6, 10, 1),
(11, 4, 4, 2, 7, 11, 1),
(12, 4, 4, 2, 8, 2, 1);

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
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contestants`
--
ALTER TABLE `contestants`
  MODIFY `idContestant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `criteria`
--
ALTER TABLE `criteria`
  MODIFY `criteriaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `scoreID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
