let nzdf_banner, navy_banner, army_banner, air_banner;
let font, banner_buffer, current_service, current_color;
let fontsize = 22;

function preload() {
    nzdf_banner = loadImage('banners/nzdf.png');
    navy_banner = loadImage('banners/navy.png');
    army_banner = loadImage('banners/army.png');
    air_banner = loadImage('banners/air.png');
    font = loadFont('fonts/swiss.ttf');
}

function setup() {
    current_banner = nzdf_banner;
    current_color = color('#ffe500');

    var canvasW = document.getElementById('canvasContainer').offsetWidth - 25;
    var canvas = createCanvas(canvasW,122).parent('canvasforp5');
    banner_buffer = createGraphics(1635,204).textFont(font).textSize(fontsize);

    //setup colour buttons
    select('#nzdf-button').mousePressed(function() { current_banner = nzdf_banner; current_color = color('#ffe500'); createBanner()});
    select('#navy-button').mousePressed(function() { current_banner = navy_banner; current_color = color('#0099d8'); createBanner()});
    select('#army-button').mousePressed(function() { current_banner = army_banner; current_color = color('#c62026'); createBanner()});
    select('#air-button').mousePressed(function()  { current_banner = air_banner; current_color = color('#28b6ea'); createBanner()});

    //setup text inputs
    select('#inputCode').input(createBanner);
    select('#inputName').input(createBanner);
    select('#saveButton').mousePressed(saveImage);

    createBanner();
  }
  
function createBanner () {
    banner_buffer.background(current_banner);
    banner_buffer.fill(current_color).text(select('#inputCode').value(),205,152);
    banner_buffer.fill('white').text(select('#inputName').value(),205,182);

    image(banner_buffer, 0, 0, 1635, 204, 0, 0, 1635, 204);
}

function saveImage () {
    save(banner_buffer,select('#inputCode').value() + '.png');
}
