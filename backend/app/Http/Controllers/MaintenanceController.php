<?php

namespace App\Http\Controllers;

use App\Models\Maintenance;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
{
   public function index(Request $request)
{
    $user = $request->user();

    if ($user->role === 'admin') {

        $maintenances = Maintenance::with([
            'equipment',
            'creator'
        ])->get();

    } elseif ($user->role === 'technicien') {

        $maintenances = Maintenance::with([
            'equipment',
            'creator'
        ])
        ->whereHas('interventions', function ($query) use ($user) {
            $query->where('technician_id', $user->id);
        })
        ->get();

    } else {

        return response()->json([
            'message' => 'Accès interdit'
        ], 403);
    }

    return response()->json($maintenances);
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'equipment_id' => 'required|exists:equipment,id',
            'type' => 'required|string|max:255',
            'description' => 'required|string',
            'plannedDate' => 'required|date',
            'status' => 'nullable|string|max:255',
        ]);

        $validated['created_by'] = $request->user()->id;

        $maintenance = Maintenance::create($validated);

        return response()->json([
            'message' => 'Maintenance créée avec succès',
            'maintenance' => $maintenance->load([
                'equipment',
                'creator'
            ]),
        ], 201);
    }

   public function show(Request $request, string $id)
{
    $maintenance = Maintenance::with([
        'equipment',
        'creator',
        'interventions'
    ])->find($id);

    if (!$maintenance) {
        return response()->json([
            'message' => 'Maintenance introuvable'
        ], 404);
    }

    $user = $request->user();

    // Admin يشوف كلشي
    if ($user->role === 'admin') {
        return response()->json($maintenance);
    }

    // Technicien يشوف غير maintenance المرتبطة بـ intervention ديالو
    if ($user->role === 'technicien') {

        $hasAccess = $maintenance->interventions()
            ->where('technician_id', $user->id)
            ->exists();

        if (!$hasAccess) {
            return response()->json([
                'message' => 'Accès interdit'
            ], 403);
        }

        return response()->json($maintenance);
    }

    return response()->json([
        'message' => 'Accès interdit'
    ], 403);
}

    public function update(Request $request, string $id)
{
    $maintenance = Maintenance::find($id);

    if (!$maintenance) {
        return response()->json([
            'message' => 'Maintenance introuvable'
        ], 404);
    }

    $user = $request->user();

    // Personnel ممنوع
    if ($user->role === 'personnel') {
        return response()->json([
            'message' => 'Accès interdit'
        ], 403);
    }

    // Technicien يقدر يعدل غير maintenance المرتبطة بـ intervention ديالو
    if ($user->role === 'technicien') {

        $hasAccess = $maintenance->interventions()
            ->where('technician_id', $user->id)
            ->exists();

        if (!$hasAccess) {
            return response()->json([
                'message' => 'Accès interdit'
            ], 403);
        }
    }

    $validated = $request->validate([
        'equipment_id' => 'sometimes|required|exists:equipment,id',
        'type' => 'sometimes|required|string|max:255',
        'description' => 'sometimes|required|string',
        'plannedDate' => 'sometimes|required|date',
        'status' => 'nullable|string|max:255',
    ]);

    $maintenance->update($validated);

    return response()->json([
        'message' => 'Maintenance modifiée avec succès',
        'maintenance' => $maintenance->load([
            'equipment',
            'creator'
        ]),
    ]);
}

   public function destroy(Request $request, string $id)
{
    $maintenance = Maintenance::find($id);

    if (!$maintenance) {
        return response()->json([
            'message' => 'Maintenance introuvable'
        ], 404);
    }

    if ($request->user()->role !== 'admin') {
        return response()->json([
            'message' => 'Accès interdit'
        ], 403);
    }

    $maintenance->delete();

    return response()->json([
        'message' => 'Maintenance supprimée avec succès'
    ]);
}
}
