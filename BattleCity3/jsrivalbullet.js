/* This script file handles rival bullets logic

Battle City 2
Vladimir Neustroev
www.vanmed.narod.ru
vaneustroev@gmail.com
2017.08.01

*/

function initRivalBullets(num)
{
    var ind = 0;
    var rivalBulletComponent;
    var rivalBulletObject;

    for (ind = 0; ind < rivalMaxPiece; ind++)
    {
        rivalBulletComponent = Qt.createComponent("ItemBullet.qml");
        rivalBulletObject = rivalBulletComponent.createObject(screenFirst, {"x": 100, "y": 100});
        rivalBulletObject.index = 1;
        rivalBulletObject.type = 3;
        rivalBulletObject.presence = 0;
        rivalBulletObject.width = 0.3*itemWidth;
        rivalBulletObject.height = 0.3*itemHeight;

        rivalBulletObject.offsetx = 0.0;
        rivalBulletObject.offsety = 0.0;

        rivalBulletObject.x = menuBar2.boardOffsetWidth2 +
                ((rivalBulletObject.offsetx+offsetBullet)*(battleWidth - menuBar2.boardOffsetWidth2 * menuBar2.boardCoefWidth2)) / menuBar2.numStep;
        rivalBulletObject.y = menuBar2.boardOffsetHeight2 +
                ((rivalBulletObject.offsety+offsetBullet)*(battleHeight - menuBar2.boardOffsetHeight2 * menuBar2.boardCoefHeight2)) / menuBar2.numStep;

        rivalBulletObject.visible = false;

        rivalBulletObjects[ind] = rivalBulletObject;
    }
}

function moveRivalBulletUp(ind)
{
    var x = ((rivalBulletObjects[ind].offsetx/tick)|0);
    var y = ((rivalBulletObjects[ind].offsety/tick)|0);

    if( y == 0 ) {
        if(rivalBulletObjects[ind].offsety > (velRivalBullet-1.0))
            rivalBulletObjects[ind].offsety = rivalBulletObjects[ind].offsety - velRivalBullet;
        else rivalBulletObjects[ind].visible = false;
    } else if( (y) > 0) {
        if( (rivalBulletObjects[ind].offsetx/tick - x < delta) ) {
            if(battleMap[(((rivalBulletObjects[ind].offsety-1.0)/tick)|0)][x] === 0 ) {
                rivalBulletObjects[ind].offsetx = (x+0.0)*tick;
                if(rivalBulletObjects[ind].offsety > (velRivalBullet-1.0))
                    rivalBulletObjects[ind].offsety = rivalBulletObjects[ind].offsety - velRivalBullet;
                else rivalBulletObjects[ind].visible = false;
            } else {
                rivalBulletObjects[ind].visible = false;
            }
        } else if( (rivalBulletObjects[ind].offsetx/tick - x > (1.0 - delta)) ) {
            if(battleMap[(((rivalBulletObjects[ind].offsety-1.0)/tick)|0)][x+1] === 0 ) {
                rivalBulletObjects[ind].offsetx = (x+1.0)*tick;
                if(rivalBulletObjects[ind].offsety > (velRivalBullet-1.0))
                    rivalBulletObjects[ind].offsety = rivalBulletObjects[ind].offsety - velRivalBullet;
                else rivalBulletObjects[ind].visible = false;
            } else {
                rivalBulletObjects[ind].visible = false;
            }
        } else {
            if( (battleMap[(((rivalBulletObjects[ind].offsety-1.0)/tick)|0)][x] === 0 ) &&
                (battleMap[(((rivalBulletObjects[ind].offsety-1.0)/tick)|0)][x+1] === 0 ) )
            {
                if(rivalBulletObjects[ind].offsety > (velRivalBullet-1.0))
                    rivalBulletObjects[ind].offsety = rivalBulletObjects[ind].offsety - velRivalBullet;
                else rivalBulletObjects[ind].visible = false;
            } else {
                rivalBulletObjects[ind].visible = false;
            }
        }
    }
}

