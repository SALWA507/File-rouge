<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Demand extends Model
{
    protected $fillable = [
        'user_id',
        'equipment_id',
        'title',
        'description',
        'priority',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}
