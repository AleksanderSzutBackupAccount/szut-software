export const GlobalMixin = {
    methods: {
        getAppName() {
            return process.env.VUE_APP_NAME;
        }
    }
};
