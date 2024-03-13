<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\UtensilRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UtensilRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
        new Put(),
        new Patch()
    ],
    normalizationContext: ['groups' => ['utensil:read']],
    denormalizationContext: ['groups' => ['utensil:write']]
)]
class Utensil
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('utensil:read')]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Groups(['utensil:read', 'utensil:write'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Groups(['utensil:read', 'utensil:write'])]
    private ?string $imgPath = null;

    #[ORM\ManyToMany(targetEntity: Cocktail::class, mappedBy: 'utensils')]
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
            $cocktail->addUtensil($this);
        }

        return $this;
    }

    public function removeCocktail(Cocktail $cocktail): static
    {
        if ($this->cocktails->removeElement($cocktail)) {
            $cocktail->removeUtensil($this);
        }

        return $this;
    }
}
