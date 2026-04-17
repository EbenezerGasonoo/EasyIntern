<?php
/**
 * cPanel/LiteSpeed often looks for index.php before index.html.
 * Serve the built Vite index so "/" loads the React app instead of directory listing.
 */
declare(strict_types=1);
header('Content-Type: text/html; charset=utf-8');
readfile(__DIR__ . '/index.html');
