<?php

namespace App\Http\Controllers;

use App\Models\Intervention;
use Illuminate\Http\Request;

class InterventionController extends Controller
{
   public function index(Request $request)
{
    $user = $request->user();

    if ($user->role === 'admin') {
        $interventions = Intervention::with([
            'maintenance',
            'technician'
        ])->get();
    } elseif ($user->role === 'technicien') {
        $interventions = Intervention::with([
            'maintenance',
            'technician'
        ])
            ->where('technician_id', $user->id)
            ->get();
    } else {
        return response()->json([
            'message' => 'Accès interdit'
        ], 403);
    }

    return response()->json($interventions);
}
    public function store(Request $request)
{
    if ($request->user()->role !== 'admin') {
        return response()->json([
            'message' => 'Seul l’administrateur peut créer une intervention'
        ], 403);
    }

    $validated = $request->validate([
        'maintenance_id' => 'required|exists:maintenances,id',
        'technician_id' => 'required|exists:users,id',
        'startDate' => 'nullable|date',
        'endDate' => 'nullable|date|after_or_equal:startDate',
        'description' => 'nullable|string',
        'status' => 'nullable|in:assigned,in_progress,completed,cancelled',
    ]);

    $intervention = Intervention::create($validated);

    return response()->json([
        'message' => 'Intervention créée avec succès',
        'intervention' => $intervention->load([
            'maintenance',
            'technician'
        ]),
    ], 201);
}

    public function show(Request $request, string $id)
{
    $intervention = Intervention::with([
        'maintenance',
        'technician'
    ])->find($id);

    if (!$intervention) {
        return response()->json([
            'message' => 'Intervention introuvable'
        ], 404);
    }

    $user = $request->user();

    if (
        $user->role !== 'admin' &&
        !(
            $user->role === 'technicien' &&
            $intervention->technician_id === $user->id
        )
    ) {
        return response()->json([
            'message' => 'Accès interdit'
        ], 403);
    }

    return response()->json($intervention);
}

    public function update(Request $request, string $id)
    {
        $intervention = Intervention::find($id);

        if (!$intervention) {
            return response()->json([
                'message' => 'Intervention introuvable'
            ], 404);
        }

        $validated = $request->validate([
            'maintenance_id' => 'sometimes|required|exists:maintenances,id',
            'technician_id' => 'sometimes|required|exists:users,id',
            'startDate' => 'nullable|date',
            'endDate' => 'nullable|date|after_or_equal:startDate',
            'description' => 'nullable|string',
            'status' => 'nullable|string|max:255',
        ]);

        $intervention->update($validated);

        return response()->json([
            'message' => 'Intervention modifiée avec succès',
            'intervention' => $intervention,
        ]);
    }

    public function destroy(string $id)
    {
        $intervention = Intervention::find($id);

        if (!$intervention) {
            return response()->json([
                'message' => 'Intervention introuvable'
            ], 404);
        }

        $intervention->delete();

        return response()->json([
            'message' => 'Intervention supprimée avec succès'
        ]);
    }
}
