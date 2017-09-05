/* This script file handles battle logic */

var component;
var componentBullet;
var bullet;
var sprite;

////map of battle
//var battleMap = [
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
//            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
//            [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
//            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
//            [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
//            [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
//            [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
//            [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
//            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
//            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
//            [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
//            [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0]
//];

function initPanzers(num)
{
    component = Qt.createComponent("Panzer.qml");
    sprite = component.createObject(screenFirst, {"x": 100, "y": 100});
    sprite.index = 1;
    sprite.type = 3;
    sprite.presence = 1;
    sprite.width = 0.9*itemWidth;
    sprite.height = 0.9*itemHeight;

    //offset = 0.0;

    sprite.x = menuBar2.boardCoefWidth * menuBar2.boardOffsetWidth +
            (offsetPanzerX*(battleWidth - menuBar2.boardCoefWidth * menuBar2.boardOffsetWidth*3.9)) / menuBar2.numStep;
    sprite.y = menuBar2.boardCoefHeight * menuBar2.boardOffsetHeight +
            (offsetPanzerY*(battleHeight - menuBar2.boardCoefHeight * menuBar2.boardOffsetHeight*1.9)) / menuBar2.numStep;

    componentBullet = Qt.createComponent("Bullet.qml");
    bullet = componentBullet.createObject(screenFirst, {"x": 100, "y": 100});
    bullet.index = 1;
    bullet.type = 3;
    bullet.presence = 0;
    bullet.width = 0.3*itemWidth;
    bullet.height = 0.3*itemHeight;

    bullet.x = menuBar2.boardCoefWidth * menuBar2.boardOffsetWidth +
            (offsetPanzerX*(battleWidth - menuBar2.boardCoefWidth * menuBar2.boardOffsetWidth*3.9)) / menuBar2.numStep;
    bullet.y = menuBar2.boardCoefHeight * menuBar2.boardOffsetHeight +
            (offsetPanzerY*(battleHeight - menuBar2.boardCoefHeight * menuBar2.boardOffsetHeight*1.9)) / menuBar2.numStep;

    bullet.visible = false;
}

function directionPanzer(num)
{
    sprite.type = num;
}

function movePanzerUp(num)
{
    var x = ((offsetPanzerX/10.0)|0);
    var y = ((offsetPanzerY/10.0)|0);

    if( y == 0 ) {
        if(offsetPanzerY > 0.0) offsetPanzerY = offsetPanzerY - 1.0;
    } else if( (y) > 0) {
        if( (offsetPanzerX/10.0 - x < delta) ) {
            if(battleMap[(((offsetPanzerY-1.0)/10.0)|0)][x] == 0 ) {
                offsetPanzerX = (x+0.0)*10.0;
                if(offsetPanzerY > 0.0) offsetPanzerY = offsetPanzerY - 1.0;
            } else {
                var tt = 0;
            }
        } else if( (offsetPanzerX/10.0 - x > (1.0 - delta)) ) {
            if(battleMap[(((offsetPanzerY-1.0)/10.0)|0)][x+1] == 0 ) {
                offsetPanzerX = (x+1.0)*10.0;
                if(offsetPanzerY > 0.0) offsetPanzerY = offsetPanzerY - 1.0;
            } else {
                var tt = 0;
            }
        } else {
            if( (battleMap[(((offsetPanzerY-1.0)/10.0)|0)][x] == 0 ) && (battleMap[(((offsetPanzerY-1.0)/10.0)|0)][x+1] == 0 ) ) {
                if(offsetPanzerY > 0.0) offsetPanzerY = offsetPanzerY - 1.0;
            } else {
                var tt = 0;
            }
        }
    }
}

