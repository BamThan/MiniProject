<script setup>
import { useRouter } from 'vue-router';

import UserLayout from '@/layouts/UserLayout.vue'
import Close from '@/components/icons/Close.vue';

import { useCartStore } from '@/stores/user/cart';

const router = useRouter()

const cartStore = useCartStore()

const changeQuantity = (event, index) => {
    const newQuantity = parseInt(event.target.value)
    cartStore.updateQuantity(index, newQuantity)
}

</script>

<template>
    <UserLayout>
        <h1 class="text-3xl font-bold m-4">Shopping Cart</h1>
        <div class="container mx-10 rounded-4xl">    
            <div class="flex gap-3">
                <div class="flex-auto w-64 bg-accent-content/10 shadow-sm p-4 rounded-4xl">
                    <div v-if="cartStore.items.length === 0">
                        Cart is empty
                    </div>
                    <div v-else v-for="(item, index) in cartStore.items" class="flex">
                        <div class="flex-1">
                            <img class="p-4 rounded-4xl" :src="item.imageUrl"></img>
                        </div>
                        <div class="flex-1 my-5">
                            <div class="flex flex-col justify-between h-full">
                                <div>
                                    <div class="relative grid grid-cols-2">
                                        <div>
                                            <div class="text-xl font-bold">{{ item.name }}</div>
                                            <div> {{ item.about }}</div>
                                            <div>{{ item.price }}</div>                                        
                                        </div>
                                        <div>
                                            <select v-model="item.quantity" @change="changeQuantity($event, index)" class="select w-28">
                                                <option v-for="quantity in [1,2,3,4,5]">
                                                    {{ quantity }}
                                                </option>
                                            </select>
                                        </div>
                                        <div @click="cartStore.removeItemInCart(index)" class="absolute top-0 right-0">
                                            <Close></Close>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <b>in stock</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-auto w-32 bg-neutral-content/50 shadow-sm p-4 rounded-4xl">
                    <div class="text-xl font-bold">Order Summary</div>
                    <div class="m-4 divide-y divide-stone-700">
                        <div class="flex justify-between py-2">
                            <div>ราคาสินค้าทั้งหมด</div>
                            <div>{{ cartStore.summaryPrice }}</div>
                        </div>
                        <div class="flex justify-between py-2">
                            <div>ค่าส่ง</div>
                            <div>0</div>
                        </div>
                        <div class="flex justify-between py-2">
                            <div>ราคารวมทั้งหมด</div>
                            <div>100</div>
                        </div>
                        <RouterLink :to="{ name: 'checkout' }" class="btn bg-stone-700 w-full mt-4 text-white">
                            ชำระเงิน  
                        </RouterLink>
                    </div>
                    
                </div>
            </div>    
        </div>
    </UserLayout>
</template>