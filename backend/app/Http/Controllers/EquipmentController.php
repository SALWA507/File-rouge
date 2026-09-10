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

    }

    public function update(Request $request, string $id)
    {

    }

    public function destroy(string $id)
    {
      
    }
}
