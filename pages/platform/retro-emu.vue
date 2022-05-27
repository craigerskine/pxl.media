<template>
  <div>
    <mast v-for="platform of platformRetroMast"
      :key="platform.slug"
      :title="platform.title"
      :logo="platform.logo"
      :data_1="systemsRetroPage.length"
      data_1_label="Systems"
    />
    <heading>Systems owned</heading>
    <ul class="container mx-auto flex flex-wrap">
      <category v-for="system of systemsRetroPage"
        :key="system.slug"
        :bg_img="'/assets/img/systems/retro-'+ system.slug +'.png'"
        :title="system.title"
        :subtext="system.variation + system.accessories"
      />
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content }) {
      const platformRetroMast = await $content("_platform").where({ slug: { $eq: 'retro-emu' } }).fetch();
      const systemsRetroPage = await $content("systems").where({ platform: { $eq: 'retro-emu' } }).sortBy('title').fetch();
      return {
        platformRetroMast,
        systemsRetroPage,
      };
    },
    head() {
      return {
        title: 'Retro Emulation',
      };
    },
  }
</script>