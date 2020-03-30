<?php

namespace Checker\Repository;

use Checker\Entity\GameUsers;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method GameUsers|null find($id, $lockMode = null, $lockVersion = null)
 * @method GameUsers|null findOneBy(array $criteria, array $orderBy = null)
 * @method GameUsers[]    findAll()
 * @method GameUsers[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameUsersRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, GameUsers::class);
    }

    // /**
    //  * @return GameUsers[] Returns an array of GameUsers objects
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
    public function findOneBySomeField($value): ?GameUsers
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
