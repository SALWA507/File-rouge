<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Intervention extends Model
{
    protected $fillable = [
        'maintenance_id',
        'technician_id',
        'startDate',
        'endDate',
        'description',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'startDate' => 'datetime',
            'endDate' => 'datetime',
        ];
    }

    public function maintenance()
    {
        return $this->belongsTo(Maintenance::class);
    }

    public function technician()
    {
        return $this->belongsTo(User::class, 'technician_id');
    }
}
