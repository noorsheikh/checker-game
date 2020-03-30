<?php

namespace Checker\Repository;

use Checker\Entity\GameMoves;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method GameMoves|null find($id, $lockMode = null, $lockVersion = null)
 * @method GameMoves|null findOneBy(array $criteria, array $orderBy = null)
 * @method GameMoves[]    findAll()
 * @method GameMoves[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameMovesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GameMoves::class);
    }

    // /**
    //  * @return GameMoves[] Returns an array of GameMoves objects
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
    public function findOneBySomeField($value): ?GameMoves
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
