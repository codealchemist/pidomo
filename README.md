pidomo
======

Pidomo is an experiment with domotics using the RaspberryPi.

It contains a small server and client built using nodejs.
It communicates over serial interface with slaves created using PIC16F628A.

For the time being it's able to turn electrical devices on and off.

Installation
------------

    git clone https://github.com/codealchemist/pidomo.git
    cd pidomo
    bower install
    npm install
    grunt
    
    
Use
---
Start the server:

    clear; node index.js

Now point your browser to your RaspberryPi's hostname or IP address at port 3200.


PICs implementation
-------------------
TODO.
