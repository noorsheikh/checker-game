<?php

namespace Checker\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="Checker\Repository\GameUsersRepository")
 */
class GameUsers
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="Checker\Entity\Game", inversedBy="gameUsers", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $game;

    /**
     * @ORM\ManyToOne(targetEntity="Checker\Entity\User")
     */
    private $player1;

    /**
     * @ORM\ManyToOne(targetEntity="Checker\Entity\User")
     */
    private $player2;

    /**
     * @ORM\ManyToOne(targetEntity="Checker\Entity\User")
     */
    private $winner;

    public function __construct()
    {
        $this->player1 = new ArrayCollection();
        $this->player2 = new ArrayCollection();
        $this->winner = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(Game $game): self
    {
        $this->game = $game;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getPlayer1(): Collection
    {
        return $this->player1;
    }

    public function addPlayer1(User $player1): self
    {
        if (!$this->player1->contains($player1)) {
            $this->player1[] = $player1;
        }

        return $this;
    }

    public function removePlayer1(User $player1): self
    {
        if ($this->player1->contains($player1)) {
            $this->player1->removeElement($player1);
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getPlayer2(): Collection
    {
        return $this->player2;
    }

    public function addPlayer2(User $player2): self
    {
        if (!$this->player2->contains($player2)) {
            $this->player2[] = $player2;
        }

        return $this;
    }

    public function removePlayer2(User $player2): self
    {
        if ($this->player2->contains($player2)) {
            $this->player2->removeElement($player2);
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getWinner(): Collection
    {
        return $this->winner;
    }

    public function addWinner(User $winner): self
    {
        if (!$this->winner->contains($winner)) {
            $this->winner[] = $winner;
        }

        return $this;
    }

    public function removeWinner(User $winner): self
    {
        if ($this->winner->contains($winner)) {
            $this->winner->removeElement($winner);
        }

        return $this;
    }
}
