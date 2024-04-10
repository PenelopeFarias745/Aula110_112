prediction1 = "";
prediction2 = "";

Webcam.set({
  width: 350,
  height: 300,
  imageFormat: 'png',
  pngQuality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot()
{
  Webcam.snap(function(data_uri){
    document.getElementById("result").innerHMTL = '<img id="captured_image" src="'+data_uri+'">';
  });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/DtDdqetnZ/model.json', modelLoaded);

function modelLoaded()
{
  console.log('Modelo carregado');
}

function speak()
{
  var synth = window.speechSynthesis;
  speakData1 = "A primeira previsão é" + predicition1;
  speakData2 = "A primeira previsão é" + predicition2;
  var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
  synth.speak(utterThis);
}

function check()
{
  img = document.getElementById("captured_image");
  classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
  if(error)
  {
    console.error(error);
  }
  else 
  {
    console.log(results);
    document.getElementById("resultGestureName").innerHTML = results[0].label;
    document.getElementById("resultGestureName2").innerHTML = results[1].label;
    predicition1 = results[0].label;
    prediction2 = results[1].label;
    speak();

    if(results[0].label == "Joinha")
    {
      document.getElementById("updateEmoji").innerHTML = "&#128077;";
    }
    if(results[0].label == "Vitória")
    {
      document.getElementById("updateEmoji").innerHTML = "&#9996;";
    }
    if(results[0].label == "Ok")
    {
      document.getElementById("updateEmoji").innerHTML = "&#129306;";
    }
    if(results[1].label == "Joinha")
    {
      document.getElementById("updateEmoji2").innerHTML = "&#128077;";
    }
    if(results[1].label == "Vitória")
    {
      document.getElementById("updateEmoji2").innerHTML = "&#9996;";
    }
    if(results[1].label == "Ok")
    {
      document.getElementById("updateEmoji2").innerHTML = "&#129306;";
    }
  }
}