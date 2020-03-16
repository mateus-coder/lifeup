//jogo
function funcaoGame1(){
	$('#topo').css('display', 'none');
	let tela = document.getElementById('jogo');
	let row1 = document.getElementById('pontuacao');
	row1.style.display = "grid";
	let content = "";
	for(let i = 0; i < 10; i++){
		content += `	<div class="indice1">

						</div>`;
	}
	row1.innerHTML = content;
	tela.style.display = 'block';


//jogo

	//canvas
	let cnv = document.querySelector('#canvas1');
	//contexto de renderização 2d
	let ctx = cnv.getContext('2d');
	
	//RECURSOS DO JOGO ========================================================>
	//arrays
	let sprites = [];
	let assetsToLoad = [];
	let messages = [];
	//array de misseis
	let misseis = [];
	//aliens
	let aliens = [];
	//variáveis úteis
	let alienFrequency = 100;
	let alienTimer = 0;
	let contadorDeNavesAbatidasValidas = 0;
	let contadorDeAlimentosQueChegaramNaBoca = 0;
	let arrayDeSourceXAlimentos = [234, 284,334,384];
	let win = lose = false;
	let move = 0;
	//sprites
	//cenário
	let background = new Sprite(0, 162,500, 500, 0, 0);
    sprites.push(background);
    //personagem
    let char = new Sprite(0,104,56,58,222,438);
	sprites.push(char);

	//construtora de texto 
	const constructorOfText = (props) => {
        let { y, text, color, x, font, end } = props;
        let textWhileUserPlaying = new ObjectMessage({
            y : y,
            text : text,
            color : color,
            x : x,
            font : font,
            end : end
        });
        return textWhileUserPlaying;
    }

	//mensagem da tela inicial
	
	let startMessage = 	constructorOfText({
							y : 540,
							x : 350,
							color : "#00a000",
							text : "PRESS ENTER",
							font : "normal bold 30px emulogic",
							end : false
						});
	messages.push(startMessage);
	//mensagem de pausa
	let pausa = constructorOfText({
					y : 540,
					x : 350,
					color : "#00a000",
					text : "PAUSE",
					font : "normal bold 30px emulogic",
					end : false
				});
	pausa.status = "INVISIBLE";
	messages.push(pausa);
	//mensagem de game win
	let gameWin = 	constructorOfText({
						y : 540,
						x : 350,
						color : "#00a000",
						text : "YOU WIN",
						font : "normal bold 30px emulogic",
						end : false
					});
	gameWin.status = "INVISIBLE";
	messages.push(gameWin);

	
	let gameLose = 	constructorOfText({
						y : 540,
						x : 350,
						color : "#ff0000",
						text : "GAME OVER",
						font : "normal bold 30px emulogic",
						end : false
					});
	gameLose.status = "INVISIBLE";
	messages.push(gameLose);
	
	//obstaculos
	//var obstaculos = new Sprite(0, 0, 100, 200, 380, 298);
	//sprites.push(obstaculos);
	
	//imagem
	let img = new Image();
	img.addEventListener('load',loadHandler,false);
	img.src = "../../images/jogos/jogo1/img.png";
	assetsToLoad.push(img);
	//contador de recursos
	let loadedAssets = 0;
	
	
	//entradas
	let LEFT = 37, RIGHT = 39, ENTER = 13, SPACE = 32, CIMA = 38, R = 82;
	
	//ações
	let mvLeft = mvRight = jump = shoot = spaceIsDown = jumPress = false;
	
	
	//estados do jogo
	let LOADING = 0, PLAYING = 1, PAUSED = 2, OVER = 3;
	let gameState = LOADING;
	
	//listeners
	window.addEventListener('keydown',function(e){
		let key = e.keyCode;
		
		switch(key){
			case LEFT:
				mvLeft = true;
				break;
			case RIGHT:
				mvRight = true;
				break;
			case SPACE:
				if(!spaceIsDown){
					shoot = true;
					spaceIsDown = true;
				}
				
				break;
		}
	},false);
	
	window.addEventListener('keyup',function(e){
		let key = e.keyCode;
		switch(key){
			case LEFT:
				mvLeft = false;
				break;
			case RIGHT:
				mvRight = false;
				break;
			case ENTER:
				if(gameState !== PLAYING){
			
						gameState = PLAYING;
						startMessage.status = "INVISIBLE";
						pausa.status = "INVISIBLE";
				} else {
					pausa.status = "VISIBLE";
					gameState = PAUSED;
				}
				break;
			case SPACE:
				fireMissile();
				spaceIsDown = true;
				break;
		}
	},false);


	//FUNÇÕES =================================================================>
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	function loadHandler(){
		loadedAssets++;
		if(loadedAssets === assetsToLoad.length){
			img.removeEventListener('load',loadHandler,false);
			//inicia o jogo
			gameState = PAUSED;
		}
	}
	
	function loop(){
		requestAnimationFrame(loop, cnv);
		//define as ações com base no estado do jogo
		switch(gameState){
			case LOADING:
				console.log('LOADING...');
				break;
			case PLAYING:
				update();
				break;
			case OVER:
				if(win && !lose){
					gameWin.status = "VISIBLE";
					console.log('Você venceu');
					setTimeout( () => {
						window.location.href = "../../pages/Escada.html";
					}, 2000);
				}
				if(lose && !win){
					gameLose.status = "VISIBLE";
					console.log('Você perdeu');
					setTimeout( () => {
						window.location.href = "../../pages/Escada.html";
					}, 2000);
				}
				cancelAnimationFrame(loop);
				break;
			case PAUSED:
				progressoAntigo();
				break;
		}
		render();
	}
	
	function update(){

		//move para a esquerda
		if(mvLeft && !mvRight){
			char.vx = -5;
		}
		
		//move para a direita
		if(mvRight && !mvLeft){
			char.vx = 5;
		}

		//para a nave
		if(!mvLeft && !mvRight){
			char.vx = 0;
		}

		//jump do personagem
		if(jump){
			char.y = char.y - 12;
			setTimeout(function(){
				char.y = char.y + 12;
				jump = false;
			}, 400);
		}
		if(shoot && spaceIsDown){
			fireMissile();
			shoot = false;
			spaceIsDown = false;
		}
		
		//se o contador chegar a 25 o lose = true
		if(contadorDeAlimentosQueChegaramNaBoca === 25){
			lose = true;
			win = false;
			gameState = OVER;
		}
		
		
		//atualiza a posição
		move = char.x;
		char.x = Math.max(0,Math.min(cnv.width - char.width, char.x + char.vx));
		//if(collide(char, obstaculos)){
		//	char.x = move;
		//}

		//obstaculos.x = obstaculos.x - 7;

		/*if(obstaculos.x < 0){
			obstaculos.status = "INVISIBLE";
			removeObjects(obstaculos, sprites);
			var syhei = tiposDeObstaculosY[getRandomInt(0, 3)];
			var sxwid = tiposDeObstaculosX[getRandomInt(0, 3)];
			var x1 = coresObstaculosX[getRandomInt(0, 3)];

			obstaculos = new Sprite(x1, 0, sxwid, syhei, obstaculosInit[getRandomInt(0,3)], cnv.height - sywid);
			sprites.push(obstaculos);
		}*/

		//atualiza a posição dos mísseis
		for(let i in misseis){
			let missel = misseis[i];
			missel.y += missel.vy;
			if(missel.y < -missel.height){//missel passar da borda superior do canvas
				removeObjects(missel, misseis);
				removeObjects(missel, sprites);
				i--;
			}
		}
		//encremento do alienTimer
		alienTimer++;
		//criação do alien caso o Timer se iguale a frequencia
		if(alienTimer === alienFrequency){
			makeAlien();
			alienTimer = 0;
			//ajuste da frequencia de aliens
			if(alienFrequency > 2){
				alienFrequency--;
			}
		}
		//atualiza posição dos aliens
		for(let i in aliens){
			let alieni = aliens[i];
			if(alieni.state !== alieni.EXPLODED){
				alieni.y += alieni.vy;
				if(alieni.state === alieni.CRAZY){
					if(alieni.x > cnv.width - alieni.width || alieni.x < 0){//evitar que os objetos inimigos ultrapassem das bordas laterais do canvas
						alieni.vx *= -1;
					}
					alieni.x += alieni.vx;
				}
				if(alieni.y > cnv.height + alieni.height){//quando eu passar da borda inferior do canvas remover item
					contadorDeAlimentosQueChegaramNaBoca++;
					removeObjects(alieni, aliens);
					removeObjects(alieni, sprites);
					i--;
				}
			}

			//Confere se algum alien foi destruído
			for(let j in misseis){
				let missile = misseis[j];
				if(collide(missile, alieni) && alieni.state !== alieni.EXPLODED){
					if(!win  && !lose){
						progressoAtual();
					}
					
					if(contadorDeNavesAbatidasValidas === 10){
						win = true;
						lose = false;
						gameState = OVER;
					}
					else{
						win = false;
					}
					destroyAlien(alieni);
					removeObjects(missile, misseis);
					removeObjects(missile, sprites);
					j--;
					i--;
				}
			}
			
		}//fim do for que faz a varredura no array de aliens
		
	}//fim do update
	//criadora de misseis
	function fireMissile(){
		let missile = new Sprite(172, 104, 60, 53, char.centerX()- 50, char.y - 53);
		missile.vy = -8;
		sprites.push(missile);
		misseis.push(missile);
	}
	//criadora de aliens
	function makeAlien(){
		//cria um valor randômico entre 0 e 8 ==> largura do canvas / a largura do alien
		//divide o canvas em 9 colunar para o posicionamento aleatório do alien
		let alienPosition = (Math.floor(Math.random() * 9)) * 55;
		let alienigina = new Alien(arrayDeSourceXAlimentos[getRandomInt(0,4)], 103, 50, 60,alienPosition, -55);
		alienigina.vy = 1;
		//OTIMIZAÇÃO DO ALIEN
		if(Math.floor(Math.random() * 11) > 7){//30% de chance
			alienigina.state = alienigina.CRAZY;
			alienigina.vx = 2;
		}

		if(Math.floor(Math.random() * 11) > 5){//50% de chance
			alienigina.vy = 2;
		}
		sprites.push(alienigina);
		aliens.push(alienigina);
	}

	//destroi aliens
	function destroyAlien(alien){
		alien.state = alien.EXPLODED;
		alien.explode();
		setTimeout(function(){
			removeObjects(alien, aliens);
			removeObjects(alien, sprites);
		}, 1000);
	}
	//preencher progresso antigo
	function progressoAntigo(){
		let progresso = document.getElementsByClassName('indice1');
		for(let i = 0; i < contadorDeNavesAbatidasValidas; i++){
			progresso[i].classList.add('checkedwin');
		}
	}
	//progresso atual de alimentos válidos
	function progressoAtual(){
		let progresso = document.getElementsByClassName('indice1')[contadorDeNavesAbatidasValidas];
		console.log(contadorDeNavesAbatidasValidas);
		progresso.classList.add('checkedwin');
		contadorDeNavesAbatidasValidas++;
	}
	//remove os objetos do jogo 
	function removeObjects(objectOnRemove, array){
		let i = array.indexOf(objectOnRemove);
		if(i !== -1){
			array.splice(i, 1);
		}
	}
	function render(){
		ctx.clearRect(0,0,cnv.width,cnv.height);
		//exibe os sprites
		if(sprites.length !== 0){
			for(let i in sprites){
				let spr = sprites[i];
				if(spr.status === "VISIBLE"){
					ctx.drawImage(img,spr.sourceX,spr.sourceY,spr.width,spr.height,Math.floor(spr.x),Math.floor(spr.y),spr.width,spr.height);
				}
			}
		}
		//exibe os textos
		if(messages.length !== 0){
			for(let i in messages){
				let message = messages[i];
				if(message.status === "VISIBLE"){
					ctx.font = message.font;
					ctx.fillStyle = message.color;
					ctx.textBaseline = message.baseline;
					message.x = (cnv.width - ctx.measureText(message.text).width)/2;
					message.y = ( (cnv.height / 2) );
					ctx.fillText(message.text, message.x, message.y); 
				}
			}
		}
	}
	loop();
}


