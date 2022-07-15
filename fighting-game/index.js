const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
let nomeDoBoneco = 'Natã'
let nomeDoBoneco2 = 'Paulo'
//        this.velocity.y = -14
canvas.width = 1024
canvas.height = 476
c.fillRect(0, 0, canvas.width, canvas.height)//4 arguments
const gravity = 0.6


class Sprite {
    constructor({position, velocity, color ='red', offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 55
        this.height = 130
    }

    

    draw(){
        }

    update(){
        this.draw()
    }


    jump(){
        this.isJumping = true
        if(this.isJumping){
            this.velocity.y = -14
        }
    }
}
class Fighter {
    constructor({position, velocity, color ='red', offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 55
        this.height = 130
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset,
            width: 120,
            height: 40,
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.isJumping
    }

    

    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height) // tamanho e posição do retangulo
        
        // attack box
       if( this.isAttacking){
        player.velocity.x = 0
        enemy.velocity.x = 0
        c.fillStyle = 'green'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)    
        }
        }

    update(){
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if( this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

    attack(){
        this.isAttacking = true
        setTimeout(()=> {
            this.isAttacking = false
        }, 200)
    }

    jump(){
        this.isJumping = true
        if(this.isJumping){
            this.velocity.y = -14
        }
    }
}

const player = new Sprite({
    position: {
        x: 370,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    offset: {
        x: 0,
        y: 0,
    }
    })


const enemy = new Sprite({
    position: {
        x: 600,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    color: 'blue',
    offset: {
        x: -70,
        y: 0,
    }
    })


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

let lastKey

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

let timer = 13
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

    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy , timerId })
    }

}
decreaseTimer()

function animate() {
    document.getElementById('enemy').style.transition = '200ms'
    document.getElementById('player').style.transition = '200ms'
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

//  Player Movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -4
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 4
    }

//  Enemy Movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -4
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 4
    }

//  detect for collision

if( rectangularCollision({ rectangle1: player, rectangle2: enemy, }) && player.isAttacking){
    player.isAttacking = false
    enemy.health -= 5
    document.getElementById('enemy').style.width = enemy.health + '%'
}

    if( rectangularCollision({
        rectangle1: enemy, rectangle2: player,
    }) &&
    enemy.isAttacking
    ){
        enemy.isAttacking = false
        player.health -= 5
        document.getElementById('player').style.width = player.health + '%'
    }
    
}


animate()


window.addEventListener('keydown', (event) => {

    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.jump()
            break
        case 'f':
            player.attack()
            break
            
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.jump()
            break
        case ' ':
            enemy.attack()
            break
            
            
    }
    console.log(event.key)
})


window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
    }

// ENEMY KEYS

    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }
    console.log(event.key)
})