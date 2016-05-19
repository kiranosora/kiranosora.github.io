(function(){
    var stage, textStage, form, input;
    var circles, textPixels, textFormed;
    var offsetX, offsetY, text;
    var heightU, widthU;
    var colors = ['#B2949D', '#FFF578', '#FF5F8D', '#37A9CC', '#188EB2'];
    var textLength= 2000;/* The maximum length of text to show */
    var timeU=6000;
    function init() {
       
        initStages();
        initForm();
        initText();
        initCircles();
        animate();
        addListeners();
        loopExplode();
        /*setTimeout(function() {
                    //createText("DEFAULT VALUE ガンダム");
                    setTimeout(function(){createText("曹晶晶");},2000);
                    setTimeout(function(){explode();},2000);
                    //createText(input.value.toUpperCase());
                    }, 810);*/
    }

    // Init Canvas
    function initStages() {
        heightU=window.screen.height/2-10;
        widthU=window.screen.width-10;
        //heightU=window.innerHeight;
        //widthU=window.innerWidth;
        offsetX = (widthU-0)/2;
        //offsetX = (widthU-textLength)/2;
        //offsetX = (widthU-600)/2;
        offsetY = (heightU-300)/4;
        textStage = new createjs.Stage("text");
        textStage.canvas.width = textLength;
        //textStage.canvas.width = 600;
        textStage.canvas.height = 200;

        stage = new createjs.Stage("stage");
        stage.canvas.width = widthU;
        stage.canvas.height = heightU;
    }

    function initForm() {
        form = document.getElementById('form');
        form.style.top = offsetY+200+'px';
        form.style.left = offsetX+'px';
        input = document.getElementById('inputText');
    }

    function initText() {
        text = new createjs.Text("t", "80px 'Source Sans Pro'", "#eee");
        text.textAlign = 'center';
        text.x = 300;
    }

    function initCircles() {
        circles = [];
        for(var i=0; i<textLength; i++) {
        //for(var i=0; i<600; i++) {
            var circle = new createjs.Shape();
            var r = 7;
            var x = widthU*Math.random();
            var y = heightU*Math.random();
            var color = colors[Math.floor(i%colors.length)];
            var alpha = 0.2 + Math.random()*0.5;
            circle.alpha = alpha;
            circle.radius = r;
            circle.graphics.beginFill(color).drawCircle(0, 0, r);
            circle.x = x;
            circle.y = y;
            circles.push(circle);
            stage.addChild(circle);
            circle.movement = 'float';
            tweenCircle(circle);
        }
    }


    // animating circles
    function animate() {
        stage.update();
        setTimeout(function(){requestAnimationFrame(animate);},1000/60);
        //requestAnimationFrame(animate);
    }

    function tweenCircle(c, dir) {
        if(c.tween) c.tween.kill();
        if(dir == 'in') {
            c.tween = TweenLite.to(c, 0.4, {x: c.originX, y: c.originY, ease:Quad.easeInOut, alpha: 1, radius: 1, scaleX: 0.4, scaleY: 0.4, onComplete: function() {
                c.movement = 'jiggle';
                tweenCircle(c);
                //alert("dir==in");
            }});
        } else if(dir == 'out') {
            c.tween = TweenLite.to(c, 0.8, {x: widthU*Math.random(), y: heightU*Math.random(), ease:Quad.easeInOut, alpha: 0.2 + Math.random()*0.5, scaleX: 1, scaleY: 1, onComplete: function() {
                c.movement = 'float';
                tweenCircle(c);
                //alert("dir==out");
            }});
        } else {
            if(c.movement == 'float') {
                c.tween = TweenLite.to(c, 5 + Math.random()*3.5, {x: c.x + -100+Math.random()*200, y: c.y + -100+Math.random()*200, ease:Quad.easeInOut, alpha: 0.2 + Math.random()*0.5, radiu: 3,
                    onComplete: function() {
                        setTimeout(function(){tweenCircle(c);},2000);
                    }});
                //alert("float");
            } else {
                c.tween = TweenLite.to(c, 0.05, {x: c.originX + Math.random()*3, y: c.originY + Math.random()*3, ease:Quad.easeInOut,
                    onComplete: function() {
                        setTimeout(function(){tweenCircle(c);},2000);
                    }});
                //alert("else");
            }
        }
    }

    function formText() {
        for(var i= 0, l=textPixels.length; i<l; i++) {
            circles[i].originX = 100 + textPixels[i].x;
            //circles[i].originX = offsetX + textPixels[i].x;
            circles[i].originY = offsetY + textPixels[i].y;
            tweenCircle(circles[i], 'in');
        }
        textFormed = true;
        if(textPixels.length < circles.length) {
            for(var j = textPixels.length; j<circles.length; j++) {
                circles[j].tween = TweenLite.to(circles[j], 0.4, {alpha: 0.1});
                //setTimeout(function(){circles[j].tween = TweenLite.to(circles[j], 0.4, {alpha: 0.1});},100);
            }
        }
    }

    function explode() {
        for(var i= 0, l=textPixels.length; i<l; i++) {
            tweenCircle(circles[i], 'out');
        }
        if(textPixels.length < circles.length) {
            for(var j = textPixels.length; j<circles.length; j++) {
                circles[j].tween = TweenLite.to(circles[j], 0.4, {alpha: 1});
            }
        }
    }

    // event handlers
    function addListeners() {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if(textFormed) {
                explode();
                if(input.value != '') {
                    setTimeout(function() {
                        //createText("DEFAULT VALUE ガンダム");
                        createText(input.value.toUpperCase());
                    }, 810);
                } else {
                    textFormed = false;
                }
            } else {
                //createText("DEFAULT VALUE ガンダム");
                createText(input.value.toUpperCase());
            }

        });
    }

    function createText(t) {
        var fontSize = 860/(t.length);
        if (fontSize > 160) fontSize = 160;
        text.text = t;
        text.font = "900 "+fontSize+"px 'Source Sans Pro'";
        text.textAlign = 'center';
        text.x = textLength /2;
        //text.x = 300;
        text.y = (172-fontSize)/2;
        textStage.addChild(text);
        textStage.update();

        var ctx = document.getElementById('text').getContext('2d');
        var pix = ctx.getImageData(0,0,textLength,200).data;
        //var pix = ctx.getImageData(0,0,600,200).data;
        textPixels = [];
        for (var i = pix.length; i >= 0; i -= 4) {
            if (pix[i] != 0) {
                var x = (i / 4) % textLength;
                var y = Math.floor(Math.floor(i/textLength)/4);
                //var x = (i / 4) % 600;
                //var y = Math.floor(Math.floor(i/600)/4);

                if((x && x%8 == 0) && (y && y%8 == 0)) textPixels.push({x: x, y: y});
            }
        }

        formText();

    }

    function loopExplode() {
     //createText("DEFAULT VALUE ガンダム");
     createText("曹晶晶");
     //explode();},timeU/10);
     //setTimeout(function(){createText("曹晶晶");},timeU/10);
     setTimeout(function(){explode();},timeU*10);
     //setTimeout(loopExplode,timeU);
     //createText(input.value.toUpperCase());
    }

    window.onload = function() { init() };
})();
