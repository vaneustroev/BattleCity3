/*

Battle City 2
Vladimir Neustroev
www.vanmed.narod.ru
vaneustroev@gmail.com
2017.08.01

*/

//![0]
import QtQuick 2.7

Item {
    id: panzer

    property int type: 0
    property int presence: 0
    property int index: 0
    property double offsetx: 0.0
    property double offsety: 0.0
    property string name: "panzer"
    //anchors {
    //    top: parent.top;
    //    bottom: parent.bottom
    //}

    Image {
        id: img
        visible: true
        //opacity: 0.9
        width: 0.9*itemWidth
        height: 0.9*itemHeight
        //x: menuBar2.boardOffset + (offsetPanzerX*(battleWidth-menuBar2.boardOffset*2)) / 130.0;

        //anchors.centerIn: parent
        //anchors.fill: parent

        source: {
            if (type == 0)
                return "myTankUp.jpg";
            else if (type == 1)
                return "myTankDown.jpg";
            else if (type == 2)
                return "myTankLeft.jpg";
            else if (type == 3)
                return "myTankRight.jpg";
            else if (type == 10)
                return "TankUp.jpg";
            else if (type == 11)
                return "TankDown.jpg";
            else if (type == 12)
                return "TankLeft.jpg";
            else if (type == 13)
                return "TankRight.jpg";
            else
                return "greenStone.png";
        }

        onXChanged: {
            console.log("Panzer.qml onXChanged() presence " + presence);
            if(presence == 1){
                parent.visible = true
            } else {
                parent.visible = false
            }
        }

        onYChanged: {
            console.log("Panzer.qml onYChanged() presence " + presence);
            if(presence == 1){
                parent.visible = true
            } else {
                parent.visible = false
            }
        }
    }
}
//![0]
