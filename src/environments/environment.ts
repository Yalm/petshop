// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    img_default: 'https://i.stack.imgur.com/l60Hf.png',
    cuqli: {
        public_key: 'pk_test_wvFSgWHdepztNJFh',
        logo: 'assets/img/logo.png'
    },
    apiUrl: 'https://petshopj.herokuapp.com/api',
    providers: {
        google: {
            clientId: '433637944143-h21kc94j9hnlm38nd5b5f1mpp8q3fbcd.apps.googleusercontent.com',
            url: 'auth/customer/google/login'
        }
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
