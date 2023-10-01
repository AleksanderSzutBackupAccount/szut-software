export const GlobalMixin = {
    methods: {
        getAppName() {
            return import.meta.env.VUE_APP_NAME;
        },
    },
};
