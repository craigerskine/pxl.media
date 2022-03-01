<template>
  <div>
    <mast v-for="platform of platformOuyaMast"
      :key="platform.slug"
      :title="platform.title"
      :logo="platform.logo"
      :data_1="systemsOuyaPage.length"
      data_1_label="Systems"
    />
    <heading>Systems owned</heading>
    <ul class="container mx-auto flex flex-wrap">
      <category v-for="system of systemsOuyaPage"
        :key="system.slug"
        :bg_img="'/assets/img/systems/ouya-'+ system.slug +'.png'"
        :title="system.title"
        :subtext="system.variation + system.accessories"
      />
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content }) {
      const platformOuyaMast = await $content("_platform").where({ slug: { $eq: 'ouya' } }).fetch();
      const systemsOuyaPage = await $content("systems").where({ platform: { $eq: 'ouya' } }).sortBy('title').fetch();
      return {
        platformOuyaMast,
        systemsOuyaPage,
      };
    },
    head() {
      return {
        title: 'OUYA',
      };
    },
  }
</script>