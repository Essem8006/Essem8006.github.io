// Skills polygon for stuff like max pressups, max pullups, max situps, 5k, 400m, half-marathon
// Add something saying 'click for sound'
//tecky smooth curving font
// link to github
// what I do for body mind and soul
// links to fave film and song


let percentEachSide = 0.1;
let gap = 3;
let segments = 9;


let l1 = (window.innerWidth*(1-2*percentEachSide)-(gap*(segments-1)*2))/(segments-0.8);
document.getElementById('nameBox').style.setProperty('--l1', l1+'px');
let l2 = l1/5;
let offset = window.innerWidth*percentEachSide;
let heightDiff = window.innerHeight - (2.2*l1 + 4*gap)
const div = document.getElementById('nameBox');
for(let i=0;i<segments*2;i++){
    const hexagon = document.createElement('div');
    hexagon.classList.add('hexagon');
    hexagon.classList.add('vertical');
    if(i%2 == 1){
        hexagon.style.top = l2/2 + l1 + (gap * 3) + heightDiff/2 + 'px';
        hexagon.style.left = ((i-1) * l1/2) + gap * (i-1) + offset + 'px';
    }else{
        hexagon.style.top = l2/2 + gap + heightDiff/2 + 'px';
        hexagon.style.left = (i * l1/2) + gap * i + offset + 'px';
    }
    div.appendChild(hexagon);
}
for(let i=0;i<(segments-1)*3;i++){
    const hexagon = document.createElement('div');
    hexagon.classList.add('hexagon');
    hexagon.classList.add('horizontal');
    hexagon.style.top = i%3*(l1 + gap * 2) + heightDiff/2 + 'px';
    hexagon.style.left = ((i-i%3) * l1/3 +l2/2) + gap + gap * 2 * (i-i%3)/3 + offset + 'px';
    div.appendChild(hexagon);
}

let possibleCharacters = '?bcd___hi__lmno__r__u_w___ABCDEF_HIJ_LM_OP__STU_W_Y_';
let horizontalCharacterMap = {
    'a': [[90,0,0,90,90,90],[90,0,90,0]],
    'b': [[90,0,0,90,90,90],[0,0,90,0]],
    'c': [[90,0,0,90,90,90],[90,0,90,90]],
    'd': [[90,0,0,90,90,90],[90,0,0,0]],
    'h': [[90,0,90,90,90,90],[0,0,90,0]],
    'i': [[90,90,90],[90,0]],
    'l': [[90,90,90],[0,0]],
    'm': [[90,0,90,90,0,90,90,90,90],[90,0,90,0,90,0]],
    'n': [[90,0,90,90,90,90],[90,0,90,0]],
    'o': [[90,0,0,90,90,90],[90,0,90,0]],
    'r': [[90,0,90,90,90,90],[90,0,90,90]],
    'u': [[90,90,0,90,90,90],[90,0,90,0]],
    'w': [[90,90,0,90,90,0,90,90,90],[90,0,90,0,90,0]],
    'A': [[0,0,90,90,90,90],[0,0,0,0]],
    'B': [[0,0,0,90,90,90],[0,0,0,0]],
    'C': [[0,90,0,90,90,90],[0,0,90,90]],
    'D': [[0,90,0,90,90,90],[0,0,0,0]],
    'E': [[0,0,0,90,90,90],[0,0,90,90]],
    'F': [[0,0,90,90,90,90],[0,0,90,90]],
    'H': [[90,0,90,90,90,90],[0,0,0,0]],
    'I': [[90,90,90],[0,0]],
    'J': [[90,90,0,90,90,90],[90,90,0,0]],
    'L': [[90,90,0,90,90,90],[0,0,90,90]],
    'M': [[0,90,90,0,90,90,90,90,90],[0,0,0,90,0,0]],
    'O': [[0,90,0,90,90,90],[0,0,0,0]],
    'P': [[0,0,90,90,90,90],[0,0,0,90]],
    'S': [[0,0,0,90,90,90],[0,90,90,0]],
    'T': [[0,90,90,0,90,90,90,90,90],[90,90,0,0,90,90]],
    'U': [[90,90,0,90,90,90],[0,0,0,0]],
    'W': [[90,90,0,90,90,0,90,90,90],[0,0,90,0,0,0]],
    'Y': [[90,0,90,90,90,90],[0,90,0,0]],
    ' ': [[90,90,90],[90,90]],
    '_': [[90,90,0],[90,90]],
    "'": [[90,90,90],[0,90]]
}

const hoverElementsH = document.getElementsByClassName('horizontal');
const hoverElementsV = document.getElementsByClassName('vertical');

function renderString(stringToRender) {
    let horizontalMap = [];
    let verticalMap = [];
    Array.from(stringToRender).forEach((character) => {
        for(let i=0;i<horizontalCharacterMap[character][0].length;i++){
            horizontalMap.push(horizontalCharacterMap[character][0][i])
        }
        for(let i=0;i<horizontalCharacterMap[character][1].length;i++){
            verticalMap.push(horizontalCharacterMap[character][1][i])
        }
    });
    count=0;
    Array.from(hoverElementsH).forEach((hoverElement) => {
        hoverElement.style.transform = 'rotate3d(1, 0, 0, ' + horizontalMap[count] + 'deg)';
        count++
    });
    count=0;
    Array.from(hoverElementsV).forEach((hoverElement) => {
        hoverElement.style.transform = 'rotate3d(0, 1, 0, ' + verticalMap[count] + 'deg)';
        count++
    });
};

//not working
Array.from(hoverElementsV).forEach((hoverElement) => {
    let timeout;

    hoverElement.addEventListener('mouseenter', () => {
        hoverElement.style.transform = 'rotate3d(0, 1, 0, 90deg)';
        var audio = new Audio('click.mp3');
        audio.play();
    });

    hoverElement.addEventListener('mouseleave', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            hoverElement.style.transform = 'rotate3d(0, 1, 0, 0deg)';
            var audio = new Audio('click.mp3');
            audio.play();
        }, 1000);
    });
});
Array.from(hoverElementsH).forEach((hoverElement) => {
    let timeout;

    hoverElement.addEventListener('mouseenter', () => {
        hoverElement.style.transform = 'rotate3d(1, 0, 0, 90deg)';
        var audio = new Audio('click.mp3');
        audio.play();
    });

    hoverElement.addEventListener('mouseleave', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            hoverElement.style.transform = 'rotate3d(1, 0, 0, 0deg)';
            var audio = new Audio('click.mp3');
            audio.play();
        }, 1000);
    });
});



renderString('Hi_     ')
var audio = new Audio('click.mp3');
audio.play();
let timeout;
clearTimeout(timeout);
timeout = setTimeout(() => {
    renderString("I'm_     ")
    var audio = new Audio('click.mp3');
    audio.play();
}, 1000);

timeout = setTimeout(() => {
    renderString('SAM_    ')
    var audio = new Audio('click.mp3');
    audio.play();
}, 2000);

let content = document.getElementById('infoBox');
timeout = setTimeout(() => {
    content.style.opacity = 1;
}, 4000);