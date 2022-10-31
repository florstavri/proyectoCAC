// Automatic Slideshow - change image every 4 seconds
var myIndex = 0;


function carousel() {
  var i;
  var x = document.getElementsByClassName("fotos");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}   
   console.log(x) ;
  x[myIndex-1].style.display = "block";
  // document.getElementsByClassName("fotos")[myIndex-1].style.display = "block";  
   setTimeout(carousel, 1000);    
}