function movePanzerDown(num)
{
    var x = ((offsetPanzerX/10.0)|0);
    var y = ((offsetPanzerY/10.0)|0);

    if( y == (((menuBar2.numStep)/10)|0) ) {
        //if(offsetPanzerY < menuBar2.numStep-1) offsetPanzerY = offsetPanzerY + 1.0;
    } else if( (y) < (((menuBar2.numStep)/10)|0) ) {
        var t11 = (y);
        var t41 = offsetPanzerY;
        //if(offsetPanzerX/10.0 - x == 0.0) {
        if( (offsetPanzerX/10.0 - x < delta) ) {
            if(battleMap[(((offsetPanzerY+10.0)/10.0)|0)][x] == 0 ) {
                offsetPanzerX = (x+0.0)*10.0;
                if(offsetPanzerY < menuBar2.numStep) offsetPanzerY = offsetPanzerY + 1.0;
            } else {
                var tt = 0;
            }
        } else if( (offsetPanzerX/10.0 - x > (1.0 - delta)) ) {
            if(battleMap[(((offsetPanzerY+10.0)/10.0)|0)][x+1] == 0 ) {
                offsetPanzerX = (x+1.0)*10.0;
                if(offsetPanzerY < menuBar2.numStep) offsetPanzerY = offsetPanzerY + 1.0;
            } else {
                var tt = 0;
            }
        } else {
            if( (battleMap[(((offsetPanzerY+10.0)/10.0)|0)][x] == 0 ) && (battleMap[(((offsetPanzerY+10.0)/10.0)|0)][x+1] == 0 ) ) {
                if(offsetPanzerY < menuBar2.numStep) offsetPanzerY = offsetPanzerY + 1.0;
            } else {
                var tt = 0;
            }
        }
    }
}

function movePanzerLeft(num)
{
    var x = ((offsetPanzerX/10.0)|0);
    var y = ((offsetPanzerY/10.0)|0);

    if( x == 0 ) {
        if(offsetPanzerX > 0.0) offsetPanzerX = offsetPanzerX - 1.0;
    } else if( x > 0 ) {
        if( (offsetPanzerY/10.0 - y < delta) ) {
            if(battleMap[y][(((offsetPanzerX-1.0)/10.0)|0)] == 0 ) {
                offsetPanzerY = (y+0.0)*10.0;
                if(offsetPanzerX > 0.0) offsetPanzerX = offsetPanzerX - 1.0;
            } else {
                var tt = 0;
            }
        } else if( (offsetPanzerY/10.0 - y > (1.0 - delta)) ) {
            if(battleMap[y+1][(((offsetPanzerX-1.0)/10.0)|0)] == 0 ) {
                offsetPanzerY = (y+1.0)*10.0;
                if(offsetPanzerX > 0.0) offsetPanzerX = offsetPanzerX - 1.0;
            } else {
                var tt = 0;
            }
        } else {
            if( (battleMap[y][(((offsetPanzerX-1.0)/10.0)|0)] == 0 ) && (battleMap[y+1][(((offsetPanzerX-1.0)/10.0)|0)] == 0 ) ) {
                if(offsetPanzerX > 0.0) offsetPanzerX = offsetPanzerX - 1.0;
            } else {
                var tt = 0;
            }
        }
    }
}

function movePanzerRight(num)
{
    var x = ((offsetPanzerX/10.0)|0);
    var y = ((offsetPanzerY/10.0)|0);

    if( x == (((menuBar2.numStep)/10)|0) ) {
        //if(offsetPanzerX < menuBar2.numStep-1) offsetPanzerX = offsetPanzerX + 1.0;
    } else if( (x) < (((menuBar2.numStep)/10)|0) ) {
        if( (offsetPanzerY/10.0 - y < delta) ) {
            if(battleMap[y][(((offsetPanzerX+10.0)/10.0)|0)] == 0 ) {
                offsetPanzerY = (y+0.0)*10.0;
                if(offsetPanzerX < menuBar2.numStep) offsetPanzerX = offsetPanzerX + 1.0;
            } else {
                var tt = 0;
            }
        } else if( (offsetPanzerY/10.0 - y > (1.0 - delta)) ) {
            if(battleMap[y+1][(((offsetPanzerX+10.0)/10.0)|0)] == 0 ) {
                offsetPanzerY = (y+1.0)*10.0;
                if(offsetPanzerX < menuBar2.numStep) offsetPanzerX = offsetPanzerX + 1.0;
            } else {
                var tt = 0;
            }
        } else {
            if( (battleMap[y][(((offsetPanzerX+10.0)/10.0)|0)] == 0 ) && (battleMap[y+1][(((offsetPanzerX+10.0)/10.0)|0)] == 0 ) ) {
                if(offsetPanzerX < menuBar2.numStep) offsetPanzerX = offsetPanzerX + 1.0;
            } else {
                var tt = 0;
            }
        }
    }
}

