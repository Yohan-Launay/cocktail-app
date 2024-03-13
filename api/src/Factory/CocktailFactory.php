<?php

namespace App\Factory;

use App\Entity\Cocktail;
use App\Repository\CocktailRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Cocktail>
 *
 * @method        Cocktail|Proxy                     create(array|callable $attributes = [])
 * @method static Cocktail|Proxy                     createOne(array $attributes = [])
 * @method static Cocktail|Proxy                     find(object|array|mixed $criteria)
 * @method static Cocktail|Proxy                     findOrCreate(array $attributes)
 * @method static Cocktail|Proxy                     first(string $sortedField = 'id')
 * @method static Cocktail|Proxy                     last(string $sortedField = 'id')
 * @method static Cocktail|Proxy                     random(array $attributes = [])
 * @method static Cocktail|Proxy                     randomOrCreate(array $attributes = [])
 * @method static CocktailRepository|RepositoryProxy repository()
 * @method static Cocktail[]|Proxy[]                 all()
 * @method static Cocktail[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Cocktail[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Cocktail[]|Proxy[]                 findBy(array $attributes)
 * @method static Cocktail[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Cocktail[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class CocktailFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'etat' => self::faker()->boolean(),
            'imgPath' => self::faker()->imageUrl(),
            'name' => self::faker()->title(),
            'resume' => self::faker()->text(255),
            'user' => UserFactory::random(),
            'categories' => CategoryFactory::randomRange(0, 5),
            'utensils' => UtensilFactory::randomRange(0, 5),
            'ingredients' => IngredientFactory::randomRange(0, 5),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Cocktail $cocktail): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Cocktail::class;
    }
}
