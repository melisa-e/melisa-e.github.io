
/**********************************************************     GLOBALE VARIABLEN   **********************************************/

var title;                                                                          // Titel des Spiels
var btn_easy, btn_medium, btn_hard, btn_expert                                      // Button zur Auswahl
var coin_cursor;                        
var info_easy, info_medium, info_hard, info_expert;                                 // InfoButton
var tina, bubble;                                                                   // Dekoelemente
var d_easy, d_medium, d_hard, d_expert, d;                                          // Beschreibungen
var coin, stone, bill;                                                              // Supportelemente für Beschreibung
var green_hook, green_hook2, red_cross;                                             // Supportelemente für Beschreibung
var background;

class Start extends Phaser.Scene{

    constructor() {
        super({key:"Start"});
    }

    /**
     ***************************************    BENÖTIGTE BILDER   ***************************************
    */

    preload(){
        this.load.image('Weltall', 'assets/weltall.png');
        this.load.image('Coin', 'assets/coin.png');
        this.load.image('Tina', 'assets/tina.png');
        this.load.image('Blase', 'assets/description.png');
        this.load.image('Coin', 'assets/coin.png');
        this.load.image('Stone', 'assets/stone.png');
        this.load.image('Bill', 'assets/bill.png');
        this.load.image('Green_Hook', 'assets/green_hook.png');
        this.load.image('Red_Cross', 'assets/red_cross.png');
    }

