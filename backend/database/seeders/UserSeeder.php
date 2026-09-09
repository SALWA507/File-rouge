<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
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


