let nzdf_banner, navy_banner, army_banner, air_banner;
let nzdfColor, navyColor, armyColor, airColor;
let service; //holds a ref to the current color scheme
let font;
let fontsize = 22;

function preload() {
    nzdf_banner = loadImage('banners/nzdf.png');
    navy_banner = loadImage('banners/navy.png');
    army_banner = loadImage('banners/army.png');
    air_banner = loadImage('banners/air.png');
    font = loadFont('fonts/swiss.ttf');
}

function setup() {
    // put setup code here
    createCanvas(1635,500);
    //noLoop();

    //setup service buttons
    text('Select Service',20,230);

    nzdfButton = createButton('nzdf');
    nzdfButton.position(20,232);
    nzdfButton.mousePressed(changeNzdfBanner);

    navyButton = createButton('navy');
    navyButton.position(60,232);
    navyButton.mousePressed(changeNavyBanner);

    armyButton = createButton('army');
    armyButton.position(100,232);
    armyButton.mousePressed(changeArmyBanner);

    airButton = createButton('air');
    airButton.position(140,232);
    airButton.mousePressed(changeAirBanner);

    //setup text inputs
    text('Course Code',20,280);
    inputCode = createInput('Course Code');
    inputCode.position(20,282);
    inputCode.input(createBanner);

    text('Course Name',20,330);
    inputName = createInput('Course Name');
    inputName.position(20,332);
    inputName.input(createBanner);

    //setup save button
    saveButton = createButton('Save Image');
    saveButton.position (20,370);
    saveButton.mousePressed(saveImage);

    //set up text
    textFont(font);
    textSize(fontsize);

    //set color schemes
    nzdfColor = color('#ffe500');
    navyColor = color('#0099d8');
    armyColor = color('#c62026');
    airColor = color('#28b6ea');

    //handle params
    let p = getURLParams();
    service = p.service || 'nzdf';//default to NZDF to have something to start with
    inputCode.value(p.code || 'Course Code');
    
    let nm = decodeURI(p.name);
    if (nm == 'undefined') {nm = 'Course Name'};
    inputName.value(nm);
    createBanner();
  }
  
  function draw() {
    // put drawing code here
  }

  //change service from button click
function changeNzdfBanner() { service = 'nzdf'; createBanner();}
function changeNavyBanner() { service = 'navy'; createBanner();}
function changeArmyBanner() { service = 'army'; createBanner();}
function changeAirBanner()  { service = 'air';  createBanner();}

function createBanner () {
    // set banner image
    if (service == 'nzdf') {
        image(nzdf_banner,0,0);
        fill(nzdfColor);
    }
    if (service == 'navy') {
        image(navy_banner,0,0);
        fill(navyColor);
    }
    if (service == 'army') {
        image(army_banner,0,0);
        fill(armyColor);
    }
    if (service == 'air')  {
        image(air_banner,0,0);
        fill(airColor);
    }
    // set Course Code
    text(inputCode.value(),205,152);

    // set Course Name
    fill('white');
    text(inputName.value(),205,182);
}

function saveImage () {
    var im = get(0,0,1635,203);
    im.save(inputCode.value() + '.png');
}