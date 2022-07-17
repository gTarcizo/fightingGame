const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
let nomeDoBoneco = 'Teste1'
let nomeDoBoneco2 = 'Teste2'
//        this.velocity.y = -14
canvas.width = 1024
canvas.height = 570
c.fillRect(0, 0, canvas.width, canvas.height)//4 arguments
const gravity = 0.6

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/background.png'
})

const player = new Fighter({
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


const enemy = new Fighter({
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

decreaseTimer()

function animate() {
    document.getElementById('enemy').style.transition = '200ms'
    document.getElementById('player').style.transition = '200ms'
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
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