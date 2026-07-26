
async function loadGallery(json_path, gallery_name){

    const response = await fetch(json_path);
    const json_data = await response.json();

    var gallery = document.getElementById(gallery_name);

    for(const item of json_data.gallery_items){

        var img = document.createElement('img');
        img.src = item.thumbnail_path;
        img.onclick = showGallerySingle.bind(undefined, item.image_paths, item.captions, item.title, item.main_caption);
        gallery.appendChild(img);
    }
}




function showGallerySingle(image_paths, captions, title, main_caption){
    var modal = document.getElementById("gallery_modal");

    var modal_image = document.getElementById('gallery_modal_image');
    var modal_slideshow = document.getElementById('gallery_modal_slideshow');

    if(image_paths.length == 1){

        // Single-image case

        modal_image.src = image_paths[0];
        modal_image.style.display="block";
        modal_slideshow.style.display="none";
        

    } else {

        // Slideshow case

        var slideshow_data = {"slides":[]};
        for(let i = 0; i < image_paths.length; i++){
            slideshow_data.slides.push({"image_path":image_paths[i], "caption":captions[i]});
        }

        constructSlideshow(slideshow_data, "gallery_modal_slideshow");

        modal_image.style.display="none";
        modal_slideshow.style.display="block";

    }

    modal.getElementsByTagName('h3')[0].innerHTML = title;
    modal.getElementsByTagName('p')[0].innerHTML = main_caption;

    modal.style.display="flex";
}


function hideGalleryModal(){
    document.getElementById("gallery_modal").style.display="none";
}
