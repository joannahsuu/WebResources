// Canvas DOM 元素
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

//起始點座標
let x1= 0
let y1= 0

// 終點座標
let x2= 0
let y2= 0

// 宣告一個 hasTouchEvent 變數，來檢查是否有 touch 的事件存在
const hasTouchEvent = 'ontouchstart' in window ? true : false

// 透過上方的 hasTouchEvent 來決定要監聽的是 mouse 還是 touch 的事件
const downEvent = hasTouchEvent ? 'ontouchstart' : 'mousedown'
const moveEvent = hasTouchEvent ? 'ontouchmove' : 'mousemove'
const upEvent = hasTouchEvent ? 'touchend' : 'mouseup'

// 宣告 isMouseActive 為滑鼠點擊的狀態，因為我們需要滑鼠在 mousedown 的狀態時，才會監聽 mousemove 的狀態
let isMouseActive = false

// mousedown，畫筆
canvas.addEventListener(downEvent, function(e){
    console.log('===downEvent - e===', e)
    isMouseActive = true

    // (x,y)座標
    x1 = e.offsetX
    y1 = e.offsetY
    console.log('e.offsetX', e.offsetX)
    console.log('e.offsetY', e.offsetY)

    ctx.lineWidth = 5 // 線條寬度
    ctx.lineCap = 'square' // 線條兩端圓弧
    ctx.lineJoin = 'miter' // 線條折角圓弧
})

canvas.addEventListener(moveEvent, function(e){
    if(!isMouseActive){
        return
      }
      // 取得終點座標
      x2 = e.offsetX
      y2 = e.offsetY

      // 開始繪圖
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      // 更新起始點座標
      x1 = x2
      y1 = y2
})

canvas.addEventListener(upEvent, function(e){
    isMouseActive = false
})