/*

Battle City 2
Vladimir Neustroev
www.vanmed.narod.ru
vaneustroev@gmail.com
2017.08.01

*/

import QtQuick 2.7
import QtQuick.Window 2.2
import QtQuick.Controls 2.0

ApplicationWindow {
    id: appItem
    visible: true
    width: 640
    height: 690
    title: qsTr("Battle City 2")

    property bool exitFlag: false
    property int partition: height

    signal qmlExit()

    MainForm {
        anchors.fill: parent
        //mouseArea.onClicked: {
        //    Qt.quit();
        //}
        focus: true
        Keys.onPressed: {
            if (event.key === Qt.Key_Left) {
                //console.log("move left id:actionContainer ");
            } else {
                //console.log("onPressed 1 id:actionContainer ")
            }
            event.accepted = false; //true;
        }
    }

    onClosing: {
        console.log("onClosing: ")
        exitFlag = true
        appItem.qmlExit()
    }

    //onActiveChanged: {
    //    //if (!active) appChooser.visible = false;
    //    console.log("<<<>>> onActiveChanged: ");
    //}

}

