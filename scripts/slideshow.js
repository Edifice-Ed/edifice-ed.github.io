
var slideshow_states = {};

function changeSlide(n, slideshow_name) {
    setSlide(slideshow_states[slideshow_name] + n, slideshow_name);
}

function setSlide(n, slideshow_name) {

    if(event != undefined){
        event.stopPropagation(); 
    }

    slideshow_states[slideshow_name] = n;

    let i;
    let slides = document.getElementsByClassName("slideshow_slide " + slideshow_name);
    let dots = document.getElementsByClassName("slideshow_dot " + slideshow_name);

    if (n >= slides.length) {slideshow_states[slideshow_name] = 0}   
    if (n < 0) {slideshow_states[slideshow_name] = slides.length - 1}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" slideshow_dot_active", "");
    }

    slides[slideshow_states[slideshow_name]].style.display = "block";  
    dots[slideshow_states[slideshow_name]].className += " slideshow_dot_active";
}



// Given a data object and a target ID, populate the indicated div with a new slideshow.
function constructSlideshow(data, slideshow_name){

    var slideshow = document.getElementById(slideshow_name);

    // Erase existing slideshow content

    slideshow.innerHTML = "";


    // Set up slideshow framework

    var slideshow_core = document.createElement('div');
    slideshow_core.className = "slideshow";

    var left_button = document.createElement('a');
    left_button.className = "slideshow_prev";
    left_button.onclick = changeSlide.bind(undefined, -1, slideshow_name);
    left_button.innerHTML = "&#10094;";
    slideshow_core.appendChild(left_button);

    var right_button = document.createElement('a');
    right_button.className = "slideshow_next";
    right_button.onclick = changeSlide.bind(undefined, 1, slideshow_name);
    right_button.innerHTML = "&#10095;";
    slideshow_core.appendChild(right_button);

    slideshow.appendChild(slideshow_core);

    var slideshow_dots = document.createElement('div');
    slideshow_dots.className = "slideshow_dots";
    slideshow.appendChild(slideshow_dots);


    var index = 0;

    for(const slide of data.slides){

        var slide_div = document.createElement('div');
        slide_div.className = "slideshow_slide " + slideshow_name;
        
        var slide_image = document.createElement('img');
        slide_image.src = slide.image_path;
        slide_div.appendChild(slide_image);

        if(slide.caption != undefined){
            var slide_caption = document.createElement('div');
            slide_caption.className ="slideshow_caption";
            slide_caption.innerHTML = slide.caption;
            slide_div.appendChild(slide_caption);

        }
        
        slideshow_core.appendChild(slide_div);


        var slide_dot = document.createElement('span');
        slide_dot.className = "slideshow_dot " + slideshow_name;
        slide_dot.onclick = setSlide.bind(undefined, index, slideshow_name);
        slideshow_dots.appendChild(slide_dot);        

        index += 1;
    }

    slideshow_states[slideshow_name] = 0;
    setSlide(0, slideshow_name);
}



// Load a JSON file as slideshow data into the slideshow div with the given ID
async function loadSlideshow(json_path, slideshow_name){

    const response = await fetch(json_path);
    const json_data = await response.json();

    constructSlideshow(json_data, slideshow_name);

}
