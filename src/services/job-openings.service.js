import { departments, jobOpenings } from './job-openings.stub'

class JobOpeningsService {
  fetchDepartments () {
    return new Promise((resolve) => {
      setTimeout(() => { resolve(departments) }, 350)
    })
  }

  fetchJobOpenings () {
    return new Promise((resolve) => {
      setTimeout(() => { resolve(jobOpenings) }, 500)
    })
  }
}

export const jobOpeningsService = new JobOpeningsService()
