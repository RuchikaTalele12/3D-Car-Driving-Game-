(function(){
                    "use strict"
                    var hw = window.innerWidth || 360;
                    var hh = window.innerHeight || 560;
                    var gameHome = document.getElementById("startPage");
                    var scoreDiv = document.getElementById("scoreDiv");
                    if(hh &gt; hw){
                        gameHome.style.height = hw+"px";
                        gameHome.style.width = hh+"px";
                        gameHome.style.transform = "translateX("+hw+"px) rotate(90deg)";
                        scoreDiv.style.bottom = 0;
                        scoreDiv.style.transform = "rotate(90deg) translateX(40px)";
                    }
                })();
                 var ld;
        var loaded = false;

        function done(){
            document.getElementById("ldc").innerHTML="";
            document.getElementById("ldc").style.display = "none";
            document.getElementById("playBtn").innerHTML = "PLAY";
            loaded = true;
        }

        (function(){
            var w = window.innerWidth || 360;
            var h = window.innerHeight || 560;

            if(h &gt; w){
                var nh = h;
                h = w;
                w = nh;
                document.getElementById("mainContainer").style.transform = "translateX("+(h)+"px) rotate(90deg)";
            }
            document.getElementById("mainContainer").style.width = w+"px";
            document.getElementById("mainContainer").style.height = h+"px";

            document.getElementById("city").style.height = h*.3+"px";
            document.getElementById("city").style.width = w+"px";

            var c = document.getElementById("myCanvas");
            c.height = h;
            c.width = w;

            var ctx = c.getContext("2d");

        function loadGame(){
            "use strict";

            var roadWidth = 5*w/36;
            var roadTop = h-h*0.7;
            var roadLeft = (w-roadWidth)/2;
            var roadConstant = roadLeft/(h-roadTop);
            var score = 0;
            var scoreC = document.getElementById("score");
            function updateScore(ds){
                score+=ds;
                scoreC.textContent = score;
            }
            updateScore(0);

            var rso = [];
            var ratio = 0.8;
            var totalRso = 20;
            var maxHF = h*(1-ratio)/(2.25*(1-Math.pow(ratio,totalRso)));
            var maxH = maxHF;
            var totalHeight = 0.7*h;
            var minWidth = 1;
            var maxWidth = 26;
            var dif = maxWidth - minWidth;
            var changedHeight = totalHeight-maxH*ratio;
            var cnst1 = Math.pow(ratio,totalRso)/(1-ratio);
            var stp = h-totalHeight;
            var tMaxH = h*20/36;
            var treeCnst = tMaxH/roadLeft;

            var gameDifficulty = 100;



            function TreeBuilder(src,src2,start,left){
                this.src = treeSrc[src];
                this.src2 = treeSrc[src2];
                this.y = start;
                this.x = 0;
                this.h = 0;
                this.w = 0;
                this.dy = 0.01;
                this.r = 1.009;
                this.left = left;
            }

            TreeBuilder.prototype.draw = function(){
                this.y += this.dy;
                this.dy *= this.r;
                this.x = (h-this.y)*roadConstant - this.w - this.w*this.left;
                this.h = (roadLeft-this.x-this.w*this.left)*treeCnst;
                this.w = this.h*2/3;

                ctx.drawImage(this.src,this.x,this.y-this.h,this.w,this.h);
                ctx.drawImage(this.src2,w-this.x-this.w,this.y-this.h,this.w,this.h);

                if(this.y &gt;= h){
                    this.y = stp;
                    this.h = 0;
                    this.w = 0;
                    this.left = Math.random()*3;
                    this.dy = 0.5;
                }
            }

            function _i(x){
                return document.getElementById(x);
            }
            var treeSrc = [_i("t1"),_i("t2"),_i("t3"),_i("t4")];

            var trees = [];
            for(var n = 0; n  560) ? 120 : 90;
            var carH = carW*2/3;

            function CarBuilder(src,start,lane){
                this.src = carSrc[src];
                this.y = start;
                this.x = 0;
                this.h = 0;
                this.w = 0;
                this.dy = 0.5;
                this.lane = lane;
            }

            CarBuilder.prototype.draw = function(){
                this.dy *= 1.01;
                this.y += this.dy;
                this.x = (carWCnst/2)*(h-this.y)+(w-(carWCnst*(h-this.y)))*this.lane/8;
                this.w = carW-carW*carWCnst*(h-this.y)/w;
                this.h = 1.7*this.w/3;

                ctx.drawImage(this.src,this.x,this.y-this.h,this.w,this.h);
                if(this.y &gt;= h-20){
                    if(Math.abs(this.x-cx) &lt;= carH &amp;&amp; Math.abs(this.y-h+carH) = h+100){
                    this.y = stp;
                    this.h = 0;
                    this.w = 0;
                    this.left = Math.random()*3;
                    this.dy = 0.5;
                    this.lane = 1+Math.random()*5;
                }
            }

            var carSrc = [_i("c1"),_i("c1"),_i("c1")];

            var cars = [];
            for(var n = 0; n  560) ? 75 : 60;
            function CoinBuilder(start,lane){
                this.src = coinSrc;
                this.y = start;
                this.x = 0;
                this.h = 0;
                this.w = 0;
                this.dy = 0.5;
                this.lane = lane;
            }

            CoinBuilder.prototype.draw = function(){
                this.dy *= 1.01;
                this.y += this.dy;
                this.x = (carWCnst/2)*(h-this.y)+(w-(carWCnst*(h-this.y)))*this.lane/8;
                this.w = coinW-coinW*carWCnst*(h-this.y)/w;
                this.h = this.w;

                ctx.drawImage(this.src,this.x,this.y-this.h,this.w,this.h);
                if(this.y &gt;= h-20){
                    if(Math.abs(this.x-cx) &lt;= coinW &amp;&amp; Math.abs(this.y-h+coinW) = h+100){
                    this.y = stp;
                    this.h = 0;
                    this.w = 0;
                    this.left = Math.random()*3;
                    this.dy = 0.5;
                    this.lane = Math.floor(1+Math.random()*5);
                }
            }

            var coinSrc = _i("cn");

            var coins = [];
            for(var n = 0; n &lt; ((h*0.7+100)/(gameDifficulty-50)); n++){
                coins.push(new CoinBuilder(stp+n*(gameDifficulty-50),6));
            }



            //End Coin...



            function rectPoints(n,ho){
                n = totalRso-n-1;
                var y1 = stp+maxH*cnst1*(Math.pow(1/ratio,n)-1);
                var x1 = roadLeft-roadConstant*(y1-stp);
                var y2 = y1;
                var x2 = x1 + minWidth+(y1-stp)*dif/totalHeight;
                var y3 = y1 + maxH*cnst1*(Math.pow(1/ratio,n+1)-1);
                var x3 = roadLeft-roadConstant*(y3-stp);
                var y4 = y3;
                var x4 = x3 + minWidth+(y3-stp)*dif/totalHeight;

                return [x1,y1,x2,y2,x4,y4,x3,y3];
            }


            for(var n = 0; n &lt; totalRso; n++){
                rso.push(rectPoints(n,h));
                rso[n][8] = (n%2==0) ? &quot;#000&quot; : &quot;#fff&quot;;
            }

            function draw(){
                ctx.beginPath();
                ctx.moveTo((w-roadWidth)/2,stp);
                ctx.lineTo((w-roadWidth)/2+roadWidth,stp);
                ctx.lineTo(w,h);
                ctx.lineTo(0,h);
                ctx.fillStyle=&quot;#555&quot;;
                ctx.fill();
                ctx.closePath();
                for(var n = 0; n &lt; totalRso; n++){
                    ctx.beginPath();
                    ctx.moveTo(rso[n][0],rso[n][1]);
                    ctx.lineTo(rso[n][2],rso[n][3]);
                    ctx.lineTo(rso[n][4],rso[n][5]);
                    ctx.lineTo(rso[n][6],rso[n][7]);
                    ctx.lineTo(rso[n][0],rso[n][1]);
                    ctx.lineWidth = 2;
                    ctx.fillStyle = rso[n][8];//&quot;rgb(&quot;+Math.floor(Math.random()*255)+&quot;,&quot;+Math.floor(Math.random()*255)+&quot;,&quot;+Math.floor(Math.random()*255)+&quot;)&quot;;
                    ctx.fill();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.moveTo(w-rso[n][0],rso[n][1]);
                    ctx.lineTo(w-rso[n][2],rso[n][3]);
                    ctx.lineTo(w-rso[n][4],rso[n][5]);
                    ctx.lineTo(w-rso[n][6],rso[n][7]);
                    ctx.lineTo(w-rso[n][0],rso[n][1]);
                    ctx.lineWidth = 2;
                    ctx.fillStyle = rso[n][8];//&quot;rgb(&quot;+Math.floor(Math.random()*255)+&quot;,&quot;+Math.floor(Math.random()*255)+&quot;,&quot;+Math.floor(Math.random()*255)+&quot;)&quot;;
                    ctx.fill();
                    ctx.closePath();


                }

            }

            var cx = (w-carW)/2;
            var cl = false, cr = false;
            var car = _i(&quot;c1&quot;);
            var ms = 3*w/560;
            function drawCar(){
                if(cl) if(cx+carW+50  0) cx-=ms;
                ctx.drawImage(car,cx,h-carH,carW,carH);
            }


            var m = 0;
            var intv = setInterval(function(){
                try{
                ctx.clearRect(0,0,w,h);
                maxH+=0.5;
                changedHeight = maxH*cnst1*(Math.pow(1/ratio,totalRso-1)-1);//maxH*(1-Math.pow(ratio,totalRso-5))/(1-ratio);
                if(changedHeight &gt;= totalHeight){
                    maxH = maxHF;
                    m++;
                }
                for(var n = 0; n &lt; totalRso; n++){
                    rso[n]=rectPoints(n,h-totalHeight+changedHeight);
                    if(m%2==0) rso[n][8] = (n%2==0) ? &quot;#000&quot; : &quot;#fff&quot;;
                    else rso[n][8] = (n%2==1) ? &quot;#000&quot; : &quot;#fff&quot;;
                }
                draw();
                for(var n = 0; n &lt; trees.length; n++){
                    trees[n].draw();
                }

                for(var n = 0; n &lt; coins.length; n++){
                    coins[n].draw();
                }

                for(var n = 0; n (h/2)){
                    cl = true;
                }
                else{
                    cr = true;
                }
            }
            function getTouchEnd(){
                cl = false;
                cr = false;
            }

            c.removeEventListener("touchstart",getTouch);
            c.removeEventListener("touchend",getTouchEnd);
            c.addEventListener("touchstart",getTouch);
            c.addEventListener("touchend",getTouchEnd);
            //Key..
            function getKey(e){
                e.preventDefault();
                var ty = e.keyCode;
                if(ty===39){
                    cr = false;
                    cl = true;
                }
                else if(ty===37){
                    cl = false;
                    cr = true;
                }
            }
            function getKeyEnd(e){
                var ty = e.keyCode;
                if(ty === 39) cl = false;
                else if(ty === 37) cr = false;
            }

            document.body.removeEventListener("keydown",getKey);
            document.body.removeEventListener("keyup",getKeyEnd);
            document.body.addEventListener("keydown",getKey);
            document.body.addEventListener("keyup",getKeyEnd);
            //Accelarometre

            function driveCar(e){
                var y = e.accelerationIncludingGravity.y;

                if(y &gt; 0){
                    if(cx+carW+50  0) cx += y*ms;
                }
            }

            if(window.DeviceMotionEvent){
                window.removeEventListener("devicemotion",driveCar)
                   window.addEventListener("devicemotion",driveCar,false)
            }
            //End
        }
        ld = function(){
            if(loaded){
                document.getElementById("startPage").style.display = "none";
                document.getElementById("mainContainer").style.display = "block";
                loadGame();
            }
        }
        })();
