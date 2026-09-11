<?php

namespace App\Http\Controllers;

use App\Models\Demand;
use Illuminate\Http\Request;
use App\Models\User;
class DemandController extends Controller
{
    public function index(Request $request)
{
    $user = $request->user();

    if ($user->role === 'admin') {
        $demands = Demand::with(['user', 'equipment', 'technician'])->get();
    } elseif ($user->role === 'technicien') {
        $demands = Demand::with(['user', 'equipment', 'technician'])
            ->where('technician_id', $user->id)
            ->get();
    } else {
        $demands = Demand::with(['user', 'equipment', 'technician'])
            ->where('user_id', $user->id)
            ->get();
    }

    return response()->json($demands);
}

public function store(Request $request)
{

    if ($request->user()->role !== 'personnel') {
        return response()->json([
            'message' => 'Seul le personnel peut créer une demande'
        ], 403);
    }

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
        'demand' => $demand->load([
            'user',
            'equipment',
            'technician'
        ]),
    ], 201);
}
    public function show(Request $request, string $id)
{
    $demand = Demand::with(['user', 'equipment', 'technician'])->find($id);

    if (!$demand) {
        return response()->json([
            'message' => 'Demande introuvable'
        ], 404);
    }

    $user = $request->user();

    if (
        $user->role !== 'admin' &&
        !($user->role === 'technicien' && $demand->technician_id === $user->id) &&
        !($user->role === 'personnel' && $demand->user_id === $user->id)
    ) {
        return response()->json([
            'message' => 'Accès interdit'
        ], 403);
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
        if ($request->user()->role !== 'admin') {
    return response()->json([
        'message' => 'Accès interdit'
    ], 403);
}

        $validated = $request->validate([
            'equipment_id' => 'sometimes|required|exists:equipment,id',
            'technician_id' => [
    'nullable',
    'exists:users,id',
    function ($attribute, $value, $fail) {
        if ($value && !User::where('id', $value)
            ->where('role', 'technicien')
            ->exists()) {
            $fail('Lutilisateur sélectionné nest pas un technicien.');
        }
    },
],
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

   public function destroy(Request $request, string $id)
{
    $demand = Demand::find($id);

    if (!$demand) {
        return response()->json([
            'message' => 'Demande introuvable'
        ], 404);
    }

    if ($request->user()->role !== 'admin') {
        return response()->json([
            'message' => 'Accès interdit'
        ], 403);
    }

    $demand->delete();

    return response()->json([
        'message' => 'Demande supprimée avec succès'
    ]);
}
}
