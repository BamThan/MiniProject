<script setup>
import { ref, onMounted, provide } from 'vue';
import UserLayout from '@/layouts/UserLayout.vue'

import { useCartStore } from '@/stores/user/cart';

const cartStore = useCartStore()

const orderData = ref({})

onMounted(() => {
    cartStore.loadCheckout()
    if (cartStore.checkout.orderNumber) {
        orderData.value = cartStore.checkout
    }
})

</script>

<template>
    <UserLayout>
        <div class="max-w-5xl mx-auto mt-5 border border-base-200 shadow-xl p-8">
            <div>
                <div class="text-2xl font-bold">Your order is successful!</div>
                <div>Hi {{ orderData.name }}</div>
                <div>เตรียมรอรับสินค้าได้เลย</div>
            </div>
            <div class="divider"></div>
            <div class="grid grid-cols-4 gap-2">
                <div>
                    <div class="font-bold">Order date</div>
                    <div>{{ orderData.createDate }}</div>
                </div>
                <div>
                    <div class="font-bold">Order Number</div>
                    <div>{{ orderData.orderNumber }}</div>
                </div>
                <div>
                    <div class="font-bold">Payment method</div>
                    <div>{{ orderData.paymentMethod }}</div>
                </div>
                <div>
                    <div class="font-bold">Address</div>
                    <div>{{ orderData.address }}</div>
                </div>
            </div>
            <div class="divider"></div>
            <div v-for=" product in orderData.products" class="grid grid-cols-4 gap-2 mb-4 items-center">
                <div>
                    <img class="w-full p-6" :src="product.imageUrl"></img>
                </div>
                <div class="font-bold">
                    {{ product.name }}
                </div>
                <div>
                    จำนวน: {{ product.quantity }}
                </div>
                <div>
                    ราคารวม {{ product.price * product.quantity }}
                </div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between text-lg">
                <div class="font-bold">ราคาสินค้าทั้งหมด</div>
                <div class="font-semibold">{{ orderData.totalPrice }}</div>
            </div>
            <div class="flex justify-between text-lg mt-4">
                <div class="font-bold">ค่าส่ง</div>
                <div class="font-semibold">0</div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between text-lg">
                <div class="font-bold">ราคาทั้งสิ้น</div>
                <div class="font-semibold">{{ orderData.totalPrice }}</div>
            </div>
            <div class="divider"></div>
            <div>ขอบคุณที่มาซื้อของเรา</div>
        </div>
    </UserLayout>
</template>