import { createModel } from 'ymcore/createModel'
const contractModel = {
  name: 'AddContract',
  initState: {
    isLoading: false
  },
  isLoadingUp: 'isLoading'
}
export const { connect, reduce } = createModel(contractModel)
