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
    $requestData = json_decode($request->getContent());

    $user = new User();
    $user
      ->setFirstName($requestData->firstname)
      ->setLastName($requestData->lastname)
      ->setUsername($requestData->username)
      ->setEmail($requestData->email)
      ->setPlainPassword($requestData->password)
    ;

    // we will encode user password to argon2i before storing it in the database
    if ($user->getPlainPassword()) {
      $user->setPassword(
        $this->passwordEncoder->encodePassword($user, $user->getPlainPassword())
      );
    }

    // validate user data and if the data is invalid print error message to client side
    $errors = $this->validator->validate($user);
    if (count($errors) > 0) {
      return $this->json([ 'message' => $errors[0]->getMessage() ]);
    }

    $this->getDoctrine()->getManager()->persist($user);
    $this->getDoctrine()->getManager()->flush();

    return $this->json( ['message' => sprintf('User %s successfully registered', $user->getUsername()) ]);
  }
}
