<template>
  <div
    class="items-center justify-between p-2 mb-1 bg-white rounded-md sm:px-6 lg:px-8 sm:py-3 lg:py-4 sm:flex group"
    :class="{ 'opacity-50': article.archived }"
  >
    <!-- <div class="flex items-center space-x-1 sm:mr-6">
      <div class="flex-shrink-0 mb-4 sm:mb-0" v-if="article.thumbnails">
        <img
          class="w-16 h-16 text-gray-300 bg-white border border-gray-300 rounded-sm"
          v-if="article.thumbnails.original"
          v-lazy="article.thumbnails.original"
          :alt="article.title"
        />
      </div>

      <div class="flex-shrink-0 mb-4 sm:mb-0" v-else>
        <img
          class="w-16 h-16 text-gray-300 bg-white border border-gray-300 rounded-sm"
          src="@/assets/images/placeholder.png"
          alt="article"
        />
      </div>
    </div> -->

    <div class="flex flex-wrap items-center justify-between w-full">
      <div class="w-full mb-2 md:mb-0 md:w-6/12">
        <a href="#">
          <h2 class="text-base font-medium text-gray-700">
            {{ article.title }}
          </h2>
        </a>

        <div class="flex items-center mt-2 space-x-3">
          <div
            class="px-2 pb-0.5 text-xs border rounded-full shadow-sm"
            :class="
              article.status == 'published'
                ? 'text-green-900 bg-green-300'
                : 'text-red-400 bg-red-50'
            "
          >
            {{ article.status }}
          </div>
          <div class="flex items-center space-x-1">
            <ClockIcon class="w-6 h-6 text-sm text-gray-500 sm:w-4 sm:h-4" />
            <div class="text-sm text-gray-500">
              {{ article.formatted_date_time }}
            </div>
          </div>
        </div>

        <!-- <div class="flex items-center mt-2 space-x-3">
          <div class="flex items-center">
            <UserIcon class="inline-block w-4 h-4 text-sm text-gray-500" />
            <div class="text-sm text-gray-500">
              {{ article.user.name }}
            </div>
          </div>
        </div> -->
      </div>

      <!-- <div class="w-full mb-1 md:mb-0 md:w-4/12" v-if="categories.length">
        <a
          v-for="category in categories"
          :key="category.id"
          href="#"
          class="inline-block px-1 mb-1 mr-1 text-gray-500 bg-white border border-gray-300 rounded"
        >
          {{ category.name }}
        </a>
        <div v-if="categoryMoreCount > 0" class="text-gray-500">
          +{{ categoryMoreCount }} more
        </div>
      </div> -->
      <div
        class="transition-opacity duration-200 opacity-100 md:opacity-0 group-hover:opacity-100"
      >
        <div class="flex items-center space-x-2">
          <template v-if="!article.archived">
            <button
              type="button"
              class="inline-flex items-center justify-center px-2 py-1 text-sm font-medium tracking-wider text-center text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:ring-green-500 sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2"
              @click.prevent="copyLink(article.slug)"
            >
              <input
                type="text"
                :value="`https://dbcnews.tv/articles/${article.slug}`"
                :id="`${article.slug}`"
                class="absolute top-0"
              />
              <DocumentDuplicateIcon
                class="w-5 h-5 text-sm text-white sm:w-6 sm:h-6"
              />
            </button>

            <nuxt-link
              :to="link(article.slug)"
              exact
              class="inline-flex items-center justify-center px-2 py-1 text-sm font-medium tracking-wider text-center text-white bg-blue-600 border border-transparent rounded-md shadow-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-blue-700 focus:ring-blue-500"
              >Edit
            </nuxt-link>

            <button
              type="button"
              class="inline-flex items-center justify-center px-2 py-1 text-sm font-medium tracking-wider text-center text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:ring-red-500 sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2"
              @click.prevent="confirmDelete(article.slug)"
            >
              Delete
            </button>
          </template>
          <template v-else>
            <button
              type="button"
              class="inline-flex items-center justify-center px-2 py-1 font-medium tracking-wider text-center text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:ring-indigo-500 text-bases focus:outline-none focus:ring-2 focus:ring-offset-2"
              @click="restoreArticle(article.slug)"
            >
              Restore
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ClockIcon,
  UserIcon,
  DocumentDuplicateIcon,
} from '@vue-hero-icons/outline'

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },

  components: {
    ClockIcon,
    UserIcon,
    DocumentDuplicateIcon,
  },

  methods: {
    link(arg) {
      return {
        name: 'articles-edit-slug',
        params: {
          slug: arg,
        },
      }
    },

    statusMessage(type, message) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      })
      Toast.fire({
        icon: type,
        title: message,
      })
    },

    async confirmDelete(slug) {
      this.$emit('deleteArticleConfirmActionFromItem', slug)
    },

    async restoreArticle(articleSlug) {
      try {
        await this.$axios
          .patch(`v2/admin/articles/restore/${encodeURI(articleSlug)}`)
          .then(({ data }) => {
            this.$emit('reloadEventFromArticleItem')
            this.statusMessage('success', 'Article restore successfully')
          })
      } catch (error) {
        this.statusMessage('error', 'Something went wrong')
      }
    },

    copyLink(id) {
      // console.log(document.getElementById(id))
      document.getElementById(id).select()
      if (document.execCommand('copy')) {
        this.statusMessage('success', 'Copied successfully')
      }
    },
  },

  computed: {
    categories() {
      let count = this.article.categories.length
      let categories = this.article.categories
      if (count > 4) {
        categories = this.article.categories.slice(0, 4)
      }
      return categories
    },

    categoryMoreCount() {
      return this.article.categories.length - 4
    },
  },
}
</script>
