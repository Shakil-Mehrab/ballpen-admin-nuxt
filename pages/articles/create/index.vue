<template>
  <div class="pb-8">
    <Breadcrumb
      leading="Articles"
      trialing="Articles"
      :href="{ name: 'index' }"
      breadcrumb="Articles / Edit"
    />

    <form @submit.prevent="articleCreate">
      <div class="grid grid-cols-12 gap-6 px-2 mt-8 sm:px-4 lg:px-8">
        <div class="col-span-12 2md:col-span-8">
          <div class="p-4 mb-3 bg-white border rounded-md shadow-sm">
            <div class="flex flex-wrap">
              <div class="w-full px-2 py-4 md:w-6/12">
                <AppLabel>Title</AppLabel>
                <AppInput
                  placeholder="Title"
                  type="text"
                  id="title"
                  name="title"
                  v-model="form.title"
                />

                <AppInputError v-if="errors.title">
                  {{ errors.title[0] }}
                </AppInputError>

                <SlugWidget :title="form.title" @slug-changed="updateSlug" />

                <AppInputError v-if="errors.slug">
                  {{ errors.slug[0] }}
                </AppInputError>
              </div>

              <div class="w-full px-2 py-4 md:w-6/12">
                <AppLabel>Meta Tile</AppLabel>
                <AppInput
                  placeholder="Meta Title"
                  type="text"
                  id="meta_title"
                  name="meta_title"
                  v-model="form.meta_title"
                />
                <AppInputError v-if="errors.meta_title">
                  {{ errors.meta_title[0] }}
                </AppInputError>
              </div>

              <div class="w-full px-2 py-4 md:w-6/12">
                <AppLabel>Author</AppLabel>
                <AppInput
                  placeholder="Author"
                  type="text"
                  id="author"
                  name="author"
                  :value="$auth.user.name"
                  disabled
                  class="bg-gray-200"
                />
              </div>

              <div class="w-full px-2 py-4 md:w-6/12">
                <AppLabel>Reporter</AppLabel>
                <AppInput
                  placeholder="Reporter"
                  type="text"
                  id="reporter"
                  name="reporter"
                  v-model="form.reporter"
                />
                <AppInputError v-if="errors.reporter">
                  {{ errors.reporter[0] }}
                </AppInputError>
              </div>

              <div class="w-full px-2 py-4 md:w-6/12">
                <AppLabel>Kicker</AppLabel>
                <AppInput
                  placeholder="Kicker"
                  type="text"
                  id="kicker"
                  name="kicker"
                  v-model="form.kicker"
                />
                <AppInputError v-if="errors.kicker">
                  {{ errors.kicker[0] }}
                </AppInputError>
              </div>

              <div class="w-full px-2 py-4 md:w-full">
                <AppLabel>Teaser</AppLabel>
                <AppTextArea
                  rows="5"
                  placeholder="Teaser"
                  id="teaser"
                  name="teaser"
                  v-model="form.teaser"
                />
                <AppInputError v-if="errors.teaser">
                  {{ errors.teaser[0] }}
                </AppInputError>
              </div>

              <div class="w-full px-2 py-4 md:w-full">
                <AppLabel>Meta Description</AppLabel>
                <AppTextArea
                  rows="5"
                  placeholder="Meta Description"
                  id="meta_description"
                  name="meta_description"
                  v-model="form.meta_description"
                />
                <AppInputError v-if="errors.meta_description">
                  {{ errors.meta_teaser[0] }}
                </AppInputError>
              </div>
            </div>
          </div>

          <div class="p-4 mb-3 bg-white border rounded-md shadow-sm">
            <div class="flex flex-wrap">
              <AppLabel>Content</AppLabel>
              <div id="content" class="w-full">
                <editor
                  class="body-editor"
                  v-model="form.content"
                  :api-key="tinymceAPI"
                  :init="tinyInit"
                ></editor>
              </div>
              <AppInputError v-if="errors.content">
                {{ errors.content[0] }}
              </AppInputError>
            </div>
          </div>

          <div class="p-4 mb-3 bg-white border rounded-md shadow-sm">
            <div class="flex flex-wrap">
              <div class="w-full px-2">
                <div class="mt-4 sm:mt-0 sm:col-span-2">
                  <AppLabel>Categories</AppLabel>
                  <div
                    class="flex flex-wrap p-2 my-3 border rounded-md"
                    v-for="category in categories"
                    :key="category.id"
                  >
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        class="mx-2 rounded-md form-checkbox"
                        :name="category.name"
                        :id="category.name"
                        :value="category.id"
                        v-model="form.categories"
                      />

                      <label
                        class="font-semibold text-blue-600 cursor-pointer"
                        :for="category.name"
                      >
                        {{ category.name }}
                      </label>
                    </div>

                    <div
                      class="flex items-center"
                      v-for="child in category.children"
                      :key="child.id"
                    >
                      <input
                        type="checkbox"
                        class="mx-2 rounded-md form-checkbox"
                        :name="child.name"
                        :id="child.name"
                        :value="child.id"
                        v-model="form.categories"
                      />
                      <label class="cursor-pointer" :for="child.name">
                        {{ child.name }}
                      </label>
                    </div>
                  </div>

                  <AppInputError v-if="errors.categories">
                    {{ errors.categories[0] }}
                  </AppInputError>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- aside  -->
        <div class="col-span-12 2md:col-span-4">
          <div class="p-4 mb-3 bg-white border rounded-md shadow-sm">
            <div class="w-full px-2 py-4">
              <AppLabel>Status</AppLabel>
              <FormSelect v-model="form.status" id="status" name="status">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </FormSelect>
            </div>
          </div>

          <!-- <div class="p-4 mb-3 bg-white border rounded-md shadow-sm">
            <div class="flex flex-wrap">
              <div class="w-full px-2">
                <div class="mt-4 sm:mt-0 sm:col-span-2">
                  <AppLabel>Make Aeticle</AppLabel>
                  <div class="flex flex-wrap p-1 -pl-2">
                    <div class="relative flex items-start mt-2">
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          class="mx-2 rounded-md form-checkbox"
                          name="pinned"
                          id="pinned"
                          v-model="form.pinned"
                        />
                        <label class="cursor-pointer" for="pinned">
                          Pinned
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

          <div class="p-4 mb-3 bg-white border rounded-md shadow-sm">
            <div class="flex flex-wrap">
              <div class="w-full px-2">
                <div class="w-full py-4">
                  <div v-if="selectedThumbnails">
                    <img
                      :src="selectedThumbnails.original"
                      alt="img"
                      class="w-full border"
                    />
                  </div>
                  <div v-else>
                    <img
                      src="@/assets/images/placeholder.png"
                      alt="img"
                      class="w-full border rounded-md h-52"
                    />
                  </div>
                  <AppInputError v-if="errors.thumbnail">
                    {{ errors.thumbnail[0] }}
                  </AppInputError>
                </div>

                <div class="mt-1">
                  <div
                    class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
                    @click.prevent="showAppImageIndexModal"
                  >
                    <div class="space-y-1 text-center">
                      <ImagePlus />
                      <div class="flex text-sm text-gray-600"></div>
                      <p class="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 mb-3 bg-white border rounded-md shadow-sm">
            <div class="flex flex-wrap">
              <div class="w-full px-2">
                <h1
                  class="font-normal text-center text-white bg-blue-500 rounded-md"
                >
                  Meta Image
                </h1>

                <div class="w-full py-4">
                  <div v-if="selectedThumbnails">
                    <img
                      :src="selectedThumbnails.original"
                      alt="img"
                      class="w-full border"
                    />
                  </div>
                  <div v-else>
                    <img
                      src="@/assets/images/placeholder.png"
                      alt="img"
                      class="w-full border rounded-md h-52"
                    />
                  </div>
                  <AppInputError v-if="errors.meta_image">
                    {{ errors.meta_image[0] }}
                  </AppInputError>
                </div>

                <!-- <div class="mt-1">
                  <div
                    class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
                    @click.prevent="showAppImageIndexModal"
                  >
                    <div class="space-y-1 text-center">
                      <ImagePlus />
                      <div class="flex text-sm text-gray-600"></div>
                      <p class="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>

          <div class="p-4 mb-3 bg-white border rounded-md shadow-sm">
            <div class="w-full px-2 py-4">
              <AppLabel>Tags</AppLabel>
              <multiselect
                v-model="selectedTags"
                tag-placeholder="Add this as new tag"
                placeholder="Search or add a tag"
                label="name"
                track-by="slug"
                :options="tags"
                :multiple="true"
                :hideSelected="true"
                :taggable="true"
                @tag="newTagAdd"
              ></multiselect>
              <AppInputError v-if="errors.tags">
                {{ errors.tags[0] }}
              </AppInputError>
            </div>

            <div class="w-full px-2 py-4">
              <AppLabel>Regions</AppLabel>
              <multiselect
                v-model="selectedRegions"
                placeholder="Search region"
                label="display_name"
                track-by="uuid"
                :options="getFlattendedRegions"
                :multiple="true"
                :hideSelected="true"
                :regionable="true"
              ></multiselect>
              <AppInputError v-if="errors.regions">
                {{ errors.regions[0] }}
              </AppInputError>
            </div>

            <div class="w-full px-2 py-4">
              <AppLabel>Topics</AppLabel>
              <multiselect
                v-model="selectedTopics"
                placeholder="Search a topic"
                label="name"
                track-by="uuid"
                :options="topics"
                :multiple="true"
                :hideSelected="true"
                :topicable="true"
              ></multiselect>
              <AppInputError v-if="errors.topics">
                {{ errors.topics[0] }}
              </AppInputError>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 px-2 sm:px-4 lg:px-8">
        <AppButton
          type="submit"
          class="w-full text-white vertical-gradient hover:bg-red-700 focus:ring-red-500"
          >Submit</AppButton
        >
      </div>
    </form>

    <div class="image-index">
      <AppImageIndexModal
        @selectedImageFromModal="selectedImageFromModal"
        :selectedThumb="selectedThumbnails"
      />
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import map from 'lodash.map'
import Multiselect from 'vue-multiselect'

