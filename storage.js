import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyDLQDKZ4r_RDpr6Em8TwrV63EV-qDXEQK0",
    authDomain: "fir-a22c4.firebaseapp.com",
    databaseURL: "https://fir-a22c4-default-rtdb.firebaseio.com",
    projectId: "fir-a22c4",
    storageBucket: "fir-a22c4.appspot.com",
    messagingSenderId: "139166851473",
    appId: "1:139166851473:web:1d2a739c72f997b464fa30"
});

const storage = getStorage(app);

// Get elements
const fileInput = document.getElementById('file');
const uploadButton = document.getElementById('upload');
const downloadButton = document.getElementById('download');
const status = document.getElementById('status');
const image = document.getElementById('image');

// Upload file
uploadButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (!file) {
        status.innerHTML = 'No file selected';
        return;
    }

    const fileRef = ref(storage, 'globe/' + file.name);

    uploadBytes(fileRef, file).then(snapshot => {
        console.log('Upload successful!', snapshot);
        status.innerHTML = 'Uploaded blob or file!';
    }).catch(error => {
        console.error('Upload failed:', error);
        status.innerHTML = 'Upload failed: ' + error.message;
    });
});

// Download file
downloadButton.addEventListener('click', () => {
    const fileRef = ref(storage, 'globe/' + fileInput.files[0].name);

    getDownloadURL(fileRef).then(url => {
        // Insert URL into an <img> tag to display the downloaded file
        image.src = url;
        status.innerHTML = 'Downloaded blob or file!';
    }).catch(error => {
        console.error('Download failed:', error);
        status.innerHTML = 'Download failed: ' + error.message;
    });
});
