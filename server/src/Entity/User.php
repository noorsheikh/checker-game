<?php

namespace Checker\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
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
   */
  private $firstName;

  /**
   * @ORM\Column(type="string", name="last_name", length=100, nullable=false)
   */
  private $lastName;

  /**
   * @ORM\Column(type="string", length=100, nullable=false)
   */
  private $username;

  /**
   * @ORM\Column(type="string", length=100, nullable=false)
   */
  private $email;

  private $plainPassword;

  /**
   * @ORM\Column(type="string", length=100, nullable=false)
   */
  private $password;

  /**
   * @ORM\ManyToOne(targetEntity="Checker\Entity\UserStatus")
   * @ORM\JoinColumn(nullable=false)
   */
  private $status;

  /**
   * @ORM\OneToMany(targetEntity="Checker\Entity\GameMoves", mappedBy="user")
   */
  private $gameMoves;

  public function __construct()
  {
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
  public function getPlainPassword(): string
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

  public function getStatus(): ?UserStatus
  {
      return $this->status;
  }

  public function setStatus(?UserStatus $status): self
  {
      $this->status = $status;

      return $this;
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
          $gameMove->setUser($this);
      }

      return $this;
  }

  public function removeGameMove(GameMoves $gameMove): self
  {
      if ($this->gameMoves->contains($gameMove)) {
          $this->gameMoves->removeElement($gameMove);
          // set the owning side to null (unless already changed)
          if ($gameMove->getUser() === $this) {
              $gameMove->setUser(null);
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
}
