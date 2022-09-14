//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 3;
let velocidadeYBolinha = 3;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 5;
let alturaRaquete = 100;

//variaveis da raqueteoponente
let xRaqueteOponente = 590;
let yRaqueteOponente = 150;
let velocidadeYOponente;


let colidiu = false

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

let chanceDeErrar = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrabolinha();
  movimentabolinha();
  verificacolisaoborda();
  mostrarRaquete(xRaquete, yRaquete);
  movimentaminharaquete();
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  //mostrarRaqueteOponente();
  movimentaRaqueteOponente();
  //verificacaoColisaoRaquete();
  //verificacaoColisaoRaqueteOponente();
  verificacaoColisaoRaqueteBiblioteca(xRaquete, yRaquete);
  verificacaoColisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  marcarPonto(); 

}

function mostrabolinha(){
 circle(xBolinha, yBolinha, diametro); 
}

function movimentabolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
} 

function verificacolisaoborda(){
 if (xBolinha + raio > width || xBolinha - raio < 0){
  velocidadeXBolinha *= -1;
}
  
  if (yBolinha + raio > height || yBolinha - raio < 0){ velocidadeYBolinha *= -1;} 
}

function mostrarRaquete(x, y){
  rect(x, y, larguraRaquete, alturaRaquete);
}

function movimentaminharaquete(){
  if (keyIsDown(87)){yRaquete -= 10}
  if (keyIsDown(83)){yRaquete += 10}
}

function movimentaRaqueteOponente(){
  if (keyIsDown(UP_ARROW)){yRaqueteOponente -= 10}
  if (keyIsDown(DOWN_ARROW)){yRaqueteOponente += 10}
}

function verificacaoColisaoRaquete(){
  if (xBolinha - raio < xRaquete + larguraRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){velocidadeXBolinha *= -1}  
}

function verificacaoColisaoRaqueteOponente(){
  if (xBolinha + raio > xRaqueteOponente - larguraRaquete && yBolinha - raio < yRaqueteOponente + alturaRaquete && yBolinha + raio > yRaqueteOponente) {velocidadeXBolinha *= -1}
}

function verificacaoColisaoRaqueteBiblioteca(x, y){
  colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, diametro);
  if (colidiu){velocidadeXBolinha *= -1
   raquetada.play();
  };
  
}

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  fill(color(255,140,0));
  rect(130, 2, 40, 30);
  fill(250);
  text(meusPontos, 150, 26);
  fill(color(255,140,0));
  rect(430, 2, 40, 30);
  fill(250);
  text(pontosDoOponente, 450, 26);
  textSize(30);
} 

function marcarPonto(){
  if (xBolinha < 10){pontosDoOponente += 1}
  if (xBolinha > 590){meusPontos += 1}
}

