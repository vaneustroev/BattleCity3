/*

Battle City 2
Vladimir Neustroev
www.vanmed.narod.ru
vaneustroev@gmail.com
2017.08.01

*/

import QtQuick 2.7
//import QtQuick.Controls 1.2
import QtQuick.Dialogs 1.2
import QtTest 1.1
import "jsbullet.js" as BulletScript
import "jspanzer.js" as PanzerScript
import "jsrival.js" as RivalScript
import "jsrivalbullet.js" as RivalBulletScript

Rectangle {
    id: screenFirst
    objectName: "ScreenFirst"
    focus: true

    //the menuName is accessible from outside this QML file
    property string menuName: "ScreenSecond"
    property bool initLevel1: false
    property double itemHeight: height / 16
    property double itemWidth: width / 16
    property int battleHeight: menuBar2.menuRectHeight //height
    property int battleWidth: menuBar2.menuRectWidth //width

    //property list<int> listOfItems
    signal notifyRefresh()
    onNotifyRefresh:dirView.model = directory.files

    //generous amount of screen space that will allow the buttons to fit
    width: 640
    height: 690

    color: "#6C646A"
    gradient: Gradient{
        GradientStop { position: 0.0; color: "#6C646A" }
        GradientStop { position: 1.0; color: Qt.darker("#6A6D6A") }
    }

    function startLevel1() {
        console.log("_v_ info007 ")
        if(initLevel1==false) {
            BulletScript.initBullets(1);
            PanzerScript.initPanzers(1);
            RivalScript.initRivals(1);
            RivalBulletScript.initRivalBullets(1)
            RivalScript.animateRivals(1);
            initLevel1 = true;
        }
        forceActiveFocus();
    }

    function setState(msg, number) {
        //console.log("_v_ msg = ", msg, " number = ", number, " Math.random() = ", Math.random())
        if(gameOver == false) {
            BulletScript.moveBullet(1);
            PanzerScript.movePanzer(1);
            RivalScript.moveRivals(1);
            RivalBulletScript.moveRivalBullets(1)
        }
    }

    function setWorld(msg) {
        //console.log("_v_ msg = ", msg)
        if(gameOver == false) {
            RivalScript.animateRivals(1);
        }
    }

    function setRivalBullet(ind) {
        RivalBulletScript.setRivalBullet(ind);
    }

    //Directory {
    //    id: directory
    //}

    MessageDialog {
        id: dialogWin
        title: "Message"
        text: "Congratulations! You Win ! Start new game ?"
        icon: StandardIcon.Question
        standardButtons: StandardButton.Yes | StandardButton.No

        //Component.onCompleted: visible = true
        //onRejected: console.log("aborted")

        onYes: {
            console.log("Start new game !")
            RivalScript.restartRivals();
            RivalScript.animateRivals(1);
            PanzerScript.restartPanzer();
            gameOver = false
        }
        onNo: {
            //console.log("Quit")
            exitFlag = true
            appItem.qmlExit()
            PanzerScript.sleep(200)
            Qt.quit()
        }
    }

    MessageDialog {
        id: dialogLose
        title: "Message"
        text: "You Lose ! Start new game ?"
        icon: StandardIcon.Question
        standardButtons: StandardButton.Yes | StandardButton.No

        //Component.onCompleted: visible = true
        //onRejected: console.log("aborted")

        onYes: {
            console.log("Start new game !")
            RivalScript.restartRivals();
            RivalScript.animateRivals(1);
            PanzerScript.restartPanzer();
            gameOver = false
        }
        onNo: {
            //console.log("Quit")
            exitFlag = true
            appItem.qmlExit()
            PanzerScript.sleep(200)
            Qt.quit()
        }
    }

    Keys.onPressed: {
        if(event.key === Qt.Key_Up) {
            PanzerScript.directionPanzer(0);
        } else if(event.key === Qt.Key_Down) {
            PanzerScript.directionPanzer(1);
        } else if(event.key === Qt.Key_Left) {
            PanzerScript.directionPanzer(2);
        } else if (event.key === Qt.Key_Right) {
            PanzerScript.directionPanzer(3);
        } else if (event.key === Qt.Key_Space) {
            BulletScript.fireBullet();
        }

        event.accepted = false; //true;

        //console.log("onPressed info001 ") << "test"
    }

    Component.onCompleted: console.log("_v_ info001 ")

    //a sub-rectangle allows the flexibility of setting the row area
    Rectangle{
        id: actionContainer

        //make this rectangle invisible
        color: "transparent"
        //anchors.centerIn: parent
        anchors.top: parent.top

        //the height is a good proportion that creates more space at the top of the row of buttons
        width: parent.width; height: itemHeight

        Row{
            anchors.centerIn: parent
            spacing: parent.width/16

            Button{
                id: stopButton
                buttonColor: "lightgrey"
                label: "Level I"

                onButtonClick: {
                    menuListView.currentIndex = 0
                }
            }
            Button{
                id: saveButton
                buttonColor: "lightgrey"
                label: "Level II"

                onButtonClick: {
                    menuListView.currentIndex = 1
                }
            }
            Button{
                id: prevButton
                buttonColor: "lightgrey"
                label: "Level III"

                onButtonClick: {
                    menuListView.currentIndex = 2
                }
            }
        }

        Rectangle {
            y: itemHeight
            height: itemHeight*15
            width: parent.width

            focus: true
            Keys.onPressed: {
                if (event.key == Qt.Key_Left) {
                    console.log("move left");
                    event.accepted = false; //true;
                }
                console.log("onPressed 1")
            }

            Item {
                y: itemHeight
                width: parent.width
                height: itemHeight*15
                anchors { top: parent.top; bottom: parent.bottom }

                //Component.onCompleted: console.log("<<<>>> ScreenSecond.qml Item Component.onCompleted() ")

                Image {
                    id: background
                    source: "BattleCityLevel1.jpg"

                    property int score: 0

                    width: parent.width
                    height: parent.height

                    anchors.centerIn: parent

                }

            }

        }

    }

}

