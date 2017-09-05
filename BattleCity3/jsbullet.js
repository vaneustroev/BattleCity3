/* This script file handles bullet logic

Battle City 2
Vladimir Neustroev
www.vanmed.narod.ru
vaneustroev@gmail.com
2017.08.01

*/

var bulletComponent;
var bulletObject;
var ind = 0;

function initBullets(num)
{
    bulletComponent = Qt.createComponent("ItemBullet.qml");
    bulletObject = bulletComponent.createObject(screenFirst, {"x": 100, "y": 100});
    bulletObject.index = 1;
    bulletObject.type = 3;
    bulletObject.presence = 0;
    bulletObject.width = 0.3*itemWidth;
    bulletObject.height = 0.3*itemHeight;

    bulletObject.offsetx = 0.0;
    bulletObject.offsety = 0.0;

    bulletObject.x = menuBar2.boardOffsetWidth2 +
            ((bulletObject.offsetx+offsetBullet)*(battleWidth - menuBar2.boardOffsetWidth2 * menuBar2.boardCoefWidth2)) / menuBar2.numStep;
    bulletObject.y = menuBar2.boardOffsetHeight2 +
            ((bulletObject.offsety+offsetBullet)*(battleHeight - menuBar2.boardOffsetHeight2 * menuBar2.boardCoefHeight2)) / menuBar2.numStep;

    bulletObject.visible = false;
}

function moveBulletUp(num)
{
    var x = ((bulletObject.offsetx/tick)|0);
    var y = ((bulletObject.offsety/tick)|0);

    if( y == 0 ) {
        if(bulletObject.offsety > (velBullet-1.0)) bulletObject.offsety = bulletObject.offsety - velBullet;
        else bulletObject.visible = false;
    } else if( (y) > 0) {
        if( (bulletObject.offsetx/tick - x < delta) ) {
            if(battleMap[(((bulletObject.offsety-1.0)/tick)|0)][x] === 0 ) {
                bulletObject.offsetx = (x+0.0)*tick;
                if(bulletObject.offsety > (velBullet-1.0)) bulletObject.offsety = bulletObject.offsety - velBullet;
                else bulletObject.visible = false;
            } else {
                bulletObject.visible = false;
            }
        } else if( (bulletObject.offsetx/tick - x > (1.0 - delta)) ) {
            if(battleMap[(((bulletObject.offsety-1.0)/tick)|0)][x+1] === 0 ) {
                bulletObject.offsetx = (x+1.0)*tick;
                if(bulletObject.offsety > (velBullet-1.0)) bulletObject.offsety = bulletObject.offsety - velBullet;
                else bulletObject.visible = false;
            } else {
                bulletObject.visible = false;
            }
        } else {
            if( (battleMap[(((bulletObject.offsety-1.0)/tick)|0)][x] === 0 ) && (battleMap[(((bulletObject.offsety-1.0)/tick)|0)][x+1] === 0 ) ) {
                if(bulletObject.offsety > (velBullet-1.0)) bulletObject.offsety = bulletObject.offsety - velBullet;
                else bulletObject.visible = false;
            } else {
                bulletObject.visible = false;
            }
        }
    }
}

function moveBulletDown(num)
{
    var x = ((bulletObject.offsetx/tick)|0);
    var y = ((bulletObject.offsety/tick)|0);

    if( y == (((menuBar2.numStep)/tick)|0) ) {
        //if(bulletObject.offsety < menuBar2.numStep-1) bulletObject.offsety = bulletObject.offsety + velBullet;
        bulletObject.visible = false;
    } else if( (y) < (((menuBar2.numStep)/tick)|0) ) {
        if( (bulletObject.offsetx/tick - x < delta) ) {
            if(battleMap[(((bulletObject.offsety+tick)/tick)|0)][x] == 0 ) {
                bulletObject.offsetx = (x+0.0)*tick;
                if(bulletObject.offsety < menuBar2.numStep-(velBullet-1.0)) bulletObject.offsety = bulletObject.offsety + velBullet;
                else bulletObject.visible = false;
            } else {
                bulletObject.visible = false;
            }
        } else if( (bulletObject.offsetx/tick - x > (1.0 - delta)) ) {
            if(battleMap[(((bulletObject.offsety+tick)/tick)|0)][x+1] == 0 ) {
                bulletObject.offsetx = (x+1.0)*tick;
                if(bulletObject.offsety < menuBar2.numStep-(velBullet-1.0)) bulletObject.offsety = bulletObject.offsety + velBullet;
                else bulletObject.visible = false;
            } else {
                bulletObject.visible = false;
            }
        } else {
            if( (battleMap[(((bulletObject.offsety+tick)/tick)|0)][x] == 0 ) && (battleMap[(((bulletObject.offsety+tick)/tick)|0)][x+1] == 0 ) ) {
                if(bulletObject.offsety < menuBar2.numStep-(velBullet-1.0)) bulletObject.offsety = bulletObject.offsety + velBullet;
                else bulletObject.visible = false;
            } else {
                bulletObject.visible = false;
            }
        }
    }
}

