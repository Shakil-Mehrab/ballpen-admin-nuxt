<template>
  <div class="fixed inset-0 z-40 flex lg:hidden">
    <div
      class="fixed inset-0 bg-gray-600 bg-opacity-75"
      @click.prevent="closeDrawer"
    ></div>

    <div
      class="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 liner-gradient"
    >
      <div class="absolute top-0 right-0 pt-2 -mr-12">
        <button
          type="button"
          class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          @click.prevent="closeDrawer"
        >
          <span class="sr-only">Close sidebar</span>
          <XIcon class="w-6 h-6 text-white" />
        </button>
      </div>

      <div class="flex items-center flex-shrink-0 px-4">
        <img
          src="@/assets/images/dbc-white-logo.svg"
          alt="Dbc White Logo"
          class="w-auto h-12"
        />
      </div>
      <nav
        class="flex-shrink-0 h-full mt-5 overflow-y-auto divide-y divide-red-800"
        aria-label="Sidebar"
      >
        <div class="px-2 space-y-1">
          <nuxt-link
            to="/"
            class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-red-100 rounded-md group hover:text-white"
            :class="{ 'bg-red-500': $route.name === 'index' }"
          >
            <NewspaperIcon
              class="w-6 h-6 mr-4 text-red-200"
              aria-hidden="true"
            />
            Articles
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'categories' }"
            class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-red-100 rounded-md group hover:text-white"
            :class="{ 'bg-red-500': $route.name === 'categories' }"
          >
            <CollectionIcon
              class="w-6 h-6 mr-4 text-red-200"
              aria-hidden="true"
            />
            Categories
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'topics' }"
            class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-red-100 rounded-md group hover:text-white"
            :class="{ 'bg-red-500': $route.name === 'topics' }"
          >
            <BookOpenIcon
              class="w-6 h-6 mr-4 text-red-200"
              aria-hidden="true"
            />
            Topics
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'regions' }"
            class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-red-100 rounded-md group hover:text-white"
            :class="{ 'bg-red-500': $route.name === 'regions' }"
          >
            <LocationMarkerIcon
              class="w-6 h-6 mr-4 text-red-200"
              aria-hidden="true"
            />
            Regions
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'tags' }"
            class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-red-100 rounded-md group hover:text-white"
            :class="{ 'bg-red-500': $route.name === 'tags' }"
          >
            <TagIcon class="w-6 h-6 mr-4 text-red-200" aria-hidden="true" />
            Tags
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'media' }"
            class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-red-100 rounded-md group hover:text-white"
            :class="{ 'bg-red-500': $route.name === 'media' }"
          >
            <DatabaseIcon
              class="w-6 h-6 mr-4 text-red-200"
              aria-hidden="true"
            />
            Media
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'users' }"
            class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-red-100 rounded-md group hover:text-white"
            :class="{ 'bg-red-500': $route.name === 'users' }"
          >
            <UserGroupIcon
              class="w-6 h-6 mr-4 text-red-200"
              aria-hidden="true"
            />
            Users
          </nuxt-link>
        </div>
        <div class="pt-6 mt-6">
          <div class="px-2 space-y-1">
            <a
              class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-red-100 rounded-md group hover:text-white hover:bg-red-600"
            >
              <CogIcon class="w-6 h-6 mr-4 text-red-200" aria-hidden="true" />
              Settings
            </a>

            <a
              href="#"
              class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-red-100 rounded-md group hover:text-white hover:bg-red-600"
            >
              <QuestionMarkCircleIcon
                class="w-6 h-6 mr-4 text-red-200"
                aria-hidden="true"
              />
              Help
            </a>

            <a
              href="#"
              class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-red-100 rounded-md group hover:text-white hover:bg-red-600"
            >
              <ShieldCheckIcon
                class="w-6 h-6 mr-4 text-red-200"
                aria-hidden="true"
              />
              Privacy
            </a>
          </div>
        </div>
      </nav>
    </div>

    <div class="flex-shrink-0 w-14" aria-hidden="true"></div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import {
  CogIcon,
  TagIcon,
  CollectionIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  UserGroupIcon,
  XIcon,
} from '@vue-hero-icons/outline'

import { LocationMarkerIcon, NewspaperIcon } from '@vue-hero-icons/solid'
export default {
  components: {
    CogIcon,
    TagIcon,
    LocationMarkerIcon,
    CollectionIcon,
    NewspaperIcon,
    BookOpenIcon,
    QuestionMarkCircleIcon,
    ShieldCheckIcon,
    DatabaseIcon,
    UserGroupIcon,
    XIcon,
  },
  methods: {
    ...mapActions({
      closeDrawer: 'drawer/close',
    }),
  },
}
</script>
