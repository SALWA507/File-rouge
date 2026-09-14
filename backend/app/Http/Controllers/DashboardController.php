<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Maintenance;
use App\Models\Intervention;
use App\Models\Alert;
use Carbon\Carbon;
class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'equipment' => Equipment::count(),

            'interventions_en_cours' => Intervention::where(
                'status',
                'en_cours'
            )->count(),

            'interventions_terminees' => Intervention::where(
                'status',
                'terminee'
            )->count(),

            'equipements_operationnels' => Equipment::where(
                'status',
                'operationnel'
            )->count(),

            'alerts' => Alert::count(),

            'unread_alerts' => Alert::where(
                'isRead',
                false
            )->count(),
            'upcoming_maintenances' => Maintenance::where(
    'plannedDate',
    '>=',
    Carbon::today()
)
->orderBy('plannedDate', 'asc')
->limit(5)
->get(),
        ]);
    }
}
