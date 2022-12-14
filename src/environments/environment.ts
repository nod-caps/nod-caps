// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCjUH5xm2h7q_0R2pGJKNgOg98TrMOBMfs",
    authDomain: "nod-caps.firebaseapp.com",
    projectId: "nod-caps",
    storageBucket: "nod-caps.appspot.com",
    messagingSenderId: "445751909764",
    appId: "1:445751909764:web:6b4a1b8da6daa2817451d1",
    measurementId: "G-YJ9L9FMZWV"
  },
  stripe:{
    publish: "pk_live_51LbkIcGXUk9OBXxmGr1ar4ns2bS7DZWDICB1sOvbU6Qg1S3O2ZwQP2ArdqDnP4I9E5DaZk5UWtsUpxkCbP3daaVS00ySrROzdy",
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
