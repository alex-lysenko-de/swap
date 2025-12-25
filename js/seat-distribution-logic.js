// Constants for weights
const PRIORITY_WEIGHT = 10;              // User priority multiplier (guarantees highest priority wins)
const PREFERRED_ROOM_WEIGHT = 1;         // Preferred room weight
const PREFERRED_TABLE_WEIGHT = 1;        // Preferred table weight
const PREVIOUS_PLACE_WEIGHT = 0.5;       // Previous place weight (less than user preferences)
const NULL_VALUE = -1000;                // Categorically unsuitable place

function SeatDistributionLogic(userService) {  // director (design pattern)
    var _this = this;

    /**
     * Creates a schedule for the day
     * @param {Map} userRequestDict - Dictionary of user requests: userId => [items]
     * @param {Array} tables - Array of tables [{id, roomId, ...}]
     * @param {Array} previousSchedule - Previous day's schedule [[userId, tableId], ...]
     * @returns {Array} - Optimal schedule [[userId, tableId], ...]
     */
    this.createDaySchedule = function (userRequestDict, tables, previousSchedule = []) {
        var arrOfUserIds = userRequestDict.keys();
        var arrOfTableIds = tables.map(table => table.id);
        var users = userService.get(arrOfUserIds);

        // Create assessment matrix with configured weights
        var am = new AssessmentMatrix(arrOfUserIds, arrOfTableIds, {
            priorityWeight: PRIORITY_WEIGHT,
            preferredRoomWeight: PREFERRED_ROOM_WEIGHT,
            preferredTableWeight: PREFERRED_TABLE_WEIGHT,
            previousPlaceWeight: PREVIOUS_PLACE_WEIGHT,
            nullValue: NULL_VALUE
        });

        // Set base user priorities
        am.setUserPriorities(users);

        // Set room preferences
        setPreferredRooms(am, userRequestDict, tables);

        // Set table preferences considering the bOtherTablesPassed flag
        setPreferredTables(am, userRequestDict);

        // Consider users' previous places
        setPreviousPlaces(am, previousSchedule);

        // Run Hungarian algorithm
        var schedule = runHungarian(am);

        return schedule;
    }

    /**
     * Sets user preferences for tables
     * @param {AssessmentMatrix} am - Assessment matrix
     * @param {Map} userRequestDict - Dictionary of user requests
     */
    function setPreferredTables(am, userRequestDict) {
        userRequestDict.forEach((items, userId) => {
            // Filter items with specified tableId
            var tableRequests = items.filter(item => item.tableId);

            if (tableRequests.length > 0) {
                // Take the bOtherTablesPassed flag from the first request
                // (assuming that for all tables of one user the flag is the same)
                var bOtherTablesPassed = tableRequests[0].bOtherTablesPassed;

                // Get array of preferred table IDs
                var arrOfTableIds = tableRequests.map(item => item.tableId);

                // Set preferences considering the flag
                am.setPreferredTables(userId, arrOfTableIds, bOtherTablesPassed);
            }
        });
    }

    /**
     * Sets user preferences for rooms
     * @param {AssessmentMatrix} am - Assessment matrix
     * @param {Map} userRequestDict - Dictionary of user requests
     * @param {Array} tables - Array of tables
     */
    function setPreferredRooms(am, userRequestDict, tables) {
        userRequestDict.forEach((items, userId) => {
            // Filter items with specified roomId
            var arrOfRoomIds = items.filter(item => item.roomId).map(item => item.roomId);

            // For each preferred room, find all tables in it
            arrOfRoomIds.forEach(roomId => {
                var arrOfTableIds = tables
                    .filter(table => table.roomId == roomId)
                    .map(table => table.id);

                // Set bonus for all tables in this room
                am.setPreferredRoom(userId, arrOfTableIds);
            });
        });
    }

    /**
     * Sets bonuses for users' previous places
     * @param {AssessmentMatrix} am - Assessment matrix
     * @param {Array} previousSchedule - Previous day's schedule
     */
    function setPreviousPlaces(am, previousSchedule) {
        previousSchedule.forEach(pair => {
            var userId = pair[0];
            var tableId = pair[1];

            // Add a small bonus for the fact that the user sat at this table yesterday
            // This helps avoid "wandering" around the office, but doesn't outweigh explicit preferences
            am.setPreviousPlace(userId, tableId);
        });
    }

    /**
     * Runs Hungarian algorithm to find optimal assignment
     * @param {AssessmentMatrix} matrix - Assessment matrix
     * @returns {Array} - Assignment result [[userId, tableId], ...]
     */
    function runHungarian(matrix) {
        var hungarianMatrix = matrix.getMatrix();
        var hungarianAlgorithm = new HungarianAdapter();
        var results = hungarianAlgorithm.execute(hungarianMatrix);
        return matrix.mapResultArrToUserTableArr(results);
    }
}


/**
 * Usage example:
 *
 * // Initialization
 * var userService = new UserService();
 * var logic = new SeatDistributionLogic(userService);
 *
 * // Data preparation
 * var userRequests = new Map();
 * userRequests.set("1", [
 *     {
 *         id: 1,
 *         userId: "1",
 *         roomId: "1",           // Prefers room 1
 *         tableId: "4",          // Specifically prefers table 4
 *         bOtherTablesPassed: "1", // Other tables are also suitable
 *         from: 1765148400000,
 *         to: 1767135600000,
 *         days: 31
 *     }
 * ]);
 *
 * userRequests.set("2", [
 *     {
 *         id: 2,
 *         userId: "2",
 *         roomId: "2",
 *         tableId: "7",
 *         bOtherTablesPassed: "0", // ONLY table 7, others are NOT suitable
 *         from: 1765148400000,
 *         to: 1767135600000,
 *         days: 31
 *     }
 * ]);
 *
 * var tables = [
 *     {id: "1", roomId: "1", capacity: 1},
 *     {id: "4", roomId: "1", capacity: 1},
 *     {id: "7", roomId: "2", capacity: 1},
 *     // ...
 * ];
 *
 * var previousSchedule = [
 *     ["1", "4"],  // Yesterday user 1 sat at table 4
 *     ["2", "6"]   // Yesterday user 2 sat at table 6
 * ];
 *
 * // Schedule creation
 * var schedule = logic.createDaySchedule(userRequests, tables, previousSchedule);
 *
 * // Result: [["1", "4"], ["2", "7"], ...]
 */