<?php

namespace Checker\Controller;

use Checker\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/user")
 */
class UserController extends BaseController
{
  /**
   * @Route("/register", name="register_user")
   */
  public function register(Request $request): JsonResponse
  {
    $requestData = json_decode($request->getContent(), true);
    if (count($requestData) <= 0) {
      return $this->json([ 'message' => ['Please provide values to to register' ]], 404);
    }

    $user = new User();
    $user
      ->setFirstName($requestData['firstname'] ?? '')
      ->setLastName($requestData['lastname'] ?? '')
      ->setUsername($requestData['username'] ?? '')
      ->setEmail($requestData['email'] ?? '')
      ->setPlainPassword($requestData['password'] ?? '')
    ;

    // we will encode user password to argon2i before storing it in the database
    if ($user->getPlainPassword()) {
      $user->setPassword(
        $this->passwordEncoder->encodePassword($user, $user->getPlainPassword())
      );
    }

    // validate user data and if the data is invalid print error message to client side
    $validationErrors = $this->validator->validate($user);
    if (count($validationErrors) > 0) {
      $errors = [];
      foreach ($validationErrors as $error) {
        $errors[] = $error->getMessage();
      }
      return $this->json([ 'message' =>  $errors ], 416);
    }

    $this->getDoctrine()->getManager()->persist($user);
    $this->getDoctrine()->getManager()->flush();

    return $this->json( ['message' => sprintf('User %s successfully registered', $user->getUsername()) ], 200);
  }
}
