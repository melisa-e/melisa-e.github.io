
/**********************************************************     GLOBALE VARIABLEN   **********************************************/

var background;
var catcher;                                                            // Komponenten des Spiels
var timer, t, sec, intervalTime;                                        // Komponenten für den Timer
var counter, count;                                                     // Komponenten für die Punkte
var btn_back;                                                           // Zurückbutton
var stones = [], coins = [], bills = [], c, s, b;                       // Arrays für die Elemente
var coinPointsInterval, stonePointsInterval, billPointsInterval;        // Intervalle für die Punkteanzeige
var lives, life = [];                                                   // Komponenten für die "Leben"

class Game_Hard extends Phaser.Scene {

    constructor() {
        super({ key: "Game_Hard"});
    }

    /**
     ***************************************    BENÖTIGTE BILDER   ***************************************
    */

    preload() {
        this.load.image('Catcher', 'assets/catcher.png');
        this.load.image('Weltall', 'assets/weltall.png');
        this.load.image('Stone', 'assets/stone.png');
        this.load.image('Coin', 'assets/coin.png');
        this.load.image('Bill', 'assets/bill.png');
    }

    create() {

        /**
         ***********************************    HINTERGRUND     ***********************************************
         Ist die Höhe des Bildes kleiner als die Höhe des Geräts, so wird die Höhe an die des Geräts angepasst
         Ist die Breite kleiner als die des Geräts, so wird die Breite des Bildes dem des Geräts angepasst
         Das Verhältnis des Bildes bleibt gleich, sodass sich das Bild nicht streckt
        **/
        background = this.add.image(0, 0, 'Weltall');   
        if (background.height < game.config.height){
            background.displayHeight = this.sys.game.config.height;
            if(background.width < game.config.width){
                background.displayHeight = this.sys.game.config.height;
            }
        }
        else if(background.width < game.config.width){
            background.displayWidth = this.sys.game.config.width;
        }
        background.scaleX = background.scaleY;
        background.y = game.config.height/2;
        background.x = game.config.width/2;

        //                              ZURÜCKBUTTON 
        //      Klickt man auf den Text, wird das Spiel abgebrochen und gelangt zurück zum Menü
        btn_back = this.add.text(0, 0, '< ZURÜCK', {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000" });
        btn_back.setInteractive();
        btn_back.setDepth(1);
        btn_back.on('pointerdown', () => {
            clearInterval(intervalTime);
            this.scene.stop('Game_Easy');
            this.scene.stop('Game_Medium');
            this.scene.stop('Game_Hard');
            this.scene.stop('Game_VeryHard');
            this.scene.start('Start');
        });
        
        //                              ZÄHLER
        //      Stellt die Punkteanzahl dar
        count = 0;
        counter = this.add.text(0, 0, 'MÜNZEN: ' + count, {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000" });
        counter.x = (game.config.width/2)-(counter.width/2);
        counter.setDepth(1);

        //                              TIMER
        //      Stellt die Zeit dar gegen welche man spielt
        sec = 30;
        t = sec;
        timer = this.add.text(game.config.width-200, 0, "ZEIT: " + sec, {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000" });
        intervalTime = setInterval(function() { timer.setText("ZEIT: " + (sec -= 1)) }, 1000);   
        timer.setDepth(1);   
        
        //                              SAMMLER
        //      Sammler mit dem man die Elemente auffängt
        catcher = this.physics.add.sprite(this.cameras.main.centerX, this.cameras.main.height * 0.9, 'Catcher');
        catcher.setScale(0.2);

        //                              STEIN
        //      Array von Steinen;  um die Anzahl zu erhöhen, amountStones anpassen
        //      ruft die Methode auf, welche die Bewegung und Geschwindigkeit bestimmt
        var amountStone = 2;
        for(var i = 0; i < amountStone; i++) {
            if(i > 0){
                stones[i] = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), stones[i-1].y - 500, 'Stone');
            }
            else{
                stones[i] = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), -275, 'Stone');
            }
            stones[i].setScale(0.1);
            this.keepMovingStones(stones[i], catcher);
        }

        //                              MÜNZE
        //      Array von Münzen;  um die Anzahl zu erhöhen, amountCoins anpassen
        //      ruft die Methode auf, welche die Bewegung und Geschwindigkeit bestimmt
        var amountCoins = 6;
        for(var i = 0; i < amountCoins; i++) {
            if(i > 0){
                coins[i] = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), coins[i-1].y - 200, 'Coin');
            }
            else{
                coins[i] = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), 0, 'Coin');
           }
            coins[i].setScale(0.2);
            this.keepMovingCoins(coins[i], catcher);
        }

        //                              SCHEINE
        //      Array von Scheinen;  um die Anzahl zu erhöhen, amountBill anpassen
        //      ruft die Methode auf, welche die Bewegung und Geschwindigkeit bestimmt
        var amountBill = 2;
        for(var i = 0; i < amountBill; i++) {
            if(i > 0){
                bills[i] = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), bills[i-1].y - 670, 'Bill');
            }
            else{
                bills[i] = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), -500, 'Bill');
            }
            bills[i].setScale(0.2);
            this.keepMovingBills(bills[i], catcher);
        }

        //                              LEBEN
        //      Array von Leben; werden als Steine dargestellt
        lives = 3;
        life[0] = this.physics.add.sprite((game.config.width/2) - 70, 80, 'Stone');
        life[1] = this.physics.add.sprite((game.config.width/2), 80, 'Stone');
        life[2] = this.physics.add.sprite((game.config.width/2) + 70, 80, 'Stone');

        life.forEach(element => {
            element.setScale(0.07);
            element.setDepth(1);
        });
  
    }

    //********************************************************      BEWEGUNG     *******************************************************/

    //                  GESCHWINDIGKEIT VON STEINEN
    //      erhöht den Y-Wert des Stein-Elements im Interval; 
    //      Um die Geschwindigkeit zu ändern, y um einen höheren Wert erhöhen oder das Intervals anpassen
    //      Ist das Spiel wegen der Zeit oder der Leben beendet, wird das Element zerstört
    //      Ist der Y-Wert außerhalb des Bildschirms, so wird der Y-Wert auf 0 gesetzt
    keepMovingStones(stone, catcher) {
        setInterval(function() { 
            stone.y += 4;
            if (sec == 0 || lives == 0) {
                stone.destroy();
            }else{
                if(stone.y > (catcher.y + 50)){
                    stone.x = Phaser.Math.Between(20, (game.config.width-50));
                    stone.y = 0;
                }
            }
        }, 20);
    }

    //                  GESCHWINDIGKEIT VON MÜNZEN
    //      erhöht den Y-Wert des Münz-Elements im Interval; 
    //      Um die Geschwindigkeit zu ändern, y um einen höheren Wert erhöhen oder das Intervals anpassen
    //      Ist das Spiel wegen der Zeit oder der Leben beendet, wird das Element zerstört
    //      Ist der Y-Wert außerhalb des Bildschirms, so wird der Y-Wert auf 0 gesetzt
    keepMovingCoins(coin, catcher) {
        setInterval(function() { 
            coin.y += 4; 
            if (sec == 0 || lives == 0) {
                coin.destroy();
            }else{
                if(coin.y > (catcher.y + 50)){
                    coin.x = Phaser.Math.Between(50, (game.config.width-50));
                    coin.y = 0;
                }
            }
        }, 20);
    }

    //                  GESCHWINDIGKEIT VON SCHEINEN
    //      erhöht den Y-Wert des Schein-Elements im Interval; 
    //      Um die Geschwindigkeit zu ändern, y um einen höheren Wert erhöhen oder das Intervals anpassen
    //      Ist das Spiel wegen der Zeit oder der Leben beendet, wird das Element zerstört
    //      Ist der Y-Wert außerhalb des Bildschirms, so wird der Y-Wert auf 0 gesetzt
    keepMovingBills(bill, catcher) {
        setInterval(function() { 
            bill.y += 4; 
            if (sec == 0 || lives == 0) {
                bill.destroy();
            }else{
                if(bill.y > (catcher.y + 50)){
                    bill.x = Phaser.Math.Between(50, (game.config.width-50));
                    bill.y = 0;
                }
            }
        }, 20);
    }

    //********************************************************      COLLECTING     *******************************************************/

    //                  MÜNZE EINSAMMELN
    //      es erscheint ein Text mit dem "Wert" der Münze für eine kurze Zeit 
    //      die Münze wird zerstört
    //      der Zähler wird hochgezählt
    //      neues Münz-Element wird zum Array hinzugefügt
    collectCoins(catcher, coin) {
        var coin_points = this.add.text(0, 0, "+1", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#1A7625" });
        coin_points.y = coin.y;
        coin_points.x = coin.x;
        coin.destroy();
        var x = 0;
        coinPointsInterval = setInterval(function() {
            if(x < 15 && sec != 0 && lives != 0){
                coin_points.y -= 4;
                x += 1;
            }else{
                clearInterval(this);
                coin_points.destroy();
            }
        }, 20);
        counter.setText("MÜNZEN: " + (count += 1));
        coins.shift();
        c = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), 0, 'Coin');
        coins.push(c);
        c.setScale(0.2);
        this.keepMovingCoins(c, catcher);
    }

    //                  STEIN EINSAMMELN
    //      es erscheint ein Text für eine kurze Zeit, sodass klar wird, dass man ein Leben verloren hat
    //      die Stein wird zerstört
    //      ein Leben wird abgezogen
    //      neues Stein-Element wird zum Array hinzugefügt
    collectStones(catcher, stone) {
        var stone_points = this.add.text(0, 0, "X", {fontFamily: 'AhkioW05-Light', fontSize: '60px', fill: "#C91717" });
        stone_points.y = stone.y;
        stone_points.x = stone.x;
        var x = 0;
        stonePointsInterval = setInterval(function() {
            if(x < 15 && sec != 0 && lives != 0){
                stone_points.y -= 4;
                x += 1;
            }else{
                clearInterval(this);
                stone_points.destroy();
            }
        }, 20);
        stone.destroy();
        lives -= 1;
        life[lives].destroy();
        stones.shift();
        s = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), 0, 'Stone');
        stones.push(s);
        s.setScale(0.1);
        this.keepMovingCoins(s, catcher);
    }


    //                  SCHEIN EINSAMMELN
    //      es erscheint ein Text mit dem "Wert" des Scheins für eine kurze Zeit 
    //      der Schein wird zerstört
    //      der Zähler wird hochgezählt
    //      neues Schein-Element wird zum Array hinzugefügt
    collectBills(catcher, bill) {
        var bill_points = this.add.text(0, 0, "+5", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#1A7625" });
        bill_points.y = bill.y;
        bill_points.x = bill.x;
        var x = 0;
        billPointsInterval = setInterval(function() {
            if(x < 15 && sec != 0 && lives != 0){
                bill_points.y -= 4;
                x += 1;
            }else{
                clearInterval(this);
                bill_points.destroy();
            }
        }, 20);
        bill.destroy();
        counter.setText("MÜNZEN: " + (count += 5));
        bills.shift();
        b = this.physics.add.sprite(Phaser.Math.Between(50, (game.config.width-50)), 0, 'Bill')
        bills.push(b);
        b.setScale(0.2);
        this.keepMovingBills(b, catcher);
    }

    //********************************************************      RESULT     *******************************************************/
    //      Stoppt den Timer
    //      Alle Elemente von allen Arrays werden zerstört
    //      Hintergrund wird angepasst
    //      Texte vom Game werden nicht sichtbar gesetzt
    //      Die Scene wird pausiert  
    createResult() {

        clearInterval(intervalTime);
        coins.forEach(element => {
            element.destroy();
        });
        stones.forEach(element => {
            element.destroy();
        });
        bills.forEach(element => {
            element.destroy();
        });
        life.forEach(element => {
            element.destroy();
        });
        catcher.destroy();

        this.cameras.main.setBackgroundColor('#FFFFFF');
        background.alpha = 0.5;
        btn_back.visible = false;
        counter.visible = false;
        timer.visible = false;
        this.scene.pause();
    }

    //********************************************************      UPDATE     *******************************************************/
    update() {

        //      wenn die Zeit abläuft wird die Standard-Endscene aufgerufen
        //      wenn die Leben aufgebraucht sind, wird die "Game-Over"-Endscene aufgerufen
        if(sec == 0){
            this.createResult();
            this.scene.launch("End_Time", [count, t]);
            this.scene.pause();
        }
        else if(lives == 0){
            this.createResult();
            this.scene.launch("End_Life");
            this.scene.pause();
        }

        //      checkt ob eine Münze eingesammelt wurde
        coins.forEach(element => {
            this.physics.add.overlap(catcher, element, this.collectCoins, null, this);
        });

        //      checkt ob ein Stein eingesammelt wurde
        stones.forEach(element => {
            this.physics.add.overlap(catcher, element, this.collectStones, null, this);
        });

        //      checkt ob ein Schein eingesammelt wurde
        bills.forEach(element => {
            this.physics.add.overlap(catcher, element, this.collectBills, null, this);
        });
        
        //      setzt den Sammler auf die X-Position des Klicks 
        if (this.input.activePointer.isDown) {
            catcher.x = this.input.activePointer.x;
        }

    }

}
