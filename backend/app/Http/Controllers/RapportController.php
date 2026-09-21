<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Maintenance;
use App\Models\Intervention;
use Illuminate\Http\Request;

class RapportController extends Controller
{

    public function index(Request $request)
    {

        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Accès interdit'
            ], 403);
        }

        $equipments = Equipment::count();

        $maintenances = Maintenance::count();

        $interventions = Intervention::count();

        $completedInterventions = Intervention::where(
            'status',
            'completed'
        )->count();

        $pendingInterventions = Intervention::whereIn(
            'status',
            ['assigned', 'in_progress']
        )->count();

        return response()->json([
            'equipments' => $equipments,
            'maintenances' => $maintenances,
            'interventions' => $interventions,
            'completed_interventions' => $completedInterventions,
            'pending_interventions' => $pendingInterventions,
        ]);
    }

    public function equipmentHistory(
        Request $request,
        string $id
    ) {
  
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Accès interdit'
            ], 403);
        }

        $equipment = Equipment::find($id);

        if (!$equipment) {
            return response()->json([
                'message' => 'Équipement introuvable'
            ], 404);
        }

        $maintenances = Maintenance::where(
            'equipment_id',
            $equipment->id
        )->get();

        $maintenanceIds = $maintenances->pluck('id');

        $interventions = Intervention::whereIn(
            'maintenance_id',
            $maintenanceIds
        )
        ->with('technician')
        ->get();

        return response()->json([
            'equipment' => $equipment,
            'maintenances' => $maintenances,
            'interventions' => $interventions,
        ]);
    }
}
