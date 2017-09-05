/* This script file handles bullets logic

Battle City 2
Vladimir Neustroev
www.vanmed.narod.ru
vaneustroev@gmail.com
2017.08.01

*/

function initRivalType(rivalObject, randomx, randomy)
{
    var indexType;
    var randomType;

    indexType = 0.0;
    while(indexType < 4) {
        randomType = ((Math.random()*4.0)|0);
        if(randomType === moveUp) { //Up
            if(randomy > 0){
                if(battleMap[randomy-1][randomx] === 0) {
                    rivalObject.type = moveUp;
                }
            }
        } else if(randomType === moveDown) { //Down
            if(randomy < ((numStep/tick)|0)) {
                if(battleMap[randomy+1][randomx] === 0) {
                    rivalObject.type = moveDown;
                }
            }
        } else if(randomType === moveLeft) { //Left
            if(randomx > 0){
                if(battleMap[randomy][randomx-1] === 0) {
                    rivalObject.type = moveLeft;
                }
            }
        } else if(randomType === moveRight) { //Right
            if(randomx < ((numStep/tick)|0)) {
                if(battleMap[randomy][randomx+1] === 0) {
                    rivalObject.type = moveRight;
                }
            }
        }
        indexType = indexType + 1.0;
    }
}

function initRivalCoordinate(rivalObject)
{
    var indexCoord;
    var randomx;
    var randomy;

    indexCoord = 0.0;
    while(indexCoord < 256.0) {
        randomx = (Math.random()*12.0)|0;
        randomy = (Math.random()*12.0)|0;
        if(battleMap[randomy][randomx] === 0) {
            rivalObject.offsetx = randomx * tick;
            rivalObject.offsety = randomy * tick;

            initRivalType(rivalObject, randomx, randomy);

            break;
        }
        indexCoord = indexCoord + 1.0;
    }
}

function initRivals(num)
{
    var ind = 0;
    var rivalComponent;
    var rivalObject;

    for (ind = 0; ind < rivalMaxPiece; ind++)
    {
        rivalComponent = Qt.createComponent("ItemRival.qml");
        rivalObject = rivalComponent.createObject(screenFirst, {"x": 100, "y": 100});
        rivalObject.index = 1;
        rivalObject.presence = 0;
        rivalObject.width = 0.9*itemWidth;
        rivalObject.height = 0.9*itemHeight;

        initRivalCoordinate(rivalObject);

        rivalObject.x = menuBar2.boardOffsetWidth2 +
                (rivalObject.offsetx*(battleWidth - menuBar2.boardOffsetWidth2 * menuBar2.boardCoefWidth2)) / menuBar2.numStep;
        rivalObject.y = menuBar2.boardOffsetHeight2 +
                (rivalObject.offsety*(battleHeight - menuBar2.boardOffsetHeight2 * menuBar2.boardCoefHeight2)) / menuBar2.numStep;

        rivalObject.visible = false;

        rivalObjects[ind] = rivalObject;
    }
}

function animateRivals(ind)
{
    var animated = 0;
    var animateMax = ((Math.random()*2.0)|0);

    for (ind = 0; ind < rivalMaxPiece; ind++) {
        if(rivalObjects[ind].visible === false) {
            if(animated < animateMax) {
                initRivalCoordinate(rivalObjects[ind]);

                rivalObjects[ind].x = menuBar2.boardOffsetWidth2 +
                        (rivalObjects[ind].offsetx*(battleWidth - menuBar2.boardOffsetWidth2 * menuBar2.boardCoefWidth2)) / menuBar2.numStep;
                rivalObjects[ind].y = menuBar2.boardOffsetHeight2 +
                        (rivalObjects[ind].offsety*(battleHeight - menuBar2.boardOffsetHeight2 * menuBar2.boardCoefHeight2)) / menuBar2.numStep;

                rivalObjects[ind].visible = true;

                screenFirst.setRivalBullet(ind)

                animated = animated + 1;
            }
        }
    }
}

function restartRivals()
{
    for (var ind = 0; ind < rivalMaxPiece; ind++) {
        initRivalCoordinate(rivalObjects[ind]);

        rivalObjects[ind].x = menuBar2.boardOffsetWidth2 +
                (rivalObjects[ind].offsetx*(battleWidth - menuBar2.boardOffsetWidth2 * menuBar2.boardCoefWidth2)) / menuBar2.numStep;
        rivalObjects[ind].y = menuBar2.boardOffsetHeight2 +
                (rivalObjects[ind].offsety*(battleHeight - menuBar2.boardOffsetHeight2 * menuBar2.boardCoefHeight2)) / menuBar2.numStep;

        rivalObjects[ind].visible = false;

        screenFirst.setRivalBullet(ind)

    }
}

