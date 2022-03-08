import { defineStore } from 'pinia';

export const useSavedBooks = defineStore('saved', {
    state: () => {
        return {
            saved: [],
        };
    },
    actions: {
        saveBook(data: any) {
            if (!data) return;
            this.saved.push(data);
        },
    },
});

