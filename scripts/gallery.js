
async function loadGallery(json_path, gallery_name){

    const response = await fetch(json_path);
    const json_data = await response.json();

    var gallery = document.getElementById(gallery_name);

    for(const item of json_data.gallery_items){

        var img = document.createElement('img');
        img.src = item.thumbnail_path;
        img.onclick = showGalleryModal.bind(undefined, item.image_path, item.title, item.caption);
        gallery.appendChild(img);
    }
}




function showGalleryModal(image_path, title, caption){
    var modal = document.getElementById("gallery_modal");

    modal.getElementsByTagName('img')[0].src = image_path;
    modal.getElementsByTagName('h3')[0].innerHTML = title;
    modal.getElementsByTagName('p')[0].innerHTML = caption;

    modal.style.display="block";
}


function hideGalleryModal(){
    document.getElementById("gallery_modal").style.display="none";
}
