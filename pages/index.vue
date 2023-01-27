<template>
  <div class="w-full pb-8">
    <Breadcrumb
      leading="Articles"
      trialing="New Article"
      :href="{ name: 'articles-create' }"
      breadcrumb="Article / list"
    />

    <div class="px-4 pt-6 mx-auto sm:px-6 lg:px-8">
      <div class="flex flex-col">
        <div class="mb-3">
          <input
            type="search"
            placeholder="Searh"
            v-model="searching"
            class="flex-grow w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 focus:outline-none"
          />
        </div>
        <div class="flex justify-between mb-3 space-x-3">
          <button
            type="button"
            class="cursor-pinter whitespace-nowrap"
            @click.prevent="toggleArchiveArticles"
          >
            <ArchiveIcon class="inline-block w-4 h-4 text-gray-500" />
            View archive articles
          </button>
          <div id="copy_messege" class="flex-grow"></div>
        </div>
        <div
          class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg"
        >
          <div class="" v-if="articles.length">
            <ArticleItem
              v-for="article in articles"
              :key="article.id"
              :article="article"
              @reloadEventFromArticleItem="getArticles"
              @deleteArticleConfirmActionFromItem="confirmDelete"
            />
          </div>
          <div class="w-full p-2 text-center" v-else>No article listed</div>

          <div class="px-2 pb-2 bg-white" v-if="meta.last_page > 1">
            <AppPagination :meta="meta" />
          </div>

          <div class="delete-modal">
            <AppArticleDeleteModal
              :selectedSlugFromArticlePage="articleSlug"
              @deleteActionFromArticleModal="deleteArticle"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PencilIcon, ArchiveIcon } from '@vue-hero-icons/outline'
import { debounce } from 'debounce'

export default {
  middleware: ['authIndent'],

  data() {
    return {
      articles: [],
      meta: {},
      archived: false,
      searching: '',
      articleSlug: '',
    }
  },

  components: {
    PencilIcon,
    ArchiveIcon,
  },

  head: {
    title: 'Article list',
  },

  watch: {
    '$route.query'(query) {
      this.getArticles(query)
    },

    searching: debounce(function () {
      this.search(this.searching)
    }, 500),
  },

  async asyncData({ app, query = this.$route.query }) {
    let articlesResponse = await app.$axios.$get(
      'v2/admin/articles?per-page=10',
      {
        params: {
          page: query.page,
          ...query,
        },
      }
    )
    return {
      articles: articlesResponse.data,
      meta: articlesResponse.meta,
    }
  },

  methods: {
    async getArticles(query = this.$route.query) {
      console.log(query)
      try {
        await this.$axios
          .$get('v2/admin/articles?per-page=10', {
            params: {
              page: query.page,
              ...query,
            },
          })
          .then((response) => {
            this.articles = response.data
            this.meta = response.meta
          })
      } catch (e) {}
    },

    async confirmDelete(articleSlug) {
      this.articleSlug = articleSlug
      this.$modal.show('app-article-delete-modal')
    },

    async deleteArticle(articleSlug) {
      try {
        await this.$axios
          .delete(`v2/admin/articles/${encodeURI(articleSlug)}`)
          .then(({ data }) => {
            this.getArticles()
            this.$modal.hide('app-article-delete-modal')
            this.statusMessage('success', 'Article deleted successfully')
          })
      } catch (error) {
        if (error.response.status === 500) {
          this.statusMessage('error', 'Server Error')
        } else {
          this.statusMessage('error', 'Something went wrong')
        }
      }
    },

    async toggleArchiveArticles() {
      this.archived = !this.archived
      await this.$router
        .replace({
          query: Object.assign({}, this.$route.query, {
            archived: this.archived,
          }),
        })
        .catch(() => {})
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

    async search(keyword) {
      await this.$router
        .replace({
          query: Object.assign({}, this.$route.query, {
            search: keyword,
          }),
        })
        .catch(() => {})
    },

    link(arg) {
      return {
        name: 'articles-edit-slug',
        params: {
          slug: arg,
        },
      }
    },
  },

  mounted() {
    if (this.$route.query.search) {
      this.searching = this.$route.query.search
    }
  },
}
</script>
