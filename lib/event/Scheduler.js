function Scheduler(){
    
}

Scheduler.prototype.scheduleEvent = function(oEvent,runningDay,interval){
    //should check every hour if current day is runningDay and now is 10.00 am` 
    setInterval(function(){
       var date = new Date(); 
       if(date.getDay() === runningDay && date.getHours() === 10){
            oEvent.upcomingEvents(); 
       }

    },interval);
}

module.exports = Scheduler;
