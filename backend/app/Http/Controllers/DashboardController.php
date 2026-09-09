<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Maintenance;
use App\Models\Intervention;
use App\Models\Alert;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'equipment' => Equipment::count(),
            'maintenances' => Maintenance::count(),
            'interventions' => Intervention::count(),
            'alerts' => Alert::count(),
            'unread_alerts' => Alert::where('isRead', false)->count(),
        ]);
    }
}
