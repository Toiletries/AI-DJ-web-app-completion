song=""
leftwristx=0
leftwristy=0
righwristx=0
righwristy=0
scoreleftwrist=0
scorerightwrist=0
function preload(){
song=loadSound("music.mp3")
}
function setup(){
canvas=createCanvas(600,500)
canvas.center()
video=createCapture(VIDEO)
video.hide()
poseNet=ml5.poseNet(video, modelLoaded)
poseNet.on('pose', gotposes);
}
function Play(){
    song.play()
    song.setVolume(10)
    song.rate(1)
} 
function modelLoaded(){
    console.log("poseNet is initialised")
}
function gotposes(results){
    if (results.length>0) {
        console.log(results)
        leftwristx=results[0].pose.leftWrist.x
        leftwristy=results[0].pose.leftWrist.y
        rightwristx=results[0].pose.rightWrist.x
        rightwristy=results[0].pose.rightWrist.y
        scoreleftwrist=results[0].pose.leftWrist.confidence
        scorerightwrist=results[0].pose.rightWrist.confidence
    }
}
function draw(){
    image(video,0,0,600,500)
    fill("red")
    if (scorerightwrist>0.05) {
        circle(rightwristx,rightwristy,30)
        if (rightwristy>0 && rightwristy<100) {
            document.getElementById("speed").innerHTML="speed=0.5x"
            song.rate(0.5)
        } else if(rightwristy>100 && rightwristy<200) {
            document.getElementById("speed").innerHTML="speed=1.0x"
            song.rate(1.0)
        }
        else if(rightwristy>200 && rightwristy<300) {
            document.getElementById("speed").innerHTML="speed=1.5x"
            song.rate(1.5)
        }
        else if(rightwristy>300 && rightwristy<400) {
            document.getElementById("speed").innerHTML="speed=2.0x"
            song.rate(2.0)
        }
        else if(rightwristy>400 && rightwristy<500) {
            document.getElementById("speed").innerHTML="speed=2.5x"
            song.rate(2.5)
        }
    }
    if (scoreleftwrist>0.05) {
        circle(leftwristx,leftwristy,30)
numberleftwrist=Number(leftwristy)
newnumber=floor(numberleftwrist)
exactnumber=newnumber/1000
document.getElementById("volume").innerHTML="volume="+exactnumber
song.setVolume(exactnumber)
    }
    }
