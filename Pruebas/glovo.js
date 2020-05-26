
var glovoLink = document.querySelector("#glovo-link") 

var redirect = function() {
    var app = {
      launchApp: function() {
        window.location.replace("glovo://");
        this.timer = setTimeout(this.openWebApp, 2000);
      },
  
      openWebApp: function() {
        window.location.replace("https://www.google.com/");
      }
    };
  
    app.launchApp();
};


glovoLink.addEventListener('click',redirect);

