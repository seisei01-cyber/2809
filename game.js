"use strict";
let canvas,ctx;

let img_kane;
let kane_x,kane_y;
let kane_speed=1;
let kane_hp;
let kane_wait=30;

let img_naihu;
let naihu_x,naihu_y;
let naihu_speed=1;
let naihu_hp;
let naihu_wait=30;
let naihu_angle = 0;

let img_nekkuresu;
let nekkuresu_x,nekkuresu_y;
let nekkuresu_speed=1;
let nekkuresu_hp;
let nekkuresu_wait=30;

let img_oukan;
let oukan_x,oukan_y;
let oukan_speed=1;
let oukan_hp;
let oukan_wait=30;

let img_takara;
let takara_x,takara_y;
let takara_speed=1;
let takara_hp;
let takara_wait=30;
// ★宝箱のランダム効果用の変数を追加
let takara_effect_timer = 0; // 効果の残り時間（フレーム数）
let takara_effect_text = ""; // 画面に表示する効果名


let img_player;
let player_x,player_y;
let player_speed=0;
let player_kasoku=0.3;
let player_gensoku=0.15;
let player_max_speed=10;


let keys=[]; //全キーを管理する配列
// キーが押された
window.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});
// キーが離された
window.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

let score=0;

let time=60;
let count=0;

let game_mode=0;

let donsoku=new Audio('maou_se_magical28.mp3')
let kasoku=new Audio('maou_se_battle02.mp3')
let daitokuten=new Audio('maou_se_magical30.mp3')
let mimikku=new Audio('maou_se_magical28.mp3')
let jikan=new Audio('maou_se_magical25.mp3')
let get=new Audio('maou_se_system24.mp3')
let higeki=new Audio('maou_se_battle17.mp3')

function redraw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img_player,player_x,player_y);
    if(kane_hp==1){
        ctx.drawImage(img_kane,kane_x,kane_y);
    }
    if(nekkuresu_hp==1){
        ctx.drawImage(img_nekkuresu,nekkuresu_x,nekkuresu_y);
    }
    if(oukan_hp==1){
        ctx.drawImage(img_oukan,oukan_x,oukan_y);
    }
    if(takara_hp==1){
        ctx.drawImage(img_takara,takara_x,takara_y);
    }
    if(naihu_hp==1){
        // ★回転描画の処理に変更
        ctx.save(); // 現在のキャンバス状態を保存
        // ナイフの中心座標を計算
        let cx = naihu_x + img_naihu.width / 2;
        let cy = naihu_y + img_naihu.height / 2;
        ctx.translate(cx, cy); // 原点をナイフの中心に移動
        ctx.rotate(naihu_angle); // 回転させる
        // 原点を中心に画像を描画（画像の幅・高さの半分だけマイナスにずらす）
        ctx.drawImage(img_naihu, -img_naihu.width / 2, -img_naihu.height / 2);
        ctx.restore(); // キャンバス状態を元に戻す

        // ★発動中の効果を画面に描画（redraw内、一番最後などに追加）
        if (takara_effect_timer > 0) {
            ctx.font = "24px 'Hiragino Kaku Gothic ProN'";
            ctx.fillStyle = "#ff0"; // 目立つ黄色
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText(takara_effect_text, canvas.width / 2, 50);
        }
    
    }


    ctx.font="30px 'MSゴシック'";
    ctx.fillStyle="#fff";
    ctx.textAlign="right";
    ctx.textBaseline="top";
    ctx.fillText(score,canvas.width-10,10);

    ctx.font="30px 'Hiragino Kaku Gothic ProN'";
    ctx.fillStyle="#fff";
    ctx.textAlign="left";
    ctx.textBaseline="top";
    ctx.fillText(time,110,10);

    let nokori_text="残り時間：";
    ctx.font="20px 'Hiragino Kaku Gothic ProN'";
    ctx.fillStyle="#fff";
    ctx.textAlign="left";
    ctx.textBaseline="top";
    ctx.fillText(nokori_text,10,15);
}

