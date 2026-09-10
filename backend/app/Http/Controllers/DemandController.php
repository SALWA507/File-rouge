<?php

namespace App\Http\Controllers;

use App\Models\Demand;
use Illuminate\Http\Request;

class DemandController extends Controller
{
    public function index()
    {
        $demands = Demand::with(['user', 'equipment'])->get();

        return response()->json($demands);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'equipment_id' => 'required|exists:equipment,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'nullable|in:low,normal,high,urgent',
            'status' => 'nullable|in:pending,assigned,in_progress,resolved,rejected',
        ]);

        $demand = Demand::create($validated);

        return response()->json([
            'message' => 'Demande créée avec succès',
            'demand' => $demand,
        ], 201);
    }

    public function show(string $id)
    {
        $demand = Demand::with(['user', 'equipment'])->find($id);

        if (!$demand) {
            return response()->json([
                'message' => 'Demande introuvable'
            ], 404);
        }

        return response()->json($demand);
    }

    public function update(Request $request, string $id)
    {
        $demand = Demand::find($id);

        if (!$demand) {
            return response()->json([
                'message' => 'Demande introuvable'
            ], 404);
        }

        $validated = $request->validate([
            'equipment_id' => 'sometimes|required|exists:equipment,id',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'priority' => 'nullable|in:low,normal,high,urgent',
            'status' => 'nullable|in:pending,assigned,in_progress,resolved,rejected',
        ]);

        $demand->update($validated);

        return response()->json([
            'message' => 'Demande modifiée avec succès',
            'demand' => $demand,
        ]);
    }

    public function destroy(string $id)
    {
        $demand = Demand::find($id);

        if (!$demand) {
            return response()->json([
                'message' => 'Demande introuvable'
            ], 404);
        }

        $demand->delete();

        return response()->json([
            'message' => 'Demande supprimée avec succès'
        ]);
    }
}
