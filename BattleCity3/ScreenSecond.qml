/*

Battle City 2
Vladimir Neustroev
www.vanmed.narod.ru
vaneustroev@gmail.com
2017.08.05

*/

import QtQuick 2.7
//import MyLibrary 1.0

Rectangle {
    id: screenSecond
    objectName: "ScreenSecond"
    focus: true

    //the menuName is accessible from outside this QML file
    property string menuName: "ScreenSecond"
    property int itemHeight: height / 16

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

    //function startNewGame() {
    //    console.log("_v_ info001 ")
    //    forceActiveFocus();
    //}

    //Directory {
    //    id: directory
    //}

    function startLevel2() {
        console.log("_v_ info001 ")
        forceActiveFocus();
    }


    Keys.onPressed: {
        if (event.key == Qt.Key_Left) {
            console.log("move left");
            event.accepted = false; //true;
        }
        console.log("onPressed 1")
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
                    source: "BattleCityLevel2.jpg"

                    property int score: 0

                    width: parent.width
                    height: parent.height

                    anchors.centerIn: parent

                }

            }

        }

    }

}

