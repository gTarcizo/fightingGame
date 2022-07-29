const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
let nomeDoBoneco = 'Samurai Mack'
let nomeDoBoneco2 = 'Kenji'
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
const shop = new Sprite({
    position: {
        x: 650,
        y: 148,
    },
    imageSrc: './img/shop.png',
    scale: 2.6,
    framesMax: 6
})


const player = new Fighter({
    position: {
        x: 270,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    offset: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.6,
    offset: {
        x:215,
        y:188,
    },
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6,
        },
        takeHit: {
            imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4,
        },
        death: {
            imageSrc: './img/samuraiMack/Death.png',
            framesMax: 6,
        },
        },
        attackBox: {
            offset: {
                x: 40,
                y: 0,
            },
            width: 220,
            height: 80,
        }
    
    })


const enemy = new Fighter({
    position: {
        x: 700,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    offset: {
        x: -70,
        y: 0,
    },
    imageSrc: './img/kenji/Idle.png',
    framesMax: 8,
    scale: 2.6,
    offset: {
        x:230,
        y:202,
    },
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4,
        },
        takeHit: {
            imageSrc: './img/kenji/Take hit.png',
            framesMax: 3,
        },
        death: {
            imageSrc: './img/kenji/Death.png',
            framesMax: 7,
        },
    },
    attackBox: {
        offset: {
            x: 0,
            y: 0,
        },
        width: -220,
        height: 80,
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
    shop.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    
    //  Player Movement
    
    if (keys.a.pressed && player.lastKey === 'a') {
        if (timer <= 0) return
        player.velocity.x = -4
        player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        if (timer <= 0) return
        player.velocity.x = 4
        player.switchSprite('run')
    }else {
        player.switchSprite('idle')
    }

    if(player.velocity.y < 0){
        player.switchSprite('jump')
    } else if (player.velocity.y > 0){
        player.switchSprite('fall')
    }


//  Enemy Movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        if (timer <= 0) return
        enemy.velocity.x = -4
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        if (timer <= 0) return
        enemy.velocity.x = 4
        enemy.switchSprite('run')
    }else {
        enemy.switchSprite('idle')
    }

    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0){
        enemy.switchSprite('fall')
    }

//  detect for collision && enemy gets hit

if( rectangularCollision({ rectangle1: player, rectangle2: enemy, }) && player.isAttacking && player.frameCurrent === 4){
    enemy.takeHit(10)
    player.isAttacking = false
    document.getElementById('enemy').style.width = enemy.health + '%'
}
//  if player misses
if(player.isAttacking && player.frameCurrent ===4){
    player.isAttacking = false
}

    if( rectangularCollision({
        rectangle1: enemy, rectangle2: player,
    }) &&
    enemy.isAttacking && enemy.frameCurrent ===2
    ){
        player.takeHit(5)
        enemy.isAttacking = false
        document.getElementById('player').style.width = player.health + '%'
    }

// if enemy misses
    if(enemy.isAttacking && enemy.frameCurrent ===2){
        enemy.isAttacking = false
    }
    
    
}


animate()


window.addEventListener('keydown', (event) => {
    if(!player.dead || timer === 0){
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
            case ' ':
                player.attack()
                break          
        }
    }

    if(!enemy.dead || timer === 0){
        switch (event.key){
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
            case '0':
                enemy.attack()
                break
        }
    }
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
})