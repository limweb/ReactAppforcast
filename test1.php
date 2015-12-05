<?php 

echo password_hash('aaaa',PASSWORD_DEFAULT ),"\n";
echo password_hash('aaaa',PASSWORD_DEFAULT ),"\n";
echo password_hash('aaaa',PASSWORD_DEFAULT ),"\n";
echo password_hash('aaaa',PASSWORD_DEFAULT ),"\n";
echo password_hash('aaaa',PASSWORD_DEFAULT ),"\n";
echo password_hash('aaaa',PASSWORD_DEFAULT ),"\n";

$ar = [
'$2y$10$UqDzYzfJQq4V999KyaZH9.qv9wUBCNUZ98hVoPkSOTpxcOZDv9.ii',
'$2y$10$n5SKRTaX0hKZqNNjj2Mpk..efhumIMGVcm3QCNxnwgs0bjoKKT5fe',
'$2y$10$dCD.xtI9.akYFRb2y0kqhONud2zRoEj5kXQ6wCQeF09CBh86ThKei',
'$2y$10$U5cZwfVLlfU1luuxHAtTXePoSOgy5S0g3hYQgncOGzuf9OVFShl8q',
'$2y$10$/aduxzgTAUFTa9CwHN5Re.VdovX4K.Zarl.lBykb/I2UuP4f3hKEe',
'$2y$10$ikUZe1aEI6JR3n9f/IPOL.xXTn1wzT3ajxkgK7x0yUNsiorAQcCju',
];

foreach ($ar as $hash) {
	if (password_verify('aaaa', $hash)) {
	    echo 'Password is valid!',"\n";
	} else {
	    echo 'Invalid password.',"\n";
	}
}
