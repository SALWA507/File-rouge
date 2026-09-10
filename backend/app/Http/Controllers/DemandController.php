<?php

namespace App\Http\Controllers;

use App\Models\Demand;
use Illuminate\Http\Request;

class DemandController extends Controller
{
    public function index()
    {
       $demands = Demand::with(['user', 'equipment', 'technician'])->get();

        return response()->json($demands);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'equipment_id' => 'required|exists:equipment,id',
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'priority' => 'nullable|in:low,normal,high,urgent',
    ]);

    $demand = Demand::create([
        'user_id' => $request->user()->id,
        'equipment_id' => $validated['equipment_id'],
        'title' => $validated['title'],
        'description' => $validated['description'],
        'priority' => $validated['priority'] ?? 'normal',
        'status' => 'pending',
    ]);

    return response()->json([
        'message' => 'Demande créée avec succès',
        'demand' => $demand->load(['user', 'equipment', 'technician']),
    ], 201);
}
    public function show(string $id)
    {
       $demand = Demand::with(['user', 'equipment', 'technician'])->find($id);

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
            'technician_id' => 'nullable|exists:users,id',
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
