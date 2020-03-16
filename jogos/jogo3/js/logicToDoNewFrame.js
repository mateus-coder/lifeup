
const typeOfObstacles = {
    sourcesX : [1200, 1240, 1280, 1320],
    getRandomInt : (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    x : [700, 800, 900]
}

functionsToAddEffectOnTheFrames = {
    setVelocity : (array) => {
        for(let i in array){
            array[i].y += array[i].vy;
            array[i].x += array[i].vx;
        }
    },
    
    leaveObject : (props) => {
        let { array, game } = props;
        for(let i in game[array]){
            let objeto = game[array][i];
            if(objeto.x < 0){
                objeto.status = "INVISIBLE";
                game.sprites.splice(game.sprites.indexOf(objeto, 0), 1);
                game.obstacles.splice(game.obstacles.indexOf(objeto, 0), 1);
            }
        }
    },
    spawnObstacles : (props) => {
        let { game } = props;
        let obstacle = new Sprites({
            sourceX : typeOfObstacles.sourcesX[typeOfObstacles.getRandomInt(0,4)],
            sourceY : 1600,
            width : 40,
            height : 50,
            x : typeOfObstacles.x[typeOfObstacles.getRandomInt(0, 3)],
            y : 600 - 50
        });
        if(game.score % 7200)
            game.velocidadeInimigo -= 1;
        obstacle.vx = game.velocidadeInimigo;
        game.obstacles.push(obstacle);
        game.sprites.push(obstacle);
    },
    verifyCollisionsBetwenPlayerAndObstacles : (props) => {
        let { game } = props
        for(let i in game.obstacles){
            if(collide(game.obstacles[i], game.personagens[0])){
                game.gameState = game.OVER;
            }
        }
    }
}

function repeatOfLogicInGame (props) {
    let { game } = props;
    let {leaveObject, setVelocity, spawnObstacles, verifyCollisionsBetwenPlayerAndObstacles} = functionsToAddEffectOnTheFrames;
    //verify if the user pressed button of jump and run the script that move player to the up to top doing with that the user do a complete jump and return to the initial position
    if(listeners["jumpTrue"] && game.gameState === game.PLAYING){
        game.countDelayBetwenJumps++;
        if(game.countDelayBetwenJumps === 1 || game.countDelayBetwenJumps === 5 || game.countDelayBetwenJumps === 10){
            game.personagens[0].y -= 25;
        }
        if(game.countDelayBetwenJumps === 45 || game.countDelayBetwenJumps === 50 || game.countDelayBetwenJumps === 55){
            game.personagens[0].y += 25;
        }
        
        switch(game.countDelayBetwenJumps){
            case 1 : 
                if(game.animations){
                    game.personagens[0].sourceX = 180;
                    game.animations = false;
                }
                else{
                    game.personagens[0].sourceX = 270;
                    game.animations = true;
                }
                break;
            case 60 :   
                listeners["jumpTrue"] = false;
                game.countDelayBetwenJumps = 0;
                break;
        }

    }
    //delete obstacles that exiting of the screen
    leaveObject({
        game : game,
        array : "obstacles"
    });
    if(game.contPlay % 120 === 0) 
        spawnObstacles({
            game : game
        });
    verifyCollisionsBetwenPlayerAndObstacles({
        game : game
    });
    setVelocity(game.obstacles);
} 