import Prism from 'prismjs'

export default {
    mounted(el) {
        Prism.highlightAllUnder(el)
    },
    updated(el) {
        Prism.highlightAllUnder(el)
    }
}