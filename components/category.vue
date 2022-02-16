<template>
  <li class="mx-auto lg:mx-0 w-full max-w-xs flex">
    <nuxt-link :to="url" :class="['category group mb-12 px-4 pb-1 w-full flex flex-col relative transition', { 'hover:text-white focus:text-white' : url }]">
      <div :class="['mast box mb-1 p-4 bg(center cover no-repeat) text-gray-400 flex items-center relative transition group-hover:(text-white) group-focus:(text-white)',
        bg_img ? 'h-32' : 'border(b-2 transparent) group-hover:(border-blue-400) group-focus:(border-blue-400)',
        bg_color
      ]"
      :style="'background-image: url(\''+ bg_img +'\');'"
    >
        <svg v-if="fg_img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" role="img" class="w-auto h-12 max-w-full fill-current">
          <title>{{ title }} {{ svg_title }}</title>
          <g v-html="fg_img"></g>
        </svg>
        <i v-if="fg_ico" :class="fg_ico"></i>
      </div>
      <div class="meta pt-1 flex items-center">
        <p class="name text(white base) font-bold block truncate" :aria-hidden="title === '' ? 'true' : 'false'">
          {{ title }}&nbsp;
        </p>
        <div v-if="subtext" class="ml-auto">
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