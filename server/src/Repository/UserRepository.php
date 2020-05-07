<?php

namespace Checker\Repository;

use Checker\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

class UserRepository extends ServiceEntityRepository
{
  public function __construct(ManagerRegistry $registry)
  {
    parent::__construct($registry, User::class);
  }

  public function getLeaderboard()
  {
    $conn = $this->getEntityManager()->getConnection();

    $sql = '
      SELECT DISTINCT
        u.id,
        u.username,
        (SELECT COUNT(g1.id) FROM game AS g1 WHERE g1.winner_id = u.id) AS wins,
        (SELECT COUNT(g2.id) FROM game AS g2 WHERE (g2.player1_id = u.id OR g2.player2_id = u.id) AND g2.winner_id IS NOT NULL) AS numGames,
        (SELECT numGames) - (SELECT wins) AS losses,
        (SELECT wins) / (SELECT numGames) AS winRatio
      FROM user AS u
      LEFT JOIN game g ON (g.player1_id = u.id OR g.player2_id = u.id)
      WHERE g.winner_id IS NOT NULL
      ORDER BY wins DESC,
        winRatio DESC,
        losses ASC';

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    return $stmt->fetchAll();
  }
}
