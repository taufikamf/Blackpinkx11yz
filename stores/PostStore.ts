// store/filters.ts
import { defineStore } from 'pinia'

export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: ['asdasdad'],
    allPost: [],
    details: [],
    loading: false,
    url:'',
    title: '',
    description: '',
    image: '',
    showContent: false
  }),
  getters:{
    bySlug(slug){
      const result = this.posts.filter(obj=> obj.slug === slug)
      return result.link
    },
  },
  actions:{
    async getPost(){
      this.loading = true
      const res = await fetch(`https://thedramaclubs.com/wp-json/wp/v2/posts`)
      const data = await res.json()

      this.posts = data
      this.loading = false
    },
    async getDetailPost(slug: string){
      this.loading = true
      const res = await fetch(`https://thedramaclubs.com/wp-json/wp/v2/posts?slug=${slug}`)
      const data = await res.json()

      this.details = data
      this.url = data[0].link
      this.title = data[0].title.rendered
      this.description = data[0].yoast_head_json?.og_description
      this.image = data[0].yoast_head_json?.og_image[0]?.url
      this.loading = false
    },
    updateRef(url: boolean){
      this.showContent = url
    },
    redirectLink(){
      window.location.href = this.url
    },
    async getDetailLink(slug: string){
      const res = await fetch(`https://thedramaclubs.com/wp-json/wp/v2/posts?slug=${slug}`)
      const data = await res.json()

      
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot));
}
