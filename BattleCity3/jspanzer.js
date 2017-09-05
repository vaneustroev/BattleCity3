/* This script file handles panzer logic

Battle City 2
Vladimir Neustroev
www.vanmed.narod.ru
vaneustroev@gmail.com
2017.08.01

*/

function initPanzerType(randomx, randomy)
{
    var indexType;
    var randomType;

    indexType = 0.0;
    while(indexType < 4) {
        randomType = ((Math.random()*4.0)|0);
        if(randomType === moveUp) { //Up
            if(randomy > 0){
                if(battleMap[randomy-1][randomx] === 0) {
                    panzerObject.type = moveUp;
                }
            }
        } else if(randomType === moveDown) { //Down
            if(randomy < ((numStep/tick)|0)) {
                if(battleMap[randomy+1][randomx] === 0) {
                    panzerObject.type = moveDown;
                }
            }
        } else if(randomType === moveLeft) { //Left
            if(randomx > 0){
                if(battleMap[randomy][randomx-1] === 0) {
                    panzerObject.type = moveLeft;
                }
            }
        } else if(randomType === moveRight) { //Right
            if(randomx < ((numStep/tick)|0)) {
                if(battleMap[randomy][randomx+1] === 0) {
                    panzerObject.type = moveRight;
                }
            }
        }
        indexType = indexType + 1.0;
    }
}

function initPanzerCoordinate(panzerObject)
{
    var indexCoord;
    var randomx;
    var randomy;

    indexCoord = 0.0;
    while(indexCoord < 256.0) {
        randomx = (Math.random()*12.0)|0;
        randomy = (Math.random()*12.0)|0;
        if(battleMap[randomy][randomx] === 0) {
            panzerObject.offsetx = randomx * tick;
            panzerObject.offsety = randomy * tick;

            initPanzerType(randomx, randomy);

            break;
        }
        indexCoord = indexCoord + 1.0;
    }
}

function initPanzers(num)
{
    panzerComponent = Qt.createComponent("ItemPanzer.qml");
    panzerObject = panzerComponent.createObject(screenFirst, {"x": 100, "y": 100});
    panzerObject.index = 1;
    panzerObject.presence = 1;
    panzerObject.width = 0.9*itemWidth;
    panzerObject.height = 0.9*itemHeight;

    initPanzerCoordinate(panzerObject);

    panzerObject.x = menuBar2.boardOffsetWidth2 +
            (panzerObject.offsetx*(battleWidth - menuBar2.boardOffsetWidth2 * menuBar2.boardCoefWidth2)) / menuBar2.numStep;
    panzerObject.y = menuBar2.boardOffsetHeight2 +
            (panzerObject.offsety*(battleHeight - menuBar2.boardOffsetHeight2 * menuBar2.boardCoefHeight2)) / menuBar2.numStep;

}

function directionPanzer(num)
{
    panzerObject.type = num;
}

