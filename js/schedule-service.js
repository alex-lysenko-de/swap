function ScheduleService(dayNavigatorService, floorPlanService, seatDistributionLogic) {
    var _this = this;
    var scheduleStorage = new ScheduleStorage();

    this.getDaySchedule = function (planId, date) {
        let schedule = createDaySchedule(planId, date.getTime());
        console.log('schedule for ', date.toISODate(), schedule);
        return schedule; //!!! remove this line after test

        // let schedule = scheduleStorage.get(planId, date);
        if (!schedule) {
            date = dayNavigatorService.getPrevDate(date);
            schedule = scheduleStorage.get(planId, date);
        }
        return (schedule) ? schedule : [];
    };

    this.createAllDays = function (planId) {
        var days = dayNavigatorService.getDayArray();
        let schedule = {};
        days.forEach(day => {
            var daySchedule = createDaySchedule(planId, day);
            const date = new Date(day);            
            schedule[date.toISODate()] = daySchedule;
        });
        scheduleStorage.setAll(planId, schedule);
    };

    function createDaySchedule(planId, timestamp) {
        const tables = floorPlanService.getTables(planId);
        const userDict = dayNavigatorService.getUserRequests(timestamp);
        return seatDistributionLogic.createDaySchedule(userDict, tables);
    }
}