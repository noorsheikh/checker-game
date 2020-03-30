<?php

namespace Checker\Repository;

use Checker\Entity\GameStatus;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method GameStatus|null find($id, $lockMode = null, $lockVersion = null)
 * @method GameStatus|null findOneBy(array $criteria, array $orderBy = null)
 * @method GameStatus[]    findAll()
 * @method GameStatus[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameStatusRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GameStatus::class);
    }

    // /**
    //  * @return GameStatus[] Returns an array of GameStatus objects
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
    public function findOneBySomeField($value): ?GameStatus
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
