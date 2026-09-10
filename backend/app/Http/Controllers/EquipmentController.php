<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{

    public function index()
    {
        $equipment = Equipment::all();

        return response()->json($equipment);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'reference' => 'required|string|max:255|unique:equipment,reference',
            'brand' => 'nullable|string|max:255',
            'model' => 'nullable|string|max:255',
            'serialNumber' => 'required|string|max:255|unique:equipment,serialNumber',
            'location' => 'required|string|max:255',
            'status' => 'nullable|string|max:255',
            'installationDate' => 'nullable|date',
        ]);

        $equipment = Equipment::create($validated);

        return response()->json([
            'message' => 'Équipement créé avec succès',
            'equipment' => $equipment,
        ], 201);
    }

    public function show(string $id)
{
    $equipment = Equipment::find($id);

    if (!$equipment) {
        return response()->json([
            'message' => 'Équipement introuvable'
        ], 404);
    }

    return response()->json($equipment);
}
    public function update(Request $request, string $id)
{
    $equipment = Equipment::find($id);

    if (!$equipment) {
        return response()->json([
            'message' => 'Équipement introuvable'
        ], 404);
    }

    $validated = $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'reference' => 'sometimes|required|string|max:255|unique:equipment,reference,' . $id,
        'brand' => 'nullable|string|max:255',
        'model' => 'nullable|string|max:255',
        'serialNumber' => 'sometimes|required|string|max:255|unique:equipment,serialNumber,' . $id,
        'location' => 'sometimes|required|string|max:255',
        'status' => 'nullable|string|max:255',
        'installationDate' => 'nullable|date',
    ]);

    $equipment->update($validated);

    return response()->json([
        'message' => 'Équipement modifié avec succès',
        'equipment' => $equipment,
    ]);
}
    public function destroy(string $id)
{
    $equipment = Equipment::find($id);

    if (!$equipment) {
        return response()->json([
            'message' => 'Équipement introuvable'
        ], 404);
    }

    $equipment->delete();

    return response()->json([
        'message' => 'Équipement supprimé avec succès'
    ]);
}
}
