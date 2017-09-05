#ifndef ONLYFOREXIT_H
#define ONLYFOREXIT_H

#include <QObject>

class OnlyForExit : public QObject
{
    Q_OBJECT

public:
    OnlyForExit():_exit(false) {;}

    bool exit(void) {return _exit;}

public slots:
    void slotExit(void) {
        qInfo("slotExit ");
        _exit = true;
    }

private:
    bool _exit;
};

#endif // ONLYFOREXIT_H
