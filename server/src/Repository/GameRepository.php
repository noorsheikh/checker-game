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

    // /**
    //  * @return Game[] Returns an array of Game objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Game
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    public function getCurrentGames(int $userId)
    {
        $em = $this->getEntityManager();

        $query = $em->createQueryBuilder()
            ->select('g.id,
                IDENTITY(g.player1) as player1,
                IDENTITY(g.player2) as player2,
                IDENTITY(g.winner) as winner,
                g.boardState,
                g.createdAt,
                g.updatedAt')
            ->from('Checker:Game', 'g')
            ->where('g.winner IS NULL')
            ->andWhere('g.player1 = :userId OR g.player2 = :userId')
            ->setParameter('userId', $userId)
            ->getQuery();

        return $query->getResult();
    }

    public function getFinishedGames()
    {
        $em = $this->getEntityManager();

        $query = $em->createQueryBuilder()
            ->select('g.id,
                IDENTITY(g.player1) as player1,
                IDENTITY(g.player2) as player2,
                IDENTITY(g.winner) as winner,
                g.boardState,
                g.createdAt,
                g.updatedAt')
            ->from('Checker:Game', 'g')
            ->where('g.winner IS NOT NULL')
            ->getQuery();

        return $query->getResult();
    }
}
