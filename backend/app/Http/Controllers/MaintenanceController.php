<?php

namespace App\Http\Controllers;

use App\Models\Maintenance;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
{
    public function index()
    {
        $maintenances = Maintenance::with(['equipment', 'creator'])->get();

        return response()->json($maintenances);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'equipment_id' => 'required|exists:equipment,id',
            'created_by' => 'required|exists:users,id',
            'type' => 'required|string|max:255',
            'description' => 'required|string',
            'plannedDate' => 'required|date',
            'status' => 'nullable|string|max:255',
        ]);

        $maintenance = Maintenance::create($validated);

        return response()->json([
            'message' => 'Maintenance créée avec succès',
            'maintenance' => $maintenance,
        ], 201);
    }

    public function show(string $id)
    {
        $maintenance = Maintenance::with(['equipment', 'creator', 'interventions'])
            ->find($id);

        if (!$maintenance) {
            return response()->json([
                'message' => 'Maintenance introuvable'
            ], 404);
        }

        return response()->json($maintenance);
    }

    public function update(Request $request, string $id)
    {
        $maintenance = Maintenance::find($id);

        if (!$maintenance) {
            return response()->json([
                'message' => 'Maintenance introuvable'
            ], 404);
        }

        $validated = $request->validate([
            'equipment_id' => 'sometimes|required|exists:equipment,id',
            'created_by' => 'sometimes|required|exists:users,id',
            'type' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'plannedDate' => 'sometimes|required|date',
            'status' => 'nullable|string|max:255',
        ]);

        $maintenance->update($validated);

        return response()->json([
            'message' => 'Maintenance modifiée avec succès',
            'maintenance' => $maintenance,
        ]);
    }

    public function destroy(string $id)
    {
        $maintenance = Maintenance::find($id);

        if (!$maintenance) {
            return response()->json([
                'message' => 'Maintenance introuvable'
            ], 404);
        }

        $maintenance->delete();

        return response()->json([
            'message' => 'Maintenance supprimée avec succès'
        ]);
    }
}
