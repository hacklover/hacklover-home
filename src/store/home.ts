import axios from "axios";

export default {
    namespaced: true,

    state: {
        page: null,
        ready: false,
    },

    getters: {
        page(state: any) {
            return state.page
        },
        pageTitle(state: any) {
            return state.page?.title || null
        },
        pageDescription(state: any) {
            return state.page?.description || null
        },
        pageReady(state: any) {
            return state.ready
        }
    },

    mutations: {
        SET_READY(state: any, value: boolean) {
            state.ready = value
        },
        SET_PAGE(state: any, page: any) {
            state.page = page
        },
    },

    actions: {
        /**
         * Initialize homepage
         *
         * @param commit
         * @param dispatch
         * @param pageLocal
         */
        async initialize({commit, dispatch}, { config, page }) {
            switch (config.type) {
                case 'local':
                    await dispatch('setLocalPage', page)
                    return true
                case 'remote':
                    await dispatch('fetchRemotePage', config.url)
                    return true
            }
        },

        /**
         * Load page from configuration
         *
         * @param commit
         * @param page
         */
        setLocalPage({commit}, page) {
            commit('SET_PAGE', page)
            commit('SET_READY', true)
        },

        /**
         * Fetch remote page
         *
         * @param commit
         * @param url
         */
        async fetchRemotePage({commit, dispatch}: any, url: string) {
            return await axios.get(url)
              .then(response => {
                  dispatch('setLocalPage', response.data)
                  return true
              })
              .catch(e => {
                  console.error('Failed while retrieving remote page')
                  return false
              })
        },
    }
}