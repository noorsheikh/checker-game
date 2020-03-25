<?php

namespace Checker\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="Checker\Repository\GamesRepository")
 */
class Games
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="Checker\Entity\GameStatus")
     * @ORM\JoinColumn(nullable=false)
     */
    private $status;

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $state;

    /**
     * @ORM\Column(type="datetime")
     */
    private $timestamp;

    public function getId(): ?int
    {
        return $this->id;
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
}
