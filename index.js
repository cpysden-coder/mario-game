const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d')

canvas.width = window.innerWidth //you can omit window. if you like - canvas takes up all screen width
canvas.height = window.innerHeight; // take up height of window

class Player {
    constructor(){
        this.position = {
            x: 100,
            y:100
        }
        this.width = 30,
        this.height = 30
    }
    //create a method within Player class to draw out player
    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.x, this.width, this.height);
    }
}

const player = new Player();
player.draw();
