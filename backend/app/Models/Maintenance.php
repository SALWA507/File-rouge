<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    protected $fillable = [
        'equipment_id',
        'created_by',
        'type',
        'description',
        'plannedDate',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'plannedDate' => 'date',
        ];
    }

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function interventions()
    {
        return $this->hasMany(Intervention::class);
    }
}
