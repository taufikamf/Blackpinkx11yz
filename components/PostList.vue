<template>
    <div class="overflow-x-auto">
        <table class="table w-full">
        <!-- head -->
        <thead>
            <tr>
                <th></th>
                <th>Title</th>
                <th>Image</th>
                <th>Post Url</th>
            </tr>
        </thead>
        <tbody>
        <!-- row 1 -->
        <tr v-if="data" v-for="(post, index) in data" :key="post.id">
            <th>{{ index+1 }}</th>
            <td>
                <nuxt-link class="link link-info" :to="(`/posts/${post.slug}`)">{{ shortenedStr(post.title.rendered) }}</nuxt-link>
            </td>
            <td>
                <div class="avatar">
                    <div class="w-24 rounded">
                        <img :src="post.yoast_head_json.og_image[0].url" />
                    </div>
                </div>
            </td>
            <td>
                <button @click="copyToClipboard(`${this.domain}/client/${post.slug}`)" class="btn btn-accent">Copy</button>
            </td>
        </tr>
        </tbody>
    </table>
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
    function refetch(pageNumber){
        page.value = pageNumber
        refresh()
    }
</script>
<script>
export default{
    data() {
        return {
            domain: ''
        }
    },
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
        },
        copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => {
            console.log('Text copied to clipboard')
            })
            .catch((error) => {
            console.error('Could not copy text: ', error)
            })
        }
    },
    mounted(){
        this.domain = window.location.origin
    }
}
</script>