function moveRivalBulletDown(ind)
{
    var x = ((rivalBulletObjects[ind].offsetx/tick)|0);
    var y = ((rivalBulletObjects[ind].offsety/tick)|0);

    if( y == (((menuBar2.numStep)/tick)|0) ) {
        //if(rivalBulletObjects[ind].offsety < menuBar2.numStep-1) rivalBulletObjects[ind].offsety = rivalBulletObjects[ind].offsety + velRivalBullet;
        rivalBulletObjects[ind].visible = false;
    } else if( (y) < (((menuBar2.numStep)/tick)|0) ) {
        if( (rivalBulletObjects[ind].offsetx/tick - x < delta) ) {
            if(battleMap[(((rivalBulletObjects[ind].offsety+tick)/tick)|0)][x] === 0 ) {
                rivalBulletObjects[ind].offsetx = (x+0.0)*tick;
                if(rivalBulletObjects[ind].offsety < menuBar2.numStep-(velRivalBullet-1.0))
                    rivalBulletObjects[ind].offsety = rivalBulletObjects[ind].offsety + velRivalBullet;
                else rivalBulletObjects[ind].visible = false;
            } else {
                rivalBulletObjects[ind].visible = false;
            }
        } else if( (rivalBulletObjects[ind].offsetx/tick - x > (1.0 - delta)) ) {
            if(battleMap[(((rivalBulletObjects[ind].offsety+tick)/tick)|0)][x+1] === 0 ) {
                rivalBulletObjects[ind].offsetx = (x+1.0)*tick;
                if(rivalBulletObjects[ind].offsety < menuBar2.numStep-(velRivalBullet-1.0))
                    rivalBulletObjects[ind].offsety = rivalBulletObjects[ind].offsety + velRivalBullet;
                else rivalBulletObjects[ind].visible = false;
            } else {
                rivalBulletObjects[ind].visible = false;
            }
        } else {
            if( (battleMap[(((rivalBulletObjects[ind].offsety+tick)/tick)|0)][x] === 0 ) &&
                (battleMap[(((rivalBulletObjects[ind].offsety+tick)/tick)|0)][x+1] === 0 ) )
            {
                if(rivalBulletObjects[ind].offsety < menuBar2.numStep-(velRivalBullet-1.0))
                    rivalBulletObjects[ind].offsety = rivalBulletObjects[ind].offsety + velRivalBullet;
                else rivalBulletObjects[ind].visible = false;
            } else {
                rivalBulletObjects[ind].visible = false;
            }
        }
    }
}

function moveRivalBulletLeft(ind)
{
    var x = ((rivalBulletObjects[ind].offsetx/tick)|0);
    var y = ((rivalBulletObjects[ind].offsety/tick)|0);

    if( x == 0 ) {
        if(rivalBulletObjects[ind].offsetx > (velRivalBullet-1.0))
            rivalBulletObjects[ind].offsetx = rivalBulletObjects[ind].offsetx - velRivalBullet;
        else rivalBulletObjects[ind].visible = false;
    } else if( x > 0 ) {
        if( (rivalBulletObjects[ind].offsety/tick - y < delta) ) {
            if(battleMap[y][(((rivalBulletObjects[ind].offsetx-1.0)/tick)|0)] === 0 ) {
                rivalBulletObjects[ind].offsety = (y+0.0)*tick;
                if(rivalBulletObjects[ind].offsetx > (velRivalBullet-1.0))
                    rivalBulletObjects[ind].offsetx = rivalBulletObjects[ind].offsetx - velRivalBullet;
                else rivalBulletObjects[ind].visible = false;
            } else {
                rivalBulletObjects[ind].visible = false;
            }
        } else if( (rivalBulletObjects[ind].offsety/tick - y > (1.0 - delta)) ) {
            if(battleMap[y+1][(((rivalBulletObjects[ind].offsetx-1.0)/tick)|0)] === 0 ) {
                rivalBulletObjects[ind].offsety = (y+1.0)*tick;
                if(rivalBulletObjects[ind].offsetx > (velRivalBullet-1.0))
                    rivalBulletObjects[ind].offsetx = rivalBulletObjects[ind].offsetx - velRivalBullet;
                else rivalBulletObjects[ind].visible = false;
            } else {
                rivalBulletObjects[ind].visible = false;
            }
        } else {
            if( (battleMap[y][(((rivalBulletObjects[ind].offsetx-1.0)/tick)|0)] === 0 ) &&
                (battleMap[y+1][(((rivalBulletObjects[ind].offsetx-1.0)/tick)|0)] === 0 ) )
            {
                if(rivalBulletObjects[ind].offsetx > (velRivalBullet-1.0))
                    rivalBulletObjects[ind].offsetx = rivalBulletObjects[ind].offsetx - velRivalBullet;
                else rivalBulletObjects[ind].visible = false;
            } else {
                rivalBulletObjects[ind].visible = false;
            }
        }
    }
}

