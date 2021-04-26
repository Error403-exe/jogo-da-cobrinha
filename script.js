let canvas = document.getElementById("cobra");
let context = canvas.getContext("2d");
let box = 32;
let cobrinha = [];
cobrinha[0] = {
    x: 8 * box,
    y: 8 * box,
}
let direcao = "direita";
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(let i = 0; i < cobrinha.length; i++){
        context.fillStyle = "green";
        context.fillRect(cobrinha[i].x, cobrinha[i].y, box, box);
    }
}

function criaComida(){
    context.fillStyle = "red";
    context.fillRect(comida.x, comida.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direcao != "direita") direcao = "esquerda";
    if(event.keyCode == 38 && direcao != "baixo") direcao = "cima";
    if(event.keyCode == 39 && direcao != "esquerda") direcao = "direita";
    if(event.keyCode == 40 && direcao != "cima") direcao = "baixo";
}

function iniciarJogo(){
    
    if(cobrinha[0].x > 15* box && direcao == "direita") cobrinha[0].x = 0;
    if(cobrinha[0].x < 0 && direcao == "esquerda") cobrinha[0].x = 16*box;
    if(cobrinha[0].y > 15* box && direcao == "baixo") cobrinha[0].y = 0;
    if(cobrinha[0].y < 0 && direcao == "cima") cobrinha[0].y = 16*box;

    for(var i = 1; i < cobrinha.length; i++){
        if(cobrinha[0].x == cobrinha[i].x && cobrinha[0].y == cobrinha[i].y){
            clearInterval(jogo);
            alert("Game Over");
        }
    }

    criarBG();
    criarCobrinha();
    criaComida();

    let cobrinhaX = cobrinha[0].x;
    let cobrinhaY = cobrinha[0].y;

    if(direcao == "direita") cobrinhaX += box;
    if(direcao == "esquerda") cobrinhaX -= box;
    if(direcao == "cima") cobrinhaY -= box;
    if(direcao == "baixo") cobrinhaY += box;

    if(cobrinhaX != comida.x || cobrinhaY != comida.y){
        cobrinha.pop();
    }
    else{
        comida.x = Math.floor(Math.random() * 15 + 1) * box;
        comida.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let novaCabeca = {
        x: cobrinhaX,
        y: cobrinhaY
    }

    cobrinha.unshift(novaCabeca);
}

let jogo = setInterval(iniciarJogo, 100);