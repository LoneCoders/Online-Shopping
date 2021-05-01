var showIndex = 1;
showSlide(1);
var timer;
reset();
function reset(){
    clearTimeout(timer);
    timer = setInterval(()=>{
        showSlide(++showIndex);
    },2000);
}

function plusSlide(){
    ++showIndex;
    showSlide(showIndex);
    reset();

}
function minusSlide(){
    --showIndex;
    showSlide(showIndex);
    reset();
}
function showSlide(n){
    var slides = document.getElementsByClassName("myslide");
    var dots = document.getElementsByClassName("dotb");
    showIndex = n;
    if(n>slides.length){
        showIndex = 1;
    }
    if(n<1){
        showIndex = slides.length;
    }
    
    for(var i = 0;i<slides.length;i++){
        dots[i].style.backgroundColor ="rgba(255,255,255,0.5)";
        slides[i].style.display = "none";
    }
    dots[showIndex-1].style.backgroundColor ="rgba(255,255,255,2)";
    slides[showIndex-1].style.display = "block";
    
}
