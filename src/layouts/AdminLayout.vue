<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const menus = [
    {
        name: 'Dashboard',
        routeName: 'admin-dashboard'
    },
    {
        name: 'User',
        routeName: 'admin-users'
    },
    {
        name: 'Product',
        routeName: 'admin-products'
    },
    {
        name: 'Order',
        routeName: 'admin-orders'
    },
    {
        name: 'Logout',
        routeName: 'admin-login'
    }
]

const route = useRoute()
const activeMenu = ref('')

onMounted(() => {
    activeMenu.value = route.name
})                          

</script>

<template>
<!-- start drawer -->
    <div class="drawer drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle"/>
        <div class="drawer-content mx-10">
            <slot></slot>
        </div>     
        <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label>
            <ul class="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
                <li class="text-2xl font-bold">
                    <a>Bambi Mellow</a>
                </li>
                <li v-for="menu in menus">
                    <RouterLink 
                        :to="{name: menu.routeName}"
                        :class="menu.routeName === activeMenu ? 'menu-active' : ''">
                        {{ menu.name }}
                    </RouterLink>
                    
                </li>
            </ul>
        </div>
    </div>
</template>