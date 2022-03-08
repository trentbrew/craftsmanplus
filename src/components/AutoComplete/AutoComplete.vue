<script setup lang="ts">
import { ref, Ref, watch, nextTick } from 'vue'
import axios from 'axios'

const books = ref()
const searchQuery = ref('')
const selected = ref(null)
const loading = ref(false)

const input = ref()

function fetchBooks(query: string) {
  loading.value = true
  const q = query.split(' ').join('+')
  return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`).then((res) => {
    loading.value = false
    return res.data.items.filter((item: any) => item.volumeInfo.imageLinks?.thumbnail)
  })
}

async function search() {
  books.value = await fetchBooks(searchQuery.value)
}

function clear() {
    books.value = null
    searchQuery.value = ''
}
</script>

<template>
    <div class="flex-col center-content">
        <div 
        class="flex items-center bg-white rounded-full w-[580px] translate-y-[50px] duration-[300ms] hover:shadow-xl hover:shadow-[#0000008] z-50"
        :class="searchQuery !== '' && 'shadow-xl shadow-[#00000008]'"
        >
            <svg class="w-5 h-5 translate-x-[18px]" viewBox="0 0 24 24"><g fill="none"><path d="M10 2.75a7.25 7.25 0 0 1 5.63 11.819l4.9 4.9a.75.75 0 0 1-.976 1.134l-.084-.073l-4.901-4.9A7.25 7.25 0 1 1 10 2.75zm0 1.5a5.75 5.75 0 1 0 0 11.5a5.75 5.75 0 0 0 0-11.5z" fill="currentColor"></path></g></svg>
            <input 
            ref="input"
            type="text" 
            v-model="searchQuery"
            class="bg-white text-black p-2 pl-8 rounded-full outline-none w-full" 
            placeholder="Search books"
            @input="search"
            />
            <button @click="clear">
                <svg class="__clear cursor-pointer w-6 h-6 mr-2 rotate-45 fill-gray-400 hover:opacity-50" viewBox="0 0 24 24"><g fill="none"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2zm0 5a.75.75 0 0 0-.743.648l-.007.102v3.5h-3.5a.75.75 0 0 0-.102 1.493l.102.007h3.5v3.5a.75.75 0 0 0 1.493.102l.007-.102v-3.5h3.5a.75.75 0 0 0 .102-1.493l-.102-.007h-3.5v-3.5A.75.75 0 0 0 12 7z" fill="currentColor"></path></g></svg>
            </button>
        </div>
        <div 
        class="dropdown text-align-left bg-[#f6f6f6] rounded-[32px] p-[30px] pb-[0px] pr-[0px] w-[600px] shadow-lg shadow-[#00000006]"
        :class="searchQuery === '' ? 'pt-[44px] h-[0px] opacity-0' : 'pt-[50px] h-[500px]'"
        >
            <ul 
            v-if="searchQuery !== ''" 
            class="dropdown overflow-y-auto pr-[16px] max-h-full rounded-lg"
            >
                <li
                v-for='(item, index) in books'
                :key='index'
                class="duration-[200ms] cursor-pointer mt-3 p-3 rounded-[12px] hover:bg-[#eee]"
                :class="index === books.length - 1 ? 'mb-[30px]' : index === 0 && 'mt-[18px]'"
                >
                    <a :href="item.volumeInfo.canonicalVolumeLink" target="_blank" class="flex">
                        <img 
                        :src="item.volumeInfo.imageLinks.thumbnail"
                        width="100"
                        class="mr-6 rounded-md shadow-md duration-[400ms]"
                        />
                        <div class="flex-col text-left h-max justify-items-stretch justify-center">
                            <h1 class="text-lg font-bold text-slate-600">{{ item.volumeInfo.title }}</h1>
                            <p class="text-slate-400 text-sm">{{ item.volumeInfo.authors?.join(', ') }}</p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
li:hover img {
    @apply scale-[1.05] shadow-lg;
}
.list-ener-active, .list-leave-active {
    transition: all 1s ease;
}
.list-enter-from, .list-leave-to {
    opacity: 0;
    transform: scale(0.5);
}
.dropdown {
    transition: 1s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>