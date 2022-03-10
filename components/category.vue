<template>
  <li class="mx-auto lg:mx-0 w-full max-w-xs flex">
    <nuxt-link :to="url || './'" :class="['category group mb-12 px-4 pb-1 w-full flex flex-col relative transition', url ? 'hover:text-white focus:text-white' : 'pointer-events-none']">
      <div :class="['mast box mb-1 p-4 bg(center cover no-repeat) text-gray-400 flex items-center relative transition group-hover:(text-white) group-focus:(text-white)',
        bg_img ? 'h-32' : '',
        bg_color
      ]"
      :style="'background-image: url(\''+ bg_img +'\');'"
    >
        <svg v-if="fg_img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" role="img" class="w-auto h-12 max-w-full fill-current">
          <title>{{ title }} {{ svg_title }}</title>
          <g v-html="fg_img"></g>
        </svg>
        <i v-if="fg_ico" :class="fg_ico"></i>
        <b class="h-px bg-gradient-to-r from-white to-transparent opacity-20 absolute top-0 inset-x-0 transition group-hover:(opacity-40) group-focus:(opacity-40)" aria-hidden="true"></b>
        <b class="w-px bg-gradient-to-b from-white to-transparent opacity-20 absolute inset-y-0 left-0 transition group-hover:(opacity-40) group-focus:(opacity-40)" aria-hidden="true"></b>
        <i v-if="!bg_img" class="h-0 bg-blue-400 absolute bottom-px inset-x-px transition-all group-hover:(h-[2px]) group-focus:(h-[2px])" aria-hidden="true"></i>
      </div>
      <div class="meta pt-1 flex items-center">
        <p class="name text(white base) font-bold leading-none block truncate" :aria-hidden="title ? 'false' : 'true'">
          {{ title }}&nbsp;
        </p>
        <div v-if="subtext" class="ml-auto leading-none">
          <small class="ml-auto font-bold opacity-80" v-html="subtext"></small>
        </div>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
  export default {
    props: [
      'title',
      'subtext',
      'url',
      'bg_color',
      'bg_img',
      'fg_img',
      'fg_ico',
      'svg_title',
    ]
  }
</script>