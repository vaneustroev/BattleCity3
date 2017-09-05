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
    id: bullet

    property int type: 0
    property int presence: 0
    property int index: 0
    property double offsetx: 0.0
    property double offsety: 0.0
    property string name: "bullet"

    Image {
        id: img
        visible: true
        width: 0.3*itemWidth
        height: 0.3*itemHeight

        source: {
            if (type == 0)
                return "bulletUp.jpg";
            else if (type == 1)
                return "bulletDown.jpg";
            else if (type == 2)
                return "bulletLeft.jpg";
            else if (type == 3)
                return "bulletRight.jpg";
            else
                return "greenStone.png";
        }

        onXChanged: {
            console.log("Bullet.qml onXChanged() presence " + presence);
            if(presence == 1){
                parent.visible = true
            } else {
                parent.visible = false
            }
        }

        onYChanged: {
            console.log("Bullet.qml onYChanged() presence " + presence);
            if(presence == 1){
                parent.visible = true
            } else {
                parent.visible = false
            }
        }
    }
}
//![0]
