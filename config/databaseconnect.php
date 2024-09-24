import dotenv from 'dotenv';

<?php

$servername = process.env.DB_HOST;
$database = process.env.DB_NAME;
$username =process.env.DB_USER;
$password = process.env.DB_PASSWORD, ;
// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
mysqli_close($conn);
?>