# Code Static Analysis Report 24-4-2020
$ ./vendor/bin/phpstan analyse src
 16/16 [============================] 100%

 ------ --------------------------------------------
  Line   Repository\UserStatusRepository.php
 ------ --------------------------------------------
  19     Class Checker\Entity\UserStatus not found.
 ------ --------------------------------------------

 ------ ---------------------------------------------------------------------------------
  Line   Security\JwtAuthenticator.php
 ------ ---------------------------------------------------------------------------------
  81     Access to an undefined property Checker\Security\JwtAuthenticator::$dispatcher.
 ------ ---------------------------------------------------------------------------------


 [ERROR] Found 2 errors


manish@ ~/new/24mar/checker-game/server (security_fix)
$                                                                                                                                                             
