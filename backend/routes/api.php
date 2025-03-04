<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/**
 * Aqui é onde é feita a separação das rotas autenticadas, que fazem parte do
 * mesmo grupo, e das rotas que não exigem autenticação, nesse caso apenas
 * login e signup.
 */

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/userBooks', [BookController::class, 'userBooks']);
    Route::apiResource('/books', BookController::class);
});

Route::post('/signup', [ AuthController::class, 'signup' ]);
Route::post('/login', [ AuthController::class, 'login' ]);
