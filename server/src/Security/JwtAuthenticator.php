<?php

namespace Checker\Security;

use Checker\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\MissingTokenException;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;
use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\AuthorizationHeaderTokenExtractor;
use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\TokenExtractorInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

class JwtAuthenticator extends AbstractGuardAuthenticator
{
  private $entityManager;

  private $jwtEncoder;

  private $tokenExtractor;

  public function __construct(EntityManagerInterface $entityManager, JWTEncoderInterface $jwtEncoder, TokenExtractorInterface $tokenExtractor)
  {
    $this->entityManager = $entityManager;
    $this->jwtEncoder = $jwtEncoder;
    $this->tokenExtractor = $tokenExtractor;
  }

  public function getCredentials(Request $request): ?string
  {
    $extractor = new AuthorizationHeaderTokenExtractor('Bearer', 'Authorization');

    $token = $extractor->extract($request);

    return $token ?? null;
  }

  public function getUser($credentials, UserProviderInterface $userProvided): User
  {
    $decodedJwt = $this->jwtEncoder->decode($credentials);

    $username = $decodedJwt['username'];

    return $this->entityManager
      ->getRepository(User::class)
      ->findOneBy(compact('username'))
    ;
  }

  public function checkCredentials($credentials, UserInterface $user): bool
  {
    return true;
  }

  public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $providerKey)
  {
    return;
  }

  public function onAuthenticationFailure(Request $request, AuthenticationException $exception): JsonResponse
  {
    return new JsonResponse(
      [ 'message' => $exception->getMessage() ],
      1
    );
  }

  public function start(Request $request, ?AuthenticationException $authException = null): Response
  {
    $exception = new MissingTokenException('JWT Token not found', 0, $authException);
    $event = new JWTNotFoundEvent($exception, new JWTAuthenticationFailureResponse($exception->getMessageKey()));
    $this->dispatcher->dispatch(Events::JWT_NOT_FOUND);
    return $event->getResponse();
  }

  public function supportsRememberMe(): bool
  {
    return false;
  }

  public function supports(Request $request)
  {
    return false !== $this->tokenExtractor->extract($request);
  }
}
