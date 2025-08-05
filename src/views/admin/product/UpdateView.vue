<script setup>
import { reactive, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';

import { useAdminProductStore } from '@/stores/admin/product';

const adminProductStore = useAdminProductStore()
const router = useRouter()
const route = useRoute()

const productIndex = ref(-1)
const pass = ref('')

// const productIndex = ref(-1)
// const mode = ref('ADD')

// onMounted(() => {
//     if (route.params.id) {
//         productIndex.value = parseInt(route.params.id)
//         mode.value = 'EDIT'

//         const selectedProduct = adminProductStore.getProduct(productIndex.value)
//         console.log('selectedProduct', selectedProduct)
//     }
// })

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

const addProduct = () => {
    adminProductStore.addProduct(productData)
    router.push({ name: 'admin-products' })
}

onMounted(() => {
    if (route.params.id) {
        
    }
})

</script>

<template>
    <AdminLayout>
        <div class="shadow-xl p-8 mt-2">
            <div class="text-xl font-bold">Add</div>
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
                <button class="btn btn-ghost">Back</button>
                <button class="btn btn-neutral" @click="addProduct()">Add</button>
            </div>


        </div>
    </AdminLayout>

</template>