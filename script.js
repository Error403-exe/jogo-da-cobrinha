
let canvas = document.getElementById("cobra");
let context = canvas.getContext("2d");
let box = 32;
let cobrinha = [];
let corCobrinha = "blue";
let corComida = "red";
let corBG = "lightblue";
document.getElementById("corBG").addEventListener('change', function(){
    corBG = document.getElementById("corBG").value;
})
document.getElementById("corCobrinha").addEventListener('change', function(){
    corCobrinha = document.getElementById("corCobrinha").value;
})
document.getElementById("corComida").addEventListener('change', function(){
    corComida = document.getElementById("corComida").value;
})
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
    context.fillStyle = corBG;
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(let i = 0; i < cobrinha.length; i++){
        context.fillStyle = corCobrinha;
        context.fillRect(cobrinha[i].x, cobrinha[i].y, box, box);
    }
}

function criaComida(){
    context.fillStyle = corComida;
    context.fillRect(comida.x, comida.y, box, box);
}

document.addEventListener('keyup', update);

function update(event){
        //console.log(event);
        /*if(event.keyCode == 37 && direcao != "direita"){ 
            direcao = "esquerda";
            event = false;
        }
        else{ 
            if(event.keyCode == 39 && direcao != "esquerda"){
                direcao = "direita";
            }
            else{ 
                if(event.keyCode == 38 && direcao != "baixo"){ 
                    direcao = "cima";
                }
                else{ 
                    if(event.keyCode == 40 && direcao != "cima") {
                        direcao = "baixo";
                    }
                }
            }
        } */
        switch(event.keyCode){
            case 37:
                if(direcao != "direita"){ 
                    direcao = "esquerda";
                }
                break;
            case 38:
                if(direcao != "baixo"){ 
                    direcao = "cima";
                }
                break;
            case 39:
                if(direcao != "esquerda"){
                    direcao = "direita";
                }
                break;
            case 40:
                if(direcao != "cima") {
                    direcao = "baixo";
                }
                break;
        }
}

function iniciarJogo(){
    
    criarBG();
    criarCobrinha();
    criaComida();
    if(comeca){
        if(cobrinha[0].x > 15* box && direcao == "direita") cobrinha[0].x = 0;
        if(cobrinha[0].x < 0 && direcao == "esquerda") cobrinha[0].x = 16*box;
        if(cobrinha[0].y > 15* box && direcao == "baixo") cobrinha[0].y = 0;
        if(cobrinha[0].y < 0 && direcao == "cima") cobrinha[0].y = 16*box;

        for(var i = 1; i < cobrinha.length; i++){
            if(cobrinha[0].x == cobrinha[i].x && cobrinha[0].y == cobrinha[i].y){
                clearInterval(jogo);
                alert("Game Over");
                document.getElementById("restart").disabled=false;
            }
        }


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
}

let jogo = setInterval(iniciarJogo, 100);

let comeca = false;

function start(){
    comeca = true;
    document.getElementById("corBG").disabled=true;
    document.getElementById("corCobrinha").disabled=true;
    document.getElementById("corComida").disabled=true;
}

function restart(){
    while(cobrinha.length > 1){
        cobrinha.pop();        
    }
    comeca = false;
    jogo = setInterval(iniciarJogo, 100);
    document.getElementById("restart").disabled=true;
    document.getElementById("corBG").disabled=false;
    document.getElementById("corCobrinha").disabled=false;
    document.getElementById("corComida").disabled=false;
}