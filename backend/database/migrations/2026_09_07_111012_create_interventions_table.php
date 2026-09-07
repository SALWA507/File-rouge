<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('interventions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('maintenance_id')->constrained('maintenances')->onDelete('cascade');
        $table->foreignId('technician_id')->constrained('users')->onDelete('cascade');
        $table->dateTime('startDate')->nullable();
        $table->dateTime('endDate')->nullable();
        $table->text('description')->nullable();
        $table->string('status')->default('assigned');
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('interventions');
}
};
