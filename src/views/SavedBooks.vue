<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useSavedBooks } from '../store/saved';

const store = useSavedBooks();

const data = computed(() => store.saved);
</script>

<template>
    <div class="flex-col center-content mt-12">
        <ul v-if="data && data.length > 0" class="dropdown overflow-y-auto pr-[16px] max-h-[500px] rounded-lg">
            <li
            v-for='(item, index) in data'
            :key='index'
            class="duration-[200ms] cursor-pointer mt-3 p-4 rounded-[12px] hover:bg-[#ddd]"
            :class="index === data.length - 1 ? 'mb-[30px]' : index === 0 && 'mt-[18px]'"
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
        <h3 
        v-if="!data || data.length === 0"
        class="dropdown overflow-y-auto pr-[16px] max-h-full rounded-lg" 
        >
        No books saved
        </h3>
    </div>
</template>

<style>
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}
::-webkit-scrollbar-thumb {
  background: #00000021; 
  border-radius: 24px;
}
::-webkit-scrollbar-thumb:hover {
  background: #00000011; 
}
::-webkit-scrollbar-track {
  border-radius: 24px;
}
</style>