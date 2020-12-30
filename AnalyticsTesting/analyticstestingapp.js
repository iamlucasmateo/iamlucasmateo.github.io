var dlButtons = document.querySelectorAll('.dlbutton');

dlButtons.forEach(function(button){
    button.addEventListener('click', function(){
        dataLayer.push({event: this.innerHTML})
    });
})


// let testOR = undefined || null || +(5 > 3) || 0 || 'X' || 'cosita';
// console.log('OR');
// console.log('prediccion: X')
// console.log(testOR);

