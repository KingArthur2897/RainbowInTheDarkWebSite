//initial
let w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,
    ctx = canvas.getContext('2d'),
    //parameters
    total = w,
    accelleration = .05,

    //afterinitial calculations
    size = w/total,
    occupation = w/total,
    changeColor = 0.06;
    repaintColor = `rgba(0, 0, 0, ${changeColor})`,
colors = [],
    dots = [],
    dotsVel = [];
let prevY = null, prevX = null;
let isMouseDown = false;

//setting the colors' hue
//and y level for all dots
let colorParts = 720;
let portion = colorParts/total;

window.addEventListener("mousedown", () => {
    isMouseDown = true;
});
window.addEventListener("mouseup", () => {
    isMouseDown = false;
})
window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    size = w/total;
    occupation = w/total;
});

canvas.addEventListener("mousemove", (event) => {
    if (isMouseDown){
        if (prevY === null) prevY = event.clientY;
        if (prevX === null) prevX = event.clientX;

        if (prevX !== null) {
            colorParts = event.clientX + 180;
            prevX = event.clientX;
        }

        if (prevY !== null) {
            changeColor = event.clientY / 1000;
            repaintColor = `rgba(0, 0, 0, ${changeColor})`;
        }


        portion = colorParts/total;
        recolor();
    }


})

function recolor() {
    for(var i = 0; i < total; ++i){
        colors[i] = portion * i;

        dots[i] = h;
        dotsVel[i] = 10;
    }
}

recolor();


function anim(){
    window.requestAnimationFrame(anim);

    ctx.fillStyle = repaintColor;
    ctx.fillRect(0, 0, w, h);

    for(var i = 0; i < total; ++i){
        var currentY = dots[i] - 1;
        dots[i] += dotsVel[i] += accelleration;

        ctx.fillStyle = 'hsl('+ colors[i] + ', 80%, 50%)';
        ctx.fillRect(occupation * i, currentY, size, dotsVel[i] + 1);

        if(dots[i] > h && Math.random() < .01){
            dots[i] = dotsVel[i] = 0;
        }
    }
}

anim();