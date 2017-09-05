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
    id: screenThird
    objectName: "ScreenThird"

    //the menuName is accessible from outside this QML file
    property string menuName: "ScreenThird"
    property int itemHeight: height / 16

    //generous amount of screen space that will allow the buttons to fit
    width: 640; height: 690

    color: "#6C646A" 
    gradient: Gradient{
        GradientStop { position: 0.0; color: "#6C646A" }
        GradientStop { position: 1.0; color: Qt.darker("#6A6D6A") }
    }

    function startLevel3() {
        console.log("_v_ info001 ")
        forceActiveFocus();
    }

//    Directory {
//        id: directory
//    }

    //a sub-rectangle allows the flexibility of setting the row area
    Rectangle{
        id:actionContainer

        //make this rectangle invisible
        color:"transparent"
        anchors.top: parent.top

        //the height is a good proportion that creates more space at the top of the row of buttons
        width: parent.width; height: itemHeight

        Row{
            anchors.centerIn: parent
            spacing: parent.width/16

            Button{
                id: startButton
                buttonColor: "lightgrey"
                label: "Level I"

                onButtonClick: {
                    menuListView.currentIndex = 0
                }
            }
            Button{
                id: loadButton
                buttonColor: "lightgrey"
                label: "Level II"

                onButtonClick: {
                    console.log("_v_ info005 ")
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

            Item {
                y: itemHeight
                width: parent.width
                height: itemHeight*15
                anchors { top: parent.top; bottom: parent.bottom }

                //Component.onCompleted: console.log("ScreenThird.qml Component.onCompleted() ")

                Image {
                    id: background
                    source: "BattleCityLevel3.jpg"

                    property int score: 0

                    width: parent.width
                    height: parent.height

                    anchors.centerIn: parent

                }

            }

        }

    }

}

