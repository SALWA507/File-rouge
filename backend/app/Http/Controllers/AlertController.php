<?php

namespace App\Http\Controllers;

use App\Models\Alert;
use Illuminate\Http\Request;

class AlertController extends Controller
{
   public function index(Request $request)
{
    $user = $request->user();

    if ($user->role === 'admin') {
        $alerts = Alert::with(['user', 'equipment'])->get();
    } elseif (
        $user->role === 'technicien' ||
        $user->role === 'personnel'
    ) {
        $alerts = Alert::with(['user', 'equipment'])
            ->where('user_id', $user->id)
            ->get();
    } else {
        return response()->json([
            'message' => 'Accès interdit'
        ], 403);
    }

    return response()->json($alerts);
}

    public function store(Request $request)
{
    if ($request->user()->role !== 'admin') {
        return response()->json([
            'message' => 'Seul ladministrateur peut créer une alerte'
        ], 403);
    }

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
        'alert' => $alert->load([
            'user',
            'equipment'
        ]),
    ], 201);
}
    public function show(Request $request, string $id)
{
    $alert = Alert::with(['user', 'equipment'])->find($id);

    if (!$alert) {
        return response()->json([
            'message' => 'Alerte introuvable'
        ], 404);
    }

    $user = $request->user();

    if (
        $user->role !== 'admin' &&
        $alert->user_id !== $user->id
    ) {
        return response()->json([
            'message' => 'Accès interdit'
        ], 403);
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

    if ($request->user()->role !== 'admin') {
        return response()->json([
            'message' => 'Accès interdit'
        ], 403);
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
        'alert' => $alert->load([
            'user',
            'equipment'
        ]),
    ]);
}
    public function destroy(Request $request, string $id)
{
    $alert = Alert::find($id);

    if (!$alert) {
        return response()->json([
            'message' => 'Alerte introuvable'
        ], 404);
    }

    if ($request->user()->role !== 'admin') {
        return response()->json([
            'message' => 'Accès interdit'
        ], 403);
    }

    $alert->delete();

    return response()->json([
        'message' => 'Alerte supprimée avec succès'
    ]);
}
}
