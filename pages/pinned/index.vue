<template>
  <div>
    <Breadcrumb leading="Pinned" trialing="" breadcrumb="Pinned / list" />

    <div class="p-1 mx-auto sm:p-3 lg:p-8">
      <div class="w-full md:flex md:space-x-3 lg:space-x-8">
        <div class="w-full mt-3 md:mt-0">
          <div class="grid grid-cols-12 md:gap-3">
            <div class="col-span-12 md:mt-0">
              <div class="overflow-hidden border-2 border-dashed rounded-md">
                <div class="px-2 pb-6 mt-6 sm:px-4 lg:px-8">
                  <a
                    href="#"
                    @click.prevent="ebableEditing"
                    class="block w-full p-2 text-center text-white bg-blue-400 rounded-md vertical-gradient hover:bg-blue-700 focus:ring-blue-500"
                  >
                    <span v-if="this.editNow">Disable Editing</span>
                    <span v-else>Enable Editing</span>
                  </a>
                </div>
                <div class="bg-white" v-if="!editNow">
                  <div class="divide-y divide-gray-200" v-if="pinned.length">
                    <div v-for="(pinned, index) in pinned" :key="index">
                      <div class="p-2 bg-white sm:px-6 lg:px-8 sm:py-3 lg:py-4">
                        <div class="w-full mb-2 md:mb-0">
                          <h1 class="text-lg font-semibold text-gray-700">
                            # {{ index + 1 }}
                          </h1>
                          <h2
                            class="pt-1 text-base font-medium leading-none text-gray-700"
                          >
                            {{ pinned.title }}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="w-full p-4 text-center" v-else>
                    No topic listed yet
                  </div>
                </div>

                <div class="bg-white" v-else>
                  <form @submit.prevent="updateArticle">
                    <div class="px-2 pt-6 sm:px-4 lg:px-8">
                      <AppLabel>#1</AppLabel>
                      <multiselect
                        v-model="selectedArticle1"
                        article-placeholder="Select Article"
                        placeholder="Search Article"
                        label="title"
                        track-by="id"
                        :options="articles"
                        :multiple="false"
                        :hideSelected="true"
                        :articable="true"
                      ></multiselect>
                      <AppInputError v-if="errors.selectedArticle1">
                        {{ errors.selectedArticle1[0] }}
                      </AppInputError>
                    </div>
                    <div class="px-2 mt-6 sm:px-4 lg:px-8">
                      <AppLabel>#2</AppLabel>
                      <multiselect
                        v-model="selectedArticle2"
                        tag-placeholder="Select Article"
                        placeholder="Search Article"
                        label="title"
                        track-by="id"
                        :options="articles"
                        :multiple="false"
                        :hideSelected="true"
                        :articable="true"
                      ></multiselect>
                      <AppInputError v-if="errors.selectedArticle2">
                        {{ errors.selectedArticle2[0] }}
                      </AppInputError>
                    </div>
                    <div class="px-2 mt-6 sm:px-4 lg:px-8">
                      <AppLabel>#3</AppLabel>
                      <multiselect
                        v-model="selectedArticle3"
                        tag-placeholder="Select Article"
                        placeholder="Search Article"
                        label="title"
                        track-by="id"
                        :options="articles"
                        :multiple="false"
                        :hideSelected="true"
                        :articable="true"
                      ></multiselect>
                      <AppInputError v-if="errors.selectedArticle3">
                        {{ errors.selectedArticle3[0] }}
                      </AppInputError>
                    </div>
                    <div class="px-2 mt-6 sm:px-4 lg:px-8">
                      <AppLabel>#4</AppLabel>
                      <multiselect
                        v-model="selectedArticle4"
                        tag-placeholder="Select Article"
                        placeholder="Search Article"
                        label="title"
                        track-by="id"
                        :options="articles"
                        :multiple="false"
                        :hideSelected="true"
                        :articable="true"
                      ></multiselect>
                      <AppInputError v-if="errors.selectedArticle4">
                        {{ errors.selectedArticle4[0] }}
                      </AppInputError>
                    </div>
                    <div class="px-2 mt-6 sm:px-4 lg:px-8">
                      <AppLabel>#5</AppLabel>
                      <multiselect
                        v-model="selectedArticle5"
                        tag-placeholder="Select Article"
                        placeholder="Search Article"
                        label="title"
                        track-by="id"
                        :options="articles"
                        :multiple="false"
                        :hideSelected="true"
                        :articable="true"
                      ></multiselect>
                      <AppInputError v-if="errors.selectedArticle5">
                        {{ errors.selectedArticle5[0] }}
                      </AppInputError>
                    </div>
                    <div class="px-2 mt-6 sm:px-4 lg:px-8">
                      <AppLabel>#6</AppLabel>
                      <multiselect
                        v-model="selectedArticle6"
                        tag-placeholder="Select Article"
                        placeholder="Search Article"
                        label="title"
                        track-by="id"
                        :options="articles"
                        :multiple="false"
                        :hideSelected="true"
                        :articable="true"
                      ></multiselect>
                      <AppInputError v-if="errors.selectedArticle6">
                        {{ errors.selectedArticle6[0] }}
                      </AppInputError>
                    </div>
                    <div class="px-2 mt-6 sm:px-4 lg:px-8">
                      <AppLabel>#7</AppLabel>
                      <multiselect
                        v-model="selectedArticle7"
                        tag-placeholder="Select Article"
                        placeholder="Search Article"
                        label="title"
                        track-by="id"
                        :options="articles"
                        :multiple="false"
                        :hideSelected="true"
                        :articable="true"
                      ></multiselect>
                      <AppInputError v-if="errors.selectedArticle7">
                        {{ errors.selectedArticle7[0] }}
                      </AppInputError>
                    </div>
                    <div class="px-2 mt-6 sm:px-4 lg:px-8">
                      <AppLabel>#8</AppLabel>
                      <multiselect
                        v-model="selectedArticle8"
                        tag-placeholder="Select Article"
                        placeholder="Search Article"
                        label="title"
                        track-by="id"
                        :options="articles"
                        :multiple="false"
                        :hideSelected="true"
                        :articable="true"
                      ></multiselect>
                      <AppInputError v-if="errors.selectedArticle8">
                        {{ errors.selectedArticle8[0] }}
                      </AppInputError>
                    </div>
                    <div class="px-2 mt-6 sm:px-4 lg:px-8">
                      <AppLabel>#9</AppLabel>
                      <multiselect
                        v-model="selectedArticle9"
                        tag-placeholder="Select Article"
                        placeholder="Search Article"
                        label="title"
                        track-by="id"
                        :options="articles"
                        :multiple="false"
                        :hideSelected="true"
                        :articable="true"
                      ></multiselect>
                      <AppInputError v-if="errors.selectedArticle9">
                        {{ errors.selectedArticle9[0] }}
                      </AppInputError>
                    </div>
                    <div class="px-2 mt-6 sm:px-4 lg:px-8">
                      <AppLabel>#10</AppLabel>
                      <multiselect
                        v-model="selectedArticle10"
                        tag-placeholder="Add this as new tag"
                        placeholder="Search Article"
                        label="title"
                        track-by="id"
                        :options="articles"
                        :multiple="false"
                        :hideSelected="true"
                        :articable="true"
                      ></multiselect>
                      <AppInputError v-if="errors.selectedArticle10">
                        {{ errors.selectedArticle10[0] }}
                      </AppInputError>
                    </div>
                    <div class="px-2 mt-6 sm:px-4 lg:px-8">
                      <AppLabel>#11</AppLabel>
                      <multiselect
                        v-model="selectedArticle11"
                        tag-placeholder="Add this as new tag"
                        placeholder="Search Article"
                        label="title"
                        track-by="id"
                        :options="articles"
                        :multiple="false"
                        :hideSelected="true"
                        :articable="true"
                      ></multiselect>
                      <AppInputError v-if="errors.selectedArticle11">
                        {{ errors.selectedArticle11[0] }}
                      </AppInputError>
                    </div>
                    <div class="px-2 pb-6 mt-6 sm:px-4 lg:px-8">
                      <AppButton
                        type="submit"
                        class="w-full text-white vertical-gradient hover:bg-red-700 focus:ring-red-500"
                      >
                        Submit
                      </AppButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import map from 'lodash.map'
