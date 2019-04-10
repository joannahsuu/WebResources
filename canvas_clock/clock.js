$(function() {
  console.log("in clock.js");
  draw();
  setInterval(draw,1000);
});

/*获取画布元素*/
var dom = document.getElementById("clock");
/*获得2d执行环境*/
var ctx = dom.getContext("2d");
/*定义半径为宽度的一半*/
var r = ($("#clock").width()) / 2
/*缩放比例*/
var rem = ($("#clock").width()) / 200;

/*画时钟的背景图*/
function drawBackground(){
    /*一开始先把画布的初始状态保存下来*/
    ctx.save();
    /*将画布的中心原点由(0,0)变成(r,r)*/
    ctx.translate(r,r);
    /*开始绘画*/
    ctx.beginPath();
    /*定义画笔的宽度*/
    ctx.lineWidth = 10*rem;
    /*绘制一个圆*/
    ctx.arc(0,0,r-5*rem,0,2*Math.PI,false);
    /*进行填充*/
    ctx.stroke();
    /*画时钟上的12个数字*/
    var hourNumber = [3,4,5,6,7,8,9,10,11,12,1,2];//12个小时数
    ctx.font = 18*rem +'px Arial';//定义字体大小和样式
    ctx.textAlign='center';//将文本内容居中对齐
    ctx.textBaseline='middle';//将文本基线设置为中线
    hourNumber.forEach(function(number,i){
        var rad = 2*Math.PI/12*i;//每个数字的弧度
        /*求出数字存放位置的x和y坐标*/
        var x = Math.cos(rad)*(r - 30*rem);
        var y = Math.sin(rad)*(r - 30*rem);
        /*填充数字*/
        ctx.fillText(number,x,y);
    });
    /*绘制60个点*/
    for(var i=0;i<60;i++){
        var rad = 2*Math.PI/60*i;
        var x = Math.cos(rad)*(r-18*rem);
        var y = Math.sin(rad)*(r-18*rem);
        ctx.beginPath();
        /*如果是小时数的位置就绘制成黑色*/
        if(i % 5 === 0){
            ctx.fillStyle = "#000";
            ctx.arc(x,y,2*rem,0,2 * Math.PI,false);
        }else{
            ctx.fillStyle = "#ccc";
            ctx.arc(x,y,2*rem,0,2 * Math.PI,false);
        }
        ctx.fill();
    }
}

/* 时针、分针、秒针、圆点的绘制 */
function drawHour(hour,minute){
    /*再次保存当前画布的状态*/
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 /60 * minute;
    ctx.rotate(rad+mrad);//旋转当前绘画
    ctx.lineWidth = 6*rem;
    ctx.lineCap = 'round';
    ctx.moveTo(0,10*rem);
    ctx.lineTo(0,-r/2);
    ctx.stroke();
    /*返回最近的一次SAVE的画布状态*/
    ctx.restore();
}
function drawMinute(minute){
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * minute;
    ctx.rotate(rad);
    ctx.lineWidth = 3*rem;
    ctx.lineCap = 'round';
    ctx.moveTo(0,10*rem);
    ctx.lineTo(0,-r + 40*rem);
    ctx.stroke();
    ctx.restore();
}
function drawSecond(second){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#c14543";
    var rad = 2 * Math.PI / 60 * second;
    ctx.rotate(rad);
    ctx.moveTo(-3,20*rem);
    ctx.lineTo(3,20*rem);
    ctx.lineTo(1,-r+18*rem);
    ctx.lineTo(-1,-r+18*rem);
    ctx.fill();
    ctx.restore();
}
function drawDot(){
    ctx.beginPath();
    ctx.fillStyle="#fff";
    ctx.arc(0,0,3*rem,0,2*Math.PI,false);
    ctx.fill();
}

function draw(){
    /*动态改变的时候，每一次都要先将之前的矩形画布清除掉，然后重新绘制*/
    ctx.clearRect(0,0,$("#clock").width(),$("#clock").height());
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    console.log('now : ' + now)
    console.log('hour : ' + hour)
    console.log('minute : ' + minute)
    console.log('second : ' + second)
    drawBackground($("#clock").width());//背景
    drawHour(hour,minute);//小时
    drawMinute(minute);//分钟
    drawSecond(second);//秒
    drawDot();//中心原点
    /*恢复到一开始save的那个画布状态，进行重新绘制*/
    ctx.restore();
}