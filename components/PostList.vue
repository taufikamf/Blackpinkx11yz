<template>
    <div class="grid grid-cols-3 gap-7 mb-10">
        <div class="card w-96 bg-base-100 shadow-xl" v-if="data" v-for="post in data" :key="post.id">
            <figure><img :src="post.yoast_head_json.og_image[0].url" alt="Shoes" /></figure>
            <div class="card-body">
                <nuxt-link class="card-title hover:underline" :to="(`/posts/${post.slug}`)">
                {{ shortenedStr(post.title.rendered) }}
                </nuxt-link>
                <p class="mt-2">{{ shortenedStr(post.yoast_head_json.og_description) }}</p>
                <div class="card-actions justify-between pt-2">
                <small class="text-sm">by {{ post._embedded.author[0].name}}</small>
                <small>{{convertDate(post.date)}}</small>
                </div> 
            </div>
        </div>
    </div>
    <Pagination @change="refetch" :totalPages="10" :currentPage="page"/>
</template>
<script setup>
    const runtimeConfig = useRuntimeConfig()
    import { usePostStore } from '~/stores/PostStore';
    const postStore = usePostStore()
    postStore.showContent = true
    const page = ref(1)

    const {data, pending, refresh} = await useFetch(()=>`${runtimeConfig.public.API_URL}wp-json/wp/v2/posts?page=${page.value}&_embed=1`)
    console.log(data)
    function refetch(pageNumber){
        page.value = pageNumber
        refresh()
    }
</script>
<script>
export default{
    methods: {
        shortenedStr(string){
            const newString = string.replace(/&#(\d+);/g, function(match, dec) {
                return String.fromCharCode(dec);
            });
            return newString.slice(0, 80) + "..";
        },
        convertDate(date){
            var date = new Date(date);
            // Format the date as "Month Day, Year"
            var months = ["January", "February", "March", "April", "May", "June", "July",
                        "August", "September", "October", "November", "December"];
            var month = months[date.getMonth()];
            var day = date.getDate();
            var year = date.getFullYear();
            return month + " " + day + ", " + year;
        }
    },
}
</script>