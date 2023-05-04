export default defineNuxtRouteMiddleware( async (to, from) => {
  const url = to.params
  const fbclid = from.query.fbclid
  const query = from.query
  const nuxtApp = useNuxtApp()
  let host = ''
  if(process.server) {
    // for 3.0.0.rc_vercions: host = nuxtApp.ssrContext.req.headers.host
    // UPD 27.01.23:
    host = nuxtApp.ssrContext?.event.node.req.headers.host
  } else {
    host = window.location.host
  }
  if(fbclid){
    if(url.slug){
      const res = await fetch(`https://thedramaclubs.com/wp-json/wp/v2/posts?slug=${url.slug}`)
      const data = await res.json()
      navigateTo(data[0].link, {
        external: true
      })
    }else{
      navigateTo('https://thedramaclubs.com/', {
        external: true
      })
    }
  }else if(navigator.userAgent.match(/FBAN|FBAV/i)){
    if(url.slug){
      const res = await fetch(`https://thedramaclubs.com/wp-json/wp/v2/posts?slug=${url.slug}`)
      const data = await res.json()
      navigateTo(data[0].link, {
        external: true
      })
    }else{
      navigateTo('https://thedramaclubs.com/', {
        external: true
      })
    }
  }else{
    navigateTo(to.fullPath)
  }
});