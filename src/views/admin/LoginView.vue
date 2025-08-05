<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="h-screen flex items-center">
        <div class="flex-1 max-w-2xl shadow-xl mx-auto p-8">
            <div class="flex flex-col items-center">
                <h1 class="text-3xl font-semibold">Login</h1>
                <fieldset class="fieldset w-full">
                    <legend class="fieldset-legend text-base">Email</legend>
                    <input type="text" class="input w-full" placeholder="Your Email" />
                </fieldset>
                <fieldset class="fieldset w-full">
                    <legend class="fieldset-legend text-base">Password</legend>
                    <input type="password" class="input w-full" placeholder="Your Email" />
                </fieldset>
                <RouterLink :to="{ name: 'admin-dashboard'}" class="btn btn-neutral mt-4 w-full">
                    Login
                </RouterLink>
            </div>   
        </div>
    </div>
    
</template>