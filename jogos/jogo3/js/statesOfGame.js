
function verifyGameState (game) {
    const indiceSceneLose = {
        indice : [3000, 4000],
        estado : 0
    }
    const resetCounts = (here) => {
        let vetor = ["contWin", "contPause", "contLose", "contPlay"];
        let valueNow = game[`${here}`];
        for(let v in vetor){
            if(game[`${vetor[v]}`] !== valueNow)
                game[`${vetor[v]}`] = 0;
        }
    }
    const setVisibilityOfObject = (props) => {
        let { arrays, game, status } = props;
        for(let i in arrays){
            for(let j in game[arrays[i]]){
                game[arrays[i]][j].status = status;
                
            }
        }
    }
    const removeInvisibleObjects = (props) => {
        let { arrays, game } = props;
        for(let i in arrays){
            for(let j in game[arrays[i]]){
                if(game[arrays[i]][j].status === "INVISIBLE"){
                    game.removeObjects({
                        objectSpec : game[arrays[i]][j],
                        array : game[arrays[i]]
                    });
                }
            }
        }
    }
    const removeText = (props) => {
        let { game } = props;
        for(let i in game.messages){
            let text = game.messages[i];
            if(text.status === "INVISIBLE"){
                game.messages.splice(text, 1);
                i--;
            }
        }
    } 
    const constructorOfText = (props) => {
        let { game, y, text, color, x, font, end } = props;
        let textWhileUserPlaying = new ObjectMessage({
            y : y,
            text : text,
            color : color,
            x : x,
            font : font,
            end : end
        });
        game.messages.push(textWhileUserPlaying);
    }
    const acceptedKeys = {
        Enter : () => {
            if(game.gameState !== game.OVER){
                game.gameState !== game.PLAYING ? game.gameState = game.PLAYING : game.gameState = game.PAUSE;
                listeners["keyPressed"] = "Null";
            }
        },
        
    }
    if(acceptedKeys[listeners["keyPressed"]]){
        acceptedKeys[listeners["keyPressed"]]();
    }
    switch(game.gameState){
        case game.PLAYING :
            resetCounts("contPlay");
            setVisibilityOfObject({
                arrays : ["sceneCry","scenePaused", "messages"],
                game : game,
                status : "INVISIBLE"
            });
            removeInvisibleObjects({
                arrays : ["sceneCry", "scenePaused"],
                game : game
            });
            removeText({
                game : game
            });
            constructorOfText({
                game : game,
                y : 50,
                x : 50,
                color : "#008000",
                text : `SCORE : ${game.score}`,
                font : "normal bold 30px sweet",
                end : false
            });
            if(game.contPlay === 0){//when the array is null create bootstrap of innitial scene
                listeners["jumpTrue"] = false;
                game.countDelayBetwenJumps = 0;
                game.score = 0;
                Scenes["PLAYING"]({
                    game : game,
                    win : false
                });
            }   
            else{
                setVisibilityOfObject({
                    arrays : ["personagens", "itemsInitSceneComposition"],
                    game : game,
                    status : "VISIBLE"
                });
            }
            
            if(game.contPlay % 60 === 0){
                game.score++;
            }
            game.contPlay++;
            repeatOfLogicInGame({
                game : game
            });
            break;
        case game.OVER :
            game.velocidadeInimigo = -5;
            resetCounts("contLose");
            setVisibilityOfObject({
                arrays : ["scenePaused","personagens", "itemsInitSceneComposition", "obstacles", "messages"],
                game : game,
                status : "INVISIBLE"
            });
            removeInvisibleObjects({
                arrays : ["scenePaused","personagens", "itemsInitSceneComposition","obstacles"],
                game : game
            });
            removeText({
                game : game
            });
            constructorOfText({
                game : game,
                y : (600/2) + 25,
                x : (1000/2) - 50,
                color : "#FF8C00",
                text : `${game.score}`,
                font : "normal bold 70px sweet",
                end : true
            });
            if(game.contLose === 0){
                Scenes["OVER"]({
                    game : game,
                    win : false
                });
            }
            else{
                if(game.contLose % 30 === 0){
                    if(game.sceneCry[0].sourceX === 3000)
                        game.sceneCry[0].sourceX = 4000;
                    else
                        game.sceneCry[0].sourceX = 3000;
                }
            }
            game.contLose++;
            setTimeout( () => {
                window.location.href = "../../pages/Escada.html";
            }, 5000);
            
            break;
        case game.PAUSE :
            resetCounts("contPause");
            setVisibilityOfObject({
                arrays : ["sceneWaitingStart", "obstacles","personagens", "itemsInitSceneComposition", "messages"],
                game : game,
                status : "INVISIBLE"
            });
            removeInvisibleObjects({
                arrays : ["sceneWaitingStart", "obstacles","personagens", "itemsInitSceneComposition"],
                game : game
            });
            removeText({
                game : game
            });
            game.contPause === 0 && game.scenePaused.length === 0 ?
            Scenes["PAUSE"]({
                game : game,
                win : false
            }) :
            setVisibilityOfObject({
                arrays : ["scenePaused"],
                game : game,
                status : "VISIBLE"
            })
            
            game.contPause++;
            break;
    }
}