function moveRivalUp(ind)
{
    var x = ((rivalObjects[ind].offsetx/tick)|0);
    var y = ((rivalObjects[ind].offsety/tick)|0);

    if( y == 0 ) {
        if(rivalObjects[ind].offsety > 0.0) rivalObjects[ind].offsety = rivalObjects[ind].offsety - velRival;
        else {
            initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
        }
    } else if( (y) > 0) {
        if( (rivalObjects[ind].offsetx/tick - x < delta) ) {
            if(battleMap[(((rivalObjects[ind].offsety-1.0)/tick)|0)][x] === 0 ) {
                rivalObjects[ind].offsetx = (x+0.0)*tick;
                if(rivalObjects[ind].offsety > 0.0) rivalObjects[ind].offsety = rivalObjects[ind].offsety - velRival;
                else initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            } else {
                initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            }
        } else if( (rivalObjects[ind].offsetx/tick - x > (1.0 - delta)) ) {
            if(battleMap[(((rivalObjects[ind].offsety-1.0)/tick)|0)][x+1] === 0 ) {
                rivalObjects[ind].offsetx = (x+1.0)*tick;
                if(rivalObjects[ind].offsety > 0.0) rivalObjects[ind].offsety = rivalObjects[ind].offsety - velRival;
                else initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            } else {
                initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            }
        } else {
            if( (battleMap[(((rivalObjects[ind].offsety-1.0)/tick)|0)][x] === 0 ) && (battleMap[(((rivalObjects[ind].offsety-1.0)/tick)|0)][x+1] === 0 ) ) {
                if(rivalObjects[ind].offsety > 0.0) rivalObjects[ind].offsety = rivalObjects[ind].offsety - velRival;
                else initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            } else {
                initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            }
        }
    }
}

function moveRivalDown(ind)
{
    var x = ((rivalObjects[ind].offsetx/tick)|0);
    var y = ((rivalObjects[ind].offsety/tick)|0);

    if( y == (((menuBar2.numStep)/tick)|0) ) {
        //if(rivalObjects[ind].offsety < menuBar2.numStep-1) rivalObjects[ind].offsety = rivalObjects[ind].offsety + velRival;
        initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
    } else if( (y) < (((menuBar2.numStep)/tick)|0) ) {
        //if(rivalObjects[ind].offsetx/tick - x == 0.0) {
        if( (rivalObjects[ind].offsetx/tick - x < delta) ) {
            if(battleMap[(((rivalObjects[ind].offsety+tick)/tick)|0)][x] === 0 ) {
                rivalObjects[ind].offsetx = (x+0.0)*tick;
                if(rivalObjects[ind].offsety < menuBar2.numStep) rivalObjects[ind].offsety = rivalObjects[ind].offsety + velRival;
                else initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            } else {
                initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            }
        } else if( (rivalObjects[ind].offsetx/tick - x > (1.0 - delta)) ) {
            if(battleMap[(((rivalObjects[ind].offsety+tick)/tick)|0)][x+1] === 0 ) {
                rivalObjects[ind].offsetx = (x+1.0)*tick;
                if(rivalObjects[ind].offsety < menuBar2.numStep) rivalObjects[ind].offsety = rivalObjects[ind].offsety + velRival;
                else initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            } else {
                initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            }
        } else {
            if( (battleMap[(((rivalObjects[ind].offsety+tick)/tick)|0)][x] === 0 ) && (battleMap[(((rivalObjects[ind].offsety+tick)/tick)|0)][x+1] === 0 ) ) {
                if(rivalObjects[ind].offsety < menuBar2.numStep) rivalObjects[ind].offsety = rivalObjects[ind].offsety + velRival;
                else initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            } else {
                initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            }
        }
    }
}