function sleep(milliseconds)
{
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function restartPanzer()
{
    initPanzerCoordinate(panzerObject);

    panzerObject.x = menuBar2.boardOffsetWidth2 +
            (panzerObject.offsetx*(battleWidth - menuBar2.boardOffsetWidth2 * menuBar2.boardCoefWidth2)) / menuBar2.numStep;
    panzerObject.y = menuBar2.boardOffsetHeight2 +
            (panzerObject.offsety*(battleHeight - menuBar2.boardOffsetHeight2 * menuBar2.boardCoefHeight2)) / menuBar2.numStep;

    panzerObject.visible = true;
}

function movePanzerUp(num)
{
    var x = ((panzerObject.offsetx/tick)|0);
    var y = ((panzerObject.offsety/tick)|0);

    if( y == 0 ) {
        if(panzerObject.offsety > (velPanzer-1.0) ) panzerObject.offsety = panzerObject.offsety - velPanzer;
    } else if( (y) > 0) {
        if( (panzerObject.offsetx/tick - x < delta) ) {
            if(battleMap[(((panzerObject.offsety-1.0)/tick)|0)][x] === 0 ) {
                panzerObject.offsetx = (x+0.0)*tick;
                if(panzerObject.offsety > (velPanzer-1.0)) panzerObject.offsety = panzerObject.offsety - velPanzer;
            } else {
            }
        } else if( (panzerObject.offsetx/tick - x > (1.0 - delta)) ) {
            if(battleMap[(((panzerObject.offsety-1.0)/tick)|0)][x+1] === 0 ) {
                panzerObject.offsetx = (x+1.0)*tick;
                if(panzerObject.offsety > (velPanzer-1.0)) panzerObject.offsety = panzerObject.offsety - velPanzer;
            } else {
            }
        } else {
            if( (battleMap[(((panzerObject.offsety-1.0)/tick)|0)][x] === 0 ) && (battleMap[(((panzerObject.offsety-1.0)/tick)|0)][x+1] === 0 ) ) {
                if(panzerObject.offsety > (velPanzer-1.0)) panzerObject.offsety = panzerObject.offsety - velPanzer;
            } else {
            }
        }
    }
}

function movePanzerDown(num)
{
    var x = ((panzerObject.offsetx/tick)|0);
    var y = ((panzerObject.offsety/tick)|0);

    if( y == (((menuBar2.numStep)/tick)|0) ) {
        //if(panzerObject.offsety < menuBar2.numStep-1) panzerObject.offsety = panzerObject.offsety + velPanzer;
    } else if( (y) < (((menuBar2.numStep)/tick)|0) ) {
        var t11 = (y);
        var t41 = panzerObject.offsety;
        if( (panzerObject.offsetx/tick - x < delta) ) {
            if(battleMap[(((panzerObject.offsety+tick)/tick)|0)][x] === 0 ) {
                panzerObject.offsetx = (x+0.0)*tick;
                if(panzerObject.offsety < menuBar2.numStep - (velPanzer-1.0)) panzerObject.offsety = panzerObject.offsety + velPanzer;
            } else {
            }
        } else if( (panzerObject.offsetx/tick - x > (1.0 - delta)) ) {
            if(battleMap[(((panzerObject.offsety+tick)/tick)|0)][x+1] === 0 ) {
                panzerObject.offsetx = (x+1.0)*tick;
                if(panzerObject.offsety < menuBar2.numStep - (velPanzer-1.0)) panzerObject.offsety = panzerObject.offsety + velPanzer;
            } else {
            }
        } else {
            if( (battleMap[(((panzerObject.offsety+tick)/tick)|0)][x] === 0 ) && (battleMap[(((panzerObject.offsety+tick)/tick)|0)][x+1] === 0 ) ) {
                if(panzerObject.offsety < menuBar2.numStep - (velPanzer-1.0)) panzerObject.offsety = panzerObject.offsety + velPanzer;
            } else {
            }
        }
    }
}

function movePanzerLeft(num)
{
    var x = ((panzerObject.offsetx/tick)|0);
    var y = ((panzerObject.offsety/tick)|0);

    if( x == 0 ) {
        if(panzerObject.offsetx > (velPanzer-1.0)) panzerObject.offsetx = panzerObject.offsetx - velPanzer;
    } else if( x > 0 ) {
        if( (panzerObject.offsety/tick - y < delta) ) {
            if(battleMap[y][(((panzerObject.offsetx-1.0)/tick)|0)] === 0 ) {
                panzerObject.offsety = (y+0.0)*tick;
                if(panzerObject.offsetx > (velPanzer-1.0)) panzerObject.offsetx = panzerObject.offsetx - velPanzer;
            } else {
            }
        } else if( (panzerObject.offsety/tick - y > (1.0 - delta)) ) {
            if(battleMap[y+1][(((panzerObject.offsetx-1.0)/tick)|0)] === 0 ) {
                panzerObject.offsety = (y+1.0)*tick;
                if(panzerObject.offsetx > (velPanzer-1.0)) panzerObject.offsetx = panzerObject.offsetx - velPanzer;
            } else {
            }
        } else {
            if( (battleMap[y][(((panzerObject.offsetx-1.0)/tick)|0)] === 0 ) && (battleMap[y+1][(((panzerObject.offsetx-1.0)/tick)|0)] === 0 ) ) {
                if(panzerObject.offsetx > (velPanzer-1.0)) panzerObject.offsetx = panzerObject.offsetx - velPanzer;
            } else {
            }
        }
    }
}

function movePanzerRight(num)
{
    var x = ((panzerObject.offsetx/tick)|0);
    var y = ((panzerObject.offsety/tick)|0);

    if( x == (((menuBar2.numStep)/tick)|0) ) {
        //if(panzerObject.offsetx < menuBar2.numStep-1) panzerObject.offsetx = panzerObject.offsetx + velPanzer;
    } else if( (x) < (((menuBar2.numStep)/tick)|0) ) {
        if( (panzerObject.offsety/tick - y < delta) ) {
            if(battleMap[y][(((panzerObject.offsetx+tick)/tick)|0)] === 0 ) {
                panzerObject.offsety = (y+0.0)*tick;
                if(panzerObject.offsetx < menuBar2.numStep-(velPanzer-1.0)) panzerObject.offsetx = panzerObject.offsetx + velPanzer;
            } else {
            }
        } else if( (panzerObject.offsety/tick - y > (1.0 - delta)) ) {
            if(battleMap[y+1][(((panzerObject.offsetx+tick)/tick)|0)] === 0 ) {
                panzerObject.offsety = (y+1.0)*tick;
                if(panzerObject.offsetx < menuBar2.numStep-(velPanzer-1.0)) panzerObject.offsetx = panzerObject.offsetx + velPanzer;
            } else {
            }
        } else {
            if( (battleMap[y][(((panzerObject.offsetx+tick)/tick)|0)] === 0 ) && (battleMap[y+1][(((panzerObject.offsetx+tick)/tick)|0)] === 0 ) ) {
                if(panzerObject.offsetx < menuBar2.numStep-(velPanzer-1.0)) panzerObject.offsetx = panzerObject.offsetx + velPanzer;
            } else {
            }
        }
    }
}

function movePanzer(num)
{
    if(panzerObject.type === moveUp) { //Up
        movePanzerUp(num);
    } else if(panzerObject.type === moveDown) { //Down
        movePanzerDown(num);
    } else if(panzerObject.type === moveLeft) { //Left
        movePanzerLeft(num);
    } else if(panzerObject.type === moveRight) { //Right
        movePanzerRight(num);
    }

    panzerObject.x = menuBar2.boardOffsetWidth2 +
            (panzerObject.offsetx*(battleWidth - menuBar2.boardOffsetWidth2 * menuBar2.boardCoefWidth2)) / menuBar2.numStep;
    panzerObject.y = menuBar2.boardOffsetHeight2 +
            (panzerObject.offsety*(battleHeight - menuBar2.boardOffsetHeight2 * menuBar2.boardCoefHeight2)) / menuBar2.numStep;

    //console.log("<<<>>> ");

}

