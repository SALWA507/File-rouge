<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\InterventionController;
use App\Http\Controllers\AlertController;
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'user']);
Route::get('/dashboard', [DashboardController::class, 'index']);
Route::apiResource('equipment', EquipmentController::class);
Route::apiResource('maintenances', MaintenanceController::class);
Route::apiResource('interventions', InterventionController::class);
Route::apiResource('alerts', AlertController::class);
});
