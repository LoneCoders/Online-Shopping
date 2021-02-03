const hamburger=document.querySelector('.hamburger');
var boolean=true;

hamburger.addEventListener("click",function(){
    if(boolean){
        hamburger.classList.add("open");
        boolean=false;
    }
    else{
    hamburger.classList.remove("open");   
    boolean=true;
    }

});