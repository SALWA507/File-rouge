<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Equipment;
use App\Models\Maintenance;
use App\Models\Intervention;
use App\Models\Alert;
use App\Models\Demand;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {

            return response()->json([

                'role' => 'admin',

                'equipment' => Equipment::count(),

                'equipements_operationnels' => Equipment::where(
                    'status',
                    'operationnel'
                )->count(),

                'equipements_hors_service' => Equipment::where(
                    'status',
                    'hors_service'
                )->count(),

                'interventions' => Intervention::count(),

                'interventions_en_cours' => Intervention::where(
                    'status',
                    'in_progress'
                )->count(),

                'interventions_terminees' => Intervention::where(
                    'status',
                    'completed'
                )->count(),

                'alerts' => Alert::count(),

                'unread_alerts' => Alert::where(
                    'isRead',
                    false
                )->count(),

                'upcoming_maintenances' => Maintenance::with([
                    'equipment'
                ])
                    ->where(
                        'plannedDate',
                        '>=',
                        Carbon::today()
                    )
                    ->orderBy(
                        'plannedDate',
                        'asc'
                    )
                    ->limit(5)
                    ->get(),

                'recent_interventions' => Intervention::with([
                    'maintenance.equipment',
                    'technician'
                ])
                    ->orderBy(
                        'created_at',
                        'desc'
                    )
                    ->limit(5)
                    ->get(),
            ]);
        }

        if ($user->role === 'technicien') {

            $myInterventions = Intervention::where(
                'technician_id',
                $user->id
            );

            $myMaintenances = Maintenance::whereHas(
                'interventions',
                function ($query) use ($user) {
                    $query->where(
                        'technician_id',
                        $user->id
                    );
                }
            );

            $myAlerts = Alert::where(
                'user_id',
                $user->id
            );

            $myDemands = Demand::where(
                'technician_id',
                $user->id
            );

            return response()->json([

                'role' => 'technicien',

                'interventions' => (clone $myInterventions)->count(),

                'interventions_en_cours' => (clone $myInterventions)
                    ->where('status', 'in_progress')
                    ->count(),

                'interventions_terminees' => (clone $myInterventions)
                    ->where('status', 'completed')
                    ->count(),

                'maintenances' => (clone $myMaintenances)->count(),

                'maintenances_a_venir' => (clone $myMaintenances)
                    ->where(
                        'plannedDate',
                        '>=',
                        Carbon::today()
                    )
                    ->count(),

                'alerts' => (clone $myAlerts)->count(),

                'unread_alerts' => (clone $myAlerts)
                    ->where(
                        'isRead',
                        false
                    )
                    ->count(),

                'demandes' => (clone $myDemands)->count(),

                'demandes_en_attente' => (clone $myDemands)
                    ->where(
                        'status',
                        'pending'
                    )
                    ->count(),

                'upcoming_maintenances' => (clone $myMaintenances)
                    ->with('equipment')
                    ->where(
                        'plannedDate',
                        '>=',
                        Carbon::today()
                    )
                    ->orderBy(
                        'plannedDate',
                        'asc'
                    )
                    ->limit(5)
                    ->get(),

                'recent_interventions' => (clone $myInterventions)
                    ->with([
                        'maintenance.equipment'
                    ])
                    ->orderBy(
                        'created_at',
                        'desc'
                    )
                    ->limit(5)
                    ->get(),
            ]);
        }

        if ($user->role === 'personnel') {

            $myDemands = Demand::where(
                'user_id',
                $user->id
            );

            $myAlerts = Alert::where(
                'user_id',
                $user->id
            );

            return response()->json([

                'role' => 'personnel',

                'equipment' => Equipment::count(),

                'equipements_operationnels' => Equipment::where(
                    'status',
                    'operationnel'
                )->count(),

                'demandes' => (clone $myDemands)->count(),

                'demandes_en_attente' => (clone $myDemands)
                    ->where(
                        'status',
                        'pending'
                    )
                    ->count(),

                'demandes_en_cours' => (clone $myDemands)
                    ->whereIn(
                        'status',
                        [
                            'assigned',
                            'in_progress'
                        ]
                    )
                    ->count(),

                'demandes_resolues' => (clone $myDemands)
                    ->where(
                        'status',
                        'resolved'
                    )
                    ->count(),

                'alerts' => (clone $myAlerts)->count(),

                'unread_alerts' => (clone $myAlerts)
                    ->where(
                        'isRead',
                        false
                    )
                    ->count(),

                'recent_demands' => (clone $myDemands)
                    ->with([
                        'equipment',
                        'technician'
                    ])
                    ->orderBy(
                        'created_at',
                        'desc'
                    )
                    ->limit(5)
                    ->get(),
            ]);
        }
        return response()->json([
            'message' => 'Rôle non autorisé'
        ], 403);
    }
}
