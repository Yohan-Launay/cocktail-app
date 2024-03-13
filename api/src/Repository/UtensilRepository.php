<?php

namespace App\Repository;

use App\Entity\Utensil;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Utensil>
 *
 * @method Utensil|null find($id, $lockMode = null, $lockVersion = null)
 * @method Utensil|null findOneBy(array $criteria, array $orderBy = null)
 * @method Utensil[]    findAll()
 * @method Utensil[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UtensilRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Utensil::class);
    }

    //    /**
    //     * @return Utensil[] Returns an array of Utensil objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('u.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Utensil
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
