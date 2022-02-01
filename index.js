const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d')

canvas.width = window.innerWidth //you can omit window. if you like - canvas takes up all screen width
canvas.height = window.innerHeight; // take up height of window

const gravity = 1;

class Player {
    constructor() {
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
    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    //update property to move player over time
    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y <= canvas.height) this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform {
    constructor({ x, y }) {
        this.position = {
            x: x,
            y: y
        },
            this.width = 200,
            this.height = 20
    }
    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

}

const player = new Player();
// const platform = new Platform();
const platforms = [new Platform({x: 200, y: 100}), new Platform({x: 500, y: 200})];

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    // console.log('go')
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })


    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0;
        if (keys.right.pressed) {
            platforms.forEach(platform => {
                platform.position.x -= 5
            })

        } else if (keys.left.pressed) {
            platforms.forEach(platform => {
                platform.position.x += 5
            })
        }
    }

    //platform collision detection
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
        }
    })
}
animate()

//add eventListeners at bottom
addEventListener('keydown', ({ key, keyCode }) => {
    console.log(`key: ${key} and keycode: ${keyCode}`)
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            break;

        case 68:
            console.log('right')
            keys.right.pressed = true
            break;

        case 87:
            console.log('up')
            player.velocity.y -= 20;

            break;

        case 83:
            console.log('down')
            break;
    }

})

addEventListener('keyup', ({ key, keyCode }) => {
    console.log(`key: ${key} and keycode: ${keyCode}`)
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            break;

        case 68:
            console.log('right')
            keys.right.pressed = false
            break;

        case 87:
            console.log('up')
            // player.velocity.y -= 20;

            break;

        case 83:
            console.log('down')
            break;

    }

})
