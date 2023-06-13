song1= "";
song2= "";
scoreLeftWrist="";
leftWristX = "";
leftWristY = "";
rightWristX = "";
righWristY = "";

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    leftwristY_divide_1000 = remove_decimals/1000;
    volume = leftwristY_divide_1000 *2;
    document.getElementById("volume").innerHTML = "Volume =" + volume;
    song1.setVolume(volume);
    song2.setVolume(volume);
    } 
}

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function play()
{
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}

function pause()
{
    song1.pause();
    song2.pause();
}

function modelLoaded()
{
  console.log('poseNet is Initialized YAY!');
}

function gotPoses(results)
{
     if(results.length > 0)
     {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX =  results[0].pose.rightWrist.x;
        rightWristY =  results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);


     }
}

function song1Start()
{
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
    song2.pause();
}

function song2Start()
{
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
    song1.pause();
}