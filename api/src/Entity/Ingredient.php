<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\IngredientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: IngredientRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
        new Put(),
        new Patch(),
        new Delete()
    ],
    normalizationContext: ['groups' => ['ingredient:read']],
    denormalizationContext: ['groups' => ['ingredient:write']]
)]
class Ingredient
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('ingredient:read')]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Groups(['ingredient:read', 'ingredient:write'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Groups(['ingredient:read', 'ingredient:write'])]
    private ?string $imgPath = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Groups(['ingredient:read', 'ingredient:write'])]
    private ?string $unite = null;

    #[ORM\Column(length: 50)]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Groups(['ingredient:read', 'ingredient:write'])]
    private ?string $volume = null;

    #[ORM\ManyToMany(targetEntity: Cocktail::class, mappedBy: 'ingredients')]
    private Collection $cocktails;

    public function __construct()
    {
        $this->cocktails = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getImgPath(): ?string
    {
        return $this->imgPath;
    }

    public function setImgPath(string $imgPath): static
    {
        $this->imgPath = $imgPath;

        return $this;
    }

    public function getUnite(): ?string
    {
        return $this->unite;
    }

    public function setUnite(string $unite): static
    {
        $this->unite = $unite;

        return $this;
    }

    public function getVolume(): ?string
    {
        return $this->volume;
    }

    public function setVolume(string $volume): static
    {
        $this->volume = $volume;

        return $this;
    }

    /**
     * @return Collection<int, Cocktail>
     */
    public function getCocktails(): Collection
    {
        return $this->cocktails;
    }

    public function addCocktail(Cocktail $cocktail): static
    {
        if (!$this->cocktails->contains($cocktail)) {
            $this->cocktails->add($cocktail);
            $cocktail->addIngredient($this);
        }

        return $this;
    }

    public function removeCocktail(Cocktail $cocktail): static
    {
        if ($this->cocktails->removeElement($cocktail)) {
            $cocktail->removeIngredient($this);
        }

        return $this;
    }
}
