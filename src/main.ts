import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Set the configuration for your app ==> Move in a config file in production
// TODO: Replace with your project's config object
const config = {
    apiKey: 'AIzaSyAp0ao8iPQ6ac2P89YzZfh6ynCGmrjlEBo',
    authDomain: 'alife-api.firebaseapp.com',
    databaseURL: 'https://alife-api.firebaseio.com',
    storageBucket: 'bucket.appspot.com',
}
firebase.initializeApp(config)

// Get a reference to the database service
const database = firebase.database()
database
    .ref('/test')
    .once('value')
    .then(snapshot => console.log(snapshot.val()))

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