function moveRivalBulletRight(ind)
{
    var x = ((rivalBulletObjects[ind].offsetx/tick)|0);
    var y = ((rivalBulletObjects[ind].offsety/tick)|0);

    if( x == (((menuBar2.numStep)/tick)|0) ) {
        //if(rivalBulletObjects[ind].offsetx < menuBar2.numStep-1) rivalBulletObjects[ind].offsetx = rivalBulletObjects[ind].offsetx + 1.0;
        rivalBulletObjects[ind].visible = false;
    } else if( (x) < (((menuBar2.numStep)/tick)|0) ) {
        if( (rivalBulletObjects[ind].offsety/tick - y < delta) ) {
            if(battleMap[y][(((rivalBulletObjects[ind].offsetx+tick)/tick)|0)] === 0 ) {
                rivalBulletObjects[ind].offsety = (y+0.0)*tick;
                if(rivalBulletObjects[ind].offsetx < menuBar2.numStep-(velRivalBullet-1.0))
                    rivalBulletObjects[ind].offsetx = rivalBulletObjects[ind].offsetx + velRivalBullet;
                else rivalBulletObjects[ind].visible = false;
            } else {
                rivalBulletObjects[ind].visible = false;
            }
        } else if( (rivalBulletObjects[ind].offsety/tick - y > (1.0 - delta)) ) {
            if(battleMap[y+1][(((rivalBulletObjects[ind].offsetx+tick)/tick)|0)] === 0 ) {
                rivalBulletObjects[ind].offsety = (y+1.0)*tick;
                if(rivalBulletObjects[ind].offsetx < menuBar2.numStep-(velRivalBullet-1.0))
                    rivalBulletObjects[ind].offsetx = rivalBulletObjects[ind].offsetx + velRivalBullet;
                else rivalBulletObjects[ind].visible = false;
            } else {
                rivalBulletObjects[ind].visible = false;
            }
        } else {
            if( (battleMap[y][(((rivalBulletObjects[ind].offsetx+tick)/tick)|0)] === 0 ) &&
                (battleMap[y+1][(((rivalBulletObjects[ind].offsetx+tick)/tick)|0)] === 0 ) )
            {
                if(rivalBulletObjects[ind].offsetx < menuBar2.numStep-(velRivalBullet-1.0))
                    rivalBulletObjects[ind].offsetx = rivalBulletObjects[ind].offsetx + velRivalBullet;
                else rivalBulletObjects[ind].visible = false;
            } else {
                rivalBulletObjects[ind].visible = false;
            }
        }
    }
}

function setRivalBullet(ind)
{
    rivalBulletObjects[ind].visible = rivalObjects[ind].visible;
    rivalBulletObjects[ind].type = rivalObjects[ind].type;

    rivalBulletObjects[ind].offsetx = rivalObjects[ind].offsetx;
    rivalBulletObjects[ind].offsety = rivalObjects[ind].offsety;

    rivalBulletObjects[ind].x = menuBar2.boardOffsetWidth2 +
            ((rivalBulletObjects[ind].offsetx+offsetBullet)*(battleWidth - menuBar2.boardOffsetWidth2 * menuBar2.boardCoefWidth2)) / menuBar2.numStep;
    rivalBulletObjects[ind].y = menuBar2.boardOffsetHeight2 +
            ((rivalBulletObjects[ind].offsety+offsetBullet)*(battleHeight - menuBar2.boardOffsetHeight2 * menuBar2.boardCoefHeight2)) / menuBar2.numStep;
}

function moveRivalBullets(num)
{
    //console.log("<<<>>>");

    var ind = 0;
    for (ind = 0; ind < rivalMaxPiece; ind++)
    {
        if(rivalObjects[ind].visible === true) {
            if(rivalBulletObjects[ind].visible === false) {
                rivalBulletObjects[ind].visible = rivalObjects[ind].visible;
                rivalBulletObjects[ind].type = rivalObjects[ind].type;

                rivalBulletObjects[ind].offsetx = rivalObjects[ind].offsetx;
                rivalBulletObjects[ind].offsety = rivalObjects[ind].offsety;

            }

            if(rivalBulletObjects[ind].type === moveUp) { //Up
                moveRivalBulletUp(ind);
            } else if(rivalBulletObjects[ind].type === moveDown) { //Down
                moveRivalBulletDown(ind);
            } else if(rivalBulletObjects[ind].type === moveLeft) { //Left
                moveRivalBulletLeft(ind);
            } else if(rivalBulletObjects[ind].type === moveRight) { //Right
                moveRivalBulletRight(ind);
            }

            if( ((((panzerObject.offsetx)/tick)|0) === (((rivalBulletObjects[ind].offsetx)/tick)|0)) &&
                ((((panzerObject.offsety)/tick)|0) === (((rivalBulletObjects[ind].offsety)/tick)|0)) )
            {
                if(panzerObject.visible === true) {
                    panzerObject.visible = false;
                    rivalBulletObjects[ind].visible = false;
                }
                menuBar2.gameOver = true;
                dialogLose.open();
            }

            rivalBulletObjects[ind].x = menuBar2.boardOffsetWidth2 +
                    ((rivalBulletObjects[ind].offsetx+offsetBullet)*(battleWidth - menuBar2.boardOffsetWidth2 * menuBar2.boardCoefWidth2)) / menuBar2.numStep;
            rivalBulletObjects[ind].y = menuBar2.boardOffsetHeight2 +
                    ((rivalBulletObjects[ind].offsety+offsetBullet)*(battleHeight - menuBar2.boardOffsetHeight2 * menuBar2.boardCoefHeight2)) / menuBar2.numStep;
        }
    }
}

