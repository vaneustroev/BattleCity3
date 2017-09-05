/* Battle City 2
Vladimir Neustroev
www.vanmed.narod.ru
vaneustroev@gmail.com
2017.08.01

*/

#include <QObject>
#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QString>

#include <boost/bind.hpp>
#include <boost/thread/thread.hpp>
//#include <boost/thread/mutex.hpp>
//#include <boost/thread/xtime.hpp>

//#include <boost/shared_ptr.hpp>
//#include <boost/shared_array.hpp>
//#include <boost/enable_shared_from_this.hpp>

//#include <boost/weak_ptr.hpp>
//#include <boost/make_shared.hpp>

#include <boost/date_time.hpp>

#include <mutex>

#include "onlyforexit.h"

OnlyForExit onlyForExit;
std::mutex battleMutex;

struct BattleCityClass
{
    void Engine(QList<QObject*> &items);
    void World(QList<QObject*> &items);
    QObject *screenFirst;
};

void BattleCityClass::Engine(QList<QObject*> &items)
{
    QObject*item(items.at(0));
    if(item != 0)
    {
        boost::posix_time::milliseconds workTime(10);
        //QVariant returnedValue = "returnedValue";
        QVariant msg("Hello from Battle City 2 ! ");
        QVariant number(13);
        {
            std::lock_guard<std::mutex> lock(battleMutex);

            screenFirst = item->findChild<QObject*>("ScreenFirst");
            if (screenFirst) {
                //rect->setProperty("color", "red");
            }
        }
        while (true)
        {
            {
                std::lock_guard<std::mutex> lock(battleMutex);

                if (onlyForExit.exit()) break;

                if (screenFirst) {
                    //qInfo("before invokeMethod() b");
                    //QMetaObject::invokeMethod(screenFirst, "setState", Q_RETURN_ARG(QVariant, returnedValue), Q_ARG(QVariant, msg));
                    QMetaObject::invokeMethod(screenFirst, "setState", Q_ARG(QVariant, msg), Q_ARG(QVariant, number));
                } else {
                    screenFirst = item->findChild<QObject*>("ScreenFirst");
                }
            }
            boost::this_thread::sleep(workTime);
        }
    }
    qInfo("Exit from thread ");
}

void BattleCityClass::World(QList<QObject*> &items)
{
    QObject*item(items.at(0));
    if(item != 0)
    {
        boost::posix_time::seconds workTime(2);
        QVariant msg("Hello World from Battle City 2 ! ");
        {
            std::lock_guard<std::mutex> lock(battleMutex);

            screenFirst = item->findChild<QObject*>("ScreenFirst");
            if (screenFirst) {
                //rect->setProperty("color", "red");
            }
        }
        while (true)
        {
            {
                std::lock_guard<std::mutex> lock(battleMutex);

                if (onlyForExit.exit()) break;

                if (screenFirst) {
                    QMetaObject::invokeMethod(screenFirst, "setWorld", Q_ARG(QVariant, msg));
                } else {
                    screenFirst = item->findChild<QObject*>("ScreenFirst");
                }
            }
            boost::this_thread::sleep(workTime);
        }
    }
    qInfo("Exit from thread ");
}

int main(int argc, char *argv[])
{
    qSetMessagePattern("(%{time process} : %{file} : %{function}() : %{line}) - %{message}");

    BattleCityClass battleCityClass;

    //qmlRegisterType<Directory>("MyLibrary", 1, 0, "Directory");
    //qmlRegisterType<File>("MyLibrary", 1, 0, "File");

    qInfo("before QGuiApplication ");

    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;
    //engine.trimComponentCache();
    //engine.clearComponentCache();
    engine.load(QUrl(QStringLiteral("qrc:/main.qml")));
    QList<QObject*>items( engine.rootObjects() );

    if(items.length()>0) {
        QObject::connect(items[0], SIGNAL(qmlExit()), &onlyForExit, SLOT(slotExit()));

        // boost::bind will be called on this member function internally
        boost::thread battleCityEngineThread(boost::bind(&BattleCityClass::Engine, battleCityClass, boost::ref(items)));
        boost::thread battleCityWorldThread(boost::bind(&BattleCityClass::World, battleCityClass, boost::ref(items)));
        //battleCityEngineThread.join();
        //battleCityWorldThread.join();

        Q_UNUSED(battleCityEngineThread)
        Q_UNUSED(battleCityWorldThread)
    }

    return app.exec();
}

