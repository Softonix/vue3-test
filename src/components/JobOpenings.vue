<template>
  <div class="bg-white flex flex-col flex-none border border-cloudy-blue rounded">
    <!-- Header -->
    <div class="flex justify-between items-start p-2.5">
      <div class="flex items-center">
        <p class="main-caption-1 font-semibold uppercase">Job openings</p>
      </div>
    </div>

    <!-- Body -->
    <div class="px-2.5">
      <!-- Filter -->
      <div class="mb-1">
        <label for="jobOpeningsSelectDepartments" class="main-caption-1 mb-0.5 cursor-pointer">
          Departments:
        </label>

        <el-select
          id="jobOpeningsSelectDepartments"
          v-model="selectedDepartments"
          class="w-full"
          size="small"
          multiple
          filterable
          placeholder="Select departments"
          default-first-option
        >
          <el-option
            v-for="(item, i) in availableDepartments" :key="i" :label="item.name" :value="item.value"
          />
        </el-select>
      </div>

      <!-- Tree -->
      <div>
        <p class="body-text-caption-1">
          Showing
          <span class="font-bold">
            200 out of 1092
          </span>
          job openings
        </p>

        <div class="border-t border-cloudy-blue mt-2.5">
          <div class="group my-1.5">
            <div class="flex items-center font-medium">
              <span class="body-text-2">
                Administration ({{ dummyJobOpenings.length }})
              </span>
            </div>

            <div>
              <div
                v-for="el in dummyJobOpenings"
                :key="el"
                class="flex items-center border-l border-cloudy-blue ml-2"
              >
                <i class="h-px w-[14px] bg-cloudy-blue flex-shrink-0" />
                <i class="w-[7px] h-[7px] rounded mx-1 flex-shrink-0 cursor-pointer bg-green-600 " />

                <div class="truncate body-text my-1">{{ el }}</div>
              </div>
            </div>
          </div>

          <div class="group my-1.5">
            <div class="flex items-center font-medium">
              <span class="body-text-2">
                Software Development ({{ dummyJobOpenings2.length }})
              </span>
            </div>

            <div>
              <div
                v-for="el in dummyJobOpenings2.slice(0, 5)"
                :key="el"
                class="flex items-center border-l border-cloudy-blue ml-2"
              >
                <i class="h-px w-[14px] bg-cloudy-blue flex-shrink-0" />
                <i class="w-[7px] h-[7px] rounded mx-1 flex-shrink-0 cursor-pointer bg-green-600" />

                <div class="truncate body-text my-1">{{ el }}</div>
              </div>

              <div
                v-if="dummyJobOpenings2.length > 5"
                class="flex items-center border-l border-cloudy-blue ml-2"
              >
                <i class="h-px w-[14px] mr-1 bg-cloudy-blue flex-shrink-0" />
                <p class="body-text my-1 link cursor-pointer">See more</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jobOpeningsService } from '@/services/job-openings.service'

export default {
  name: 'JobOpenings',

  data () {
    return {
      // only for UI purposes, update once start work
      selectedDepartments: ['administration', 'software-development'],
      dummyJobOpenings: ['Administrative Assistant', 'Administrative Coordinator- Transport'],
      dummyJobOpenings2: ['Automation Engineer', 'Backend', 'Frontend', 'Power Apps Developer', 'Vue.js Developer', 'DevOps']
    }
  },

  computed: {
    // only for UI purposes, update once start work
    availableDepartments () {
      return [{ name: 'Administration', value: 'administration' }, { name: 'Software development', value: 'software-development' }]
    }
  },

  created () {
    jobOpeningsService.fetchDepartments()
      .then(console.log)

    jobOpeningsService.fetchJobOpenings()
      .then(console.log)
  }
}
</script>

<style lang="scss" scoped>
.main-caption-1 {
  @apply text-xs text-blue-grey-two;;
}

.body-text, .body-text-2 {
  @apply text-sm2 leading-4;
}

.body-text-2 {
  @apply font-semibold;
}

.body-text-caption-1, .body-text-caption-2 {
  @extend .body-text;
  @apply text-blue-grey-two;
}

.link {
  @apply text-primary font-semibold no-underline cursor-pointer;

  &:hover {
    @apply underline;
  }
}

.el-select-dropdown__item.selected {
  @apply font-semibold;
}
</style>
