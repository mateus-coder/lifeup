function renderScreen (props) {
    let { game, img, requestAnimationFrame } = props
    let canvas = document.querySelector("#jogo > canvas");
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    //draw the images in screen 
    if(game.sprites.length !== 0){
        for(let i in game.sprites){
            let sprite = game.sprites[i];
            if(sprite.status === "VISIBLE")
                ctx.drawImage( img,sprite.sourceX, sprite.sourceY, sprite.width, sprite.height, Math.floor(sprite.x), Math.floor(sprite.y), sprite.width, sprite.height );
        }
    }
    //show the text objects that are on game state now
    if(game.messages.length !== 0){
        for(let k in game.messages){
            let text = game.messages[k];
            if(text.status === "VISIBLE"){
                ctx.font = text.font;
                ctx.fillStyle = text.color;
                ctx.textBaseLine = text.baseline;
                ctx.fillText(text.text, text.x, text.y);
                if(text.end){
                    text.x = (canvas.width - ctx.measureText(text.text).width)/2;
                }
            }
        }
    }
    requestAnimationFrame( () => {
        verifyGameState (game);
        renderScreen(props);
    } );
}