function moveBulletLeft(num)
{
    var x = ((bulletObject.offsetx/tick)|0);
    var y = ((bulletObject.offsety/tick)|0);

    if( x == 0 ) {
        if(bulletObject.offsetx > (velBullet-1.0)) bulletObject.offsetx = bulletObject.offsetx - velBullet;
        else bulletObject.visible = false;
    } else if( x > 0 ) {
        if( (bulletObject.offsety/tick - y < delta) ) {
            if(battleMap[y][(((bulletObject.offsetx-1.0)/tick)|0)] == 0 ) {
                bulletObject.offsety = (y+0.0)*tick;
                if(bulletObject.offsetx > (velBullet-1.0)) bulletObject.offsetx = bulletObject.offsetx - velBullet;
                else bulletObject.visible = false;
            } else {
                bulletObject.visible = false;
            }
        } else if( (bulletObject.offsety/tick - y > (1.0 - delta)) ) {
            if(battleMap[y+1][(((bulletObject.offsetx-1.0)/tick)|0)] == 0 ) {
                bulletObject.offsety = (y+1.0)*tick;
                if(bulletObject.offsetx > (velBullet-1.0)) bulletObject.offsetx = bulletObject.offsetx - velBullet;
                else bulletObject.visible = false;
            } else {
                bulletObject.visible = false;
            }
        } else {
            if( (battleMap[y][(((bulletObject.offsetx-1.0)/tick)|0)] == 0 ) && (battleMap[y+1][(((bulletObject.offsetx-1.0)/tick)|0)] == 0 ) ) {
                if(bulletObject.offsetx > (velBullet-1.0)) bulletObject.offsetx = bulletObject.offsetx - velBullet;
                else bulletObject.visible = false;
            } else {
                bulletObject.visible = false;
            }
        }
    }
}

function moveBulletRight(num)
{
    var x = ((bulletObject.offsetx/tick)|0);
    var y = ((bulletObject.offsety/tick)|0);

    if( x == (((menuBar2.numStep)/tick)|0) ) {
        //if(bulletObject.offsetx < menuBar2.numStep-1) bulletObject.offsetx = bulletObject.offsetx + 1.0;
        bulletObject.visible = false;
    } else if( (x) < (((menuBar2.numStep)/tick)|0) ) {
        if( (bulletObject.offsety/tick - y < delta) ) {
            if(battleMap[y][(((bulletObject.offsetx+tick)/tick)|0)] == 0 ) {
                bulletObject.offsety = (y+0.0)*tick;
                if(bulletObject.offsetx < menuBar2.numStep-(velBullet-1.0)) bulletObject.offsetx = bulletObject.offsetx + velBullet;
                else bulletObject.visible = false;
            } else {
                bulletObject.visible = false;
            }
        } else if( (bulletObject.offsety/tick - y > (1.0 - delta)) ) {
            if(battleMap[y+1][(((bulletObject.offsetx+tick)/tick)|0)] == 0 ) {
                bulletObject.offsety = (y+1.0)*tick;
                if(bulletObject.offsetx < menuBar2.numStep-(velBullet-1.0)) bulletObject.offsetx = bulletObject.offsetx + velBullet;
                else bulletObject.visible = false;
            } else {
                bulletObject.visible = false;
            }
        } else {
            if( (battleMap[y][(((bulletObject.offsetx+tick)/tick)|0)] == 0 ) && (battleMap[y+1][(((bulletObject.offsetx+tick)/tick)|0)] == 0 ) ) {
                if(bulletObject.offsetx < menuBar2.numStep-(velBullet-1.0)) bulletObject.offsetx = bulletObject.offsetx + velBullet;
                else bulletObject.visible = false;
            } else {
                bulletObject.visible = false;
            }
        }
    }
}

function moveBullet(num)
{
    if(bulletObject.type === moveUp) { //Up
        moveBulletUp(num);
    } else if(bulletObject.type === moveDown) { //Down
        moveBulletDown(num);
    } else if(bulletObject.type === moveLeft) { //Left
        moveBulletLeft(num);
    } else if(bulletObject.type === moveRight) { //Right
        moveBulletRight(num);
    }

    if(bulletObject.visible === true) {
        var counter = 0;
        for (ind = 0; ind < rivalMaxPiece; ind++)
        {
            if( ((((rivalObjects[ind].offsetx)/tick)|0) === (((bulletObject.offsetx)/tick)|0)) &&
                ((((rivalObjects[ind].offsety)/tick)|0) === (((bulletObject.offsety)/tick)|0)) )
            {
                if(rivalObjects[ind].visible === true) {
                    rivalObjects[ind].visible = false;
                    rivalBulletObjects[ind].visible = false;
                    bulletObject.visible = false;
                }
            }
            if(rivalObjects[ind].visible === false) {
                counter += 1;
            }
        }
        if(counter === rivalMaxPiece) {
            menuBar2.gameOver = true;
            dialogWin.open();
        }
    }

    bulletObject.x = menuBar2.boardOffsetWidth2 +
            ((bulletObject.offsetx+offsetBullet)*(battleWidth - menuBar2.boardOffsetWidth2 * menuBar2.boardCoefWidth2)) / menuBar2.numStep;
    bulletObject.y = menuBar2.boardOffsetHeight2 +
            ((bulletObject.offsety+offsetBullet)*(battleHeight - menuBar2.boardOffsetHeight2 * menuBar2.boardCoefHeight2)) / menuBar2.numStep;

}

function fireBullet()
{
    bulletObject.visible = true;

    bulletObject.offsetx = menuBar2.panzerObject.offsetx;
    bulletObject.offsety = menuBar2.panzerObject.offsety;

    bulletObject.type = menuBar2.panzerObject.type;

    bulletObject.x = menuBar2.boardOffsetWidth2 +
            ((bulletObject.offsetx+offsetBullet)*(battleWidth - menuBar2.boardOffsetWidth2 * menuBar2.boardCoefWidth2)) / menuBar2.numStep;
    bulletObject.y = menuBar2.boardOffsetHeight2 +
            ((bulletObject.offsety+offsetBullet)*(battleHeight - menuBar2.boardOffsetHeight2 * menuBar2.boardCoefHeight2)) / menuBar2.numStep;

}

