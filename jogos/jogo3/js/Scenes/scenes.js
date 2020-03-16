const Scenes = {
    INIT : (props) => {
        let { win, game } = props;
        //background to wait the user press enter
        let backgroundWait = new Sprites({
            sourceX : 1000,
            sourceY : 400,
            width : 1000,
            height : 600,
            x : 0,
            y : 0
        });
        game.sprites.push(backgroundWait);
        game.sceneWaitingStart.push(backgroundWait);
    },
    PLAYING : (props) => {
        let { win, game } = props;
        let personagens = new Personagens( {
            //Green
            sourceX : 180,
            sourceY : 0,
            width : 90,
            height : 130,
            x : 268,
            y : 600 - 130
        });
        
        
        //background just to do maybe a animation in future
        let staticBackground = new Sprites({
            sourceX : 0,
            sourceY : 400,
            width : 1000,
            height : 600,
            x : 0,
            y : 0
        });
        game.sprites.push(staticBackground);
        game.itemsInitSceneComposition.push(staticBackground);
        //personagens
        game.sprites.push(personagens);
        game.personagens.push(personagens); 
    },
    PAUSE : (props) => {
        let { win, game } = props;
        let backgroundPause = new Sprites({
            sourceX : 2000,
            sourceY : 400,
            width : 1000,
            height : 600,
            x : 0,
            y : 0
        });
        game.sprites.push(backgroundPause);
        game.scenePaused.push(backgroundPause);
    },
    OVER : (props) => {
        let { win, game } = props;
        let backgroundOfLoser = new Sprites({
            sourceX : 3000,
            sourceY : 400,
            width : 1000,
            height : 600,
            x : 0,
            y : 0
        });
        game.sprites.push(backgroundOfLoser);
        game.sceneCry.push(backgroundOfLoser);
    }
}
