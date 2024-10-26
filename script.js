async function generateImages() {
    const imageContainer=document.getElementById("imageContainer");
    const prompt=document.getElementById("imagePrompt").value.trim();
    const accessKey='R41r-SnNCxTj-GRJImrB-pl-7hyKcGjmgJyHa6W13bY';
    imageContainer.innerHTML='';
    if (!prompt) {
        alert("Please enter an image description.");
        return;
    }
    try {
        // Fetch images from Unsplash based on the prompt
        const response=await fetch(`https://api.unsplash.com/search/photos?query=${prompt}&client_id=${accessKey}&per_page=5`);
        const data = await response.json();
        if (data.results.length===0) {
            alert("No images found for this description.");
            return;
        }
        data.results.forEach((result, index) => {
            const img = document.createElement("img");
            img.src = result.urls.small;
            img.alt = `Generated Image ${index + 1} based on prompt "${prompt}"`;
            imageContainer.appendChild(img);
        });
    } catch (error) {
        console.error('Error fetching images:', error);
        alert("Failed to fetch images. Please try again later.");
    }
}
