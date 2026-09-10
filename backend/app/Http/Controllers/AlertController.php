<?php

namespace App\Http\Controllers;

use App\Models\Alert;
use Illuminate\Http\Request;

class AlertController extends Controller
{
    public function index()
    {
        $alerts = Alert::with(['user', 'equipment'])->get();

        return response()->json($alerts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'equipment_id' => 'nullable|exists:equipment,id',
            'message' => 'required|string',
            'type' => 'required|string|max:255',
            'isRead' => 'nullable|boolean',
        ]);

        $alert = Alert::create($validated);

        return response()->json([
            'message' => 'Alerte créée avec succès',
            'alert' => $alert,
        ], 201);
    }

    public function show(string $id)
    {
        $alert = Alert::with(['user', 'equipment'])->find($id);

        if (!$alert) {
            return response()->json([
                'message' => 'Alerte introuvable'
            ], 404);
        }

        return response()->json($alert);
    }

    public function update(Request $request, string $id)
    {
        $alert = Alert::find($id);

        if (!$alert) {
            return response()->json([
                'message' => 'Alerte introuvable'
            ], 404);
        }

        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'equipment_id' => 'nullable|exists:equipment,id',
            'message' => 'sometimes|required|string',
            'type' => 'sometimes|required|string|max:255',
            'isRead' => 'nullable|boolean',
        ]);

        $alert->update($validated);

        return response()->json([
            'message' => 'Alerte modifiée avec succès',
            'alert' => $alert,
        ]);
    }

    public function destroy(string $id)
    {
        $alert = Alert::find($id);

        if (!$alert) {
            return response()->json([
                'message' => 'Alerte introuvable'
            ], 404);
        }

        $alert->delete();

        return response()->json([
            'message' => 'Alerte supprimée avec succès'
        ]);
    }
}
