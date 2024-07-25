const app = new PIXI.Application();

await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x000000
});
document.body.appendChild(app.canvas);


//Assetleri yukle
const playerTexture = await PIXI.Assets.load('player.png');
const enemyTexture = await PIXI.Assets.load('https://pixijs.com/assets/bunny.png');
setup(playerTexture, enemyTexture);

//Carpisma kontrolu fonksiyonu
function hitTestRectangle(r1, r2) {
    const combinedHalfWidths = r1.width / 2 + r2.width / 2;
    const combinedHalfHeights = r1.height / 2 + r2.height / 2;

    const vx = r1.x - r2.x;
    const vy = r1.y - r2.y;

    return Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights;
}


function setup(playerTexture, enemyTexture) {
    //Karakteri olustur
    const player = new PIXI.Sprite(playerTexture);
    player.anchor.set(0.5);
    player.x = app.screen.width / 2;
    player.y = app.screen.height - 50;
    app.stage.addChild(player);

    //Enemies prefab
    const enemies = [];
    for (let i = 0; i < 5; i++) {
        const enemy = new PIXI.Sprite(enemyTexture);
        enemy.anchor.set(0.5);
        enemy.x = Math.random() * app.screen.width;
        enemy.y = Math.random() * app.screen.height / 2;
        enemies.push(enemy);
        app.stage.addChild(enemy);
    }

    //Klavye kontrolleri
    const keys = {};
    window.addEventListener("keydown", (e) => keys[e.code] = true);
    window.addEventListener("keyup", (e) => keys[e.code] = false);

    //Oyun dongusu
    app.ticker.add(() => {
        //Kontroller
        if (keys["ArrowLeft"]) player.x -= 5;
        if (keys["ArrowRight"]) player.x += 5;
        if (keys["ArrowUp"]) player.y -= 5;
        if (keys["ArrowDown"]) player.y += 5;

        //her bir enemy icin Collision detection yapar
        enemies.forEach(enemy => {
            if (hitTestRectangle(player, enemy)) {
                alert("Oyun Bitti!");
                app.ticker.stop();
            }
        });
    });
}
