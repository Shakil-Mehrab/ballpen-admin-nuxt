<template>
  <div>
    <Breadcrumb leading="Tags" trialing="" breadcrumb="Tag / list" />

    <div class="p-1 mx-auto sm:p-3 lg:p-8">
      <div class="w-full md:flex md:space-x-3 lg:space-x-8">
        <div class="w-full md:w-4/12">
          <div class="p-2 border-2 border-dashed rounded-md sm:p-6 lg:p-8">
            <h1 class="text-xl font-semibold text-red-500">Create New Tag</h1>
            <form @submit.prevent="createTag">
              <div class="sm:rounded-tl-md sm:rounded-tr-md">
                <div class="w-full py-1 md:py-3">
                  <AppLabel> Name </AppLabel>
                  <AppInput
                    placeholder="Name"
                    type="text"
                    id="name"
                    name="name"
                    v-model="form.name"
                  />
                  <AppInputError v-if="errors.name">
                    {{ errors.name[0] }}
                  </AppInputError>

                  <SlugWidget :title="form.name" @slug-changed="updateSlug" />

                  <AppInputError v-if="errors.slug">
                    {{ errors.slug[0] }}
                  </AppInputError>
                </div>
              </div>

              <div
                class="flex items-center mt-3 mb-1 text-right sm:rounded-bl-md sm:rounded-br-md"
              >
                <AppButton
                  class="text-white vertical-gradient hover:bg-red-700 focus:ring-red-500"
                >
                  Submit
                </AppButton>
              </div>
            </form>
          </div>
        </div>

        <div class="w-full h-screen mt-3 overflow-y-auto md:mt-0 md:w-8/12">
          <div class="overflow-hidden border-2 border-dashed rounded-md">
            <div>
              <div
                class="flex flex-wrap items-center justify-between w-full p-2 bg-white border-b border-gray-200 sm:px-4 sm:py-3 lg:py-4"
              >
                <div class="flex-grow">
                  <div class="flex mt-1">
                    <div
                      class="relative flex items-stretch flex-grow focus-within:z-10"
                    >
                      <input
                        class="w-full h-10 px-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:outline-none"
                        type="search"
                        placeholder="Search..."
                        @input="search"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="justify-between p-2 bg-white border-t border-gray-200 sm:py-4 sm:px-4 sm:flex group"
              >
                <div
                  class="flex flex-wrap items-center w-full"
                  v-if="tags.length"
                >
                  <div
                    class="font-solimanlipi"
                    v-for="tag in tags"
                    :key="tag.id"
                  >
                    <button
                      type="button"
                      class="inline-flex items-center px-4 py-2 mt-1 mr-1 text-xs font-semibold tracking-wide text-gray-700 uppercase transition bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25"
                      @click="editTag(tag)"
                    >
                      {{ tag.name }}
                    </button>
                  </div>
                </div>
                <div class="w-full p-2 text-center" v-else>
                  No tag listed yet
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tag">
        <AppTagEditModal
          :selectedTag="selectedTagFromTagPage"
          @updatedFromTagModal="reloadTags"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { UserIcon, ClockIcon } from '@vue-hero-icons/outline'
export default {
  middleware: ['authIndent'],

  data() {
    return {
      tags: [],
      meta: {},

      errors: '',
      searching: '',
      selectedTagFromTagPage: null,

      form: {
        name: '',
        slug: '',
      },
    }
  },

  head: {
    title: 'Tag List',
  },

  components: {
    UserIcon,
    ClockIcon,
  },

  watch: {
    '$route.query'(query) {
      this.getTags(query)
    },
  },

  async asyncData({ app }) {
    let tagsResponse = await app.$axios.$get('v2/admin/tags?per-page=7')
    return {
      tags: tagsResponse.data,
      meta: tagsResponse.meta,
    }
  },

  methods: {
    async search(e) {
      await this.$router
        .replace({
          query: Object.assign({}, this.$route.query, {
            search: e.target.value,
          }),
        })
        .catch(() => {})
    },

    async updateSlug(val) {
      this.form.slug = val
    },

    reloadTags() {
      this.getTags()
    },

    async editTag(tag) {
      this.selectedTagFromTagPage = tag
      this.$modal.show('app-tag-edit-modal')
    },

    async createTag() {
      try {
        await this.$axios.post(`v2/admin/tags`, this.form).then(({ data }) => {
          this.statusMessage('success', 'Topic uploaded successfully')
          this.getTags()
          this.formClear()
          this.errors = []
        })
      } catch (e) {
        this.errors = e.response.data.errors
        this.statusMessage('error', 'Something wrong')
      }
    },

    formClear() {
      this.form = {
        name: '',
        slug: '',
      }
    },

    async getTags(query = this.$route.query) {
      try {
        await this.$axios
          .$get('v2/admin/tags?per-page=7', {
            params: {
              page: query.page,
              ...query,
            },
          })
          .then((response) => {
            this.tags = response.data
            this.meta = response.meta
          })
      } catch (e) {}
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
  },

  mounted() {
    if (this.$route.query.search) {
      this.searching = this.$route.query.search
    }
  },
}
</script>

<!-- <style>
.vm--modal {
  width: 80% !important;
  height: 600px !important;
  top: 50px !important;
  bottom: 0 !important;
  margin: auto !important;
  left: 0 !important;
  right: 0 !important;
  overflow: scroll !important;
}

@media only screen and (max-width: 768px) {
  .vm--modal {
    width: 100% !important;
  }
}
</style> -->
