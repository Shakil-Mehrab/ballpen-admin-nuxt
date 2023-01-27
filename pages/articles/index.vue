<template>
  <div class="min-h-screen pt-20 bg-gray-900">
    <div class="px-2 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div class="space-y-6 lg:flex lg:space-x-8 lg:space-y-0">
        <div class="lg:w-4/12">
          <div
            class="w-full p-4 overflow-hidden border shadow-md rounded-xl bg-sky-900 border-sky-800"
          >
            <div class="flex items-center justify-between">
              <div class="mr-2">
                <img
                  src="https://laracasts.com/images/laracasts-snippet-logo@2x.png"
                  alt="The Laracasts Snippet title under illustration of Jeffrey speaking into a microphone."
                  class="h-auto"
                />
              </div>
              <div class="flex flex-col space-y-3">
                <a
                  href=""
                  class="px-2 py-1 text-sm font-medium text-white rounded-xl bg-sky-700 whitespace-nowrap"
                >
                  Subscribe via RSS
                </a>
                <a
                  href=""
                  class="px-2 py-1 text-sm font-medium text-white rounded-xl bg-sky-700 whitespace-nowrap"
                >
                  Apple Podcat
                </a>
              </div>
            </div>
            <div>
              <h1 class="mt-3 text-base font-medium text-gray-200">
                The Laracasts Snippet | Episode 141
              </h1>
              <p class="text-xl font-semibold text-white">Zoom Out</p>
              <p class="hidden mt-3 text-sm font-medium text-gray-200 sm:block">
                In this episode, we'll talk about stealing techniques and
                approaches from other hobbies or industries. What have you
                learned from one hobby that might be useful for your programming
                career? I can think of a few.
              </p>
            </div>
            <div class="mt-6 lg:pb-5">
              <iframe
                height="200px"
                width="100%"
                frameborder="no"
                scrolling="no"
                seamless=""
                src="https://player.simplecast.com/e988d91c-ce55-49bd-b0e0-f74dd973baa2?dark=false"
              ></iframe>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-8/12">
          <ul class="flex flex-col space-y-6">
            <li
              class="border shadow-md bg-sky-900 border-sky-800 rounded-xl"
              v-for="n in 10"
              :key="n"
            >
              <a
                href=""
                class="flex items-center w-full p-4 space-x-3 overflow-hidden sm:flex-nowrap"
              >
                <div class="w-32 mr-2">
                  <p
                    class="flex items-center justify-center w-24 h-24 text-3xl font-medium text-white rounded-full bg-sky-700"
                  >
                    142
                  </p>
                </div>

                <div class="flex flex-col w-full">
                  <h1 class="text-xl font-medium text-white">
                    Steal From Other Hobbies
                  </h1>
                  <p
                    class="hidden mt-3 text-sm font-medium text-gray-200 sm:block"
                  >
                    In this episode, we'll talk about stealing techniques and
                    approaches from other hobbies or industries. What have you
                    learned from one hobby that might be useful for your
                    programming career? I can think of a few.
                  </p>
                  <div class="flex items-center mt-3 space-x-3 sm:space-x-6">
                    <p class="text-xs font-normal text-white whitespace-nowrap">
                      <svg
                        viewBox="0 0 13 13"
                        class="inline-block w-4 h-4 mr-1 opacity-50 fill-current text-grey-600"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6.5 0C2.925 0 0 2.925 0 6.5S2.925 13 6.5 13 13 10.075 13 6.5 10.075 0 6.5 0zm2.967 9L6 6.913V3h1v3.391l3 1.761L9.467 9z"
                        ></path>
                      </svg>
                      runtime 17:37 min
                    </p>
                    <p
                      class="flex items-center text-xs font-normal text-white whitespace-nowrap"
                    >
                      <img
                        src="//unavatar.now.sh/github/JeffreyWay"
                        alt="Avatar/Photo of Jeffrey Way"
                        class="w-4 h-4 mr-1 rounded-full"
                      />
                      <span>By Jeffy Worry</span>
                    </p>
                  </div>
                </div>
              </a>
              <p
                class="block w-full p-4 text-sm font-medium text-gray-200 sm:hidden"
              >
                In this episode, we'll talk about stealing techniques and
                approaches from other hobbies or industries. What have you
                learned from one hobby that might be useful for your programming
                career? I can think of a few.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'guest',
}
</script>
