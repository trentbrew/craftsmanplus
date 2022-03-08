<script setup lang="ts">
import { ref, computed } from 'vue';

const emit = defineEmits(['update:value', 'input', 'clear']);
const props = defineProps(['placeholder', 'value', 'data']);

const val = computed(() => props.value);

function handleInput(e:any) {
    emit('input', e);
    emit('update:value', e.target.value);
}

function handleClear(e:any) {
    emit('clear', e);
}
</script>

<template>
    <div class="flex-col center-content">
        <div 
        class="flex items-center bg-white rounded-full w-[580px] translate-y-[50px] duration-[300ms] hover:shadow-xl hover:shadow-[#0000008] z-50"
        :class="val !== '' && 'shadow-xl shadow-[#00000008]'"
        >
            <svg class="w-5 h-5 translate-x-[18px]" viewBox="0 0 24 24">
                <g><path d="M10 2.75a7.25 7.25 0 0 1 5.63 11.819l4.9 4.9a.75.75 0 0 1-.976 1.134l-.084-.073l-4.901-4.9A7.25 7.25 0 1 1 10 2.75zm0 1.5a5.75 5.75 0 1 0 0 11.5a5.75 5.75 0 0 0 0-11.5z" fill="currentColor"></path></g>
            </svg>
            <input 
            class="bg-white text-black p-2 pl-8 rounded-full outline-none w-full" 
            type="text" 
            :value="val"
            :placeholder="placeholder || 'Type here'"
            @input="handleInput"
            />
            <button 
            @click="handleClear" 
            class="duration-[400ms] hover:scale-90"
            :class="value === '' ? '!scale-0' : 'scale-100 opacity-100'"
            >
                <svg 
                class="__clear cursor-pointer w-7 h-7 mr-2 rotate-45" 
                viewBox="0 0 24 24"
                >
                    <g><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2zm0 5a.75.75 0 0 0-.743.648l-.007.102v3.5h-3.5a.75.75 0 0 0-.102 1.493l.102.007h3.5v3.5a.75.75 0 0 0 1.493.102l.007-.102v-3.5h3.5a.75.75 0 0 0 .102-1.493l-.102-.007h-3.5v-3.5A.75.75 0 0 0 12 7z" fill="currentColor"></path></g>
                </svg>
            </button>
        </div>
        <div 
        class="dropdown text-align-left bg-[#f6f6f6] rounded-[32px] p-[30px] pb-[0px] pr-[0px] w-[600px] shadow-lg shadow-[#00000006]"
        :class="val === '' ? 'pt-[44px] h-[0px] opacity-0' : 'pt-[50px] h-[500px]'"
        >
            <ul 
            v-if="val !== ''" 
            class="dropdown overflow-y-auto pr-[16px] max-h-full rounded-lg"
            >
                <li
                v-for='(item, index) in data'
                :key='index'
                class="duration-[200ms] cursor-pointer mt-3 p-3 rounded-[12px] hover:bg-[#eee]"
                :class="index === data.length - 1 ? 'mb-[30px]' : index === 0 && 'mt-[18px]'"
                >
                    <slot :item="item">
                        <p class="text-slate-400 text-sm">{{ item }}</p>
                    </slot>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.dropdown {
    transition: 1.5s ease;
}
</style>