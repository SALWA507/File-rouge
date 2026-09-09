<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    protected $fillable = [
        'name',
        'reference',
        'brand',
        'model',
        'serialNumber',
        'location',
        'status',
        'installationDate',
    ];

    protected function casts(): array
    {
        return [
            'installationDate' => 'date',
        ];
    }

    public function maintenances()
    {
        return $this->hasMany(Maintenance::class);
    }

    public function alerts()
    {
        return $this->hasMany(Alert::class);
    }
}
