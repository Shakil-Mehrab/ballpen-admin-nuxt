<template>
  <div class="w-full pb-8">
    <Breadcrumb leading="Statistics" trialing="" breadcrumb="Show stats" />

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
        <div
          class="flex justify-between px-3 py-1 mb-3 space-x-3 rounded-md bg-slate-200"
        >
          <span class="text-sm font-medium text-blue-800"
            >Total Days: {{ daysDifference }}</span
          >

          <span class="text-sm font-medium text-green-500"
            >Total News: {{ meta.total }}</span
          >
          <span class="text-sm font-medium text-indigo-500"
            >Total Avg: {{ average }}</span
          >
        </div>

        <div
          class="flex flex-wrap items-center mb-3 space-x-0 space-y-2 md:space-x-3 md:space-y-0"
        >
          <div class="w-full md:w-max">
            <FormSelect
              v-model="selected_author_id"
              id="status"
              name="status"
              class="h-10"
            >
              <option value="">Select User</option>
              <option :value="user.id" v-for="user in users" :key="user.id">
                {{ user.name }}
              </option>
            </FormSelect>
          </div>

          <div class="flex items-center w-full space-x-3 md:w-max">
            <input
              class="flex-grow w-full px-2 border border-gray-300 rounded-md shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 focus:outline-none"
              type="date"
              name="from"
              id="from"
              v-model="selected_from"
            />
            <span>to</span>
            <input
              class="flex-grow w-full px-2 border border-gray-300 rounded-md shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 focus:outline-none"
              type="date"
              name="to"
              id="to"
              v-model="selected_to"
            />
          </div>
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
import moment from 'moment'

export default {
  middleware: ['authIndent'],

  data() {
    return {
      articles: [],
      meta: {},
      archived: false,
      searching: '',
      articleSlug: '',
      users: [],

      selected_author_id: null,
      selected_from: null,
      selected_to: null,
    }
  },

  components: {
    PencilIcon,
    ArchiveIcon,
  },

  head: {
    title: 'Statistics',
  },

  watch: {
    '$route.query'(query) {
      this.getArticles(query)
    },

    searching: debounce(function () {
      this.search(this.searching)
    }, 500),

    selected_author_id(arg) {
      this.AuthorChanged(arg)
    },

    selected_from(arg) {
      this.changedFrom(arg)
    },

    selected_to(arg) {
      this.changedTo(arg)
    },
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

    let userResponse = await app.$axios.$get('v2/admin/users')
    return {
      articles: articlesResponse.data,
      meta: articlesResponse.meta,
      users: userResponse.data,
    }
  },

  methods: {
    async getArticles(query = this.$route.query) {
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

    async AuthorChanged(author_id) {
      await this.$router
        .replace({
          query: Object.assign({}, this.$route.query, {
            author: author_id,
          }),
        })
        .catch(() => {})
    },

    async changedFrom(from) {
      await this.$router
        .replace({
          query: Object.assign({}, this.$route.query, {
            from: from,
          }),
        })
        .catch(() => {})
    },

    async changedTo(to) {
      await this.$router
        .replace({
          query: Object.assign({}, this.$route.query, {
            to: to,
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

  computed: {
    average() {
      return Math.floor(this.meta.total / this.daysDifference)
    },

    daysDifference() {
      const a = moment(this.selected_from)
      const b = moment(this.selected_to)

      return b.diff(a, 'days') > 1 ? b.diff(a, 'days') : 1
    },
  },

  mounted() {
    if (this.$route.query.search) {
      this.searching = this.$route.query.search
    }

    if (this.$route.query.author) {
      this.selected_author_id = this.$route.query.author
    }

    if (this.$route.query.from) {
      this.selected_from = this.$route.query.from
    }
    // else {
    //   var now = new Date()

    //   this.selected_from = moment(now.setDate(now.getDate() - 60)).format(
    //     'YYYY-MM-DD'
    //   )
    //   // this.changedFrom = changedFrom(this.selected_from)
    // }

    if (this.$route.query.to) {
      this.selected_to = this.$route.query.to
    } else {
      this.selected_to = moment().format('YYYY-MM-DD')

      // this.changedTo(this.selected_to) //error because load the functuin before loading mehtods
    }
  },
}
</script>
