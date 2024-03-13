<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\StepRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: StepRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
        new Put(),
        new Patch()
    ],
    normalizationContext: ['groups' => ['step:read', 'cocktail:read']],
    denormalizationContext: ['groups' => ['step:write', 'cocktail:write']]
)]
class Step
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['step:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Assert\Range(max: 10)]
    #[Groups(['step:read', 'step:write'])]
    private ?int $sequence = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Groups(['step:read', 'step:write'])]
    private ?string $resume = null;

    #[ORM\ManyToOne(cascade: ['persist'] ,inversedBy: 'step')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Cocktail $cocktail = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSequence(): ?int
    {
        return $this->sequence;
    }

    public function setSequence(int $sequence): static
    {
        $this->sequence = $sequence;

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

    public function getCocktail(): ?Cocktail
    {
        return $this->cocktail;
    }

    public function setCocktail(?Cocktail $cocktail): static
    {
        $this->cocktail = $cocktail;

        return $this;
    }
}
