var showIndex = 1;
showSlide(1);
function plusSlide(){
    ++showIndex;
    showSlide(showIndex);

}
function minusSlide(){
    --showIndex;
    showSlide(showIndex);
}
function showSlide(n){
    var slides = document.getElementsByClassName("myslide");
    showIndex = n;
    if(n>slides.length){
        showIndex = 1;
    }
    if(n<1){
        showIndex = slides.length;
    }
    
    for(var i = 0;i<slides.length;i++){
        slides[i].style.display = "none";
    }
    slides[showIndex-1].style.display = "block";
}