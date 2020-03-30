<?php

namespace Checker\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="Checker\Repository\GameRepository")
 */
class Game
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity="Checker\Entity\GameMoves", mappedBy="game")
     */
    private $gameMoves;

    /**
     * @ORM\OneToOne(targetEntity="Checker\Entity\GameUsers", mappedBy="game", cascade={"persist", "remove"})
     */
    private $gameUsers;

    /**
     * @ORM\ManyToOne(targetEntity="Checker\Entity\GameStatus")
     * @ORM\JoinColumn(nullable=false)
     */
    private $status;

    public function __construct()
    {
        $this->gameMoves = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|GameMoves[]
     */
    public function getGameMoves(): Collection
    {
        return $this->gameMoves;
    }

    public function addGameMove(GameMoves $gameMove): self
    {
        if (!$this->gameMoves->contains($gameMove)) {
            $this->gameMoves[] = $gameMove;
            $gameMove->setGame($this);
        }

        return $this;
    }

    public function removeGameMove(GameMoves $gameMove): self
    {
        if ($this->gameMoves->contains($gameMove)) {
            $this->gameMoves->removeElement($gameMove);
            // set the owning side to null (unless already changed)
            if ($gameMove->getGame() === $this) {
                $gameMove->setGame(null);
            }
        }

        return $this;
    }

    public function getGameUsers(): ?GameUsers
    {
        return $this->gameUsers;
    }

    public function setGameUsers(GameUsers $gameUsers): self
    {
        $this->gameUsers = $gameUsers;

        // set the owning side of the relation if necessary
        if ($gameUsers->getGame() !== $this) {
            $gameUsers->setGame($this);
        }

        return $this;
    }

    public function getStatus(): ?GameStatus
    {
        return $this->status;
    }

    public function setStatus(?GameStatus $status): self
    {
        $this->status = $status;

        return $this;
    }
}