function kane_drop(){
    kane_speed*=1.025;
    if(kane_wait==30 && kane_hp==1){
        kane_y+=kane_speed;
        if(kane_y>540){
            kane_x=Math.floor(Math.random()*610);
            kane_y=-60;
            kane_hp=0;
            kane_speed=1;
        }
    }
    if(kane_hp==0){
        kane_wait--;
    }
    if(kane_wait<0){
        kane_hp=1;
        kane_wait=30;
    }
}

function nekkuresu_drop(){
    nekkuresu_speed*=1.015;
    if(nekkuresu_wait==30 && nekkuresu_hp==1){
        nekkuresu_y+=nekkuresu_speed;
        if(nekkuresu_y>540){
            nekkuresu_x=Math.floor(Math.random()*610);
            nekkuresu_y=-60;
            nekkuresu_hp=0;
            nekkuresu_speed=1;
        }
    }
    if(nekkuresu_hp==0){
        nekkuresu_wait--;
    }
    if(nekkuresu_wait<0){
        nekkuresu_hp=1;
        nekkuresu_wait=30;
    }
}

function takara_drop(){
    takara_speed*=1.015;
    if(takara_wait==30 && takara_hp==1){
        takara_y+=takara_speed;
        if(takara_y>540){
            takara_x=Math.floor(Math.random()*610);
            takara_y=-60;
            takara_hp=0;
            takara_speed=1;
        }
    }
    if(takara_hp==0){
        takara_wait--;
    }
    if(takara_wait<0){
        takara_hp=1;
        takara_wait=30;
    }
}

function oukan_drop(){
    oukan_speed*=1.015;
    if(oukan_wait==30 && oukan_hp==1){
        oukan_y+=oukan_speed;
        if(oukan_y>540){
            oukan_x=Math.floor(Math.random()*610);
            oukan_y=-60;
            oukan_hp=0;
            oukan_speed=1;
        }
    }
    if(oukan_hp==0){
        oukan_wait--;
    }
    if(oukan_wait<0){
        oukan_hp=1;
        oukan_wait=30;
    }
}

function naihu_drop(){
    naihu_speed *= 1.035;
    if(naihu_wait==30 && naihu_hp==1){
        naihu_y += naihu_speed;
        naihu_angle += 0.25; // ★ここを追加（数値を大きくすると高速回転します）
        
        if(naihu_y > 540){
            naihu_x = Math.floor(Math.random()*610);
            naihu_y = -60;
            naihu_hp = 0;
            naihu_speed = 1;
            naihu_angle = 0; // ★画面外に消えたら角度をリセット
        }
    }
    if(naihu_hp==0){
        naihu_wait--;
    }
    if(naihu_wait<0){
        naihu_hp=1;
        naihu_wait=30;
    }
}

function move_player(){
    if(keys["ArrowRight"]){
        player_speed+=player_kasoku;
        if(player_speed>player_max_speed){
            player_speed=player_max_speed;
        }
        player_x+=player_speed;

    if(player_x>canvas.width){
            player_x=0-img_player.width;
        }
    }
    if(!keys["ArrowRight"]&&player_speed>0){
        player_speed-=player_gensoku;
    if(player_speed<0){
        player_speed=0;
    }
    player_x+=player_speed;
}
    

    if(keys["ArrowLeft"]){
        player_speed-=player_kasoku;
        if(player_speed<-player_max_speed){
            player_speed=-player_max_speed;
        }
        player_x+=player_speed;

    if(player_x<0-img_player.width){
            player_x=canvas.width;
        }
    }
    if(!keys["ArrowLeft"]&&player_speed<0){
        player_speed+=player_gensoku;
        if(player_speed>0){
            player_speed=0;
        }
        player_x+=player_speed; 
}
}

function countdown(){
    count++;
    if(count>=60){
        time--;
        count=0;
    }
    if(time<=0){
        time=0;
        game_mode=2;
    }
}



function hit_check(x1,y1,object1,x2,y2,object2){
    if(x1<=(x2+object2.width)&&x2<=(x1+object1.width)&&y1<=(y2+object2.height)&&y2<=(y1+object1.height)){
        return true;
    }else{
        return false;
    }
    
}

