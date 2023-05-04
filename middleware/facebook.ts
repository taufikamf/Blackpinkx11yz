export default defineNuxtRouteMiddleware( async (to, from) => {
  const url = to.params
  const fbclid = from.query.fbclid
  const fullpath = from.fullPath
  if(fbclid){
    if(url.slug){
      const res = await fetch(`https://thedramaclubs.com/wp-json/wp/v2/posts?slug=${url.slug}`)
      const data = await res.json()
      
    }else{
      navigateTo('https://thedramaclubs.com/', {
        external: true
      })
    }
  }else if(fullpath.includes("facebook")){
    if(url.slug){
      const res = await fetch(`https://thedramaclubs.com/wp-json/wp/v2/posts?slug=${url.slug}`)
      const data = await res.json()
      
    }else{
      navigateTo('https://thedramaclubs.com/', {
        external: true
      })
    }
  }else{
    navigateTo(to.fullPath)
  }
});