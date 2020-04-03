<?php

namespace Checker\Controller;

use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class BaseController extends AbstractController
{
  /**
   * @var UserPasswordEncoderInterface
   */
  protected $passwordEncoder;

  /**
   * @var ValidatorInterface
   */
  protected $validator;

  /**
   * @var JWTEncoderInterface
   */
  protected $jwtEncoder;

  public function __construct(
    UserPasswordEncoderInterface $passwordEncoder,
    ValidatorInterface $validator,
    JWTEncoderInterface $jwtEncoder
  ) {
    $this->passwordEncoder = $passwordEncoder;
    $this->validator = $validator;
    $this->jwtEncoder = $jwtEncoder;
  }
}