function movePanzer(num)
{
    if(sprite.type == 0) { //Up
        movePanzerUp(num);
    } else if(sprite.type == 1) { //Down
        movePanzerDown(num);
    } else if(sprite.type == 2) { //Left
        movePanzerLeft(num);
    } else if(sprite.type == 3) { //Right
        movePanzerRight(num);
    }

    sprite.x = menuBar2.boardCoefWidth * menuBar2.boardOffsetWidth +
            (offsetPanzerX*(battleWidth - menuBar2.boardCoefWidth * menuBar2.boardOffsetWidth*3.9)) / menuBar2.numStep;
    sprite.y = menuBar2.boardCoefHeight * menuBar2.boardOffsetHeight +
            (offsetPanzerY*(battleHeight - menuBar2.boardCoefHeight * menuBar2.boardOffsetHeight*1.9)) / menuBar2.numStep;

    //console.log("<<<>>> ");

}

function moveBulletUp(num)
{
    var x = ((offsetBulletX/10.0)|0);
    var y = ((offsetBulletY/10.0)|0);

    if( y == 0 ) {
        if(offsetBulletY > 2.0) offsetBulletY = offsetBulletY - 3.0;
        else bullet.visible = false;
    } else if( (y) > 0) {
        if( (offsetBulletX/10.0 - x < delta) ) {
            if(battleMap[(((offsetBulletY-1.0)/10.0)|0)][x] == 0 ) {
                offsetBulletX = (x+0.0)*10.0;
                if(offsetBulletY > 2.0) offsetBulletY = offsetBulletY - 3.0;
                else bullet.visible = false;
            } else {
                bullet.visible = false;
            }
        } else if( (offsetBulletX/10.0 - x > (1.0 - delta)) ) {
            if(battleMap[(((offsetBulletY-1.0)/10.0)|0)][x+1] == 0 ) {
                offsetBulletX = (x+1.0)*10.0;
                if(offsetBulletY > 2.0) offsetBulletY = offsetBulletY - 3.0;
                else bullet.visible = false;
            } else {
                bullet.visible = false;
            }
        } else {
            if( (battleMap[(((offsetBulletY-1.0)/10.0)|0)][x] == 0 ) && (battleMap[(((offsetBulletY-1.0)/10.0)|0)][x+1] == 0 ) ) {
                if(offsetBulletY > 2.0) offsetBulletY = offsetBulletY - 3.0;
                else bullet.visible = false;
            } else {
                bullet.visible = false;
            }
        }
    }
}

function moveBulletDown(num)
{
    var x = ((offsetBulletX/10.0)|0);
    var y = ((offsetBulletY/10.0)|0);

    if( y == (((menuBar2.numStep)/10)|0) ) {
        //if(offsetBulletY < menuBar2.numStep-1) offsetBulletY = offsetBulletY + 3.0;
        bullet.visible = false;
    } else if( (y) < (((menuBar2.numStep)/10)|0) ) {
        if( (offsetBulletX/10.0 - x < delta) ) {
            if(battleMap[(((offsetBulletY+10.0)/10.0)|0)][x] == 0 ) {
                offsetBulletX = (x+0.0)*10.0;
                if(offsetBulletY < menuBar2.numStep-2.0) offsetBulletY = offsetBulletY + 3.0;
                else bullet.visible = false;
            } else {
                bullet.visible = false;
            }
        } else if( (offsetBulletX/10.0 - x > (1.0 - delta)) ) {
            if(battleMap[(((offsetBulletY+10.0)/10.0)|0)][x+1] == 0 ) {
                offsetBulletX = (x+1.0)*10.0;
                if(offsetBulletY < menuBar2.numStep-2.0) offsetBulletY = offsetBulletY + 3.0;
                else bullet.visible = false;
            } else {
                bullet.visible = false;
            }
        } else {
            if( (battleMap[(((offsetBulletY+10.0)/10.0)|0)][x] == 0 ) && (battleMap[(((offsetBulletY+10.0)/10.0)|0)][x+1] == 0 ) ) {
                if(offsetBulletY < menuBar2.numStep-2.0) offsetBulletY = offsetBulletY + 3.0;
                else bullet.visible = false;
            } else {
                bullet.visible = false;
            }
        }
    }
}

