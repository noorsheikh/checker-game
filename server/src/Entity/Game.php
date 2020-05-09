<?php

namespace Checker\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

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
     * @ORM\ManyToOne(targetEntity="Checker\Entity\User", inversedBy="game")
     * @ORM\JoinColumn(nullable=false)
     */
    private $player1;

    /**
     * @ORM\ManyToOne(targetEntity="Checker\Entity\User")
     * @ORM\JoinColumn(nullable=true)
     */
    private $player2;

    /**
     * @ORM\Column(name="board_state", type="string")
     * @Assert\NotBlank(
     *  message = "Game board state cannot be blank"
     * )
     */
    private $boardState;

    /**
     * @ORM\Column(name="created_at", type="datetime", options={"default" : "CURRENT_TIMESTAMP"})
     */
    private $createdAt;

    /**
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\Column(name="player1_score", type="integer")
     */
    private $player1Score;

    /**
     * @ORM\Column(name="player2_score", type="integer")
     */
    private $player2Score;

    /**
     * @ORM\ManyToOne(targetEntity="Checker\Entity\User")
     * @ORM\JoinColumn(nullable=true)
     */
    private $winner;

    /**
     * @ORM\Column(name="game_status", type="string", length=15, nullable=false)
     */
    private $gameStatus;

    public function __construct()
    {
        if (!$this->getCreatedAt()) {
            $now = new \DateTimeImmutable();
            $this->setCreatedAt($now);
        }
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayer1(): User
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

    public function setPlayer2(?User $player2): ?self
    {
        $this->player2 = $player2;

        return $this;
    }

    public function getBoardState(): ?string
    {
        return $this->boardState;
    }

    public function setBoardState(string $boardState): self
    {
        $this->boardState = $boardState;

        return $this;
    }

    public function getCreatedAt(): ?string
    {
        return $this->createdAt ? $this->createdAt->format('Y-m-d H:i:s') : '';
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?string
    {
        return $this->updatedAt ? $this->updatedAt->format('Y-m-d H:i:s') : '';
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): ?self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getPlayer1Score(): ?int
    {
        return $this->player1Score;
    }

    public function setPlayer1Score(int $player1Score): self
    {
        $this->player1Score = $player1Score;

        return $this;
    }

    public function getPlayer2Score(): ?int
    {
        return $this->player2Score;
    }

    public function setPlayer2Score(int $player2Score): self
    {
        $this->player2Score = $player2Score;

        return $this;
    }

    public function getWinner(): ?User
    {
        return $this->winner;
    }

    public function setWinner(User $winner): ?self
    {
        $this->winner = $winner;

        return $this;
    }

    public function getGameStatus(): string
    {
        return $this->gameStatus;
    }

    public function setGameStatus(string $gameStatus): ?self
    {
        $this->gameStatus = $gameStatus;

        return $this;
    }
}
