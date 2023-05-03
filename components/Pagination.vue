<template>
    <section class="flex justify-center w-screen mx-auto">
        <div class="btn-group">
            <button class="btn" :class="{'btn btn-active' : currentPage == pageNumber}" @click="$emit('change', pageNumber)" v-for="pageNumber in paginate(currentPage, totalPages)" :key="pageNumber">{{ pageNumber }}</button>
        </div>
    </section>
</template>
<script setup>
defineProps({
    totalPages: Number,
    currentPage: Number,
});

defineEmits(["change"]);
</script>

<script>
export default{
    methods: {
        removeDuplicates(arr, a) {
        return arr.filter((num, index) => {
            // Return true for the first occurrence of the number or if a doesn't match the current number.
            return arr.indexOf(num) === index || num !== a;
        });
        },
        paginate(currentPage, totalPages, numDisplayPages=5) {
            let pages = [];
            if (totalPages <= numDisplayPages) {
                // If the total number of pages is less than or equal to the number of pages to display,
                // simply add all pages to the array.
                for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
                }
            } else {
                // Otherwise, calculate the start and end indexes for the pages to display.
                let startPage = Math.max(currentPage - Math.floor(numDisplayPages / 2), 1);
                let endPage = Math.min(startPage + numDisplayPages - 1, totalPages);

                // Add the first page to the array.
                pages.push(1);

                // If there are gaps before the start page, add an ellipsis to the array.
                if (startPage > 2) {
                pages.push('...');
                }

                // Add the pages to the array.
                for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
                }

                // If there are gaps after the end page, add an ellipsis to the array.
                if (endPage < totalPages - 1) {
                pages.push('...');
                }

                // Add the last page to the array.
                pages.push(totalPages);
            }
            return pages;
        }
    },
}
</script>