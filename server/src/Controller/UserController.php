<?php

namespace Checker\Controller;

use Checker\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/user")
 */
class UserController extends AbstractController
{
  /**
   * @Route("/{id}", name="show_user")
   */
  public function showUser(int $id): JsonResponse
  {
    $user = $this
      ->getDoctrine()
      ->getManager()
      ->getRepository(User::class)
      ->find($id);

    return $this->json($user);
  }
}
