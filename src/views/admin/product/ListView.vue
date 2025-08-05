<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

import { useAdminProductStore } from '@/stores/admin/product';

import AdminLayout from '@/layouts/AdminLayout.vue';
import Edit from '@/components/icons/Edit.vue';
import Trash from '@/components/icons/Trash.vue';

const adminProductStore = useAdminProductStore()

onMounted(() => {
    adminProductStore.loadProducts()
})

const removeProduct = (index) => {
    adminProductStore.removeProduct(index)
}

</script>

<template>
    <AdminLayout>
        <div class="flex items-center justify-between my-4">
            <div class="text-3xl font-semibold">Product</div>
            <div>
                <RouterLink 
                    :to="{name: 'admin-products-create'}" 
                    class="btn btn-neutral">Add New
                </RouterLink>
            </div>
        </div>
        <div class="overflow x-auto">
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <td>Image</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Status</td>
                        <td>Update At</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in adminProductStore.list">
                        <th>{{ product.name }}</th>
                        <td>
                            <img :src="product.image" class="w-15"></img>
                        </td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                        <td>
                            <div class="badge badge-success">{{ product.status }}</div>
                        </td>
                        <td>{{ product.updateAt }}</td>
                        <td>
                            <div class="flex gap-2">
                                <RouterLink 
                                    :to="{name: 'admin-products-update', params: { id: index }}" 
                                    class="flex-1 btn btn-ghost">
                                    <Edit></Edit>
                                </RouterLink>
                                <div @click="removeProduct(index)" class="flex-1 btn btn-ghost">
                                    <Trash></Trash>
                                </div>
                            </div>
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </AdminLayout>

</template>