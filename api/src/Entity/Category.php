<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
        new Put(),
        new Patch(),
        new Delete()
    ],
    normalizationContext: ['groups' => [
        'category:read',
        'cocktail:read',
    ]],
    denormalizationContext: ['groups' => [
        'category:write'
    ]],
    forceEager: false
)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('category:read')]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Groups(['category:read', 'category:write'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Groups(['category:read', 'category:write'])]
    private ?string $resume = null;

    #[ORM\ManyToMany(targetEntity: Cocktail::class, mappedBy: 'categories', cascade: ['persist'])]
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

    public function getResume(): ?string
    {
        return $this->resume;
    }

    public function setResume(string $resume): static
    {
        $this->resume = $resume;

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
            $cocktail->addCategory($this);
        }

        return $this;
    }

    public function removeCocktail(Cocktail $cocktail): static
    {
        if ($this->cocktails->removeElement($cocktail)) {
            $cocktail->removeCategory($this);
        }

        return $this;
    }
}
