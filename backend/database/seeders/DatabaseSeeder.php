<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
      
        User::create([
            'name' => 'Admin BioMaintenix',
            'email' => 'admin@clinique.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Technicien Karim',
            'email' => 'tech@clinique.com',
            'password' => Hash::make('password123'),
            'role' => 'technicien',
        ]);

        User::create([
            'name' => 'Infirmière Sara',
            'email' => 'staff@clinique.com',
            'password' => Hash::make('password123'),
            'role' => 'personnel',
        ]);
    }
}
