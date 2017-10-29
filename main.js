let canvansWidth; //2058 / 180 = 0.087
let canvanHeight; //1314 / 90 = 0.068
let latOffset = 14.6 / 2;
let longOffset = 11.43 / 2;
let worldIMG;
let issIMG;
let lat; //range from -90 to 90 NS Y
let long; // rang from -180 to 180 ES X
let issSize = 20;
let x = 0;
let y = 0;

function preload() {
  worldIMG = loadImage("images/World.jpg");
  issIMG = loadImage("images/iss.png");
}

function setup(){
	canvansWidth = worldIMG.width;
	canvanHeight = worldIMG.height;
  let canvas = createCanvas(canvansWidth, canvanHeight);
  document.getElementsByClassName("canvas").innerHTML = canvas;
	//translate(180, 90);

	$.ajax({
	        url:("http://api.open-notify.org/iss-now.json"),
	        dataType:'json',
	        type: 'get',
	        //data: yourForm.serialize(),
	        success:function(response){
						//console.log(response);
						lat = response.iss_position.latitude;
						long = response.iss_position.longitude;

						// console.log("lat: " + lat);
						// console.log("long: " + long);
	        }
	    });
}
function draw(){

  setInterval(updateLocation(), 500);
	background(0);
	image(worldIMG, 0, 0);
	translate(width / 2, height / 2);
	fill(255);

  image(issIMG, x - issIMG.width / 2, y - issIMG.height / 2);

  textSize(16);
  textAlign(CENTER);
  fill(255);
  text("Lat: " + lat + ", Long: " + long, x, y + 50);

  //rect(20 , 20 , 20, 20);

}

function updateLocation(){
  $.ajax({
          url:("http://api.open-notify.org/iss-now.json"),
          dataType:'json',
          type: 'get',
          success:function(response){
            lat = response.iss_position.latitude;
            long = response.iss_position.longitude;
            x = long * longOffset;
            y = (lat - (lat * 2)) * latOffset;

          }
      });
}
