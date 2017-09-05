TEMPLATE = app

QT += qml quick testlib
CONFIG += c++11

SOURCES += main.cpp

RESOURCES += qml.qrc

# Additional import path used to resolve QML modules in Qt Creator's code model
QML_IMPORT_PATH =

# Default rules for deployment.
include(deployment.pri)

HEADERS += \
    onlyforexit.h

win32 {
    CONFIG(debug, debug|release) {
        message(Win32_debug)

        INCLUDEPATH += c:/gm/boost_1_62_0
        LIBS += -Lc:/gm/boost_1_62_0/stage/lib \
                -llibboost_serialization-vc120-mt-gd-1_62 \
                -llibboost_filesystem-vc120-mt-gd-1_62 \
                -llibboost_system-vc120-mt-gd-1_62 \
                -llibboost_thread-vc120-mt-gd-1_62
    }
    CONFIG(release, debug|release) {
        message(Win32_release)

        INCLUDEPATH += c:/gm/boost_1_62_0
        LIBS += -Lc:/gm/boost_1_62_0/stage/lib \
                -llibboost_serialization-vc120-mt-1_62 \
                -llibboost_filesystem-vc120-mt-1_62 \
                -llibboost_system-vc120-mt-1_62 \
                -llibboost_thread-vc120-mt-1_62

    }

}

