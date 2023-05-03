<template>
  <section class="">
      <Head>
          <Title>Hourly News</Title>
          <Meta name="title" :content="('Hourly News')"/>
          <Meta name="description" :content="('Hourly news article')"/>
      </Head>
    <PostList/>
  </section>
</template>
<script setup>
definePageMeta({
  middleware: "facebook",
});
</script>
