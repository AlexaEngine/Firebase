import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "USE YOUR API KEY HERE",
    authDomain: "USE YOUR AUTH DOMAIN HERE",
    projectId: "USE YOUR PROJECT ID HERE",
    storageBucket: "USE YOUR STORAGE BUCKET HERE",
    messagingSenderId: "USE YOUR MESSAGING SENDER ID HERE",
    appId: "USE YOUR APP ID HERE"
};

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
