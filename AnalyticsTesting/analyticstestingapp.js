var dlButtons = document.querySelectorAll('.dlbutton');

dlButtons.forEach(function(button){
    button.addEventListener('click', function(){
        dataLayer.push({event: this.innerHTML})
    });
})



