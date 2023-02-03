<template>
  <div class="hidden lg:flex lg:w-52 lg:flex-col lg:fixed lg:inset-y-0">
    <div
      class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto liner-gradient"
    >
      <div class="flex items-center justify-center flex-shrink-0 px-4">
        <img
          class="w-auto h-12"
          src="@/assets/images/dbc-white-logo.svg"
          alt="Dbc News Logo"
        />
      </div>

      <nav
        class="
          flex flex-col flex-1
          mt-5
          overflow-y-auto
          divide-y divide-cyan-800
          !scrollbar-hide
        "
        aria-label="Sidebar"
      >
        <div class="px-2 space-y-1">
          <nuxt-link
            to="/"
            class="
              flex
              items-center
              px-2
              py-2
              text-sm
              font-medium
              leading-6
              text-red-100
              rounded-md
              group
              hover:text-white hover:bg-cyan-800
            "
            :class="{ 'bg-cyan-800': $route.name === 'index' }"
          >
            <NewspaperIcon
              class="w-6 h-6 mr-4 text-red-200"
              aria-hidden="true"
            />
            Articles
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'pinned' }"
            class="
              flex
              items-center
              px-2
              py-2
              text-sm
              font-medium
              leading-6
              text-red-100
              rounded-md
              group
              hover:text-white hover:bg-cyan-800
            "
            :class="{ 'bg-cyan-800': $route.name === 'pinned' }"
          >
            <NewspaperIcon
              class="w-6 h-6 mr-4 text-red-200"
              aria-hidden="true"
            />
            Pinned
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'categories' }"
            class="
              flex
              items-center
              px-2
              py-2
              text-sm
              font-medium
              leading-6
              text-red-100
              rounded-md
              group
              hover:text-white hover:bg-cyan-800
            "
            :class="{ 'bg-cyan-800': $route.name === 'categories' }"
          >
            <CollectionIcon
              class="w-6 h-6 mr-4 text-red-200"
              aria-hidden="true"
            />
            Categories
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'topics' }"
            class="
              flex
              items-center
              px-2
              py-2
              text-sm
              font-medium
              leading-6
              text-red-100
              rounded-md
              group
              hover:text-white hover:bg-cyan-800
            "
            :class="{ 'bg-cyan-800': $route.name === 'topics' }"
          >
            <BookOpenIcon
              class="w-6 h-6 mr-4 text-red-200"
              aria-hidden="true"
            />
            Topics
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'regions' }"
            class="
              flex
              items-center
              px-2
              py-2
              text-sm
              font-medium
              leading-6
              text-red-100
              rounded-md
              group
              hover:text-white hover:bg-cyan-800
            "
            :class="{ 'bg-cyan-800': $route.name === 'regions' }"
          >
            <LocationMarkerIcon
              class="w-6 h-6 mr-4 text-red-200"
              aria-hidden="true"
            />
            Regions
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'tags' }"
            class="
              flex
              items-center
              px-2
              py-2
              text-sm
              font-medium
              leading-6
              text-red-100
              rounded-md
              group
              hover:text-white hover:bg-cyan-800
            "
            :class="{ 'bg-cyan-800': $route.name === 'tags' }"
          >
            <TagIcon class="w-6 h-6 mr-4 text-red-200" aria-hidden="true" />
            Tags
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'media' }"
            class="
              flex
              items-center
              px-2
              py-2
              text-sm
              font-medium
              leading-6
              text-red-100
              rounded-md
              group
              hover:text-white hover:bg-cyan-800
            "
            :class="{ 'bg-cyan-800': $route.name === 'media' }"
          >
            <DatabaseIcon
              class="w-6 h-6 mr-4 text-red-200"
              aria-hidden="true"
            />
            Media
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'users' }"
            class="
              flex
              items-center
              px-2
              py-2
              text-sm
              font-medium
              leading-6
              text-red-100
              rounded-md
              group
              hover:text-white hover:bg-cyan-800
            "
            :class="{ 'bg-cyan-800': $route.name === 'users' }"
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
              class="
                flex
                items-center
                px-2
                py-2
                text-sm
                font-medium
                leading-6
                text-red-100
                rounded-md
                group
                hover:text-white hover:bg-cyan-800
              "
            >
              <CogIcon class="w-6 h-6 mr-4 text-red-200" aria-hidden="true" />
              Settings
            </a>

            <a
              href="#"
              class="
                flex
                items-center
                px-2
                py-2
                text-sm
                font-medium
                leading-6
                text-red-100
                rounded-md
                group
                hover:text-white hover:bg-cyan-800
              "
            >
              <QuestionMarkCircleIcon
                class="w-6 h-6 mr-4 text-red-200"
                aria-hidden="true"
              />
              Help
            </a>

            <nuxt-link
              :to="{ name: 'statistics' }"
              class="
                flex
                items-center
                px-2
                py-2
                text-sm
                font-medium
                leading-6
                text-red-100
                rounded-md
                group
                hover:text-white hover:bg-cyan-800
              "
              :class="{ 'bg-cyan-800': $route.name === 'users' }"
              v-if="$auth.user.email == 'shakil@dbcnews.tv'"
            >
              <ChartBarIcon
                class="w-6 h-6 mr-4 text-red-200"
                aria-hidden="true"
              />
              Stats
            </nuxt-link>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import {
  CogIcon,
  TagIcon,
  CollectionIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  UserGroupIcon,
  ChartBarIcon,
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
    ChartBarIcon,
  },
}
</script>
