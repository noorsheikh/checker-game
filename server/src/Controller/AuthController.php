<?php

namespace Checker\Controller;

use Checker\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 */
class AuthController extends BaseController
{
  /**
   * @Route("/login", name="login")
   */
  public function login(Request $request): JsonResponse
  {
    $requestData = json_decode($request->getContent(), true);
    if (count($requestData) <= 0) {
      return $this->json([ 'message' => 'Please provide values to login' ], 404);
    }

    $username = $requestData['username'] ?? '';
    $password = $requestData['password'] ?? '';

    $user = $this
      ->getDoctrine()
      ->getRepository(User::class)
      ->findOneBy([ 'username' => $username ])
    ;

    if (! $user instanceof User) {
      return $this->json([ 'message' => sprintf('User not found with username %s', $username) ], 404);
    }

    if (! $this->passwordEncoder->isPasswordValid($user, $password)) {
      return $this->json([ 'message' => 'User password is not matching, please try again.' ], 401);
    }

    $token = $this->jwtEncoder->encode([
      'id' => $user->getId(),
      'username' => $user->getUsername(),
      'firstName' => $user->getFirstName(),
      'lastName' => $user->getLastName()
    ]);

    return $this->json($token, 200);
  }
}