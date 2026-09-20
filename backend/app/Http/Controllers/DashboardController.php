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

        /*
        |--------------------------------------------------------------------------
        | ADMIN
        |--------------------------------------------------------------------------
        */
        if ($user->role === 'admin') {

            return response()->json([

                'role' => 'admin',

                // Équipements
                'equipment' => Equipment::count(),

                'equipements_operationnels' => Equipment::where(
                    'status',
                    'operationnel'
                )->count(),

                'equipements_hors_service' => Equipment::where(
                    'status',
                    'hors_service'
                )->count(),

                // Interventions
                'interventions' => Intervention::count(),

                'interventions_en_cours' => Intervention::where(
                    'status',
                    'in_progress'
                )->count(),

                'interventions_terminees' => Intervention::where(
                    'status',
                    'completed'
                )->count(),

                // Alertes
                'alerts' => Alert::count(),

                'unread_alerts' => Alert::where(
                    'isRead',
                    false
                )->count(),

                // Maintenances
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

                // Interventions récentes
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


        /*
        |--------------------------------------------------------------------------
        | TECHNICIEN
        |--------------------------------------------------------------------------
        */
        if ($user->role === 'technicien') {

            // Interventions du technicien connecté
            $myInterventions = Intervention::where(
                'technician_id',
                $user->id
            );

            // Maintenances liées à ses interventions
            $myMaintenances = Maintenance::whereHas(
                'interventions',
                function ($query) use ($user) {
                    $query->where(
                        'technician_id',
                        $user->id
                    );
                }
            );

            // Alertes du technicien
            $myAlerts = Alert::where(
                'user_id',
                $user->id
            );

            // Demandes affectées au technicien
            $myDemands = Demand::where(
                'technician_id',
                $user->id
            );

            return response()->json([

                'role' => 'technicien',

                // Interventions
                'interventions' => (clone $myInterventions)->count(),

                'interventions_en_cours' => (clone $myInterventions)
                    ->where('status', 'in_progress')
                    ->count(),

                'interventions_terminees' => (clone $myInterventions)
                    ->where('status', 'completed')
                    ->count(),

                // Maintenances
                'maintenances' => (clone $myMaintenances)->count(),

                'maintenances_a_venir' => (clone $myMaintenances)
                    ->where(
                        'plannedDate',
                        '>=',
                        Carbon::today()
                    )
                    ->count(),

                // Alertes
                'alerts' => (clone $myAlerts)->count(),

                'unread_alerts' => (clone $myAlerts)
                    ->where(
                        'isRead',
                        false
                    )
                    ->count(),

                // Demandes
                'demandes' => (clone $myDemands)->count(),

                'demandes_en_attente' => (clone $myDemands)
                    ->where(
                        'status',
                        'pending'
                    )
                    ->count(),

                // Prochaines maintenances
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

                // Mes interventions récentes
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


        /*
        |--------------------------------------------------------------------------
        | PERSONNEL
        |--------------------------------------------------------------------------
        */
        if ($user->role === 'personnel') {

            // Demandes créées par le personnel connecté
            $myDemands = Demand::where(
                'user_id',
                $user->id
            );

            // Alertes du personnel connecté
            $myAlerts = Alert::where(
                'user_id',
                $user->id
            );

            return response()->json([

                'role' => 'personnel',

                // Équipements généraux
                'equipment' => Equipment::count(),

                'equipements_operationnels' => Equipment::where(
                    'status',
                    'operationnel'
                )->count(),

                // Mes demandes
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

                // Alertes
                'alerts' => (clone $myAlerts)->count(),

                'unread_alerts' => (clone $myAlerts)
                    ->where(
                        'isRead',
                        false
                    )
                    ->count(),

                // Mes dernières demandes
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


        /*
        |--------------------------------------------------------------------------
        | ROLE INCONNU
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'message' => 'Rôle non autorisé'
        ], 403);
    }
}