    create() {    

        this.cameras.main.setBackgroundColor('#FFFFFF')

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
        background.alpha = 0.5;

        /**
         ***************************************         STARTSEITE      ***********************************************
         Der Titel, die Kurzbeschreibung und die Bilder zur Präsentation werden hinzugefügt und zum Teil nicht sichtbar gesetzt
        */

        title = this.add.text(0,0, "Willkommen beim Münzsammler", {fontFamily: 'AhkioW05-Light', fontSize: '70px', fill: "#000000"});
        title.y = game.config.height * 0.1;
        title.x = (game.config.width/2) - (title.width/2);

        var expl1 = this.add.text(0, 0, "Sammle mit deinem Sparschwein so viele Münzen wie möglich!", {fontFamily: 'AhkioW05-Light', fontSize: '40px', fill: "#000000"});
        expl1.y = game.config.height * 0.2;
        expl1.x = (game.config.width/2) - (expl1.width/2);

        var expl2 = this.add.text(0, 0, "Aber pass auf, den Steinen solltest du besser ausweichen.", {fontFamily: 'AhkioW05-Light', fontSize: '40px', fill: "#000000"});
        expl2.y = game.config.height * 0.25;
        expl2.x = (game.config.width/2) - (expl2.width/2);

        tina = this.add.image(0, 0, 'Tina');
        tina.y = game.config.height - 130;
        tina.x = game.config.width * 0.2;
        tina.setScale(0.2);

        bubble = this.add.image(0, 0, 'Blase');
        bubble.y = game.config.height * 0.87;
        bubble.x = game.config.width * 0.65;
        bubble.setScale(0.65);

        coin = this.add.image(0, 0, 'Coin');
        coin.setScale(0.25);
        coin.setVisible(false);

        stone = this.add.image(0, 0, 'Stone');
        stone.setScale(0.1);
        stone.setVisible(false);

        bill = this.add.image(0, 0, 'Bill');
        bill.setScale(0.2);
        bill.setVisible(false);

        green_hook = this.add.image(0, 0, 'Green_Hook');
        green_hook.setScale(0.1);
        green_hook.setVisible(false);

        green_hook2 = this.add.image(0, 0, 'Green_Hook');
        green_hook2.setScale(0.1);
        green_hook2.setVisible(false);

        red_cross = this.add.image(0, 0, 'Red_Cross');
        red_cross.setScale(0.025);
        red_cross.setVisible(false);

        /**
         *****************************************      BESCHREIBUNGEN      ***********************************************
         Die Beschreibungen zu den einzelnen Levels (sind zunächst nicht sichtbar)
         Die Position ist relativ zur Blase gesetzt, da die Blase die Größe bei verschiedenen Bildschirmgrößen nicht ändert
         So wird sichergestellt, dass die Beschreibungen immer in der Blase dargestellt werden
        */

        d = this.add.text(0, 0,  "Wähle dein Level aus!", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"}); 
        d.y = bubble.y - 25
        d.x = (game.config.width * 0.65) - (d.width / 2);

        d_easy = this.add.text(0, 0,  "Als Anfänger bist du hier genau richtig!", {fontFamily: 'AhkioW05-Light', fontSize: '35px', fill: "#000000"}); 
        d_easy.y = bubble.y - 60;
        d_easy.x = (game.config.width * 0.65) - (d_easy.width / 2);
        d_easy.setVisible(false);

        d_medium = this.add.text(0, 0,  "Jetzt wirds etwas schneller!", {fontFamily: 'AhkioW05-Light', fontSize: '35px', fill: "#000000"}); 
        d_medium.y = bubble.y - 60;
        d_medium.x = (game.config.width * 0.65) - (d_medium.width / 2);
        d_medium.setVisible(false);

        d_hard = this.add.text(0, 0,  "Kannst du das ganz große Geld sammeln?", {fontFamily: 'AhkioW05-Light', fontSize: '35px', fill: "#000000"}); 
        d_hard.y = bubble.y - 60;
        d_hard.x = (game.config.width * 0.65) - (d_hard.width / 2);
        d_hard.setVisible(false);

        d_expert = this.add.text(0, 0,  "Bist du Münzsammelexperte?", {fontFamily: 'AhkioW05-Light', fontSize: '35px', fill: "#000000"}); 
        d_expert.y = bubble.y - 60;
        d_expert.x = (game.config.width * 0.65) - (d_expert.width / 2);
        d_expert.setVisible(false);
    
        
        /**
         **********************************************     LEVELBUTTONS        *******************************************************
         Texte welche als Button fungieren
         OnHover erscheint eine Münze neben der Auwahl und der Text wird schattiert
         Klickt man auf den Text, so gelant man zum jeweiligen Level
        */

        coin_cursor = this.physics.add.sprite(0, 0, 'Coin');
        coin_cursor.setScale(0.2);
        coin_cursor.setVisible(false);    

        btn_easy = this.add.text(0, 0,  "LEICHT", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});   
        btn_easy.y = game.config.height * 0.35;
        btn_easy.x = game.config.width/2 - 75;
        btn_easy.setInteractive();
        btn_easy.on('pointerup', () => {btn_easy.setStyle({fill: "#7F7F7F"}); this.scene.start('Game_Easy')});
        btn_easy.on('pointerover', () => {
            coin_cursor.setVisible(true);
            coin_cursor.x = btn_easy.x - 50;
            coin_cursor.y = btn_easy.y + (btn_easy.height/2);
            btn_easy.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        btn_easy.on('pointerout', () => {
            coin_cursor.setVisible(false);
            btn_easy.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })

        btn_medium = this.add.text(0, 0,  "MITTEL", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});   
        btn_medium.y = game.config.height * 0.45;
        btn_medium.x = game.config.width/2 - 75;
        btn_medium.setInteractive();
        btn_medium.on('pointerup', () => {this.scene.start('Game_Medium')});
        btn_medium.on('pointerover', () => {
            coin_cursor.setVisible(true);
            coin_cursor.x = btn_medium.x - 50;
            coin_cursor.y = btn_medium.y + (btn_medium.height/2);
            btn_medium.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        btn_medium.on('pointerout', () => {
            coin_cursor.setVisible(false);
            btn_medium.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })

        btn_hard = this.add.text(0, 0,  "SCHWER", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});   
        btn_hard.y = game.config.height * 0.55;
        btn_hard.x = game.config.width/2 - 75;
        btn_hard.setInteractive();
        btn_hard.on('pointerup', () => {this.scene.start('Game_Hard')});
        btn_hard.on('pointerover', () => {
            coin_cursor.setVisible(true);
            coin_cursor.x = btn_hard.x - 50;
            coin_cursor.y = btn_hard.y + (btn_hard.height/2);
            btn_hard.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        btn_hard.on('pointerout', () => {
            coin_cursor.setVisible(false);
            btn_hard.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })

        btn_expert = this.add.text(0, 0,  "EXPERTE", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});   
        btn_expert.y = game.config.height * 0.65;
        btn_expert.x = game.config.width/2 - 75;
        btn_expert.setInteractive();
        btn_expert.on('pointerup', () => {this.scene.start('Game_Expert')});
        btn_expert.on('pointerover', () => {
            coin_cursor.setVisible(true);
            coin_cursor.x = btn_expert.x - 50;
            coin_cursor.y = btn_expert.y + (btn_expert.height/2);
            btn_expert.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        btn_expert.on('pointerout', () => {
            coin_cursor.setVisible(false);
            btn_expert.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })

        /**
         ***********************************************        INFOTEXTE       *************************************************
         Klickt man auf das ? neben dem Level, erhält man eine kleine Info, welche in der Blase dargestellt wird.
         Durch das Klicken wird die jeweilige Beschreibung sichtbar und die andere, welche evenutell vorher sichtbar gemacht wurden,
         werden nicht sichtbar gesetzt. Die Elemente welche Bestandteile des jeweiligen Levels sind werden so dargestellt, dass
         ersichtlich wird, welche Elemente gut sind und welche nicht.
         Die "?" werden by "over" mit einem Schatten hinterlegt
        */

        info_easy = this.add.text(0, 0, "?", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#7F7F7F"});
        info_easy.y = game.config.height * 0.35;
        info_easy.x = game.config.width - 150;
        info_easy.setInteractive();
        info_easy.on('pointerup', () => {
            d.setVisible(false);
            d_easy.setVisible(true);
            d_medium.setVisible(false);
            d_hard.setVisible(false);
            d_expert.setVisible(false);
            coin.y = bubble.y + 30;
            coin.x = bubble.x - 70;
            green_hook.y = bubble.y + 30;
            green_hook.x = bubble.x - 70;
            stone.y = bubble.y + 30;
            stone.x = bubble.x + 70;
            red_cross.y = bubble.y + 30;
            red_cross.x = bubble.x + 70;
            coin.setVisible(true);
            stone.setVisible(true);
            bill.setVisible(false);
            green_hook.setVisible(true);
            green_hook2.setVisible(false);
            red_cross.setVisible(true);
        });
        info_easy.on('pointerover', () => {
            info_easy.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        info_easy.on('pointerout', () => {
            info_easy.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })

        info_medium = this.add.text(0, 0, "?", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#7F7F7F"});
        info_medium.y = game.config.height * 0.45;
        info_medium.x = game.config.width - 150;
        info_medium.setInteractive();
        info_medium.on('pointerup', () => {
            d.setVisible(false);
            d_easy.setVisible(false);
            d_medium.setVisible(true);
            d_hard.setVisible(false);
            d_expert.setVisible(false);
            coin.y = bubble.y + 30;
            coin.x = bubble.x - 70;
            green_hook.y = bubble.y + 30;
            green_hook.x = bubble.x - 70;
            stone.y = bubble.y + 30;
            stone.x = bubble.x + 70;
            red_cross.y = bubble.y + 30;
            red_cross.x = bubble.x + 70;
            coin.setVisible(true);
            stone.setVisible(true);
            bill.setVisible(false);
            green_hook.setVisible(true);
            green_hook2.setVisible(false);
            red_cross.setVisible(true);
        });
        info_medium.on('pointerover', () => {
            info_medium.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        info_medium.on('pointerout', () => {
            info_medium.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })

        info_hard = this.add.text(0, 0, "?", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#7F7F7F"});
        info_hard.y = game.config.height * 0.55;
        info_hard.x = game.config.width - 150;
        info_hard.setInteractive();
        info_hard.on('pointerup', () => {
            d.setVisible(false);
            d_easy.setVisible(false);
            d_medium.setVisible(false);
            d_hard.setVisible(true);
            d_expert.setVisible(false);
            coin.y = bubble.y + 30;
            coin.x = bubble.x - 130;
            green_hook.y = bubble.y + 30;
            green_hook.x = bubble.x - 130;
            stone.y = bubble.y + 30;
            stone.x = bubble.x + 130;
            red_cross.y = bubble.y + 30;
            red_cross.x = bubble.x + 130;
            bill.y = bubble.y + 30;
            bill.x = bubble.x;
            green_hook2.y = bubble.y + 30;
            green_hook2.x = bubble.x;
            coin.setVisible(true);
            stone.setVisible(true);
            bill.setVisible(true);
            green_hook.setVisible(true);
            green_hook2.setVisible(true);
            red_cross.setVisible(true);
        });
        info_hard.on('pointerover', () => {
            info_hard.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        info_hard.on('pointerout', () => {
            info_hard.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })

        info_expert = this.add.text(0, 0, "?", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#7F7F7F"});
        info_expert.y = game.config.height * 0.65;
        info_expert.x = game.config.width - 150;
        info_expert.setInteractive();
        info_expert.on('pointerup', () => {
            d.setVisible(false);
            d_easy.setVisible(false);
            d_medium.setVisible(false);
            d_hard.setVisible(false);
            d_expert.setVisible(true);
            coin.y = bubble.y + 30;
            coin.x = bubble.x - 130;
            green_hook.y = bubble.y + 30;
            green_hook.x = bubble.x - 130;
            stone.y = bubble.y + 30;
            stone.x = bubble.x + 130;
            red_cross.y = bubble.y + 30;
            red_cross.x = bubble.x + 130;
            bill.y = bubble.y + 30;
            bill.x = bubble.x;
            green_hook2.y = bubble.y + 30;
            green_hook2.x = bubble.x;
            coin.setVisible(true);
            stone.setVisible(true);
            bill.setVisible(true);
            green_hook.setVisible(true);
            green_hook2.setVisible(true);
            red_cross.setVisible(true);
        });
        info_expert.on('pointerover', () => {
            info_expert.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        info_expert.on('pointerout', () => {
            info_expert.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })
    }
}