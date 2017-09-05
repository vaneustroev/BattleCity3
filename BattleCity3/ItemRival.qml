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
    id: rival

    property int type: 0
    property int presence: 0
    property int index: 0
    property double offsetx: 0.0
    property double offsety: 0.0
    property string name: "rival"

    Image {
        id: img
        visible: true
        width: 0.9*itemWidth
        height: 0.9*itemHeight

        source: {
            if (type == 0)
                return "TankUp.jpg";
            else if (type == 1)
                return "TankDown.jpg";
            else if (type == 2)
                return "TankLeft.jpg";
            else if (type == 3)
                return "TankRight.jpg";
            else
                return "greenStone.png";
        }

        onXChanged: {
            console.log("Rival.qml onXChanged() presence " + presence);
            if(presence == 1){
                parent.visible = true
            } else {
                parent.visible = false
            }
        }

        onYChanged: {
            console.log("Rival.qml onYChanged() presence " + presence);
            if(presence == 1){
                parent.visible = true
            } else {
                parent.visible = false
            }
        }
    }
}
//![0]
