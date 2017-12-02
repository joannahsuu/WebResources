$(document).ready(function(){
    let liArray = $("li");

    liArray[2].click();
});

$("li").click(function(){
    clickLi($(this));
});
function clickLi(l){
    $(l).addClass("li-active").siblings(".li-active").removeClass("li-active");
}