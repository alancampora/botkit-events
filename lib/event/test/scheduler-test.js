var sinon = require('sinon');
var Scheduler = require('../Scheduler');
var Event = require('../Event');

var oScheduler = new Scheduler();

describe('scheduleEvent',function(){

    before(function() {
    });

    after(function() {
        this.clock.restore();
    });
    
    it('should run on friday(5) 10 am', function(){
        //setup
        var oEvent = new Event(); 
        var date = new Date(2016,9,7,9,0,0);
        this.clock = sinon.useFakeTimers(date.getTime());

        var upcomingEvents = sinon.stub(oEvent, 'upcomingEvents'); 

        //execute
        oScheduler.scheduleEvent(oEvent,5, 60*60*1000);
        this.clock.tick(60*60*1000);
       
        //assert
        sinon.assert.calledOnce(upcomingEvents);

        //clean
        upcomingEvents.restore();

    });
});
