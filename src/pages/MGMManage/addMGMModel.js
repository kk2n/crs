import { createModel } from 'ymcore/createModel'
const demoModel = {
  name: 'AddMGM',
  upState: {
    loading: false,
    inviteUserTel: '',
    invitedUserTel: '',
    imageFrontUrl: '',
    frontLoading: false,
    imageUrlArr: []
  },
  imageUrlArrUp: {
    reduce(state, { meta }) {
      return {
        ...state,
        imageUrlArr: [...state.imageUrlArr, meta]
      }
    }
  },
  imageUrlArrClear: {
    reduce(state) {
      return {
        ...state,
        imageUrlArr: []
      }
    }
  },
  delUpImg: {
    reduce(state, { meta }) {
      state.imageUrlArr.splice(meta, 1)
      return {
        ...state,
        imageUrlArr: state.imageUrlArr
      }
    }
  }
}
export const { connect, reduce } = createModel(demoModel)
