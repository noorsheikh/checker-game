<?php

namespace Checker\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="Checker\Repository\GameMovesRepository")
 */
class GameMoves
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="Checker\Entity\Game", inversedBy="gameMoves")
     * @ORM\JoinColumn(nullable=false)
     */
    private $game;

    /**
     * @ORM\ManyToOne(targetEntity="Checker\Entity\User", inversedBy="gameMoves")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $state;

    /**
     * @ORM\Column(type="datetime")
     */
    private $timestamp;

    /**
     * @ORM\Column(type="integer")
     */
    private $player1score;

    /**
     * @ORM\Column(type="integer")
     */
    private $player2score;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(?Game $game): self
    {
        $this->game = $game;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(string $state): self
    {
        $this->state = $state;

        return $this;
    }

    public function getTimestamp(): ?\DateTimeInterface
    {
        return $this->timestamp;
    }

    public function setTimestamp(\DateTimeInterface $timestamp): self
    {
        $this->timestamp = $timestamp;

        return $this;
    }

    public function getPlayer1score(): ?int
    {
        return $this->player1score;
    }

    public function setPlayer1score(int $player1score): self
    {
        $this->player1score = $player1score;

        return $this;
    }

    public function getPlayer2score(): ?int
    {
        return $this->player2score;
    }

    public function setPlayer2score(int $player2score): self
    {
        $this->player2score = $player2score;

        return $this;
    }
}
