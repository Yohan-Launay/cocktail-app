<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Step;
use App\Factory\CategoryFactory;
use App\Factory\CocktailFactory;
use App\Factory\IngredientFactory;
use App\Factory\ReviewFactory;
use App\Factory\StepFactory;
use App\Factory\UserFactory;
use App\Factory\UtensilFactory;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Validator\Constraints\Date;
use function Zenstruck\Foundry\faker;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {

        UserFactory::createOne(['dateBirthday' => new DateTime("1996-04-26"), 'email' => 'yohandeveloppe@gmail.com', 'password' => 'admin', 'roles' => ['ROLE_ADMIN'], 'username' => 'Flana']);
        UserFactory::createOne(['dateBirthday' => new DateTime("1996-11-28"), 'email' => 'lucie@gmail.com', 'password' => 'lucie', 'roles' => ['ROLE_USER'], 'username' => 'Leafmoon']);
        CategoryFactory::createMany(5);
        UtensilFactory::createMany(30);
        IngredientFactory::createMany(100);
        CocktailFactory::createMany(20);

        CocktailFactory::createOne([
           'name' => 'Mojito',
            'resume' => 'Le mojito1, prononcé [moˈxito] en espagnol, ou mojito, morito, ou mohito en français[réf. nécessaire]',
            'imgPath' => 'mojito.png',
            'etat' => true
        ]);


        ReviewFactory::createMany(50);
        StepFactory::createMany(40);


    }
}
