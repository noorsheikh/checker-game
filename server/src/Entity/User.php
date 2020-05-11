<?php

namespace Checker\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="Checker\Repository\UserRepository")
 * @ORM\Table(name="user")
 * @UniqueEntity(
 *  fields = "username",
 *  message = "User already exist with provided username, please try again with another username."
 * )
 */
class User implements UserInterface
{
  /**
   * @ORM\Id
   * @ORM\GeneratedValue
   * @ORM\Column(type="integer")
   */
  private $id;

  /**
   * @ORM\Column(type="string", name="first_name", length=100, nullable=false)
   * @Assert\NotBlank(
   *  message = "First name cannot be blank"
   * )
   */
  private $firstName;

  /**
   * @ORM\Column(type="string", name="last_name", length=100, nullable=false)
   * @Assert\NotBlank(
   *  message = "Last name cannot be blank"
   * )
   */
  private $lastName;

  /**
   * @ORM\Column(type="string", length=100, nullable=false)
   * @Assert\NotBlank(
   *  message = "Username cannot be blank"
   * )
   */
  private $username;

  /**
   * @ORM\Column(type="string", length=100, nullable=false)
   * @Assert\NotBlank(
   *  message = "Email cannot be blank"
   * )
   * @Assert\Email(
   *  message = "Please enter a valid email address"
   * )
   */
  private $email;

  private $plainPassword;

  /**
   * @ORM\Column(type="string", length=100, nullable=false)
   * @Assert\NotBlank(
   *  message = "Password cannot be blank"
   * )
   */
  private $password;

  /**
   * @ORM\OneToMany(targetEntity="Checker\Entity\Game", mappedBy="player1")
   */
  private $game;

  /**
   * @ORM\OneToMany(targetEntity="Checker\Entity\GameMove", mappedBy="player")
   */
  private $gameMoves;

  public function __construct()
  {
      $this->game = new ArrayCollection();
      $this->gameMoves = new ArrayCollection();
  }

  /**
   * Get the value of id
   *
   * @return int
   */
  public function getId(): int
  {
    return $this->id;
  }

  /**
   * Get the value of firstName
   *
   * @return string
   */
  public function getFirstName(): string
  {
    return $this->firstName;
  }

  /**
   * Set the value of firstName
   *
   * @var string $firstName
   *
   * @return  self
   */
  public function setFirstName(string $firstName): self
  {
    $this->firstName = $firstName;

    return $this;
  }

  /**
   * Get the value of lastName
   *
   * @return string
   */
  public function getLastName(): string
  {
    return $this->lastName;
  }

  /**
   * Set the value of lastName
   *
   * @var string $lastName
   *
   * @return  self
   */
  public function setLastName(string $lastName): self
  {
    $this->lastName = $lastName;

    return $this;
  }

  /**
   * Get the value of username
   *
   * @return string
   */
  public function getUsername(): string
  {
    return $this->username;
  }

  /**
   * Set the value of username
   *
   * @var string $username
   *
   * @return  self
   */
  public function setUsername(string $username): self
  {
    $this->username = $username;

    return $this;
  }

  /**
   * Get the value of email
   *
   * @return string
   */
  public function getEmail(): string
  {
    return $this->email;
  }

  /**
   * Set the value of email
   *
   * @var string $email
   *
   * @return  self
   */
  public function setEmail(string $email): self
  {
    $this->email = $email;

    return $this;
  }

  /**
   * Get the value of plainPassword
   *
   * @return string
   */
  public function getPlainPassword(): ?string
  {
    return $this->plainPassword;
  }

  /**
   * Set the value of plainPassword
   *
   * @var string $plainPassword
   *
   * @return  self
   */
  public function setPlainPassword(string $plainPassword): self
  {
    $this->plainPassword = $plainPassword;

    return $this;
  }

  /**
   * Get the value of password
   *
   * @return string
   */
  public function getPassword(): string
  {
    return $this->password;
  }

  /**
   * Set the value of password
   *
   * @var string $password
   *
   * @return  self
   */
  public function setPassword(string $password): self
  {
    $this->password = $password;

    return $this;
  }

  /**
   * @return Collection|Game[]
   */
  public function getGame()
  {
    return $this->game;
  }

  public function addGame(Game $game): self
  {
    if (!$this->game->contains($game)) {
        $this->game[] = $game;
        $game->setPlayer1($this);
    }

    return $this;
  }

  public function removeGame(Game $game): self
  {
    if ($this->game->contains($game)) {
      $this->game->removeElement($game);
      // set the owning side to null (unless already changed)
      if ($game->getPlayer1() === $this) {
          $game->setPlayer1(null);
      }
    }

      return $this;
  }

  /**
   * Get the value of roles
   *
   * @return array|null
   */
  public function getRoles(): ?array
  {
    return [];
  }

  /**
   * Not needed but it was available in the UserInterface
   *
   * @return void
   */
  public function eraseCredentials(): void
  {
  }

  /**
   * Not needed but it was available in the UserInterface
   *
   * @return null
   */
  public function getSalt()
  {
    return null;
  }

  /**
   * @return Collection|GameMove[]
   */
  public function getGameMoves(): Collection
  {
      return $this->gameMoves;
  }

  public function addGameMove(GameMove $gameMove): self
  {
      if (!$this->gameMoves->contains($gameMove)) {
          $this->gameMoves[] = $gameMove;
          $gameMove->setPlayer($this);
      }

      return $this;
  }

  public function removeGameMove(GameMove $gameMove): self
  {
      if ($this->gameMoves->contains($gameMove)) {
          $this->gameMoves->removeElement($gameMove);
          // set the owning side to null (unless already changed)
          if ($gameMove->getPlayer() === $this) {
              $gameMove->setPlayer(null);
          }
      }

      return $this;
  }
}
