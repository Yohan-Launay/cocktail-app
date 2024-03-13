<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\ReviewRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ReviewRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
    ],
    normalizationContext: ['groups' => ['review:read', 'cocktail:read', 'user:read']],
    denormalizationContext: ['groups' => ['review:write']],
)]
class Review
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('review:read')]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Groups(['review:read', 'review:write'])]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Groups(['review:read', 'review:write'])]
    private ?string $resume = null;

    #[ORM\Column]
    #[Groups(['review:read', 'review:write'])]
    private ?int $note = null;

    #[ORM\ManyToOne(cascade: ['persist'], inversedBy: 'review')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Cocktail $cocktail = null;

    #[ORM\ManyToOne(inversedBy: 'reviews')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['review:read', 'review:write'])]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

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

    public function getNote(): ?int
    {
        return $this->note;
    }

    public function setNote(int $note): static
    {
        $this->note = $note;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
