class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1}) {
        this.position = position
        this.width = 55
        this.height = 130
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 8
    }

    draw(){
        c.drawImage(
            this.image, 
            this.frameCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x, 
            this.position.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale)
    }

    update(){
        this.draw()
        this.framesElapsed++
        if( this.framesElapsed % this.framesHold === 0){
            if( this.frameCurrent < this.framesMax -1) {
                this.frameCurrent++
            }else {
                this.frameCurrent = 0
            }
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
        if( this.position.y + this.height + this.velocity.y >= canvas.height - 87){
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
        if (timer <= 0) return
        this.isJumping = true
        if(this.isJumping){
            this.velocity.y = -14
        }
    }
}
