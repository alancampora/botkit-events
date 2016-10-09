

function Event(daysGap, startingDate, data){
    
    this.startingDate = new Date(startingDate);
    this.daysGap = daysGap || 7 ; 
    this.formattedData = [];
    this.peopleData = data;

}

Event.prototype.formatData = function(){

    for(var key in this.peopleData){
        var data = this.peopleData[key];
           var birthday = new Date(this.convertStrToDateStr(data.birthday));       
           var anniversary = new Date(this.convertStrToDateStr(data.sovanta));
           this.formattedData.push({
                name: key,
                birthday: birthday, 
                anniversary: anniversary 
           })
        }
}

Event.prototype.upcomingEvents = function(){
    var birthdays = this.formattedData.filter(person => this.isUpcomingEvent(person.birthday))
        .map(person => ({
            name: person.name, 
            birthay:person.birthday
        }));
    var anniversaries = this.formattedData.filter(person => this.isUpcomingEvent(person.anniversary))
        .map(person => ({
            name:person.name, 
            anniversary:person.anniversary
        })) ;

    return {'birthdays': birthdays, 'anniversaries': anniversaries};
}

Event.prototype.convertStrToDateStr = function(str){
    var newStr = str.split('/');
    return newStr[1] + '/' + newStr[0] + '/' + newStr[2];
}

Event.prototype.newDateWithGap = function(begin){
    var newDate = new Date(begin.getTime() + this.daysGap * 86400000 );
    newDate.setHours(0,0,0,0);
    return newDate;
}

Event.prototype.isUpcomingEvent = function(eventDate){
    var start = this.startingDate;
    var end = this.newDateWithGap(this.startingDate);

    return this.isDateBigger(eventDate,start) && !this.isDateBigger(eventDate,end);
}        

Event.prototype.isDateBigger = function(date1, date2){
    var isBiggerInSameMonth = date1.getUTCDate() >= date2.getUTCDate() && date1.getUTCMonth() >= date2.getUTCMonth(); 
    var isBiggerInDifferentMonth = date1.getUTCDate() <= date2.getUTCDate()  && date1.getUTCMonth() > date2.getUTCMonth() 
    
    return isBiggerInSameMonth || isBiggerInDifferentMonth;
}

module.exports = Event;