function moveBulletLeft(num)
{
    var x = ((offsetBulletX/10.0)|0);
    var y = ((offsetBulletY/10.0)|0);

    if( x == 0 ) {
        if(offsetBulletX > 2.0) offsetBulletX = offsetBulletX - 3.0;
        else bullet.visible = false;
    } else if( x > 0 ) {
        if( (offsetBulletY/10.0 - y < delta) ) {
            if(battleMap[y][(((offsetBulletX-1.0)/10.0)|0)] == 0 ) {
                offsetBulletY = (y+0.0)*10.0;
                if(offsetBulletX > 2.0) offsetBulletX = offsetBulletX - 3.0;
                else bullet.visible = false;
            } else {
                bullet.visible = false;
            }
        } else if( (offsetBulletY/10.0 - y > (1.0 - delta)) ) {
            if(battleMap[y+1][(((offsetBulletX-1.0)/10.0)|0)] == 0 ) {
                offsetBulletY = (y+1.0)*10.0;
                if(offsetBulletX > 2.0) offsetBulletX = offsetBulletX - 3.0;
                else bullet.visible = false;
            } else {
                bullet.visible = false;
            }
        } else {
            if( (battleMap[y][(((offsetBulletX-1.0)/10.0)|0)] == 0 ) && (battleMap[y+1][(((offsetBulletX-1.0)/10.0)|0)] == 0 ) ) {
                if(offsetBulletX > 2.0) offsetBulletX = offsetBulletX - 3.0;
                else bullet.visible = false;
            } else {
                bullet.visible = false;
            }
        }
    }
}

function moveBulletRight(num)
{
    var x = ((offsetBulletX/10.0)|0);
    var y = ((offsetBulletY/10.0)|0);

    if( x == (((menuBar2.numStep)/10)|0) ) {
        //if(offsetBulletX < menuBar2.numStep-1) offsetBulletX = offsetBulletX + 1.0;
        bullet.visible = false;
    } else if( (x) < (((menuBar2.numStep)/10)|0) ) {
        if( (offsetBulletY/10.0 - y < delta) ) {
            if(battleMap[y][(((offsetBulletX+10.0)/10.0)|0)] == 0 ) {
                offsetBulletY = (y+0.0)*10.0;
                if(offsetBulletX < menuBar2.numStep-2.0) offsetBulletX = offsetBulletX + 3.0;
                else bullet.visible = false;
            } else {
                bullet.visible = false;
            }
        } else if( (offsetBulletY/10.0 - y > (1.0 - delta)) ) {
            if(battleMap[y+1][(((offsetBulletX+10.0)/10.0)|0)] == 0 ) {
                offsetBulletY = (y+1.0)*10.0;
                if(offsetBulletX < menuBar2.numStep-2.0) offsetBulletX = offsetBulletX + 3.0;
                else bullet.visible = false;
            } else {
                bullet.visible = false;
            }
        } else {
            if( (battleMap[y][(((offsetBulletX+10.0)/10.0)|0)] == 0 ) && (battleMap[y+1][(((offsetBulletX+10.0)/10.0)|0)] == 0 ) ) {
                if(offsetBulletX < menuBar2.numStep-2.0) offsetBulletX = offsetBulletX + 3.0;
                else bullet.visible = false;
            } else {
                bullet.visible = false;
            }
        }
    }
}

function moveBullet(num)
{
    if(bullet.type == 0) { //Up
        moveBulletUp(num);
    } else if(bullet.type == 1) { //Down
        moveBulletDown(num);
    } else if(bullet.type == 2) { //Left
        moveBulletLeft(num);
    } else if(bullet.type == 3) { //Right
        moveBulletRight(num);
    }

    bullet.x = menuBar2.boardCoefWidth * menuBar2.boardOffsetWidth +
            ((offsetBulletX+3.0)*(battleWidth - menuBar2.boardCoefWidth * menuBar2.boardOffsetWidth*3.9)) / menuBar2.numStep;
    bullet.y = menuBar2.boardCoefHeight * menuBar2.boardOffsetHeight +
            ((offsetBulletY+3.0)*(battleHeight - menuBar2.boardCoefHeight * menuBar2.boardOffsetHeight*1.9)) / menuBar2.numStep;

}

function Fire()
{
    bullet.visible = true;

    offsetBulletX = offsetPanzerX;
    offsetBulletY = offsetPanzerY;

    bullet.type = sprite.type;

    bullet.x = menuBar2.boardCoefWidth * menuBar2.boardOffsetWidth +
            ((offsetBulletX+3.0)*(battleWidth - menuBar2.boardCoefWidth * menuBar2.boardOffsetWidth*3.9)) / menuBar2.numStep;
    bullet.y = menuBar2.boardCoefHeight * menuBar2.boardOffsetHeight +
            ((offsetBulletY+3.0)*(battleHeight - menuBar2.boardCoefHeight * menuBar2.boardOffsetHeight*1.9)) / menuBar2.numStep;

}

