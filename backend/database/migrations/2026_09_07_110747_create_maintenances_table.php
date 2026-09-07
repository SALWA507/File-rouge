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
    Schema::create('maintenances', function (Blueprint $table) {
        $table->id();
        $table->foreignId('equipment_id')->constrained('equipment')->onDelete('cascade');
        $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
        $table->string('type');
        $table->text('description');
        $table->date('plannedDate');
        $table->string('status')->default('planned');
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('maintenances');
}
};
