function rectangularCollision( { rectangle1, rectangle2 } ){
    return (
        player.attackBox.position.x + player.attackBox.width >= enemy.position.x && 
        player.attackBox.position.x <= enemy.position.x + enemy.width &&
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.position.y <= enemy.position.y + enemy.height 
    )
}

function determineWinner ({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.getElementById('displayText').style.display = 'flex'
    if( player.health === enemy.health && timer === 0){
        document.getElementById('displayText').innerHTML = 'Time Out!'
    }else if (player.health === enemy.health) {
        document.getElementById('displayText').innerHTML = 'Double K.O!'
    }else if ( player.health > enemy.health){
        document.getElementById('displayText').innerHTML = `${nomeDoBoneco} Wins!`

    }else if ( enemy.health > player.health){
        document.getElementById('displayText').innerHTML = `${nomeDoBoneco2} Wins!`
    }
}

let timer = 61
let timerId
function decreaseTimer(){
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.getElementById('timer').innerHTML = timer
    }
    
    if( timer <= 0) {
        player.velocity.y = 0
        enemy.velocity.x = 0
        determineWinner({ player, enemy, timerId})
    }

    if (enemy.health <= 0.7 || player.health <= 0) {
        determineWinner({ player, enemy , timerId })
    }

}