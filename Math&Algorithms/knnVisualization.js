var goButton = document.querySelector('.go-button')
var video = document.querySelector('.video-div')
var weights = document.querySelector('input[name="weights"]:checked').value
var dataset = document.querySelector('input[name="dataset"]:checked').value
var distance = document.querySelector('input[name="distance"]:checked').value
var kNeighbors = document.querySelector('input[name="kNeighbors"]:checked').value
var videoString = weights+'_'+dataset+'_'+distance+'_'+kNeighbors 

goButton.addEventListener('click',function(){
    var weights = document.querySelector('input[name="weights"]:checked').value
    var dataset = document.querySelector('input[name="dataset"]:checked').value
    var distance = document.querySelector('input[name="distance"]:checked').value
    var kNeighbors = document.querySelector('input[name="kNeighbors"]:checked').value
    var videoString = weights+'_'+dataset+'_'+distance+'_'+kNeighbors 
    video.innerHTML = '<video controls width="500">\
    <source src="AlgoAnimations/'+videoString+'.mp4" type="video/mp4">\
    Sorry, your browser doesn\'t support embedded videos.\
</video>'
})

