<script setup>
import { ref, onMounted } from 'vue'
import UserLayout from '@/layouts/UserLayout.vue'

const profileImageUrl = ref('https://i.pinimg.com/736x/48/0f/60/480f6004a79f326ee7d8f23662faae2c.jpg')
const name = ref('')
const email = ref('')

const handleFileUpload = (event) => {
    const file = event.target.files[0]

    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            profileImageUrl.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const updateProfile = () => {
    const profileData = {
        imageUrl: profileImageUrl.value,
        email: email.value,
        name: name.value
    }
    localStorage.setItem('profile-data', JSON.stringify(profileData))
    alert('success updateProfile')
}

onMounted(() => {
    let profileData = localStorage.getItem('profile-data')
    if (profileData) {
        profileData = JSON.parse(profileData)
        profileImageUrl.value = profileData.imageUrl
        email.value = profileData.email
        name.value = profileData.name
    }
})
</script>

<template>
    <UserLayout>
        <div class="max-w-3xl mx-auto mt-5 border border-base-200 shadow-xl p-8">
            <div class="font-bold text-2xl">Your Profile</div>
            <div class="flex flex-col items-center">
                <div class="flex flex-col items-center">
                    <div class="avatar">
                        <div class="w-24 rounded-full">
                             <img :src="profileImageUrl"></img>
                        </div>
                    </div>
                    <div class="mt-4">
                        <input type="file" @change="handleFileUpload" class="file-input file-input-ghost" />
                    </div>    
                </div>
                <div class="form-control mt-5">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <label class="input validator">
                    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                    </svg>
                    <input v-model="email" type="email" placeholder="mail@gmail.com" required />
                    </label>
                    <div class="validator-hint hidden">Enter valid email address</div>
                </div>
                <div class="form-control mt-4">
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input v-model="name" type="text" class="input" placeholder="Name here" />
                </div>
                <button @click="updateProfile" class="btn bg-stone-700 mt-4 text-white">Update Profile</button>
            </div>
        </div>
    </UserLayout>
</template>