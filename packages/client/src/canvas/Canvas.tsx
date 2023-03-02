import React, { useRef, useEffect } from 'react';
import { PlacementTile } from './classes/classes';
import { Building } from './classes/classes';
import { Enemy } from './classes/classes';
import { waypoints } from './data/waypoints';
import { placementTilesData } from './data/placementTilesData';
import enemy_lvl_1 from './images/enemy/orc.png'
import enemy_lvl_2 from './images/enemy/orc_2.png'

import map from './images/map/map_1.png';

import './styles.css';

const Canvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameOver = useRef<HTMLDivElement>(null);
    const resources = useRef<HTMLDivElement>(null);
    const youWin = useRef<HTMLDivElement>(null);

    const [hearts, setHearts] = React.useState<number>(10);
    const [coins, setCoins] = React.useState<number>(100);
    const [waves, setWaves] = React.useState<number>(1);
    const [totalWavesThisMap] = React.useState<number>(10);

    useEffect(() => {
        let activeTile: PlacementTile | null = null;
        const buildings: Building[] = [];
        // цифра вражин
        let enemyCount = 2;
        let heartsLocal = 10;
        let coinsLocal = 100;
        let wavesLocal = 1;

        type Mouse = {
            x: undefined | number
            y: undefined | number
        }
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        if (!context) return;

        // цвет макета и координаты макета
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        const placementTilesData2D: number[][] = [];

        const placementTiles: PlacementTile[] = [];

        for (let i = 0; i < placementTilesData.length; i += 20) {
            placementTilesData2D.push(placementTilesData.slice(i, i + 20));
        }

        placementTilesData2D.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol === 210) {
                    placementTiles.push(new PlacementTile({
                        position: {
                            x: x * 64,
                            y: y * 64
                        }
                    }, context))
                }
            })
        })

        const image = new Image();

        image.onload = () => {
            animate();
        };

        image.src = map;

        const enemies: Enemy[] = [];

        function spawnEnemies(spawnCount: number): void {
            for (let i = 1; i < spawnCount + 1; i++) {
                // расстрояние между врагами
                const xOffset = i * 150;

                if (wavesLocal >= 2) {
                    enemies.push(
                        new Enemy({
                            position: {
                                x: waypoints[0].x - xOffset,
                                y: waypoints[0].y
                            },
                            health: 500,
                            speed: 0.5,
                            enemies: enemy_lvl_2,
                        }, context)
                    );
                } else {
                    enemies.push(
                        new Enemy({
                            position: {
                                x: waypoints[0].x - xOffset,
                                y: waypoints[0].y
                            },
                            health: 50,
                            speed: 1,
                            enemies: enemy_lvl_1,
                        }, context)
                    );
                }


            }
        }

        spawnEnemies(enemyCount);

        function animate() {
            const animationId = requestAnimationFrame(animate);
            context.drawImage(image, 0, 0);

            for (let i = enemies.length - 1; i >= 0; i--) {
                const enemy = enemies[i];

                enemy.update();

                // если враг проходит за карту
                if (canvas) {
                    if (enemy.position.x >= canvas.width) {
                        // удаляем врагов
                        enemies.splice(i, 1);

                        // отнимает жизни
                        setHearts(prev => prev - 0.5);

                        heartsLocal -= 1;

                        // cancelAnimationFrame(animationId)

                        if (heartsLocal <= 0) {
                            console.log('game over');
                            if (gameOver.current && resources.current) {
                                gameOver.current.style.display = 'flex';
                                resources.current.style.display = 'none';
                            }
                            cancelAnimationFrame(animationId)
                        }
                    }
                }
            }


            // отслеживание общего количества врагов
            if (enemies.length === 0) {
                // функция вызывает волну врагов
                if (totalWavesThisMap === wavesLocal) {
                    if (youWin.current && resources.current) {
                        cancelAnimationFrame(animationId)
                        youWin.current.style.display = 'flex';
                        resources.current.style.display = 'none';
                    }
                }
                enemyCount += 2;
                spawnEnemies(enemyCount);
                setWaves(prev => prev + 0.5);
                wavesLocal += 1;
            }

            placementTiles.forEach(tile => {
                tile.update(mouse)
            })

            buildings.forEach(building => {
                building.update(mouse);
                building.target = null;

                // возвращает массив с врагами попавшими в радиус башни
                const validEnemies = enemies.filter(enemy => {
                    const xDifference = enemy.center.x - building.center.x;
                    const yDifference = enemy.center.y - building.center.y;
                    const distance = Math.hypot(xDifference, yDifference);

                    return distance < enemy.radius + building.radius;
                })


                building.target = validEnemies[0];

                for (let i = building.projectiles.length - 1; i >= 0; i--) {
                    const projectile = building.projectiles[i];

                    projectile.update();

                    const xDifference = projectile.enemy.center.x - projectile.position.x;
                    const yDifference = projectile.enemy.center.y - projectile.position.y;
                    const distance = Math.hypot(xDifference, yDifference);

                    // это когда снаряд попадает во врага
                    if (distance < projectile.enemy.radius + projectile.radius) {
                        projectile.enemy.health -= projectile.damage;

                        // когда враг умирает
                        if (projectile.enemy.health <= 0) {
                            const enemyIndex = enemies.findIndex((enemy) => {
                                return projectile.enemy === enemy;
                            })

                            if (enemyIndex > -1) {
                                enemies.splice(enemyIndex, 1);
                                // строительство башни
                                setCoins(prev => prev + 12.5);
                                coinsLocal += 25;
                            }
                        }

                        building.projectiles.splice(i, 1)
                    }
                }
            })
        }

        const mouse: Mouse = {
            x: undefined,
            y: undefined
        }

        canvas.addEventListener('click', () => {
            if (activeTile && !activeTile.occupied && coinsLocal - 50 >= 0) {
                setCoins(prev => prev - 25);
                coinsLocal -= 50;
                buildings.push(new Building({
                    position: {
                        x: activeTile.position.x,
                        y: activeTile.position.y,
                    },
                    damage: 30
                }, context))
                activeTile.occupied = true;
            }
            // задатки на улучшение башни 

            // else {
            //     buildings.forEach(tower => {
            //         console.log(buildings)

            //         setCoins(prev => prev - 25);
            //         coinsLocal -= 50;

            //         if (activeTile && coinsLocal - 50 >= 0) {
            //             buildings.push(new Building({
            //                 position: {
            //                     x: activeTile.position.x,
            //                     y: activeTile.position.y,
            //                 },
            //                 damage: 60
            //             }, context))
            //         }
            //         activeTile.occupied = false;
            //     })
            // }
        })

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.clientX
            mouse.y = event.clientY

            activeTile = null;

            for (let i = 0; i < placementTiles.length; i++) {
                const tile = placementTiles[i];

                if (
                    mouse.x > tile.position.x &&
                    mouse.x < tile.position.x + tile.size &&
                    mouse.y > tile.position.y &&
                    mouse.y < tile.position.y + tile.size
                ) {
                    activeTile = tile
                    break;
                }
            }
        })
    }, []);

    return <div className="canvas_wrapper">
        <canvas ref={canvasRef} width={1280} height={768} />
        <div ref={gameOver} className="game-over">Game over</div>
        <div ref={youWin} className="you-win-over">You win</div>

        <div ref={resources}>
            <div className="waves">waves: {waves}/{totalWavesThisMap}</div>
            <div className="background"></div>
            <div className="number_of_lives">
                <svg fill="#df2a2a" width={50} height={50} viewBox="0 0 32 32">
                    <path d="M26.996 12.898c-.064-2.207-1.084-4.021-2.527-5.13-1.856-1.428-4.415-1.69-6.542-.132-.702.516-1.359 1.23-1.927 2.168-.568-.938-1.224-1.652-1.927-2.167-2.127-1.559-4.685-1.297-6.542.132-1.444 1.109-2.463 2.923-2.527 5.13-.035 1.172.145 2.48.788 3.803 1.01 2.077 5.755 6.695 10.171 10.683l.035.038.002-.002.002.002.036-.038c4.415-3.987 9.159-8.605 10.17-10.683.644-1.323.822-2.632.788-3.804z" />
                </svg>
                {hearts}
            </div>
            <div className="number_of_counts">
                <svg width={50} height={50} viewBox="0 0 24 24" fill="none">
                    <path d="M21.9199 16.7486C21.5899 19.4086 19.4099 21.5886 16.7499 21.9186C15.1399 22.1186 13.6399 21.6786 12.4699 20.8186C11.7999 20.3286 11.9599 19.2886 12.7599 19.0486C15.7699 18.1386 18.1399 15.7586 19.0599 12.7486C19.2999 11.9586 20.3399 11.7986 20.8299 12.4586C21.6799 13.6386 22.1199 15.1386 21.9199 16.7486Z" fill="rgb(255 244 0)" />
                    <path d="M9.99 2C5.58 2 2 5.58 2 9.99C2 14.4 5.58 17.98 9.99 17.98C14.4 17.98 17.98 14.4 17.98 9.99C17.97 5.58 14.4 2 9.99 2ZM9.05 8.87L11.46 9.71C12.33 10.02 12.75 10.63 12.75 11.57C12.75 12.65 11.89 13.54 10.84 13.54H10.75V13.59C10.75 14 10.41 14.34 10 14.34C9.59 14.34 9.25 14 9.25 13.59V13.53C8.14 13.48 7.25 12.55 7.25 11.39C7.25 10.98 7.59 10.64 8 10.64C8.41 10.64 8.75 10.98 8.75 11.39C8.75 11.75 9.01 12.04 9.33 12.04H10.83C11.06 12.04 11.24 11.83 11.24 11.57C11.24 11.22 11.18 11.2 10.95 11.12L8.54 10.28C7.68 9.98 7.25 9.37 7.25 8.42C7.25 7.34 8.11 6.45 9.16 6.45H9.25V6.41C9.25 6 9.59 5.66 10 5.66C10.41 5.66 10.75 6 10.75 6.41V6.47C11.86 6.52 12.75 7.45 12.75 8.61C12.75 9.02 12.41 9.36 12 9.36C11.59 9.36 11.25 9.02 11.25 8.61C11.25 8.25 10.99 7.96 10.67 7.96H9.17C8.94 7.96 8.76 8.17 8.76 8.43C8.75 8.77 8.81 8.79 9.05 8.87Z" fill="rgb(255 244 0)" />
                </svg>
                {coins}
            </div>
        </div>
    </div>;
};

export default Canvas;
