<?php

namespace Checker\Repository;

use Checker\Entity\GameMove;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method GameMove|null find($id, $lockMode = null, $lockVersion = null)
 * @method GameMove|null findOneBy(array $criteria, array $orderBy = null)
 * @method GameMove[]    findAll()
 * @method GameMove[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameMoveRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GameMove::class);
    }

    // /**
    //  * @return GameMove[] Returns an array of GameMove objects
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
    public function findOneBySomeField($value): ?GameMove
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
