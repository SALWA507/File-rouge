<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
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
            'interventions' => Intervention::count(),
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
            'equipements_hors_service' => Equipment::where(
    'status',
    'hors_service'
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

            'recent_interventions' => Intervention::with([
                'maintenance.equipment',
                'technician'
            ])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get(),
        ]);
    }
}
