var Cylon = require('cylon');

// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .device("nav", {
        driver: "ardrone-nav",
        connection: "ardrone"
    })
    .on("ready", fly);

var bot;
// Fly the bot
function fly(robot) {
    bot = robot;

    bot.drone.config('general:navdata_demo', 'TRUE');

    //bot.nav.on("navdata", function(data) {

    //});

    //bot.nav.on("altitudeChange", function(data) {
       // console.log("Altitude:", data);
       // if (altitude > 1) {
          //  bot.drone.land();
      //  }
    //});
    bot.drone.disableEmergency();
    bot.drone.ftrim();
// Take off
    bot.drone.takeoff();
    after(5*1000, function(){

    bot.drone.left(0.2);});
    after(5*1000, function() {
            bot.drone.left(0);
            bot.drone.right(0.2);
        });



    after(5*1000, function() {
            bot.drone.right(0);
            bot.drone.land();
            bot.drone.stop();

    });


}






Cylon.start();