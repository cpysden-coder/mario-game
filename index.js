const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d')

canvas.width = window.innerWidth //you can omit window. if you like - canvas takes up all screen width
canvas.height = window.innerHeight; // take up height of window

const gravity = 1;

class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        
        //give player a property - gravity - so that it falls
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30,
        this.height = 30
    }
    //create a method within Player class to draw out player
    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    //update property to move player over time
    update(){
        this.draw()
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height) this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

const player = new Player();

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    // console.log('go')
    player.update()
}
animate()
