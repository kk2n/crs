import { host } from '../../utils/axios'
export default () => {
  if (!/-[o,l]\./.test(window.location.href)) window.location.href = `//${host()}/`
  return null
}