function title(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font="50px 'Hiragino Kaku Gothic ProN'";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillStyle="#fff";
    let title_text="お宝キャッチ";
    ctx.fillText(title_text,canvas.width/2,canvas.height/2-100);
     ctx.font="30px 'Hiragino Kaku Gothic ProN'";
    let tokuten_text="スペースキーでゲーム開始"
    ctx.fillText(tokuten_text,canvas.width/2,canvas.height/2+80);
    let setumei_text="Enterキーで説明画面へ"
    ctx.fillText(setumei_text,canvas.width/2,canvas.height/2+140);

    if(keys["Space"]){
        game_mode=1;
    }
    if(keys["Enter"]){
        game_mode=3;
        keys["Enter"] = false;
    }
}

function result(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font="40px 'Hiragino Kaku Gothic ProN'";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillStyle="#fff";
    let result_text="タイムアップ！";
    ctx.fillText(result_text,canvas.width/2,canvas.height/2-60);
    let tokuten_text="スコア："+score;
    ctx.fillText(tokuten_text,canvas.width/2,canvas.height/2+40);
}

function setumei(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font="30px'Hiragino Kaku Gothuc ProN'";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillStyle="#fff";
    let midasi_text="操作説明";
    ctx.fillText(midasi_text,canvas.width/2,50);

    ctx.font="20px'Hiragino Kaku Gothuc ProN'";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillStyle="#fff";
    let honbun1_text="左右の矢印キーでプレイヤーを操作。";
    ctx.fillText(honbun1_text,canvas.width/2,100);
    ctx.drawImage(img_player,player_x,120);
    move_player();

    let honbun2_text="上から落ちてくる物を取って得点ゲット！";
    ctx.fillText(honbun2_text,canvas.width/2,240);
    let honbun3_text="宝箱（一番右のアイテム）を取ったらお楽しみ！！";
    ctx.fillText(honbun3_text,canvas.width/2,270);
    ctx.drawImage(img_kane,canvas.width/2-285,290);
    ctx.fillText("20点",canvas.width/2-250,375);
    ctx.drawImage(img_nekkuresu,canvas.width/2-190,290);
    ctx.fillText("20点",canvas.width/2-155,375);
    ctx.drawImage(img_oukan,canvas.width/2-80,290);
    ctx.fillText("20点",canvas.width/2-50,375);
    ctx.drawImage(img_naihu,canvas.width/2+20,290);
    ctx.fillText("-20点",canvas.width/2+50,375);
    ctx.drawImage(img_takara,canvas.width/2+160,290);
     ctx.font="15px'Hiragino Kaku Gothuc ProN'";
    ctx.textAlign="left";
    ctx.fillText("「100点ゲット」、",canvas.width/2+120,365);
    ctx.fillText("「移動速度が5秒間アップ」、",canvas.width/2+120,385);
    ctx.fillText("「残り時間が5秒プラス」、",canvas.width/2+120,405);
    ctx.fillText("「ミミックでマイナス50点」、",canvas.width/2+120,425);
    ctx.fillText("「移動速度が3秒間ダウン」、",canvas.width/2+120,445);
    ctx.fillText("がランダムで発生するよ！",canvas.width/2+120,465);

    ctx.font="23px'Hiragino Kaku Gothuc ProN'";
    ctx.fillStyle="#f00";
    let back_text="Enterキーでタイトルへ戻る";
    ctx.fillText(back_text,canvas.width/2-240,canvas.height-70);
    let start_text="スペースキーでゲーム開始！";
    ctx.fillText(start_text,canvas.width/2-240,canvas.height-40);
    if(keys["Enter"]){
        game_mode=0;
        keys["Enter"] = false;
    }
     if(keys["Space"]){
        game_mode=1;
    }
}

