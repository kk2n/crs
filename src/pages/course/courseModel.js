import { createModel } from 'ymcore/createModel'

export let { connect, reduce } = createModel({
  name: 'Course',
  upState: {
    coursePlan: 1
  }
})
