// Import the Firebase app and the required services
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "USE YOUR API KEY HERE",
    authDomain: "USE YOUR AUTH DOMAIN HERE",
    projectId: "USE YOUR PROJECT ID HERE",
    storageBucket: "USE YOUR STORAGE BUCKET HERE",
    messagingSenderId: "USE YOUR MESSAGING SENDER ID HERE",
    appId: "USE YOUR APP ID HERE"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get elements
const message = document.getElementById('message');
const write = document.getElementById('write');
const read = document.getElementById('read');
const status = document.getElementById('status');

// Write to Firebase Database
write.addEventListener('click', e => {
    const messagesRef = ref(db, 'messages');

    // Generate a valid Firebase key
    const id = (new Date()).getTime().toString(); // Converts timestamp to string

    // Write to db
    set(ref(db, `messages/${id}`), { 'message': message.value })
        .then(function () {
            status.innerHTML = "Wrote to DB!";
        })
        .catch(function (error) {
            console.error('Error writing to DB:', error);
            status.innerHTML = 'Error writing to DB';
        });
});

// Read from Firebase Database
read.addEventListener('click', e => {
    status.innerHTML = '';
    const messagesRef = ref(db, 'messages');

    get(messagesRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const keys = Object.keys(data);

            keys.forEach(function (key) {
                console.log(data[key]);
                status.innerHTML += JSON.stringify(data[key]) + '<br>';
            });
        } else {
            console.log('No data available');
            status.innerHTML = 'No data available';
        }
    }).catch(function (error) {
        console.error('Error reading from DB:', error);
        status.innerHTML = 'Error reading from DB';
    });
});
