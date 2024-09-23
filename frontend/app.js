const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('image-preview');
const uploadResult = document.getElementById('upload-result');

// Function to preview the uploaded image
imageInput.onchange = function(event) {
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
};

// Function to upload the image to the API Gateway endpoint
async function uploadImage() {
    const file = imageInput.files[0];
    if (!file) {
        alert('Please select an image file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('https://your-api-gateway-url/endpoint', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            displayResult(result);
        } else {
            throw new Error('Upload failed.');
        }
    } catch (error) {
        uploadResult.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

// Function to display the recognition result
function displayResult(result) {
    const labels = result.map(label => `<li>${label}</li>`).join('');
    uploadResult.innerHTML = `<h3>Detected Labels:</h3><ul>${labels}</ul>`;
}
