// 抽獎輪盤
    var turnplate={
        restaraunts : [],             //轉盤獎品名稱
        // lotteryTimes : 30,             //抽獎次數
        bRotate : false,              //false:停止;ture:旋轉
        dtimer : null,               //存放間隔動畫的定時器，用來清除轉動   
        timeInterval : 2,            //定時器的間隔時間，旋轉角度的速度，越小表示速度越快
        deg : 0,                    //角度，和css設置對應,初始為0
        speed : 0,                  //角度變化增量
        turnNum : 5,                //旋轉總圈數
        sigalTurnNum : 1           //當前累計圈數
    };
    var lottery_btn = document.getElementById("lottery_btn");
    var lottery =  document.getElementById("wheel");
    var info =  document.getElementById("info");
    var message =  document.getElementById("message");
    var messageTxt =  document.getElementById("message-txt");
    var message2 =  document.getElementById("message2");
    var messageTxt2 =  document.getElementById("message-txt2");
    var copy_code =  document.getElementById("copy_code");
    var code_img =  document.getElementById("code_img");
    var code =  document.getElementById("code");
    var clockdiv = document.getElementById("clockdiv");
    //旋轉轉盤總角度 angles,獎品位置; txt：提示語;
    function rotateFn (angles, txt){
        /*清除上一個定時器*/
        clearInterval(turnplate.dtimer);
        turnplate.dtimer = null;
        //變化累計角度
        turnplate.deg = turnplate.deg + turnplate.speed;

        if (turnplate.deg < angles+1800) {
            lottery.style.transform="rotate(" + turnplate.deg + "deg)";
            if(turnplate.deg%360 === 0){//判斷第幾圈
                turnplate.sigalTurnNum += 1;
                if( turnplate.sigalTurnNum  ===  turnplate.turnNum - 2 ){//到最後二圈
                            turnplate.speed = 2;
                }else if( turnplate.sigalTurnNum  ===  turnplate.turnNum - 1 ){//到最後一圈
                            turnplate.speed =1;
                }; 
            }
            if( turnplate.sigalTurnNum  ===  turnplate.turnNum - 1 ){//到最後1圈圈
                    turnplate.speed =  (turnplate.speed <= 0.2) ? 0.2 : (turnplate.speed-0.0015);
            };
            turnplate.dtimer = setInterval(function () {
                rotateFn(angles, txt);
            }, turnplate.timeInterval);
        }else{
            turnplate.bRotate = !turnplate.bRotate;
            switch(txt) {
                case "恭喜獲得折價$1000":
                    message.className = 'message';
                    messageTxt.textContent = '恭喜獲得折價$1000';
                    info.setAttribute('src','https://img.onl/3ttapv');
                    code_img.setAttribute('src','https://img.onl/uRcPMy');
                    copy_code.className = 'copy';
                    code.textContent = 'CCC123';
                    setTimeout(( () => {clockdiv.className = 'clockdiv';} ), 100);
                    // clockdiv.className = 'clockdiv';
                    startTime();
                    break;
                case "恭喜獲得折價$400":
                    message.className = 'message';
                    messageTxt.textContent = '恭喜獲得折價$400';
                    info.setAttribute('src','https://img.onl/3F6k5l');
                    code_img.setAttribute('src','https://img.onl/1p2wQk');
                    copy_code.className = 'copy';
                    code.textContent = 'BBB123';
                    setTimeout(( () => {clockdiv.className = 'clockdiv';} ), 100);
                    // clockdiv.className = 'clockdiv';
                    startTime();
                    break;
                case "恭喜獲得折價$300":
                    message.className = 'message';
                    messageTxt.textContent = '恭喜獲得折價$300';
                    info.setAttribute('src','https://img.onl/RqvW8s');
                    code_img.setAttribute('src','https://img.onl/vLik6U');
                    copy_code.className = 'copy';
                    code.textContent = 'AAA123';
                    setTimeout(( () => {clockdiv.className = 'clockdiv';} ), 100);
                    // clockdiv.className = 'clockdiv';  
                    startTime(); 
                    break;
            }
            setTimeout(( () => {message.className = 'd-none';} ), 3000);
        }
    };
        //動態添加轉盤的獎品的提示語
        turnplate.restaraunts = ["恭喜獲得折價$1000","恭喜獲得折價$300","恭喜獲得折價$400","恭喜獲得折價$1000", "恭喜獲得折價$300", "恭喜獲得折價$400"];
        lottery_btn.onclick = function () {
            if(turnplate.bRotate)return false;
            // if (turnplate.lotteryTimes <= 0) {
            //     btn_p.textContent = "抽獎次數已用完！";
            //     black.className = 'black';
            //     btn.className = 'lottery-info';
            //     return false;
            // }else{
            //     turnplate.lotteryTimes -= 1;
            // }
            turnplate.bRotate = !turnplate.bRotate;
            //初始化
            turnplate.deg = 0;
            turnplate.speed = 4;
            turnplate.sigalTurnNum = 0;
            // 獲取隨機數(獎品個數範圍內)
            var item = rnd(1,turnplate.restaraunts.length);
            // var item =0;
            //指針轉到指定位置的中間,這個角度為逆時針方向的，要根據順時針方向的定位前面要取負數
            var angles = -(item-1) * (360 / turnplate.restaraunts.length);
            console.log(item);
            rotateFn(angles, turnplate.restaraunts[item-1]);
        }
    function rnd(n, m){
        var random = Math.floor(Math.random()*(m-n+1)+n);
        return random;
    }

    // 複製優惠碼
    function copy() {
        code.select(); // 選擇物件
        document.execCommand("copy"); // 執行瀏覽器複製命令
        alert("已成功複製!");
    }

    // 倒數計時器
    function startTime() {
        function getTimeRemaining(endtime) { 
            const total = Date.parse(endtime) - Date.parse(new Date()); 
            const seconds = Math.floor((total / 1000) % 60); 
            const minutes = Math.floor((total / 1000 / 60) % 60); 
            const hours = Math.floor((total / (1000 * 60 * 60)) % 24); 
            const days = Math.floor(total / (1000 * 60 * 60 * 24)); 
            return { total, days, hours, minutes, seconds }; 
        } 
        function initializeClock(id, endtime) { 
            const clock = document.getElementById(id); 
            const daysSpan = clock.querySelector('.days'); 
            const hoursSpan = clock.querySelector('.hours'); 
            const minutesSpan = clock.querySelector('.minutes'); 
            const secondsSpan = clock.querySelector('.seconds'); 
            function updateClock() { 
                const t = getTimeRemaining(endtime); 
                daysSpan.innerHTML = t.days; 
                hoursSpan.innerHTML = ('0' + t.hours).slice(-2); 
                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2); 
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2); 
                if (t.total <= 0) { 
                    clearInterval(timeinterval); 
                    info.setAttribute('src','https://img.onl/WiNXCz');
                    info.className = 'info';
                    copy_code.className = 'd-none';
                    clockdiv.className = 'd-none';
                    message2.className = 'message';
                    messageTxt2.textContent = '時間到了!';
                } 
            } 
            updateClock();
            const timeinterval = setInterval(updateClock, 1000); 
            lottery_btn.addEventListener('click',function() {
                clearInterval(timeinterval); 
                setTimeout(( () => {message2.className = 'd-none';} ), 3000);
            });
        } 
        const deadline = new Date(Date.parse(new Date()) + 600 * 1000); 
        initializeClock('clockdiv', deadline);
    }