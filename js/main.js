'use strict';

{
    //
    //  ======= 宣言・初期化 =====================================
    //
    // 文字数を管理する変数
    let loc;
    // 複数の単語を持つ配列
    const words = ['king', 'double', 'one', 'food', 'type'];
    // 打つべきワード(複数の単語からランダムに選ぶ)
    let word;
    // スコアやミスの数を管理する変数
    let score;
    let miss;
    // タイマーを初期化
    const timeLimit = 3 * 1000; // ミリ秒単位
    // ゲーム開始時刻を保持する変数
    let startTime;
    // ゲームが開始されているかどうか管理する変数(falseで初期化)
    let isPlaying = false;

    // 
    //  ======= 値(要素)の取得 ==================================
    //
    // target を取得(htmlから)
    const target = document.getElementById('target');
    // score を取得(htmlから)
    const scoreLabel = document.getElementById('score');
    // miss を取得(htmlから)
    const missLabel = document.getElementById('miss');
    // timer を取得(htmlから)
    const timerLabel = document.getElementById('timer');

    // 
    //  ======= アンダーバーに変える関数 ========================
    //
    function updateTaget() {
        // アンダーバーを格納する変数
        let placeholder = ''; // 空の文字列で初期化

        // 文字数と同じ数を連結(locと同じ文字数)
        for (let i = 0; i < loc; i++) {

            // アンダーバーを連結していく
            placeholder += '_';
        }
        // target を更新
        target.textContent = placeholder += word.substring(loc);
    }

    //
    //  ======= 残り時間を計算する関数 ===========================
    //
    function updateTimer() {

        // 残り時間 = ゲーム開始時間 + 制限時間 - 現在の時刻
        const timeLeft = startTime + timeLimit - Date.now();

        // 残り時間を表示       // 秒単位にする // 小数点以下2桁まで
        timerLabel.textContent = (timeLeft / 1000).toFixed(2);

        // 一定時間ごとに繰り返す
        const timeoutId = setTimeout(() => {

            // 残り時間の関数を呼ぶ
            updateTimer();
        }, 10); // 10ミリ秒後に

        // 0 秒より小さくなった場合(ゲーム終了)
        if (timeLeft < 0) {

            // ゲーム終了
            isPlaying = false;

            // 次の動作を終了させる
            clearTimeout(timeoutId); // 返り値

            // タイマーを 0.00 に戻す
            timerLabel.textContent = '0.00';
            
            setTimeout(() => {

                // 結果の関数を呼ぶ(ゲームオーバー)
                showResult();

            }, 100); // 100ミリ秒後に

            // ゲーム終了後にもう1回はじめる
            target.textContent = 'クリックしてもう一回プレイ！';
        }
    }

    //
    //  ======= 結果表示の関数 ===========================================================================
    //
    function showResult() {

        // 正誤率を出す    // score + miss = 0% それ以外 ....
        const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100; //%で表示するため*100
    
        // 結果の表示 (正誤率は小数点第二位まで)
        alert(`${score} 回正解, ${miss} 回ミス, ${accuracy.toFixed(2)} % 正誤率！`);
    }

    //
    //  ======= ウィンドウでクリックした時(スタート) ===================================================
    //
    window.addEventListener('click', e => {

        // ゲームが開始されている場合
        if (isPlaying === true) {

            // それ以降の処理をしない
            return;
        }

        // ゲーム開始されている
        isPlaying = true;

        // ------------------------------------------------------
        // クリックする度に最初からゲームを始められる(初期化する)
        // ------------------------------------------------------

        loc = 0;
        score = 0;
        miss = 0;
        scoreLabel.textContent = score;
        missLabel.textContent = miss;
        word = words[Math.floor(Math.random() * words.length)];

        // ------------------------------------------------------

        // クリックしたら単語が出てくる(スタートする)
        target.textContent = word;

        // 現在時刻を代入する
        startTime = Date.now();

        // (関数実行)
        updateTimer();
    });

    //
    //  ======== ウィンドウでクリックした時(キーを打ったら)==============
    //
    // window.addEventListener('keydown', (e) => {
    window.addEventListener('keydown', e => {

        // ゲームが始まっていない場合
        if (isPlaying !== true) {

            // それ以降の処理をしない
            return;
        }
        
        // word のインデックスを判定(文字が合っている場合)
         if (e.key === word[loc]) {
             
             // 合っている場合は次の文字に進む
             loc++;

             // 文字数を打つべき数と同じになった場合
            if (loc === word.length) {

                // 次の単語に移る(新しい単語)
                word = words[Math.floor(Math.random() * words.length)];

                // 文字数を 0 に戻す
                loc = 0;
            }

             // 合っている場合はアンダーバーに変える(関数実行)
             updateTaget();
             // 合っている場合はスコアの点数を足す
             score++;
             // 更新したスコアを代入する
             scoreLabel.textContent = score;

        // word のインデックスを判定(文字が間違っている場合)
         } else {
             // 間違っている場合はスコアの点数を足す
             miss++;
             // 更新したスコアを代入する
             missLabel.textContent = miss;
         }
    });

}
 