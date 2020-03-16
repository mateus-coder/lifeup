
function funcaoGame(){
	var tela = document.getElementById('jogo');
	tela.style.display = 'block';
}

(function(){

	let initFunctions = {
		createGame : () => {
			return new Game();
		},
		handleStartingStateGame : () => {
			game.loadedAssets++;
			if(game.loadedAssets === game.assetsToLoad.length){
				img.removeEventListener('load', handleStartingStateGame ,false);
				//inicia o jogo
				game.gameState = game.INIT;
				//compose initial scene with source based images
				Scenes[game.gameState]({
					game : game,
					win : false
				});
			}
		},
	}
	let { createGame, handleStartingStateGame } = initFunctions;
	let game = createGame();

	let img = new Image();
	img.addEventListener('load', handleStartingStateGame, false);
	img.src = "./source/images/img.png";
	game.assetsToLoad.push(img);

	listeners["createEventListener"]();

	renderScreen({
		game : game,
		img : img,
		requestAnimationFrame : requestAnimationFrame
	})

	//fundo -----------------------------------
	
	//imagem-------------------------------------
}());