export default {
  middleware: ['authIndent'],

  components: {
    Multiselect,
    Editor,
  },

  data() {
    return {
      tinymceAPI: process.env.TINY_MCE_API,

      errors: [],
      categories: [],
      tags: [],
      topics: [],
      regions: [],

      selectedTags: [],
      selectedRegions: [],
      selectedTopics: [],
      selectedThumbnails: null,

      form: {
        title: '',
        slug: '',
        meta_title: '',
        kicker: '',
        reporter: '',
        user: this.$auth.user.id,
        teaser: '',
        meta_description: '',
        content: '',
        status: 'draft',
        // pinned: false,
        thumbnail: null,
        meta_image: null,
        tags: [],
        regions: [],
        topics: [],
        categories: [],
      },

      tinyInit: {
        selector: 'textarea',
        directionality: 'ltr',
        language: 'en',
        // language : 'bn_BD',
        init_instance_callback: (editor) => {
          editor.on('focus', () => {
            this.$scrollTo('#content')
          })
        },
        force_p_newlines: true,
        force_br_newlines: false,
        forced_root_block: '',
        statubar: true,
        plugins: [
          'advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons',
          'fullscreen hr insertdatetime legacyoutput link lists media nonbreaking pagebreak image imagetools paste preview tabfocus print',
          'save searchreplace table textpattern toc visualblocks visualchars wordcount',
        ],
        toolbar1:
          'undo redo | insert | styleselect | bold italic removeformat | fontselect fontsizeselect blockquote | alignleft aligncenter alignright alignjustify | searchreplace',
        toolbar2:
          'paste fullscreen | preview code | forecolor backcolor | emoticons | print | nonbreaking pagebreak | restoredraft template toc | charmap | bullist numlist outdent indent | codesample insertdatetime link image media | ltr rtl',
        insert_toolbar: 'quickimage quicktable',
        selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
        autoresize_overflow_padding: 5,
        autosave_ask_before_unload: false,
        autosave_interval: '20s',
        autosave_restore_when_empty: true,
        autosave_retention: '20m',
        image_advtab: true,
        image_dimensions: true,
        image_description: false,
        image_title: true,
        image_caption: true,
        fontsize_formats:
          '10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt 56pt 120pt, 172pt',
        image_class_list: [
          { title: 'Image Responsive', value: 'img-responsive' },
          { title: 'Image Thumbnail', value: 'img-thumbnail' },
          { title: 'Image Rounded', value: 'img-rounded' },
          { title: 'Image Circle', value: 'img-circle' },
          { title: 'None', value: '' },
        ],
        imagetools_toolbar:
          'rotateleft rotateright | flipv fliph | editimage imageoptions',
        insertdatetime_element: true,
        link_context_toolbar: true,
        link_assume_external_targets: true,
        paste_data_images: false,
        paste_enable_default_filters: true,
        paste_webkit_styles: 'all',
        paste_as_text: true,
        formats: {
          alignleft: {
            selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img',
            classes: 'left',
          },
          aligncenter: {
            selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img',
            classes: 'center',
          },
          alignright: {
            selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img',
            classes: 'right',
          },
          alignjustify: {
            selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img',
            classes: 'full',
          },
          bold: { inline: 'span', classes: 'bold' },
          italic: { inline: 'span', classes: 'italic' },
          underline: { inline: 'span', classes: 'underline', exact: true },
          strikethrough: { inline: 'del' },
          forecolor: {
            inline: 'span',
            classes: 'forecolor',
            styles: { color: '%value' },
          },
          hilitecolor: {
            inline: 'span',
            classes: 'hilitecolor',
            styles: { backgroundColor: '%value' },
          },
          custom_format: {
            block: 'h1',
            attributes: { title: 'Header' },
            styles: { color: 'red' },
          },
        },
        style_formats: [
          {
            title: 'Headers',
            items: [
              { title: 'Header 1', format: 'h1' },
              { title: 'Header 2', format: 'h2' },
              { title: 'Header 3', format: 'h3' },
              { title: 'Header 4', format: 'h4' },
              { title: 'Header 5', format: 'h5' },
              { title: 'Header 6', format: 'h6' },
            ],
          },
          {
            title: 'Inline',
            items: [
              { title: 'Bold', icon: 'bold', format: 'bold' },
              { title: 'Italic', icon: 'italic', format: 'italic' },
              { title: 'Underline', icon: 'underline', format: 'underline' },
              {
                title: 'Strikethrough',
                icon: 'strikethrough',
                format: 'strikethrough',
              },
              {
                title: 'Superscript',
                icon: 'superscript',
                format: 'superscript',
              },
              { title: 'Subscript', icon: 'subscript', format: 'subscript' },
              { title: 'Code', icon: 'code', format: 'code' },
            ],
          },
          {
            title: 'Blocks',
            items: [
              { title: 'Paragraph', format: 'p' },
              { title: 'Blockquote', format: 'blockquote' },
              { title: 'Div', format: 'div' },
              { title: 'Pre', format: 'pre' },
            ],
          },
          {
            title: 'Alignment',
            items: [
              { title: 'Left', icon: 'alignleft', format: 'alignleft' },
              { title: 'Center', icon: 'aligncenter', format: 'aligncenter' },
              { title: 'Right', icon: 'alignright', format: 'alignright' },
              {
                title: 'Justify',
                icon: 'alignjustify',
                format: 'alignjustify',
              },
            ],
          },
        ],
      },
    }
  },

  head: {
    title: 'Create Article',
  },

  async asyncData({ app, error }) {
    try {
      let categoryResponse = await app.$axios.$get('v2/admin/categories')
      let tagResponse = await app.$axios.$get('v2/admin/tags')
      let regionResponse = await app.$axios.$get('v2/admin/regions')
      let topicResponse = await app.$axios.$get('v2/admin/topics')

      return {
        categories: categoryResponse.data,
        tags: tagResponse.data,
        regions: regionResponse.data,
        topics: topicResponse.data,
      }
    } catch (e) {
      console.log(e.response.data.errors)
    }
  },

  watch: {
    selectedTags() {
      this.form.tags = map(this.selectedTags, 'id')
    },

    selectedRegions() {
      this.form.regions = map(this.selectedRegions, 'id')
    },

    selectedTopics() {
      this.form.topics = map(this.selectedTopics, 'id')
    },

    'form.title'(value) {
      this.form.meta_title = value
    },

    'form.teaser'(value) {
      this.form.meta_description = value
    },
  },

  computed: {
    getFlattendedRegions() {
      let arr = []

      this.regions.forEach((grandparent, index) => {
        arr.push({
          id: grandparent.id,
          display_name: grandparent.display_name,
          uuid: grandparent.uuid,
          // children: grandparent.children,
        })

        if (grandparent.children.length > 0) {
          grandparent.children.forEach((parent, index) => {
            arr.push({
              id: parent.id,
              display_name: parent.display_name,
              uuid: parent.uuid,
            })
            if (parent.children.length > 0) {
              parent.children.forEach((child, index) => {
                arr.push({
                  id: child.id,
                  display_name: child.display_name,
                  uuid: child.uuid,
                })
                if (child.children.length > 0) {
                  child.children.forEach((ch, index) => [
                    arr.push({
                      id: ch.id,
                      display_name: ch.display_name,
                      uuid: ch.uuid,
                    }),
                  ])
                }
              })
            }
          })
        }
      })
      return arr
    },
  },

  methods: {
    showAppImageIndexModal() {
      this.$modal.show('app-image-index-modal')
    },

    async updateSlug(val) {
      this.form.slug = val
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

    selectedImageFromModal(image) {
      console.log(image)
      this.selectedThumbnails = image
      this.form.thumbnail = image.id
      this.form.meta_image = image.id

      this.$modal.hide('app-image-index-modal')
    },

    async articleCreate() {
      // console.log(this.form)
      try {
        await this.$axios
          .post(`v2/admin/articles`, this.form)
          .then(({ data }) => {
            this.statusMessage('success', 'Article Created Successfully')
            this.errors = []
            // this.form = []
            // this.clear()
            this.$router.push({
              path: '/',
            })
          })
      } catch (e) {
        ;(this.errors = e.response.data.errors),
          this.statusMessage('error', 'Something wrong!')
      }
    },

    // clear() {
    //   ;(this.form.title = ''),
    //     (this.form.slug = ''),
    //     (this.form.meta_title = ''),
    //     (this.form.kicker = ''),
    //     (this.form.user = this.$auth.user.id),
    //     (this.form.teaser = ''),
    //     (this.form.meta_description = ''),
    //     (this.form.content = ''),
    //     (this.form.status = 'draft'),
    //     // (this.form.pinned = false),
    //     (this.form.thumbnail = null),
    //     (this.form.meta_image = null),
    //     (this.form.tags = []),
    //     (this.form.regions = []),
    //     (this.form.topics = []),
    //     (this.form.categories = []),
    //     (this.selectedThumbnails = null)
    // },

    async newTagAdd(newTag) {
      let name = newTag
      this.addToServer(name)
    },

    async addToServer(name) {
      console.log(this.selectedTags)
      try {
        let tagForm = {
          name: name,
          slug:
            name +
            '-' +
            name.substring(0, 2) +
            Math.floor(Math.random() * 10000000),
        }
        await this.$axios.post(`v2/admin/tags`, tagForm).then(({ data }) => {
          this.tags.push(data.data)
          this.selectedTags.push(data.data)
        })
      } catch (e) {
        this.errorMessage()
      }
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