import Multiselect from 'vue-multiselect'

export default {
  middleware: ['authIndent'],

  data() {
    return {
      editNow: false,
      errors: [],
      articles: [],
      selected: [],
      pinned: [],
      selectedArticle1: null,
      selectedArticle2: null,
      selectedArticle3: null,
      selectedArticle4: null,
      selectedArticle5: null,
      selectedArticle6: null,
      selectedArticle7: null,
      selectedArticle8: null,
      selectedArticle9: null,
      selectedArticle10: null,
      selectedArticle11: null,

      form: {
        selectedArticle1: null,
        selectedArticle2: null,
        selectedArticle3: null,
        selectedArticle4: null,
        selectedArticle5: null,
        selectedArticle6: null,
        selectedArticle7: null,
        selectedArticle8: null,
        selectedArticle9: null,
        selectedArticle10: null,
        selectedArticle11: null,
      },
    }
  },

  head: {
    title: 'Pinned List',
  },

  components: {
    Multiselect,
  },

  watch: {
    selectedArticle1(value) {
      this.form.selectedArticle1 = value.id
    },
    selectedArticle2(value) {
      this.form.selectedArticle2 = value.id
    },
    selectedArticle3(value) {
      this.form.selectedArticle3 = value.id
    },
    selectedArticle4(value) {
      this.form.selectedArticle4 = value.id
    },
    selectedArticle5(value) {
      this.form.selectedArticle5 = value.id
    },
    selectedArticle6(value) {
      this.form.selectedArticle6 = value.id
    },
    selectedArticle7(value) {
      this.form.selectedArticle7 = value.id
    },
    selectedArticle8(value) {
      this.form.selectedArticle8 = value.id
    },
    selectedArticle9(value) {
      this.form.selectedArticle9 = value.id
    },
    selectedArticle10(value) {
      this.form.selectedArticle10 = value.id
    },
    selectedArticle11(value) {
      this.form.selectedArticle11 = value.id
    },
  },

  async asyncData({ app }) {
    let pinnedResponse = await app.$axios.$get('v2/admin/pinned?per-page=11')
    let articleResponse = await app.$axios.$get('v2/admin/articles?per-page=50')
    let pinned = pinnedResponse.data
    return {
      pinned: pinned,
      articles: articleResponse.data,
      selectedArticle1: pinned[0] ?? null,
      selectedArticle2: pinned[1] ?? null,
      selectedArticle3: pinned[2] ?? null,
      selectedArticle4: pinned[3] ?? null,
      selectedArticle5: pinned[4] ?? null,
      selectedArticle6: pinned[5] ?? null,
      selectedArticle7: pinned[6] ?? null,
      selectedArticle8: pinned[7] ?? null,
      selectedArticle9: pinned[8] ?? null,
      selectedArticle10: pinned[9] ?? null,
      selectedArticle11: pinned[10] ?? null,

      form: {
        selectedArticle1: pinned[0] ? pinned[0]['article_id'] : null,
        selectedArticle2: pinned[1] ? pinned[1]['article_id'] : null,
        selectedArticle3: pinned[2] ? pinned[2]['article_id'] : null,
        selectedArticle4: pinned[3] ? pinned[3]['article_id'] : null,
        selectedArticle5: pinned[4] ? pinned[4]['article_id'] : null,
        selectedArticle6: pinned[5] ? pinned[5]['article_id'] : null,
        selectedArticle7: pinned[6] ? pinned[6]['article_id'] : null,
        selectedArticle8: pinned[7] ? pinned[7]['article_id'] : null,
        selectedArticle9: pinned[8] ? pinned[8]['article_id'] : null,
        selectedArticle10: pinned[9] ? pinned[9]['article_id'] : null,
        selectedArticle11: pinned[10] ? pinned[10]['article_id'] : null,
      },
    }
  },

  methods: {
    ebableEditing() {
      this.editNow = !this.editNow
    },
    async updateArticle() {
      console.log(this.form)
      console.log(this.pinned[1])
      try {
        await this.$axios
          .post(`v2/admin/pinned`, this.form)
          .then(({ data }) => {
            this.statusMessage('success', 'Pinned Updated successfully')
            this.pinnedArticles()
            // this.formClear()
            this.errors = []
          })
      } catch (e) {
        this.errors = e.response.data.errors
        this.statusMessage('error', 'Something wrong')
      }
    },

    async pinnedArticles(query = this.$route.query) {
      try {
        await this.$axios
          .$get('v2/admin/pinned?per-page=11', {
            params: {
              page: query.page,
              ...query,
            },
          })
          .then((response) => {
            this.pinned = response.data
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
}
</script>

<style>
@import 'vue-multiselect/dist/vue-multiselect.min.css';

.body-editor {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
.multiselect__input {
  border-radius: 5px !important;
  min-height: 40px;
}
</style>
