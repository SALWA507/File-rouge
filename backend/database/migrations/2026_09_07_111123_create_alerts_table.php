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
    Schema::create('alerts', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
        $table->foreignId('equipment_id')->nullable()->constrained('equipment')->onDelete('cascade');
        $table->string('message');
        $table->string('type');
        $table->boolean('isRead')->default(false);
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('alerts');
}
};
