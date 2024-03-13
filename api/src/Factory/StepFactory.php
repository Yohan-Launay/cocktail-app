<?php

namespace App\Factory;

use App\Entity\Step;
use App\Repository\StepRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Step>
 *
 * @method        Step|Proxy                     create(array|callable $attributes = [])
 * @method static Step|Proxy                     createOne(array $attributes = [])
 * @method static Step|Proxy                     find(object|array|mixed $criteria)
 * @method static Step|Proxy                     findOrCreate(array $attributes)
 * @method static Step|Proxy                     first(string $sortedField = 'id')
 * @method static Step|Proxy                     last(string $sortedField = 'id')
 * @method static Step|Proxy                     random(array $attributes = [])
 * @method static Step|Proxy                     randomOrCreate(array $attributes = [])
 * @method static StepRepository|RepositoryProxy repository()
 * @method static Step[]|Proxy[]                 all()
 * @method static Step[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Step[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Step[]|Proxy[]                 findBy(array $attributes)
 * @method static Step[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Step[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class StepFactory extends ModelFactory
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
            'resume' => self::faker()->text(255),
            'sequence' => self::faker()->numberBetween(0, 10),
            'cocktail' => CocktailFactory::random()
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Step $step): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Step::class;
    }
}
