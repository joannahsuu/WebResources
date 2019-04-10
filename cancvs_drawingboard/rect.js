var canvas = document.getElementById('canvas'); // 得到画布
var ctx = canvas.getContext('2d'); // 得到画布的上下文对象
var flag = false;
var x1 = 0
var y1 = 0

var x2 = 0
var y2 = 0

// var x = 0; // 鼠标开始移动的位置X
// var y = 0; // 鼠标开始移动的位置Y
var url = ''; // canvas图片的二进制格式转为dataURL格式

/* 为canvas绑定mouse事件 */
canvas.onmousedown = function(e) {
    console.log('onmousedown')
    flag = true;
    x1 = e.offsetX; // 鼠标落下时的X
    y1 = e.offsetY; // 鼠标落下时的Y
}

canvas.onmouseup = function(e) {
    flag = false;
    url = canvas.toDataURL(); // 每次 mouseup 都保存一次画布状态
}

canvas.onmousemove = function(e) {
    drawRect(e); // 绘制方法
}

// 画矩形
function drawRect(e){
    if(!flag) {
        return
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    saveRect()
    ctx.beginPath();
    ctx.strokeRect(x1, y1, e.offsetX - x1, e.offsetY - y1);
}

function saveRect(){
    var img = new Image();
    img.src = url;
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
}