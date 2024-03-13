<?php

namespace App\Factory;

use App\Entity\Utensil;
use App\Repository\UtensilRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Utensil>
 *
 * @method        Utensil|Proxy                     create(array|callable $attributes = [])
 * @method static Utensil|Proxy                     createOne(array $attributes = [])
 * @method static Utensil|Proxy                     find(object|array|mixed $criteria)
 * @method static Utensil|Proxy                     findOrCreate(array $attributes)
 * @method static Utensil|Proxy                     first(string $sortedField = 'id')
 * @method static Utensil|Proxy                     last(string $sortedField = 'id')
 * @method static Utensil|Proxy                     random(array $attributes = [])
 * @method static Utensil|Proxy                     randomOrCreate(array $attributes = [])
 * @method static UtensilRepository|RepositoryProxy repository()
 * @method static Utensil[]|Proxy[]                 all()
 * @method static Utensil[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Utensil[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Utensil[]|Proxy[]                 findBy(array $attributes)
 * @method static Utensil[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Utensil[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class UtensilFactory extends ModelFactory
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
            'imgPath' => self::faker()->text(255),
            'name' => self::faker()->text(100),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Utensil $utensil): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Utensil::class;
    }
}
