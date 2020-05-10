<?php

namespace Checker\Repository;

use Checker\Entity\Game;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Game|null find($id, $lockMode = null, $lockVersion = null)
 * @method Game|null findOneBy(array $criteria, array $orderBy = null)
 * @method Game[]    findAll()
 * @method Game[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Game::class);
    }

    public function updateGamesStatus(\DateTimeImmutable $currentDate)
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = "
            UPDATE game
            SET
                `game_status` = 'completed',
                winner_id = IF(`player_turn`=1,`player1_id`,`player2_id`)
            WHERE game_status = 'in-progress'
                AND updated_at IS NOT NULL
                AND DATEDIFF(?, updated_at) > 7
                AND player_turn != 0
        ";

        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $currentDate->format('Y-m-d H:i:s'));
        return $stmt->execute();
    }

    public function deleteGames(\DateTimeImmutable $currentDate)
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = "
            DELETE game FROM game
            WHERE game_status = 'not-started'
                AND updated_at IS NULL
                AND DATEDIFF(?, created_at) > 7
        ";

        $stmt = $conn->prepare($sql);
        $stmt->bindValue(1, $currentDate->format('Y-m-d H:i:s'));
        return $stmt->execute();
    }
}
