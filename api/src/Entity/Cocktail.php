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
use App\Repository\CocktailRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CocktailRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
        new Put(),
        new Patch(),
        new Delete()
    ],
    normalizationContext: ['groups' => [
        'cocktail:read',
        'user:read',
        'ingredient:read',
        'category:read',
        'utensil:read',
        'step:read',
        'review:read'
    ]],
    denormalizationContext: ['groups' => [
        'cocktail:write',
        'ingredient:write',
        'category:write',
        'utensil:write',
        'step:write',
    ]],
)]
class Cocktail
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('cocktail:read')]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Groups(['cocktail:read', 'cocktail:write'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Groups(['cocktail:read', 'cocktail:write'])]
    private ?string $resume = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message:"This input doesn't be blank")]
    #[Groups(['cocktail:read', 'cocktail:write'])]
    private ?string $imgPath = null;

    #[ORM\Column]
    #[Groups(['cocktail:read', 'cocktail:write'])]
    private ?bool $etat = null;

    #[ORM\OneToMany(mappedBy: 'cocktail', targetEntity: Review::class, cascade: ['remove'])]
    #[Groups(['cocktail:read', 'cocktail:write'])]
    private Collection $reviews;

    #[ORM\ManyToMany(targetEntity: Utensil::class, inversedBy: 'cocktails', cascade: ['persist'])]
    #[Groups(['cocktail:read', 'cocktail:write'])]
    private Collection $utensils;

    #[ORM\ManyToMany(targetEntity: Ingredient::class, inversedBy: 'cocktails', cascade: ['persist'])]
    #[Groups(['cocktail:read', 'cocktail:write'])]
    private Collection $ingredients;

    #[ORM\ManyToMany(targetEntity: Category::class, inversedBy: 'cocktails', cascade: ['persist'])]
    #[Groups(['cocktail:read', 'cocktail:write'])]
    private Collection $categories;

    #[ORM\OneToMany(mappedBy: 'cocktail', targetEntity: Step::class, cascade: ['persist', 'remove'])]
    #[Groups(['cocktail:read', 'cocktail:write'])]
    private Collection $steps;

    #[ORM\ManyToOne(cascade: ['persist'], inversedBy: 'cocktails')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['cocktail:read', 'cocktail:write'])]
    private ?User $user = null;

    public function __construct()
    {
        $this->reviews = new ArrayCollection();
        $this->utensils = new ArrayCollection();
        $this->ingredients = new ArrayCollection();
        $this->categories = new ArrayCollection();
        $this->steps = new ArrayCollection();
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

    public function getImgPath(): ?string
    {
        return $this->imgPath;
    }

    public function setImgPath(string $imgPath): static
    {
        $this->imgPath = $imgPath;

        return $this;
    }

    public function isEtat(): ?bool
    {
        return $this->etat;
    }

    public function setEtat(bool $etat): static
    {
        $this->etat = $etat;

        return $this;
    }


    /**
     * @return Collection<int, Review>
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): static
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews->add($review);
            $review->setCocktail($this);
        }

        return $this;
    }

    public function removeReview(Review $review): static
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getCocktail() === $this) {
                $review->setCocktail(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Utensil>
     */
    public function getUtensils(): Collection
    {
        return $this->utensils;
    }

    public function addUtensil(Utensil $utensil): static
    {
        if (!$this->utensils->contains($utensil)) {
            $this->utensils->add($utensil);
        }

        return $this;
    }

    public function removeUtensil(Utensil $utensil): static
    {
        $this->utensils->removeElement($utensil);

        return $this;
    }

    /**
     * @return Collection<int, Ingredient>
     */
    public function getIngredients(): Collection
    {
        return $this->ingredients;
    }

    public function addIngredient(Ingredient $ingredient): static
    {
        if (!$this->ingredients->contains($ingredient)) {
            $this->ingredients->add($ingredient);
        }

        return $this;
    }

    public function removeIngredient(Ingredient $ingredient): static
    {
        $this->ingredients->removeElement($ingredient);

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): static
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
        }

        return $this;
    }

    public function removeCategory(Category $category): static
    {
        $this->categories->removeElement($category);

        return $this;
    }

    /**
     * @return Collection<int, Step>
     */
    public function getSteps(): Collection
    {
        return $this->steps;
    }

    public function addStep(Step $step): static
    {
        if (!$this->steps->contains($step)) {
            $this->steps->add($step);
            $step->setCocktail($this);
        }

        return $this;
    }

    public function removeStep(Step $step): static
    {
        if ($this->steps->removeElement($step)) {
            // set the owning side to null (unless already changed)
            if ($step->getCocktail() === $this) {
                $step->setCocktail(null);
            }
        }

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
