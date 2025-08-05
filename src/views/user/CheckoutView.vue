<script setup>
import { reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import UserLayout from '@/layouts/UserLayout.vue'

import { useCartStore } from '@/stores/user/cart';

const router = useRouter()

const cartStore = useCartStore()

const FormData = [
    {
        name: 'Email address',
        field: 'email'
    },
    {
        name: 'Name',
        field: 'name'
    },
    {
        name: 'Address',
        field: 'address'
    },
    {
        name: 'Note',
        field: 'note'
    }
]

const userFormData = reactive({
    email: '',
    name: '',
    address: '',
    note: ''
})

const payment = () => {
    cartStore.placeorder(userFormData)
    router.push({ name: 'success' })
}
</script>

<template>
    <UserLayout>
        <div class="text-3xl font-bold m-4">Check Out</div>
        <div class="container mx-10 rounded-4xl">
            <div class="flex gap-3">
                <section class="flex-auto w-64 bg-accent-content/10 shadow-sm p-10 rounded-4xl">
                    <fieldset v-for="form in FormData" class="fieldset text-sm">
                        <legend class="fieldset-legend">{{ form.name }}</legend>
                        <textarea
                            v-if="form.field === 'address'"
                            v-model="userFormData[form.field]"
                            class="textarea w-full rounded-md"
                            placeholder="address" 
                        ></textarea>
                        <input 
                            v-else
                            v-model="userFormData[form.field]" 
                            type="text" 
                            class="input w-full rounded-md" 
                            placeholder="Type here" 
                        />
                    </fieldset>
                    <RouterLink :to="{ name: 'checkout' }" @click="payment" class="btn bg-stone-700 w-full mt-4 text-white">ชำระเงิน</RouterLink>
                </section>
                <section class="flex-auto w-32 bg-neutral-content/50 shadow-sm rounded-4xl">
                    <div class="px-8">
                        <div v-for="item in cartStore.items" class="flex bg-gray-300 m-8 rounded-4xl">
                        <div class="flex-1">
                            <img class="w-full p-8" :src="item.imageUrl"></img>
                        </div>
                        <div class="flex-1">
                            <div class="flex flex-col justify-between h-full py-7">
                                <div>
                                    <div><b>{{ item.name }}</b></div>
                                    <div>จำนวน: {{ item.quantity }}</div>
                                </div>
                                <RouterLink :to="{ name: 'cart' }">Edit</RouterLink>   
                            </div>   
                        </div>
                        </div>
                        <div class="divider"></div>
                        <div class="p-4 pt-1">
                            <div class="text-2xl font-bold mb-3">Order Summary</div>
                            <div class="flex justify-between font-semibold">
                                <div>ราคาสินค้าทั้งหมด</div>
                                <div>
                                    {{ cartStore.summaryPrice }}
                                </div>
                            </div>
                            <div class="flex justify-between font-semibold">
                                <div>ค่าส่ง</div>
                                <div>0</div>
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="flex justify-between p-4 mb-4 font-semibold">
                            <div>ราคาทั้งหมด</div>
                            <div>{{ cartStore.summaryPrice }}</div>
                        </div>  
                    </div>
                </section>
            </div>
        </div>
    </UserLayout>
</template>