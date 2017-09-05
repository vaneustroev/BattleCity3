/*

Battle City 2
Vladimir Neustroev
www.vanmed.narod.ru
vaneustroev@gmail.com
2017.08.01

*/

import QtQuick 2.7

Rectangle {
    id: menuBar2

    property int menuRectWidth: parent.width
    property int menuRectHeight: parent.height

    width: menuRectWidth
    height: menuRectHeight

    property color menuBarColor: "darkgrey"
    property double boardOffsetWidth2: menuRectWidth/15.71 //depend from background image
    property double boardOffsetHeight2: menuRectHeight/9.90 //depend from background image
    property double boardCoefWidth2: 3.9 //depend from background image
    property double boardCoefHeight2: 1.9 //depend from background image

    property double numStep: 120.0 //number of object step
    property double tick: 10.0 //number of step of one cell
    property double velPanzer: 1.2 //velocity of panzer
    property double velBullet: 3.0 //velocity of bullet
    property double velRival: 0.4 //velocity of rival
    property double velRivalBullet: 0.8 //velocity of rival bullet
    property double offsetBullet: 3.0

    //delta for moving panzer through the gap
    property double delta: 0.3;
    property bool gameOver: false

    property int moveUp: 0
    property int moveDown: 1
    property int moveLeft: 2
    property int moveRight: 3

    property variant panzerComponent;
    property variant panzerObject;

    property int rivalMaxPiece: 4;
    property variant rivalObjects: new Array(rivalMaxPiece);
    property variant rivalBulletObjects: new Array(rivalMaxPiece);

    //map of battle
    property variant battleMap: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
                [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
                [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0]
    ];

    //signal startnewgame

    //onStartnewgame: {
    //    console.log("_v_ test ")
    //}

    //a list of visual items already have delegates handling their display
    VisualItemModel {
        id: menuListModel

        ScreenFirst {
            id: screenFirst_
            width: menuRectWidth //menuListView.width
            height: menuRectHeight //menuBar2.height //690 //
            color: menuBarColor
        }
        ScreenSecond {
            id: screenSecond_
            width: menuRectWidth //menuListView.width
            height: menuRectHeight //menuListView.height
            color: menuBarColor
        }
        ScreenThird {
            id: screenThird_
            width: menuRectWidth //menuListView.width
            height: menuRectHeight //menuListView.height
            color: menuBarColor
        }
    }

    //list view will display a model according to a delegate
    ListView
    {
        id: menuListView
        anchors.fill: parent
        anchors.bottom: parent.bottom
        width: parent.width
        height: parent.height

        //the model contains the data
        model: menuListModel

        //control the movement of the menu switching
        snapMode: ListView.SnapOneItem
        orientation: ListView.Horizontal
        boundsBehavior: Flickable.StopAtBounds
        flickDeceleration: 5000
        highlightFollowsCurrentItem: true
        highlightMoveDuration: 240
        //highlightMoveSpeed: 65535
        highlightRangeMode: ListView.StrictlyEnforceRange
        interactive : false
        currentIndex: 0

        onCurrentItemChanged: {
            //console.log("_v_ index " + menuListView.currentIndex + " name " + menuListView.currentItem.objectName )
            if(menuListView.currentItem.objectName == "ScreenSecond") {
                screenSecond_.startLevel2()
            } else if(menuListView.currentItem.objectName == "ScreenThird") {
                //screenThird_.loadGame()
                screenThird_.startLevel3()
            } else {
                //screenFirst_.eraseGame()
                screenFirst_.startLevel1()
            }
        }
    }
}

