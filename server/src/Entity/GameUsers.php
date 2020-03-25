<?php

namespace Checker\Entity;

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
     * @ORM\ManyToOne(targetEntity="Checker\Entity\Games")
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

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGame(): ?Games
    {
        return $this->game;
    }

    public function setGame(?Games $game): self
    {
        $this->game = $game;

        return $this;
    }

    public function getPlayer1(): ?User
    {
        return $this->player1;
    }

    public function setPlayer1(?User $player1): self
    {
        $this->player1 = $player1;

        return $this;
    }

    public function getPlayer2(): ?User
    {
        return $this->player2;
    }

    public function setPlayer2(?User $player2): self
    {
        $this->player2 = $player2;

        return $this;
    }

    public function getWinner(): ?User
    {
        return $this->winner;
    }

    public function setWinner(?User $winner): self
    {
        $this->winner = $winner;

        return $this;
    }
}
