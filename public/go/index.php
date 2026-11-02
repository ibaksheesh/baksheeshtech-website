<?php
// Tracked links for job applications and client emails:
//   https://baksheeshtech.com/go/?c=<code>&to=portfolio|resume|cv|home
// Logs time, code, target and user agent (no IP) to go-clicks.log outside public_html,
// then redirects. Only the targets below are allowed, so this is not an open redirect.
// The daily job/client task reads the log over SSH and marks "Link opened" in the tracker.
date_default_timezone_set('Asia/Kolkata');

$targets = [
  'portfolio' => 'https://baksheeshtech.com/portfolio/',
  'resume'    => 'https://baksheeshtech.com/resume/',
  'cv'        => 'https://baksheeshtech.com/Baksheesh-Bhardwaj-Web-Developer-CV.pdf',
  'home'      => 'https://baksheeshtech.com/',
];

$to = (isset($_GET['to']) && is_string($_GET['to']) && isset($targets[$_GET['to']])) ? $_GET['to'] : 'home';
$code = (isset($_GET['c']) && is_string($_GET['c'])) ? substr(strtolower(preg_replace('/[^a-z0-9-]/i', '', $_GET['c'])), 0, 48) : '';

if ($code !== '') {
  $ua = isset($_SERVER['HTTP_USER_AGENT']) ? substr(preg_replace('/[\r\n\t]+/', ' ', $_SERVER['HTTP_USER_AGENT']), 0, 200) : '';
  $method = isset($_SERVER['REQUEST_METHOD']) ? substr(preg_replace('/[^A-Z]/', '', $_SERVER['REQUEST_METHOD']), 0, 8) : 'GET';
  $line = date('c') . "\t" . $code . "\t" . $to . "\t" . $method . "\t" . $ua . "\n";
  @file_put_contents(dirname(__DIR__, 2) . '/go-clicks.log', $line, FILE_APPEND | LOCK_EX);
}

header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');
header('Location: ' . $targets[$to], true, 302);
exit;
