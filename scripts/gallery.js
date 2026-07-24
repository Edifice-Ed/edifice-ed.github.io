
async function loadGallery(json_path, gallery){

    const response = await fetch(json_path);
    const json_data = await response.json();


    for(const item of json_data.gallery_items){

        var img = document.createElement('img');
        img.src = item.thumbnail_path;
        img.onclick = showGalleryModal.bind(item.image_path, item.title, item.caption);
        gallery.appendChild(img);
    }
}




function showGalleryModal(image_path, title, caption){
    var modal = document.getElementById("gallery_modal");
    modal.style.display="block";
}


function hideGalleryModal(){
    document.getElementById("gallery_modal").style.display="none";
}


window.onclick = function(event) {
    var modal = document.getElementById("gallery_modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
