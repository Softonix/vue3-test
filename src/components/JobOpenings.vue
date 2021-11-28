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
          v-model="state.selectedDepartments"
          class="w-full"
          size="small"
          multiple
          filterable
          placeholder="Select departments"
          default-first-option
        >
          <el-option
            v-for="(item, i) in state.availableDepartments" :key="i" :label="item.name" :value="item.value"
          />
        </el-select>
      </div>

      <!-- Tree -->
      <div>
        <p class="body-text-caption-1">
          Showing
          <span class="font-bold">
            {{ state.selectedDepartments.length > 0 ? `${state.availableJobOpeningsLength} out of` : '' }}
            {{ state.allJobOpenings.length }}
          </span>
          job openings
        </p>

        <div class="border-t border-cloudy-blue mt-2.5">
          <div v-for="(i, index) in state.filteredDepartments" :key="index" class="group my-1.5">
            <div class="flex items-center font-medium">
              <span class="body-text-2">
                {{ i.name }} ({{ i.items.length }})
              </span>
            </div>

            <div>
              <div
                v-for="(job, idx) in i.items.slice(0,5)"
                :key="idx"
                class="flex items-center border-l border-cloudy-blue ml-2"
              >
                <i class="h-px w-[14px] bg-cloudy-blue flex-shrink-0" />
                <i class="w-[7px] h-[7px] rounded mx-1 flex-shrink-0 cursor-pointer bg-green-600 " />

                <div class="truncate body-text my-1">{{ job.title }}</div>
              </div>
            </div>

            <div
              v-if="i.items.length > 5"
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
</template>

<script>
import { jobOpeningsService } from '@/services/job-openings.service'
import { reactive, computed } from 'vue'

export default {
  name: 'JobOpenings',
  setup () {
    const state = reactive({
      selectedDepartments: [],
      allDepartments: [],
      allJobOpenings: [],
      availableDepartments: computed(() => getAvailableDepartments()),
      departmentsList: computed(() => getDepartmentsList()),
      filteredDepartments: computed(() => getFilteredDepartments()),
      availableJobOpeningsLength: computed(() => getAvailableJobOpeningsLength()),
      jobsWithoutDepartment: computed(() => getJobsWithoutDepartment())
    })

    jobOpeningsService.fetchDepartments()
      .then(data => {
        state.allDepartments = data
      })

    jobOpeningsService.fetchJobOpenings()
      .then(data => {
        state.allJobOpenings = data
      })

    function getDepartmentsList () {
      let list = []
      state.allJobOpenings.forEach(job => {
        list = [...list, ...job.departments]
      })
      return [...new Set(list)]
    }

    function getAvailableDepartments () {
      const departments = state.allDepartments.filter(listItem =>
        state.departmentsList.findIndex(dep => dep === listItem.value) >= 0)
      departments.push({ name: 'Other', value: 'other' })
      return departments
    }

    function getJobsWithoutDepartment () {
      return state.allJobOpenings
        .filter(el => el.departments.length === 0)
        .sort((a, b) => a.title.localeCompare(b.title))
    }

    function getFilteredDepartments () {
      const availableDepartmentsValue = state.availableDepartments.map(dep => dep.value)
      const list = state.selectedDepartments.length > 0 ? state.selectedDepartments : availableDepartmentsValue
      return list.map(dep => {
        return {
          name: getDepartmentName(dep),
          items: getJobsByDepartment(dep)
        }
      }).sort((a, b) => a.name.localeCompare(b.name))
    }

    function getDepartmentName (value) {
      if (value.toLowerCase() === 'other') {
        return 'Other'
      }
      const department = state.availableDepartments.find(item => item.value === value)
      return department.name
    }

    function getJobsByDepartment (value) {
      if (value.toLowerCase() === 'other') {
        return state.jobsWithoutDepartment
      }
      return state.allJobOpenings
        .filter(el => el.departments.indexOf(value) >= 0)
        .sort((a, b) => a.title.localeCompare(b.title))
    }

    function getAvailableJobOpeningsLength () {
      return state.filteredDepartments.length !== 0
        ? state.filteredDepartments.reduce((acc, value) => acc + value.items.length, 0)
        : null
    }

    return { state }
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
