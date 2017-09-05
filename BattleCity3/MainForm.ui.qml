import QtQuick 2.7

Rectangle {

    property int partition: height

    width: 360
    height: 360
    property alias menuBar2: menuBar2
    z: 0

    //Item 1: MenuBar2 on the top portion of the screen
    MenuBar2 {
        id: menuBar2
        x: 0
        y: 0
        //anchors.top:parent.top
        width: parent.width
        height: 360
        z: 0
    }
}
