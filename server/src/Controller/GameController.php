<?php

namespace Checker\Controller;

use Checker\Entity\Game;
use Checker\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Security("is_granted('IS_AUTHENTICATED_FULLY')")
 * @Route("/api/secure")
 */
class GameController extends BaseController
{
  /**
   * @Route("/game-board/create", name="create_game_board")
   */
  public function create(): JsonResponse
  {
    $boardState = [
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 2, 0, 2, 0, 2, 0, 2],
      [2, 0, 2, 0, 2, 0, 2, 0],
    ];

    $game = new Game();
    $game
      ->setPlayer1($this->getUser())
      ->setBoardState(json_encode($boardState))
      ->setPlayer1score(0)
      ->setPlayer2score(0)
      ->setGameStatus('not-started')
      ->setPlayerTurn(1)
      ->setGameLocked(0)
    ;

    $validationErrors = $this->validator->validate($game);
    if (count($validationErrors) > 0) {
      $errors = [];
      foreach ($validationErrors as $error) {
        $errors[] = $error->getMessage();
      }
      return $this->json([ 'message' =>  $errors ], 416);
    }

    $this->getDoctrine()->getManager()->persist($game);
    $this->getDoctrine()->getManager()->flush();

    return $this->json($this->buildResponse($game));
  }

  /**
   * @Route("/game-board/update/{id}", requirements={"id": "\d+"}, name="update_game_board")
   */
  public function update(Request $request, int $id): JsonResponse
  {
    $requestData = json_decode($request->getContent(), true);

    $game = $this
      ->getDoctrine()
      ->getRepository(Game::class)
      ->find($id)
    ;

    if (!$game instanceof Game) {
      return $this->json([ 'message' => 'Game not found' ], 404);
    }

    $boardState = $requestData['boardState'] ?? '';
    if ($boardState) {
      $game->setBoardState(json_encode($boardState));
    }

    $player1Id = $requestData['player1Id'] ?? '';
    if ($player1Id) {
      $player1 = $this->getDoctrine()->getRepository(User::class)->find($player1Id);
      if ($player1 instanceof User) {
        $game->setPlayer1($player1);
      }
    }

    $player2Id = $requestData['player2Id'] ?? '';
    if ($player2Id) {
      $player2 = $this->getDoctrine()->getRepository(User::class)->find($player2Id);
      if ($player2 instanceof User) {
        $game->setPlayer2($player2);
      }
    }

    $winnerId = $requestData['winnerId'] ?? '';
    if ($winnerId) {
      $winner = $this->getDoctrine()->getRepository(User::class)->find($winnerId);
      if ($winner instanceof User) {
        $game->setWinner($winner);
      }
    }

    $gameStatus= $requestData['gameStatus'] ?? '';
    if ($gameStatus) {
      $game->setGameStatus($gameStatus);
    }

    $player1Score = $requestData['player1Score'] ?? '';
    if ($player1Score) {
      $game->setPlayer1Score(($player1Score));
    }

    $player2Score = $requestData['player2Score'] ?? '';
    if ($player2Score) {
      $game->setPlayer2Score(($player2Score));
    }

    $playerTurn = $requestData['playerTurn'] ?? '';
    if ($playerTurn) {
      $game->setPlayerTurn($playerTurn);
    }

    $gameLocked = $requestData['gameLocked'] ?? '';
    if ($gameLocked) {
      $game->setGameLocked($gameLocked);
    }

    $game->setUpdatedAt(new \DateTimeImmutable());

    $this->getDoctrine()->getManager()->persist($game);
    $this->getDoctrine()->getManager()->flush();

    return $this->json($this->buildResponse($game));
  }

  /**
   * @Route("/game-board/{id}", requirements={"id": "\d+"}, name="get_game_board", methods={"GET"})
   */
  public function getGameBoard(int $id): JsonResponse
  {
    $game = $this
      ->getDoctrine()
      ->getRepository(Game::class)
      ->find($id)
    ;

    return $this->json($this->buildResponse($game));
  }

  private function buildResponse(Game $game): array
  {
    $response = [
      'id' => $game->getId(),
      'boardState' => json_decode($game->getBoardState()),
      'player1Score' => $game->getPlayer1score(),
      'player2Score' => $game->getPlayer2score(),
      'createdAt' => $game->getCreatedAt(),
      'updatedAt' => $game->getUpdatedAt(),
      'gameStatus' => $game->getGameStatus(),
      'playerTurn' => $game->getPlayerTurn(),
      'gameLocked' => $game->getGameLocked(),
      'player2' => null,
      'winner' => null,
    ];

    if ($game->getPlayer1() instanceof User) {
      $response['player1'] = [
        'id' => $game->getPlayer1()->getId(),
        'firstName' => $game->getPlayer1()->getFirstName(),
        'lastName' => $game->getPlayer1()->getLastName(),
        'username' => $game->getPlayer1()->getUsername(),
      ];
    }

    if ($game->getPlayer2() instanceof User) {
      $response['player2'] = [
        'id' => $game->getPlayer2()->getId(),
        'firstName' => $game->getPlayer2()->getFirstName(),
        'lastName' => $game->getPlayer2()->getLastName(),
        'username' => $game->getPlayer2()->getUsername(),
      ];
    }

    if ($game->getWinner() instanceof User) {
      $response['winner'] = [
        'id' => $game->getWinner()->getId(),
        'firstName' => $game->getWinner()->getFirstName(),
        'lastName' => $game->getWinner()->getLastName(),
        'username' => $game->getWinner()->getUsername(),
      ];
    }

    return $response;
  }

  /**
   * @Route("/current-games", name="current_games", methods={"GET"})
   */
  public function currentGames(): JsonResponse
  {
    $games = $this->getDoctrine()
      ->getRepository(Game::class)
      ->findAll();

    $response = [];
    foreach ($games as $game) {
      $response[] = $this->buildResponse($game);
    }

    return $this->json($response);
  }
}
