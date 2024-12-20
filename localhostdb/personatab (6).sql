-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2024 at 01:50 PM
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
(14, 'Final Round', 16),
(15, 'Preliminary Round', 16),
(17, 'Denim Attire', 18),
(18, 'Sports Wear', 18),
(19, 'Question & Answer', 18),
(20, 'testttt', 18),
(21, 'semis', 19),
(22, 'finals', 19),
(24, 'ccc', 20);

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
(1, 'DL Gamoso', 20, 'Candon', 'male', '../contestant_image/mepic.jpg', 1, 1, 'M1'),
(2, 'Phoebe Gabatino', 20, 'Candon City', 'female', '../contestant_image/mobe.jfif', 1, 2, 'F1'),
(3, 'DL', 20, 'Candon', 'male', '../contestant_image/mepic.jpg', 1, 3, 'M2'),
(5, 'violets', 20, 'Candon', 'female', '../contestant_image/sw8.jfif', 1, 4, 'F2'),
(6, 'shanne takki', 20, 'Santa Maria', 'female', '../contestant_image/sw8.jfif', 1, 5, 'F3'),
(7, 'DL Gamoso', 20, 'Candon', 'male', '../contestant_image/sw8.jfif', 2, 1, 'M1'),
(8, 'Phoebe Gabatino', 20, 'Candon', 'female', '../contestant_image/ispsc.png', 2, 2, 'F1'),
(9, 'DL', 20, 'Candon', 'male', '../contestant_image/mepic.jpg', 2, 3, 'M2'),
(10, 'Cyrell', 20, 'Narvacan', 'male', '../contestant_image/mepic.jpg', 2, 4, 'M3'),
(11, 'violet', 20, 'Santa Maria', 'female', '../contestant_image/sw8.jfif', 2, 5, 'F2'),
(12, 'shanne takki', 20, 'Santa Maria', 'female', '../contestant_image/sw8.jfif', 2, 6, 'F3'),
(19, 'Test2', 12, 'asd', 'male', '../contestant_image/ispsc.png', 4, 1, 'M5'),
(20, 'Test3', 21, 'asd', 'male', '../contestant_image/ispsc.png', 3, 1, 'M6'),
(21, 'Test3', 21, 'asd', 'male', '../contestant_image/ispsc.png', 4, 2, 'M6'),
(25, 'jerie', 21, 'Santa Maria', 'male', '../contestant_image/sw8.jfif', 2, 7, 'M7'),
(26, 'jerie', 21, 'Santa Maria', 'male', '../contestant_image/sw8.jfif', 3, 2, 'M7'),
(27, 'jerie', 21, 'Santa Maria', 'male', '../contestant_image/sw8.jfif', 4, 3, 'M7'),
(31, 'ccs male', 21, '123', 'male', '../contestant_image/sw8.jfif', 14, 1, 'M1'),
(32, 'ccs male', 21, '123', 'male', '../contestant_image/sw8.jfif', 15, 2, 'M1'),
(34, 'zdcasd', 121, 'sfsfd', 'male', '../contestant_image/sw8.jfif', 17, 2, 'M1'),
(35, 'zdcasd', 121, 'sfsfd', 'male', '../contestant_image/sw8.jfif', 18, 2, 'M1'),
(36, 'zdcasd', 121, 'sfsfd', 'male', '../contestant_image/sw8.jfif', 19, 1, 'M1'),
(37, 'acsas', 213, 'fsd', 'male', '../contestant_image/sw8.jfif', 17, 1, 'M2'),
(38, 'acsas', 213, 'fsd', 'male', '../contestant_image/sw8.jfif', 18, 1, 'M2'),
(39, 'acsas', 213, 'fsd', 'male', '../contestant_image/sw8.jfif', 19, 2, 'M2'),
(40, 'asd', 21, 'asd', 'male', '../contestant_image/takki.jfif', 14, 2, 'M2'),
(41, 'asd', 21, 'asd', 'male', '../contestant_image/takki.jfif', 15, 3, 'M2'),
(42, 'DL Gamoso', 21, 'Candon', 'male', '../contestant_image/takki.jfif', 14, 3, 'M3'),
(43, 'DL Gamoso', 21, 'Candon', 'male', '../contestant_image/takki.jfif', 15, 1, 'M3');

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
(1, 'Poise and Bearing', 1, 20),
(2, 'Mastery', 1, 30),
(3, 'Self-Introduction', 1, 30),
(4, 'Overall Impact', 1, 10),
(5, 'Figure', 2, 30),
(6, 'Sports Identity', 2, 20),
(7, 'Poise and Bearing', 2, 30),
(9, 'Creative Design', 3, 20),
(10, 'Stage Presence', 3, 20),
(11, 'Poise and Bearing', 3, 30),
(12, 'Overall Impact', 3, 10),
(13, 'Design & Fitting', 4, 20),
(14, 'Stage Deportment', 4, 30),
(15, 'Poise and Bearing', 4, 40),
(16, 'Overall Impact', 4, 10),
(27, 'Beauty of Face', 15, 40),
(28, 'Stage Projection or Presence', 15, 30),
(29, 'Ability to Answer Questions', 15, 20),
(30, 'Overall Appeal', 15, 10),
(31, 'Beauty of Face', 14, 40),
(32, 'Ability to Answer Questions', 14, 40),
(33, 'Overall Appeal', 14, 20),
(36, 'Denim-Attire', 17, 10),
(37, 'Sports-Wear', 18, 10),
(38, 'Question & Answer', 19, 60),
(39, 'adaw', 20, 12),
(40, 'resrs', 20, 15);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `eventID` int(11) NOT NULL,
  `eventName` varchar(255) NOT NULL,
  `eventDescription` text DEFAULT NULL,
  `eventImage` varchar(255) NOT NULL,
  `eventDate` date DEFAULT NULL,
  `bodyColor` varchar(7) DEFAULT NULL,
  `heroBackgroundImage` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventID`, `eventName`, `eventDescription`, `eventImage`, `eventDate`, `bodyColor`, `heroBackgroundImage`) VALUES
(1, 'Beauty Testing', 'beauty testing', '../EventUploads/ispsc_5821.png', '2024-09-29', NULL, NULL),
(16, 'Mr. and Miss CCS 2025', 'Mr. and Miss CCS 2025', '../EventUploads/ispsc_5413.png', '2024-11-20', NULL, NULL),
(18, 'Mr. & Ms. ISPSC 2024', 'sdfdsfsd', '../EventUploads/ispsc_2416.png', '2024-11-20', '#26349c', '../EventUploads/bg_9156.png'),
(19, 'codm ', 'adad', '../EventUploads/P_7756.png', '2024-10-07', NULL, NULL),
(20, 'testing event color and bg', 'asdad', '../EventUploads/ispsc_5662.png', '2024-11-20', '#917878', '../EventUploads/bg_7085.png');

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
(7, 'Mobe', '202cb962ac59075b964b07152d234b70', 'user'),
(25, 'jon', '202cb962ac59075b964b07152d234b70', 'user'),
(27, 'user', '698d51a19d8a121ce581499d7b701668', 'user'),
(28, 'ccs1', '202cb962ac59075b964b07152d234b70', 'user'),
(29, 'dec1', '202cb962ac59075b964b07152d234b70', 'user'),
(30, 'dec2', '202cb962ac59075b964b07152d234b70', 'user'),
(31, 'ray', '202cb962ac59075b964b07152d234b70', 'user'),
(32, 'ispsc1', '202cb962ac59075b964b07152d234b70', 'user'),
(33, 'ispsc2', '202cb962ac59075b964b07152d234b70', 'user'),
(34, 'ispsc3', '202cb962ac59075b964b07152d234b70', 'user'),
(35, 'ispsc4', '202cb962ac59075b964b07152d234b70', 'user'),
(36, 'color', '202cb962ac59075b964b07152d234b70', 'user'),
(37, 'jd', '202cb962ac59075b964b07152d234b70', 'user'),
(38, '222', '202cb962ac59075b964b07152d234b70', 'user');

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
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(25, 1),
(28, 14),
(28, 15),
(32, 17),
(32, 18),
(32, 19),
(33, 17),
(33, 18),
(33, 19),
(34, 17),
(34, 19),
(35, 19),
(36, 24),
(38, 17),
(38, 18),
(38, 19);

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
  `score` decimal(5,2) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`scoreID`, `judgeID`, `contestantID`, `categoryID`, `criterionID`, `score`, `rank`) VALUES
(2, 1, 2, 1, 1, '1.00', 1),
(3, 1, 2, 1, 2, '1.00', 1),
(4, 1, 2, 1, 3, '1.00', 1),
(5, 1, 2, 1, 4, '1.00', 1),
(6, 1, 5, 1, 1, '1.00', 2),
(7, 1, 5, 1, 2, '1.00', 2),
(8, 1, 5, 1, 3, '1.00', 2),
(9, 1, 5, 1, 4, '1.00', 2),
(10, 1, 6, 1, 1, '1.00', 3),
(11, 1, 6, 1, 2, '1.00', 3),
(12, 1, 6, 1, 3, '1.00', 3),
(13, 1, 6, 1, 4, '1.00', 3),
(14, 1, 1, 1, 1, '1.00', 4),
(15, 1, 1, 1, 2, '1.00', 4),
(16, 1, 1, 1, 3, '1.25', 4),
(17, 1, 1, 1, 4, '13.50', 4),
(18, 1, 3, 1, 1, '1.00', 5),
(19, 1, 3, 1, 2, '1.00', 5),
(20, 1, 3, 1, 3, '1.00', 5),
(21, 1, 3, 1, 4, '1.00', 5),
(22, 1, 8, 2, 5, '1.00', 1),
(23, 1, 8, 2, 6, '1.00', 1),
(24, 1, 8, 2, 7, '1.00', 1),
(26, 1, 11, 2, 5, '1.00', 2),
(27, 1, 11, 2, 6, '1.00', 2),
(28, 1, 11, 2, 7, '1.00', 2),
(30, 1, 12, 2, 5, '1.00', 3),
(31, 1, 12, 2, 6, '1.00', 3),
(32, 1, 12, 2, 7, '1.00', 3),
(34, 1, 7, 2, 5, '1.00', 4),
(35, 1, 7, 2, 6, '1.00', 4),
(36, 1, 7, 2, 7, '1.00', 4),
(38, 1, 9, 2, 5, '1.00', 5),
(39, 1, 9, 2, 6, '1.00', 5),
(40, 1, 9, 2, 7, '1.00', 5),
(42, 1, 10, 2, 5, '1.00', 6),
(43, 1, 10, 2, 6, '1.00', 6),
(44, 1, 10, 2, 7, '1.00', 6),
(46, 1, 20, 3, 9, '1.00', 1),
(47, 1, 20, 3, 10, '1.00', 1),
(48, 1, 20, 3, 11, '1.00', 1),
(49, 1, 20, 3, 12, '1.00', 1),
(50, 1, 19, 4, 13, '1.00', 1),
(51, 1, 19, 4, 14, '1.00', 1),
(52, 1, 19, 4, 15, '1.00', 1),
(53, 1, 19, 4, 16, '1.00', 1),
(54, 1, 21, 4, 13, '1.00', 2),
(55, 1, 21, 4, 14, '1.00', 2),
(56, 1, 21, 4, 15, '1.00', 2),
(57, 1, 21, 4, 16, '1.00', 2),
(96, 7, 2, 1, 1, '1.00', 1),
(97, 7, 2, 1, 2, '1.00', 1),
(98, 7, 2, 1, 3, '1.00', 1),
(99, 7, 2, 1, 4, '1.00', 1),
(100, 7, 5, 1, 1, '1.00', 2),
(101, 7, 5, 1, 2, '1.00', 2),
(102, 7, 5, 1, 3, '1.00', 2),
(103, 7, 5, 1, 4, '1.00', 2),
(104, 7, 6, 1, 1, '1.00', 3),
(105, 7, 6, 1, 2, '1.00', 3),
(106, 7, 6, 1, 3, '1.00', 3),
(107, 7, 6, 1, 4, '1.00', 3),
(108, 7, 1, 1, 1, '1.00', 4),
(109, 7, 1, 1, 2, '1.00', 4),
(110, 7, 1, 1, 3, '1.00', 4),
(111, 7, 1, 1, 4, '1.00', 4),
(112, 7, 3, 1, 1, '1.00', 5),
(113, 7, 3, 1, 2, '1.00', 5),
(114, 7, 3, 1, 3, '1.00', 5),
(115, 7, 3, 1, 4, '1.00', 5),
(116, 7, 8, 2, 5, '1.00', 1),
(117, 7, 8, 2, 6, '1.00', 1),
(118, 7, 8, 2, 7, '1.00', 1),
(119, 7, 11, 2, 5, '1.00', 2),
(120, 7, 11, 2, 6, '1.00', 2),
(121, 7, 11, 2, 7, '1.00', 2),
(122, 7, 12, 2, 5, '1.00', 3),
(123, 7, 12, 2, 6, '1.00', 3),
(124, 7, 12, 2, 7, '1.00', 3),
(125, 7, 7, 2, 5, '1.00', 4),
(126, 7, 7, 2, 6, '1.00', 4),
(127, 7, 7, 2, 7, '1.00', 4),
(128, 7, 9, 2, 5, '1.00', 5),
(129, 7, 9, 2, 6, '1.00', 5),
(130, 7, 9, 2, 7, '1.00', 5),
(131, 7, 10, 2, 5, '1.00', 6),
(132, 7, 10, 2, 6, '1.00', 6),
(133, 7, 10, 2, 7, '1.00', 6),
(134, 7, 25, 2, 5, '1.00', 7),
(135, 7, 25, 2, 6, '1.00', 7),
(136, 7, 25, 2, 7, '1.00', 7),
(137, 7, 20, 3, 9, '1.00', 1),
(138, 7, 20, 3, 10, '1.00', 1),
(139, 7, 20, 3, 11, '1.00', 1),
(140, 7, 20, 3, 12, '1.00', 1),
(141, 7, 26, 3, 9, '1.00', 2),
(142, 7, 26, 3, 10, '1.00', 2),
(143, 7, 26, 3, 11, '1.00', 2),
(144, 7, 26, 3, 12, '1.00', 2),
(145, 7, 19, 4, 13, '1.00', 1),
(146, 7, 19, 4, 14, '1.00', 1),
(147, 7, 19, 4, 15, '1.00', 1),
(148, 7, 19, 4, 16, '1.00', 1),
(149, 7, 21, 4, 13, '1.00', 2),
(150, 7, 21, 4, 14, '1.00', 2),
(151, 7, 21, 4, 15, '1.00', 2),
(152, 7, 21, 4, 16, '1.00', 2),
(153, 7, 27, 4, 13, '1.00', 3),
(154, 7, 27, 4, 14, '1.00', 3),
(155, 7, 27, 4, 15, '1.00', 3),
(156, 7, 27, 4, 16, '1.00', 3),
(170, 33, 34, 17, 36, '5.50', 2),
(171, 33, 37, 17, 36, '5.60', 1),
(172, 33, 35, 18, 37, '6.70', 2),
(173, 33, 38, 18, 37, '8.80', 1),
(174, 33, 36, 19, 38, '58.60', 2),
(175, 33, 39, 19, 38, '56.90', 1),
(176, 32, 34, 17, 36, '20.00', 1),
(177, 32, 37, 17, 36, '12.40', 2),
(178, 32, 35, 18, 37, '15.00', 2),
(179, 32, 38, 18, 37, '16.00', 1),
(180, 32, 36, 19, 38, '70.00', 1),
(181, 32, 39, 19, 38, '69.00', 2),
(193, 34, 34, 17, 36, '1.50', 2),
(194, 34, 37, 17, 36, '10.00', 1),
(195, 34, 36, 19, 38, '59.90', 1),
(196, 34, 39, 19, 38, '55.00', 2),
(211, 28, 31, 14, 31, '1.00', 1),
(212, 28, 31, 14, 32, '3.50', 1),
(213, 28, 31, 14, 33, '4.00', 1),
(214, 28, 40, 14, 31, '1.00', 1),
(215, 28, 40, 14, 32, '4.00', 1),
(216, 28, 40, 14, 33, '3.50', 1),
(217, 28, 42, 14, 31, '1.00', 3),
(218, 28, 42, 14, 32, '1.00', 3),
(219, 28, 42, 14, 33, '1.00', 3),
(220, 28, 32, 15, 27, '1.00', 2),
(221, 28, 32, 15, 28, '1.00', 2),
(222, 28, 32, 15, 29, '1.00', 2),
(223, 28, 32, 15, 30, '2.00', 2),
(224, 28, 41, 15, 27, '1.00', 2),
(225, 28, 41, 15, 28, '1.00', 2),
(226, 28, 41, 15, 29, '2.00', 2),
(227, 28, 41, 15, 30, '1.00', 2),
(228, 28, 43, 15, 27, '3.00', 1),
(229, 28, 43, 15, 28, '3.00', 1),
(230, 28, 43, 15, 29, '3.00', 1),
(231, 28, 43, 15, 30, '2.00', 1),
(232, 38, 34, 17, 36, '1.60', 2),
(233, 38, 37, 17, 36, '4.60', 1),
(234, 38, 35, 18, 37, '3.00', 2),
(235, 38, 38, 18, 37, '3.50', 1),
(236, 38, 36, 19, 38, '44.00', 1),
(237, 38, 39, 19, 38, '44.00', 1);

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
  ADD KEY `scores_ibfk_2` (`criterionID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `contestants`
--
ALTER TABLE `contestants`
  MODIFY `idContestant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `criteria`
--
ALTER TABLE `criteria`
  MODIFY `criteriaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `judges`
--
ALTER TABLE `judges`
  MODIFY `judgeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `scoreID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=238;

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
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`criterionID`) REFERENCES `criteria` (`criteriaID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
