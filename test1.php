<?php 

echo password_hash('1234',PASSWORD_DEFAULT ),"\n";
echo password_hash('1234',PASSWORD_DEFAULT ),"\n";
echo password_hash('1234',PASSWORD_DEFAULT ),"\n";
echo password_hash('1234',PASSWORD_DEFAULT ),"\n";
echo password_hash('1234',PASSWORD_DEFAULT ),"\n";
echo password_hash('1234',PASSWORD_DEFAULT ),"\n";

$ar = [
'$2y$10$OTM74iinnF99FqscuOrNie7UqBnsCO6A/QA3eNjmIGnMSW3J6sn2W',
'$2y$10$HYqsXSLu9uO9YvCOp8iAOORXDKRUbLMu75pokVFxQvVfUygj/Masi',
'$2y$10$5V5sO2wzUia3Qk2Rhoni4.x/ZXD.5VU/R2ECtuyLKlz7gS2MQmRsG',
'$2y$10$5CfcnzdlIUK8QFSOVbysKuvxmZyBx7cllQiuUfp/u7VwJjlAlIyQ.',
'$2y$10$CR8QPFiB4.ty2M21R6wtluL/yIuc7XG6cL6eHiDy1SgzJqTUU8UaW',
'$2y$10$h51KiBGYvtO035b7rE20..DV177Jwf/9rNsYKboq/4c9.JNmWvfQO21',
];

foreach ($ar as $hash) {
	if (password_verify('1234', $hash)) {
	    echo 'Password is valid!',"\n";
	} else {
	    echo 'Invalid password.',"\n";
	}
}