function main_Loop(){
    if(game_mode==0){
        title();
    }
    if(game_mode==3){
        setumei();
    }
    if(game_mode==1){
    redraw();
    kane_drop();
    nekkuresu_drop();
    oukan_drop();
    move_player();
    takara_drop();
    naihu_drop();
    countdown();

        // ★宝箱の効果タイマー処理（main_Loop内に追加）
    if (takara_effect_timer > 0) {
        takara_effect_timer--;
         // タイマーが終了したらプレイヤーの速度を通常に戻す
        if (takara_effect_timer === 0) {
            player_max_speed = 10;
            player_kasoku = 0.3;
            takara_effect_text = "";
        }
    }
    

    if(hit_check(kane_x,kane_y,img_kane,player_x,player_y,img_player)){
        kane_hp=0;
        kane_x=Math.floor(Math.random()*610);
        kane_y=-60;
        kane_speed=1;
        score+=20;
        get.play();
    }

    if(hit_check(nekkuresu_x,nekkuresu_y,img_nekkuresu,player_x,player_y,img_player)){
        nekkuresu_hp=0;
        nekkuresu_x=Math.floor(Math.random()*610);
        nekkuresu_y=-60;
        nekkuresu_speed=1;
        score+=20;
        get.play();
    }

    if(hit_check(oukan_x,oukan_y,img_oukan,player_x,player_y,img_player)){
        oukan_hp=0;
        oukan_x=Math.floor(Math.random()*610);
        oukan_y=-60;
        oukan_speed=1;
        score+=20;
        get.play();
    }

    if(hit_check(takara_x, takara_y, img_takara, player_x, player_y, img_player)){
        takara_hp = 0;
        takara_x = Math.floor(Math.random() * 610);
        takara_y = -60;
        takara_speed = 1;

        let dice = Math.floor(Math.random() * 5) + 1; 
        
        switch(dice) {
            case 1:
                score += 100; // 通常（+20）に加えてさらに+100
                takara_effect_text = "大宝箱！スコア+100";
                takara_effect_timer = 90; // 約1.5秒表示
                daitokuten.play();
                break;
            case 2:
                score -= 50;
                if(score < 0) score = 0; // マイナス防止
                takara_effect_text = "ミミックだった！スコア-50";
                takara_effect_timer = 90;
                mimikku.play();
                break;
            case 3:
                player_max_speed = 18; // 最高速度アップ（通常10）
                player_kasoku = 0.8;   // 加速アップ（通常0.3）
                takara_effect_text = "スピードアップ！";
                takara_effect_timer = 300; // 約5秒間
                kasoku.play();
                break;
            case 4:
                player_max_speed = 4;   // 最高速度ダウン
                player_kasoku = 0.1;    // 加速ダウン
                takara_effect_text = "鈍足の呪い！";
                takara_effect_timer = 180; // 約3秒間
                donsoku.play();
                break;
            case 5:
                time += 5; // 制限時間プラス
                takara_effect_text = "タイムボーナス！+5秒";
                takara_effect_timer = 90;
                jikan.play();
                break;
        }
    }

    if(hit_check(naihu_x,naihu_y,img_naihu,player_x,player_y,img_player)){
        naihu_hp=0;
        naihu_x=Math.floor(Math.random()*610);
        naihu_y=-60;
        naihu_speed=1;
        score-=20;
        higeki.play();
    }
}
    if(game_mode==2){
        result();
    }

    window.requestAnimationFrame(main_Loop);
}

window.onload=function(){
    canvas=document.getElementById("screen");
    ctx=canvas.getContext("2d");

    img_kane=document.getElementById("kane");
    kane_x=Math.floor(Math.random()*610);
    kane_y=-60;
    kane_hp=1;

    img_nekkuresu=document.getElementById("nekkuresu");
    nekkuresu_x=Math.floor(Math.random()*610);
    nekkuresu_y=-60;
    nekkuresu_hp=1;

    img_oukan=document.getElementById("oukan");
    oukan_x=Math.floor(Math.random()*610);
    oukan_y=-60;
    oukan_hp=1;

    img_takara=document.getElementById("takara");
    takara_x=Math.floor(Math.random()*610);
    takara_y=-60;
    takara_hp=1;

    img_naihu=document.getElementById("naihu");
    naihu_x=Math.floor(Math.random()*610);
    naihu_y=-60;
    naihu_hp=1;

    img_player=document.getElementById("player");
    player_x=canvas.width/2-img_player.width/2;
    player_y=canvas.height-img_player.height-30;

    main_Loop();
}