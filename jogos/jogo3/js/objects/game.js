function Game () {
    this.sprites = new Array;
    this.personagens = new Array;
    this.obstacles = new Array;
    this.INIT = "INIT";
    this.PAUSE = "PAUSE";
    this.PLAYING = "PLAYING";
    this.OVER = "OVER";
    this.LOAD = "LOAD";
    this.gameState = this.LOAD;
    this.loadedAssets = 0;
    this.assetsToLoad = new Array;
    this.contador = 0;
    this.playerState = "NONE";
    this.contWin = 0;
    this.contLose = 0;
    this.contPlay = 0;
    this.contPause = 0;
    this.score = 0;
    this.velocidadeInimigo = -5;
    this.countDelayBetwenJumps = 0;
    this.itemsInitSceneComposition = new Array;
    this.sceneWaitingStart = new Array;
    this.scenePaused = new Array;
    this.sceneCry = new Array;
    this.messages = new Array;
    this.animations = false;
}

Game.prototype.removeObjects = function (props) {
    let { objectSpec, array } = props;
    let indice = array.indexOf(objectSpec);
    this.sprites.splice(indice, 1);
    array.splice(indice, 1);
}
