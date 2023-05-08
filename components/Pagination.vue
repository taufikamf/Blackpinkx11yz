<template>
    <section class="flex justify-center w-screen mx-auto">
        <div class="btn-group">
            <button class="btn" :class="{'btn btn-active' : currentPage == pageNumber}" @click="$emit('change', pageNumber)" v-for="pageNumber in totalPages" :key="pageNumber">{{ pageNumber }}</button>
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
