let nzdf_banner, navy_banner, army_banner, air_banner;
let nzdf_cover, navy_cover, army_cover, air_cover;
let font, banner_buffer, current_service, current_color;
let fontsize = 22;

function preload() {
    nzdf_banner = loadImage('banners/nzdf.png');
    navy_banner = loadImage('banners/navy.png');
    army_banner = loadImage('banners/army.png');
    air_banner = loadImage('banners/air.png');

    nzdf_cover = loadImage('banners/nzdf_cover.png');
    navy_cover = loadImage('banners/navy_cover.png');
    army_cover = loadImage('banners/army_cover.png');
    air_cover = loadImage('banners/air_cover.png');

    font = loadFont('fonts/swiss.ttf');
}

function setup() {
    // Defaults to NZDF colour scheme
    current_banner = nzdf_banner;
    current_cover = nzdf_cover
    current_color = color('#ffe500');

    //Canvas displays the preview images
    var canvasW = document.getElementById('canvasContainer').offsetWidth - 25; //keeps it inside the container
    var canvas = createCanvas(canvasW,400).parent('canvasforp5');

    //the buffers are an offpage buffer that generate the actual images - pixel perfect.
    banner_buffer = createGraphics(1635,204).textFont(font).textSize(fontsize);
    cover_buffer  = createGraphics(254,136).textFont(font).textSize(fontsize).textAlign(CENTER);

    //check for URL params and update fields if there
    const queries = window.location.search;
    const urlParams = new URLSearchParams(queries);
    const param_course = urlParams.get('course'); //contains whole string ie N12345 Intro to blah blah blah

    if (urlParams.has('course')) {

        var param_service = param_course[0]; //get first character ie D,N,A,F
         if(param_service == "L") { param_service = param_course[1]; } //grab second letter if a LA. 
        
        const param_id = param_course.split(" ")[0]; //gets course id (splits str by spaces and returns the first)
        const param_name = param_course.substring(param_course.indexOf(" ")).trimStart(); //return everything after the first space ie the course name

        switch(param_service) {
            case "D": current_banner = nzdf_banner; current_cover = nzdf_cover; current_color = color('#ffe500'); break;
            case "N": current_banner = navy_banner; current_cover = navy_cover; current_color = color('#0099d8'); break;
            case "A": current_banner = army_banner; current_cover = army_cover; current_color = color('#c62026'); break;
            case "F": current_banner = air_banner;  current_cover = air_cover ; current_color = color('#28b6ea'); break;
            default:  current_banner = nzdf_banner; current_cover = nzdf_cover; current_color = color('#ffe500'); break;
        }

        document.getElementById("inputCode").value = param_id;
        document.getElementById("inputName").value = param_name;
    }

    //setup colour buttons
    select('#nzdf-button').mousePressed(function() { current_banner = nzdf_banner; current_cover = nzdf_cover; current_color = color('#ffe500'); createImages()});
    select('#navy-button').mousePressed(function() { current_banner = navy_banner; current_cover = navy_cover; current_color = color('#0099d8'); createImages()});
    select('#army-button').mousePressed(function() { current_banner = army_banner; current_cover = army_cover; current_color = color('#c62026'); createImages()});
    select('#air-button').mousePressed(function()  { current_banner = air_banner;  current_cover = air_cover;  current_color = color('#28b6ea'); createImages()});

    //setup text inputs
    select('#inputCode').input(createImages);
    select('#inputName').input(createImages);
    select('#saveImages').mousePressed(saveImages);

    createImages();
}

function createImages () {
    //create the banner image in the buffer
    banner_buffer.background(current_banner);
    banner_buffer.fill(current_color).text(select('#inputCode').value(),205,152);
    banner_buffer.fill('white').text(select('#inputName').value(),205,182);

    //display a preview of the banner image on screen
    image(banner_buffer, 0, 0, 1635, 204, 0, 0, 1635, 204);

    //create the cover image in the buffer
    cover_buffer.background(current_cover);
    cover_buffer.fill(current_color).text(select('#inputCode').value(),127,60);
    cover_buffer.fill('white').text(select('#inputName').value(),0,78,254).textSize(18).textLeading(20).textWrap(WORD);
    
    //display a preview of the cover image on screen
    image(cover_buffer, 0, 220)
}

//saves the images created in the buffers - browser may not like saving two files at once 
function saveImages () {
    saveBanner(); saveCover();
}

function saveBanner () {
    save(banner_buffer,select('#inputCode').value() + '_banner' + '.png');
}

function saveCover () {
    save(cover_buffer,select('#inputCode').value() + '_cover' + '.png');
}