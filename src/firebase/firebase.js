// RealTime databse
// // Set the configuration for your app ==> Move in a config file in production
// // TODO: Replace with your project's config object
// const config = {
//     apiKey: 'AIzaSyAp0ao8iPQ6ac2P89YzZfh6ynCGmrjlEBo',
//     authDomain: 'alife-api.firebaseapp.com',
//     databaseURL: 'https://alife-api.firebaseio.com',
//     storageBucket: 'bucket.appspot.com',
// }
// firebase.initializeApp(config)

// // Get a reference to the database service
// const database = firebase.database()
// database
//     .ref('/test')
//     .once('value')
//     .then(snapshot => console.log(snapshot.val()))

//Firestore
import firebase from '@firebase/app'
import '@firebase/firestore'

firebase.initializeApp({
    apiKey: 'AIzaSyAuMHfBC-W31uD7Q2S-Kp92pk7XpXWEeQE',
    authDomain: 'alife-api2.firebaseapp.com',
    projectId: 'alife-api2',
})

export default firebase