function moveRivalLeft(ind)
{
    var x = ((rivalObjects[ind].offsetx/tick)|0);
    var y = ((rivalObjects[ind].offsety/tick)|0);

    if( x == 0 ) {
        if(rivalObjects[ind].offsetx > 0.0) rivalObjects[ind].offsetx = rivalObjects[ind].offsetx - velRival;
        else {
            initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
        }
    } else if( x > 0 ) {
        if( (rivalObjects[ind].offsety/tick - y < delta) ) {
            if(battleMap[y][(((rivalObjects[ind].offsetx-1.0)/tick)|0)] === 0 ) {
                rivalObjects[ind].offsety = (y+0.0)*tick;
                if(rivalObjects[ind].offsetx > 0.0) rivalObjects[ind].offsetx = rivalObjects[ind].offsetx - velRival;
                else initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            } else {
                initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            }
        } else if( (rivalObjects[ind].offsety/tick - y > (1.0 - delta)) ) {
            if(battleMap[y+1][(((rivalObjects[ind].offsetx-1.0)/tick)|0)] === 0 ) {
                rivalObjects[ind].offsety = (y+1.0)*tick;
                if(rivalObjects[ind].offsetx > 0.0) rivalObjects[ind].offsetx = rivalObjects[ind].offsetx - velRival;
                else initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            } else {
                initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            }
        } else {
            if( (battleMap[y][(((rivalObjects[ind].offsetx-1.0)/tick)|0)] === 0 ) && (battleMap[y+1][(((rivalObjects[ind].offsetx-1.0)/tick)|0)] === 0 ) ) {
                if(rivalObjects[ind].offsetx > 0.0) rivalObjects[ind].offsetx = rivalObjects[ind].offsetx - velRival;
                else initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            } else {
                initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            }
        }
    }
}

function moveRivalRight(ind)
{
    var x = ((rivalObjects[ind].offsetx/tick)|0);
    var y = ((rivalObjects[ind].offsety/tick)|0);

    if( x == (((menuBar2.numStep)/tick)|0) ) {
        //if(rivalObjects[ind].offsetx < menuBar2.numStep-1) rivalObjects[ind].offsetx = rivalObjects[ind].offsetx + 1.0;
        initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
    } else if( (x) < (((menuBar2.numStep)/tick)|0) ) {
        if( (rivalObjects[ind].offsety/tick - y < delta) ) {
            if(battleMap[y][(((rivalObjects[ind].offsetx+tick)/tick)|0)] === 0 ) {
                rivalObjects[ind].offsety = (y+0.0)*tick;
                if(rivalObjects[ind].offsetx < menuBar2.numStep) rivalObjects[ind].offsetx = rivalObjects[ind].offsetx + velRival;
                else initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            } else {
                initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            }
        } else if( (rivalObjects[ind].offsety/tick - y > (1.0 - delta)) ) {
            if(battleMap[y+1][(((rivalObjects[ind].offsetx+tick)/tick)|0)] === 0 ) {
                rivalObjects[ind].offsety = (y+1.0)*tick;
                if(rivalObjects[ind].offsetx < menuBar2.numStep) rivalObjects[ind].offsetx = rivalObjects[ind].offsetx + velRival;
                else initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            } else {
                initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            }
        } else {
            if( (battleMap[y][(((rivalObjects[ind].offsetx+tick)/tick)|0)] === 0 ) && (battleMap[y+1][(((rivalObjects[ind].offsetx+tick)/tick)|0)] === 0 ) ) {
                if(rivalObjects[ind].offsetx < menuBar2.numStep) rivalObjects[ind].offsetx = rivalObjects[ind].offsetx + velRival;
                else initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            } else {
                initRivalType(rivalObjects[ind], ((rivalObjects[ind].offsetx/tick)|0), ((rivalObjects[ind].offsety/tick)|0));
            }
        }
    }
}

function moveRivals(num)
{
    var ind = 0;
    for (ind = 0; ind < rivalMaxPiece; ind++)
    {
        if(rivalObjects[ind].type === moveUp) { //Up
            moveRivalUp(ind);
        } else if(rivalObjects[ind].type === moveDown) { //Down
            moveRivalDown(ind);
        } else if(rivalObjects[ind].type === moveLeft) { //Left
            moveRivalLeft(ind);
        } else if(rivalObjects[ind].type === moveRight) { //Right
            moveRivalRight(ind);
        }

        if(rivalObjects[ind] !== null) {
            rivalObjects[ind].x = menuBar2.boardOffsetWidth2 +
                    (rivalObjects[ind].offsetx*(battleWidth - menuBar2.boardOffsetWidth2 * menuBar2.boardCoefWidth2)) / menuBar2.numStep;
            rivalObjects[ind].y = menuBar2.boardOffsetHeight2 +
                    (rivalObjects[ind].offsety*(battleHeight - menuBar2.boardOffsetHeight2 * menuBar2.boardCoefHeight2)) / menuBar2.numStep;
        }
    }

    //console.log("<<<>>> ");

}

