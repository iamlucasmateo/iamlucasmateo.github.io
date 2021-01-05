var dlButtons = document.querySelectorAll('.dlbutton');

dlButtons.forEach(function(button){
    button.addEventListener('click', function(){
        dataLayer.push({event: this.innerHTML})
    });
})

let key = prompt('Que variable?')

let user = {
    name: 'John',
    [key]: 32,
    loqui: true,
}

console.log(user)







