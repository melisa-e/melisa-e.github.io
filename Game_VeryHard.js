
var catcher;
var space;
var stone;
var coin;
var timer;
var t;
var sec = 0;
var intervalTime;
var intervalStone;
var counter;
var count = 0;
var stones = [];
var coins = [];

class Game_VeryHard extends Phaser.Scene {

    constructor() {
        super({ key: "Game_VeryHard"});
    }

    preload() {
        
        this.load.image('Catcher', 'assets/Charaktere_Sam.png');
        this.load.image('Weltall', 'assets/Weltall.png');
        this.load.image('Stone', 'assets/stone.jpg');
        this.load.image('coin', 'assets/red.png');
    }

    create() {

        //      set background image and set it to window size (at reload)
        space = this.add.image(0, 0, 'Weltall');
        space.displayHeight = this.sys.game.config.height;
        space.scaleX = space.scaleY;
        space.y = game.config.height / 2;
        space.x = game.config.width / 2;

        
        //                              COUNTER
        //      adding counter for the points
        counter = this.add.text(0, 0, 'COUNTER: ' + count, {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000" });

        //                              TIMER
        //      timer you are playing against
        sec = 20;
        t = sec;
        timer = this.add.text(game.config.width-200, 0, "TIME: " + sec, {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000" });
        intervalTime = setInterval(function() { timer.setText("TIME: " + (sec -= 1)) }, 1000);        

        //                              STONE
        //      adding the falling stones
        for(var i = 0; i < 5; i++) {
            if(i > 0){
                stones[i] = this.physics.add.sprite(Phaser.Math.Between(1, game.config.width), stones[i-1].y - 1000, 'Stone');
            }
            else{
                stones[i] = this.physics.add.sprite(Phaser.Math.Between(1, game.config.width), -275, 'Stone');
            }
            stones[i].setScale(0.05);
            this.keepMovingStones(stones[i]);
        }

        //                              COIN
        //      adding the falling coins
        for(var i = 0; i < 20; i++) {
            if(i > 0){
                coins[i] = this.physics.add.sprite(Phaser.Math.Between(1, game.config.width), coins[i-1].y - 200, 'coin');
            }
            else{
                coins[i] = this.physics.add.sprite(Phaser.Math.Between(1, game.config.width), 0, 'coin');
           }
            coins[i].setScale(0.015);
            this.keepMovingCoins(coins[i]);
        }

        //                              CATCHER
        //      adding the catcher
        catcher = this.physics.add.sprite(this.cameras.main.centerX, this.cameras.main.height * 0.9, 'Catcher');
        catcher.setScale(0.10);

        
        //cameraGame = this.cameras.main;
        //cameraGame.setBounds(0,0,400,400);
  
    }

    //      speed of falling stones
    keepMovingStones(stone) {
        setInterval(function() { stone.y += 4; }, 20);
    }

    //      speed of falling coins
    keepMovingCoins(coin) {
        setInterval(function() { coin.y += 4; }, 20);
    }

    //      "collect" the stone
    collectStones(catcher, stone) {
        stone.destroy();
        counter.setText("Counter: " + (count -= 1));
    }

    //      "collect" the coin
    collectCoins(catcher, coin) {
        coin.destroy();
        counter.setText("Counter: " + (count += 1));
    }

    //      getting the results in a new scene; current scene gets paused
    createResult() {
        this.scene.launch("End", [count, t]);
        this.scene.pause();
        console.log("pausiert");
    }

    update() {

        //      time is up; all elements disappear
        if (sec == 0) {
            clearInterval(intervalTime);
            for(var i = 0; i < coins.length; i++) {
                coins[i].destroy();
            }
            for(var i = 0; i < stones.length; i++) {
                stones[i].destroy();
            }
            counter.setText("Gesammelt: " + count);

            console.log("finished");
            this.createResult();
        }

        //      check if catcher is overlapping a stone -> for counting
        for(var i = 0; i < stones.length; i++){
            this.physics.add.overlap(catcher, stones[i], this.collectStones, null, this);
        }

        //      check if catcher is overlapping a coin -> for counting
        for(var i = 0; i < coins.length; i++){
            this.physics.add.overlap(catcher, coins[i], this.collectCoins, null, this);
        }
        
        //get the current coordinates of pointer and set the catcher there 
        if (this.input.activePointer.isDown) {
            catcher.x = this.input.activePointer.x;
        }

    }

}
