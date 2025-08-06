<script setup>
import { reactive, onMounted, ref } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';

import { useAdminProductStore } from '@/stores/admin/product';

const adminProductStore = useAdminProductStore()
const router = useRouter()
const route = useRoute()

const productIndex = ref(-1)
const mode = ref('ADD')

const productData = reactive({
    name: '',
    image: '',
    price: 0,
    quantity: 0,
    about: '',
    status: ''
})

const formData = [
    {
        name: 'Name',
        field: 'name'
    },
    {
        name: 'Image',
        field: 'image'
    },
    {
        name: 'Price',
        field: 'price'
    },
    {
        name: 'Quantity',
        field: 'quantity'
    },
    {
        name: 'About',
        field: 'about'
    }
]

const updateProduct = () => {
    if (mode.value == 'EDIT') {
        adminProductStore.updateProduct(productIndex.value, productData)
    }else{
        adminProductStore.addProduct(productData)
    }
    router.push({ name: 'admin-products' })
}

onMounted(() => {
    if (route.params.id) {
        productIndex.value = parseInt(route.params.id)
        mode.value = 'EDIT'

        const selectedProduct = adminProductStore.getProduct(productIndex.value)
        
        productData.name = selectedProduct.name
        productData.image = selectedProduct.image
        productData.price = selectedProduct.price
        productData.quantity = selectedProduct.quantity
        productData.about = selectedProduct.about
        productData.status = selectedProduct.status
        
    }
})

</script>

<template>
    <AdminLayout>
        <div class="shadow-xl p-8 mt-2">
            <div class="text-xl font-bold">{{ mode }}</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <div v-for="form in formData">
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">{{ form.name }}</legend>
                        <input 
                            v-model="productData[form.field]" 
                            type="text" 
                            class="input" 
                        />
                    </fieldset>
                </div>
            </div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Status</legend>
                    <select v-model="productData.status" class="select">
                        <option disabled selected>Choose status</option>
                        <option>Open</option>
                        <option>Close</option>
                    </select>
                </fieldset>
            </div>
            <div class="mt-4 flex justify-end">
                <RouterLink :to="{ name: 'admin-products' }" class="btn btn-ghost">Back</RouterLink>
                <button class="btn btn-neutral" @click="updateProduct()">{{ mode }}</button>
            </div>


        </div>
    </AdminLayout>

</template>