import { waypoints } from "../data/waypoints";

interface IProjectile {
    position: { x: number, y: number };
    enemy: Enemy;
    damage: number
}

interface IPlacementTile {
    position: { x: number, y: number };
}

interface IBuilding {
    position: { x: number, y: number };
    damage: number;
}

interface IEnemy {
    position: { x: number, y: number };
    health: number;
    speed: number;
    enemies: string
}

interface ISprite {
    position?: { x: number, y: number };
    offset?: { x: number; y: number; };
    imageSrc?: string;
    frames?: { max: number };
    image?: HTMLImageElement;
}

class Sprite {
    position: { x: number; y: number; };
    image: HTMLImageElement;
    frames: {
        [x: string]: number; max: number
    };
    offset: { x: number; y: number; };
    imageSrc!: string;
    context: CanvasRenderingContext2D;

    constructor({
        position = { x: 0, y: 0 },
        imageSrc,
        frames = { max: 1 },
        offset = { x: 0, y: 0 }
    }: ISprite, context: CanvasRenderingContext2D) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc ? imageSrc : ""
        this.frames = {
            max: frames.max,
            current: 0,
            elapsed: 0,
            hold: 3
        }
        this.offset = offset;
        this.context = context;
    }

    draw() {
        const cropWidth = this.image.width / this.frames.max
        const crop = {
            position: {
                x: cropWidth * this.frames.current,
                y: 0
            },
            width: cropWidth,
            height: this.image.height
        }
        this.context.drawImage(
            this.image,
            crop.position.x,
            crop.position.y,
            crop.width,
            crop.height,
            this.position.x + this.offset.x,
            this.position.y + this.offset.y,
            crop.width,
            crop.height
        )
    }

    update() {
        this.frames.elapsed++
        if (this.frames.elapsed % this.frames.hold === 0) {
            this.frames.current++
            if (this.frames.current >= this.frames.max) {
                this.frames.current = 0
            }
        }
    }
}

// тайлы
export class PlacementTile {
    position: { x: number; y: number; };
    size: number;
    color: string;
    occupied: boolean;
    context: CanvasRenderingContext2D;

    constructor({ position = { x: 0, y: 0 } }: IPlacementTile, context: CanvasRenderingContext2D) {
        this.position = position;
        this.size = 64;
        this.color = 'rgba(255, 255, 255, 0.15)';
        this.occupied = false;
        this.context = context;
    }

    draw() {
        this.context.fillStyle = this.color
        this.context.fillRect(this.position.x, this.position.y, this.size, this.size)
    }

    update(mouse: { x: number | undefined; y: number | undefined; }) {
        this.draw()

        if (mouse.x && mouse.y) {
            if (
                mouse.x > this.position.x &&
                mouse.x < this.position.x + this.size &&
                mouse.y > this.position.y &&
                mouse.y < this.position.y + this.size
            ) {
                this.color = 'white';
            } else {
                this.color = 'rgba(255, 255, 255, 0.15)';
            }
        }
    }
}

// враг
export class Enemy extends Sprite {
    position: { x: number; y: number; };
    width: number;
    height: number;
    waypointIndex: number;
    center: { x: number; y: number; };
    radius: number;
    health: number;
    velocity: { x: number; y: number; };
    context: CanvasRenderingContext2D;
    xp: number;
    speed: number;

    constructor({ position = { x: 0, y: 0 }, health, speed, enemies }: IEnemy, context: CanvasRenderingContext2D) {
        super({
            position,
            imageSrc: enemies,
            frames: {
                max: 7
            }
        }, context)
        this.position = position;
        this.width = 100;
        this.height = 100;
        this.waypointIndex = 0;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        }
        this.radius = 50;
        this.health = health;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.context = context;
        this.xp = health;
        this.speed = speed;
    }

    draw() {
        super.draw()
        // хитбар
        this.context.fillStyle = 'red';
        this.context.fillRect(this.position.x, this.position.y - 15, this.width, 10);

        // хитбар
        this.context.fillStyle = 'green';
        this.context.fillRect(this.position.x, this.position.y - 15, this.width * this.health / this.xp, 10);
    }

    update() {
        this.draw()
        super.update()

        const waypoint = waypoints[this.waypointIndex];
        const yDistance = waypoint.y - this.center.y;
        const xDistance = waypoint.x - this.center.x;

        const angle = Math.atan2(yDistance, xDistance);

        // координаты врага прошедший к башне
        this.velocity.x = Math.cos(angle) * this.speed;
        this.velocity.y = Math.sin(angle) * this.speed;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        }

        if (
            Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) &&
            Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) &&
            this.waypointIndex < waypoints.length - 1
        ) {
            this.waypointIndex++
        }
    }
}



// снаряд
export class Projectile {
    position: { x: number; y: number; };
    velocity: { x: number; y: number; };
    enemy: Enemy;
    radius: number;
    context: CanvasRenderingContext2D;
    damage: number;

    constructor({ position = { x: 0, y: 0 }, enemy, damage }: IProjectile, context: CanvasRenderingContext2D) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.enemy = enemy;
        this.radius = 20;
        this.context = context;
        this.damage = damage
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        this.context.fillStyle = 'orange';
        this.context.fill();
    }

    update() {
        this.draw();

        const angle = Math.atan2(
            this.enemy.center.y - this.position.y,
            this.enemy.center.x - this.position.x
        )

        // скорость снаряда
        const power = 15;

        this.velocity.x = Math.cos(angle) * power;
        this.velocity.y = Math.sin(angle) * power;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

// башня тир 1
export class Building {
    position: { x: number; y: number; };
    width: number;
    height: number;
    center: { x: number; y: number; };
    projectiles: Projectile[];
    radius: number;
    target: Enemy | null | undefined;
    frames: number;
    context: CanvasRenderingContext2D;
    damage: number

    constructor({ position = { x: 0, y: 0 }, damage }: IBuilding, context: CanvasRenderingContext2D) {
        this.position = position;
        this.width = 64;
        this.height = 64;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        }
        this.projectiles = [];

        this.context = context;

        this.damage = damage;

        // радиус башни
        this.radius = 250;

        this.target;
        this.frames = 0;
    }

    draw() {
        this.context.fillStyle = 'blue';
        this.context.fillRect(this.position.x, this.position.y, this.width, 64);

        this.context.beginPath();
        this.context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    }

    update(mouse: { x: number | undefined; y: number | undefined; }) {
        this.draw();

        // наведение на башню
        if (mouse.x && mouse.y) {
            if (
                mouse.x > this.position.x &&
                mouse.x < this.position.x + this.width &&
                mouse.y > this.position.y &&
                mouse.y < this.position.y + this.height
            ) {
                this.context.fillStyle = 'rgba(0, 0, 255, 0.1)';
                this.context.fill();
            }
        }

        if (this.frames % 100 === 0 && this.target) {
            this.projectiles.push(new Projectile({
                position: {
                    x: this.center.x,
                    y: this.center.y,
                },
                enemy: this.target,
                damage: this.damage
            }, this.context))
        }

        this.frames++
    }
}
