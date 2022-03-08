<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';
import { useSavedBooks } from '../store/saved';
import AutoComplete from '../components/AutoComplete/AutoComplete.vue';

const store = useSavedBooks();
const searchQuery = ref('');
const books = ref();

function fetchBooks(query:string) {
  const q = query.split(' ').join('+');
  return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`).then((res) => {
    return res.data.items.filter((item: any) => item.volumeInfo.imageLinks?.thumbnail);
  });
}

async function search(query:string) {
  if (query === '') return;
  books.value = await fetchBooks(query);
}

function clear() {
  books.value = null;
  searchQuery.value = '';
}

function save(data:any) {
  store.saveBook(data);
  alert(`${data.volumeInfo.title} is saved to your library`);
}

watch(() => searchQuery.value, (query:string) => {
  search(query);
});
</script>

<template>
  <div class="center-content flex-col">
    <AutoComplete 
    v-model:value="searchQuery" 
    :data="books"
    placeholder="Find Books"
    @clear="clear"
    >
      <template v-slot="props">
        <a :href="props.item.volumeInfo.canonicalVolumeLink" target="_blank" class="flex">
          <img 
          :src="props.item.volumeInfo.imageLinks.thumbnail"
          width="100"
          class="mr-6 rounded-md shadow-md duration-[400ms]"
          />
          <div class="flex-col text-left h-max justify-between">
              <div>
                <h1 class="text-lg font-bold text-slate-600">{{ props.item.volumeInfo.title }}</h1>
                <p class="text-slate-400 text-sm">{{ props.item.volumeInfo.authors?.join(', ') }}</p>
              </div>
              <button 
              @click.prevent="save(props.item)" 
              class="text-white bg-slate-700 rounded-full py-1 px-2 text-[10px] mt-2 hover:bg-[#eee] hover:text-slate-700 duration-200 border-2 border-slate-700 font-bold"
              >Save</button>
          </div>
        </a>
      </template>
    </AutoComplete>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap');
.__logo {
  font-family: Serif, 'Gochi Hand', cursive;
}
li:hover img {
    @apply scale-[1.05] shadow-lg;
}
</style>