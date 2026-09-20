<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\InterventionController;
use App\Http\Controllers\AlertController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DemandController;
use App\Http\Controllers\RapportController;
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'user']);
Route::get('/dashboard', [DashboardController::class, 'index']);
Route::get('/rapports', [RapportController::class, 'index']);

Route::get(
    '/rapports/equipment/{id}/history',
    [RapportController::class, 'equipmentHistory']
);

Route::get('/equipment', [EquipmentController::class, 'index']);
Route::get('/equipment/{equipment}', [EquipmentController::class, 'show']);

Route::middleware('role:admin,technicien')->group(function () {
    Route::post('/equipment', [EquipmentController::class, 'store']);
    Route::put('/equipment/{equipment}', [EquipmentController::class, 'update']);
    Route::patch('/equipment/{equipment}', [EquipmentController::class, 'update']);
    Route::delete('/equipment/{equipment}', [EquipmentController::class, 'destroy']);
});

Route::apiResource('maintenances', MaintenanceController::class)
    ->middleware('role:admin,technicien');
Route::apiResource('interventions', InterventionController::class)
    ->middleware('role:admin,technicien');
Route::apiResource('alerts', AlertController::class);
Route::apiResource('users', UserController::class)
    ->middleware('role:admin');
    Route::apiResource('demands', DemandController::class);
    Route::put('/demands/{demand}/assign-technician',
    [DemandController::class, 'assignTechnician']
);
});
