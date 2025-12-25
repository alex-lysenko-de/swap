function AssessmentMatrix(arrOfUserIds, arrOfTableIds, options = {}) { // builder + smartMatrix decorator (design patterns)
    var _this = this;
    var smartMatrix = null;
    var userTablePassedFlags = {}; // Store bOtherTablesPassed flag for each user

    const sUSER_PRIORITY = 'userPriority';
    const sROOM_PRICE = 'roomPrice';
    const sTABLE_PRICE = 'tablePrice';
    const sPREVIOUS_PLACE_PRICE = 'previousPlacePrice';
    const cellAttributes = [sUSER_PRIORITY, sROOM_PRICE, sTABLE_PRICE, sPREVIOUS_PLACE_PRICE];

    this.setUserPriorities = function (users) {
        users.forEach(user => {
            smartMatrix.row(user.id).set(sUSER_PRIORITY, parseInt(user.base_priority));
        });
    };

    this.setPreferredRoom = function (userId, arrOfTableIds) {
        arrOfTableIds.forEach(tableId => {
            smartMatrix.row(userId).cell(tableId).set(sROOM_PRICE, options.preferredRoomWeight);
        });
    };

    this.setPreferredTables = function (userId, arrOfTableIds, bOtherTablesPassed) {
        // Save the flag for this user
        userTablePassedFlags[userId] = (bOtherTablesPassed === "1" || bOtherTablesPassed === 1);

        // Add bonus to preferred tables
        arrOfTableIds.forEach(tableId => {
            smartMatrix.row(userId).cell(tableId).set(sTABLE_PRICE, options.preferredTableWeight);
        });
    };

    this.setPreviousPlace = function (userId, tableId) {
        smartMatrix.row(userId).cell(tableId).set(sPREVIOUS_PLACE_PRICE, options.previousPlaceWeight);
    };

    this.getMatrix = function () {
        var result = smartMatrix.getValues(cellAttributes,
            (userPriority, roomPrice, tablePrice, previousPlacePrice) => {
                // Base weight = user priority * multiplier
                var baseWeight = userPriority * options.priorityWeight;

                // Add bonuses for preferences
                var bonuses = (roomPrice || 0) + (tablePrice || 0) + (previousPlacePrice || 0);

                return baseWeight + bonuses;
            });

        // Post-processing: apply bOtherTablesPassed flags
        arrOfUserIds.forEach((userId, userIndex) => {
            var otherTablesPassed = userTablePassedFlags[userId];

            // If flag is not set (undefined), it means the user didn't specify a particular table
            // In this case otherTablesPassed is considered = true (all tables are suitable)
            if (otherTablesPassed === undefined) {
                otherTablesPassed = true;
            }

            // If bOtherTablesPassed = 0 (other tables are NOT suitable)
            if (!otherTablesPassed) {
                arrOfTableIds.forEach((tableId, tableIndex) => {
                    var cellValue = result[userIndex][tableIndex];
                    var userPriority = parseInt(smartMatrix.row(userId).get(sUSER_PRIORITY));
                    var baseWeight = userPriority * options.priorityWeight;

                    // If cell weight = base weight (without bonuses), it means the table is NOT preferred
                    if (cellValue === baseWeight) {
                        result[userIndex][tableIndex] = options.nullValue;
                    }
                });
            }
        });

        return result;
    };

    this.mapResultArrToUserTableArr = function (results) {
        return results.map(item => {
            let i = item[0];
            let j = item[1];
            let tableId = (j < 0) ? j : arrOfTableIds[j];
            return [arrOfUserIds[i], tableId];
        });
    };

    function setDefaultOptions() {
        if (!options.hasOwnProperty('nullValue')) {
            options.nullValue = -1000; // Categorically unsuitable place
        }
        if (!options.hasOwnProperty('priorityWeight')) {
            options.priorityWeight = 10; // User priority multiplier
        }
        if (!options.hasOwnProperty('preferredRoomWeight')) {
            options.preferredRoomWeight = 1; // Preferred room weight
        }
        if (!options.hasOwnProperty('preferredTableWeight')) {
            options.preferredTableWeight = 1; // Preferred table weight
        }
        if (!options.hasOwnProperty('previousPlaceWeight')) {
            options.previousPlaceWeight = 0.5; // Previous place weight (less than preferences)
        }
    }

    function init() {
        setDefaultOptions();
        smartMatrix = new SmartMatrix();
        smartMatrix.setKeys(arrOfUserIds, arrOfTableIds);
    }

    init();
}


function AssessmentMatrixSpec() {
    var _this = this;

    this.testCreation = function () {
        console.log('testCreation');
        var priorityWeight = 10;
        var am = new AssessmentMatrix([1, 2, 3], [1, 2], { priorityWeight: priorityWeight });
        var users = [
            { id: 1, name: 'Alex', position: 'Praktikant', base_priority: '1' },
            { id: 2, name: 'Björn', position: 'Mitarbeiter', base_priority: '1' },
            { id: 3, name: 'Dominik', position: 'Mitarbeiter', base_priority: '1' },
        ];
        am.setUserPriorities(users);
        var matrix = am.getMatrix();
        if ((matrix.length != 3) || (matrix[0].length != 2)) {
            console.log(JSON.stringify(matrix));
            console.error('matrix 3x2 expected');
        }
        if (matrix[0][0] != 10) { // 1 * 10 = 10
            console.log('Actual:', matrix[0][0]);
            console.error('expected base weight = 10 (priority 1 * weight 10)');
        }
        console.log('✓ testCreation passed');
    }

    this.testUserPriorities = function () {
        console.log('testUserPriorities');
        var priorityWeight = 10;
        var am = new AssessmentMatrix([1, 2, 3], [1, 2], { priorityWeight: priorityWeight });
        var users = [
            { id: 1, name: 'Alex', position: 'Praktikant', base_priority: '1' },
            { id: 2, name: 'Björn', position: 'Mitarbeiter', base_priority: '3' },
            { id: 3, name: 'Dominik', position: 'Mitarbeiter', base_priority: '5' },
        ];
        am.setUserPriorities(users);
        var matrix = am.getMatrix();

        // Expected weights: priority * 10
        var expected = [[10, 10], [30, 30], [50, 50]];
        var actual = matrix;

        if (JSON.stringify(expected) !== JSON.stringify(actual)) {
            console.log('Expected:', JSON.stringify(expected));
            console.log('Actual:', JSON.stringify(actual));
            console.error('User priorities not calculated correctly');
        } else {
            console.log('✓ testUserPriorities passed');
        }
    }

    this.testPreferredRoom = function () {
        console.log('testPreferredRoom');
        var priorityWeight = 10;
        var preferredRoomWeight = 1;
        var am = new AssessmentMatrix([1, 2], [1, 2, 3], {
            priorityWeight: priorityWeight,
            preferredRoomWeight: preferredRoomWeight
        });
        var users = [
            { id: 1, name: 'Alex', base_priority: '2' },
            { id: 2, name: 'Björn', base_priority: '2' }
        ];
        am.setUserPriorities(users);
        am.setPreferredRoom(1, [1, 2]); // User 1 prefers room with tables 1,2
        am.setPreferredRoom(2, [3]);    // User 2 prefers room with table 3

        var matrix = am.getMatrix();
        // User 1: tables 1,2 should have weight 20+1=21, table 3 - weight 20
        // User 2: tables 1,2 should have weight 20, table 3 - weight 20+1=21
        var expected = [[21, 21, 20], [20, 20, 21]];
        var actual = matrix;

        if (JSON.stringify(expected) !== JSON.stringify(actual)) {
            console.log('Expected:', JSON.stringify(expected));
            console.log('Actual:', JSON.stringify(actual));
            console.error('Preferred room weights not calculated correctly');
        } else {
            console.log('✓ testPreferredRoom passed');
        }
    }

    this.testPreferredTables = function () {
        console.log('testPreferredTables');
        var priorityWeight = 10;
        var am = new AssessmentMatrix([1, 2], [1, 2, 3], {
            priorityWeight: priorityWeight,
            preferredRoomWeight: 1,
            preferredTableWeight: 1
        });
        var users = [
            { id: 1, name: 'Alex', base_priority: '2' },
            { id: 2, name: 'Björn', base_priority: '2' }
        ];
        am.setUserPriorities(users);
        am.setPreferredRoom(1, [1, 2]);
        am.setPreferredTables(1, [1], "1"); // Table 1 is preferred, but others are also suitable
        am.setPreferredRoom(2, [3]);

        var matrix = am.getMatrix();
        // User 1: table 1 = 20+1(room)+1(table)=22, table 2 = 20+1(room)=21, table 3 = 20
        // User 2: table 3 = 20+1(room)=21, tables 1,2 = 20
        var expected = [[22, 21, 20], [20, 20, 21]];
        var actual = matrix;

        if (JSON.stringify(expected) !== JSON.stringify(actual)) {
            console.log('Expected:', JSON.stringify(expected));
            console.log('Actual:', JSON.stringify(actual));
            console.error('Preferred table weights not calculated correctly');
        } else {
            console.log('✓ testPreferredTables passed');
        }
    }

    this.testOtherTablesNotPassed = function () {
        console.log('testOtherTablesNotPassed');
        var priorityWeight = 10;
        var nullValue = -1000;
        var am = new AssessmentMatrix([1], [1, 2, 3], {
            priorityWeight: priorityWeight,
            nullValue: nullValue
        });
        var users = [{ id: 1, name: 'Alex', base_priority: '3' }];
        am.setUserPriorities(users);
        am.setPreferredTables(1, [1], "0"); // ONLY table 1, others are NOT suitable

        var matrix = am.getMatrix();
        // Table 1 = 30+1=31, tables 2,3 = -1000 (not suitable)
        var expected = [[31, -1000, -1000]];
        var actual = matrix;

        if (JSON.stringify(expected) !== JSON.stringify(actual)) {
            console.log('Expected:', JSON.stringify(expected));
            console.log('Actual:', JSON.stringify(actual));
            console.error('bOtherTablesPassed=0 not working correctly');
        } else {
            console.log('✓ testOtherTablesNotPassed passed');
        }
    }

    this.testPreviousPlace = function () {
        console.log('testPreviousPlace');
        var priorityWeight = 10;
        var previousPlaceWeight = 0.5;
        var am = new AssessmentMatrix([1, 2], [1, 2], {
            priorityWeight: priorityWeight,
            previousPlaceWeight: previousPlaceWeight
        });
        var users = [
            { id: 1, name: 'Alex', base_priority: '2' },
            { id: 2, name: 'Björn', base_priority: '2' }
        ];
        am.setUserPriorities(users);
        am.setPreviousPlace(1, 1); // User 1 sat at table 1 yesterday
        am.setPreviousPlace(2, 2); // User 2 sat at table 2 yesterday

        var matrix = am.getMatrix();
        // User 1: table 1 = 20+0.5=20.5, table 2 = 20
        // User 2: table 1 = 20, table 2 = 20+0.5=20.5
        var expected = [[20.5, 20], [20, 20.5]];
        var actual = matrix;

        if (JSON.stringify(expected) !== JSON.stringify(actual)) {
            console.log('Expected:', JSON.stringify(expected));
            console.log('Actual:', JSON.stringify(actual));
            console.error('Previous place weights not calculated correctly');
        } else {
            console.log('✓ testPreviousPlace passed');
        }
    }

    this.testComplexScenario = function () {
        console.log('testComplexScenario');
        var priorityWeight = 10;
        var am = new AssessmentMatrix([1, 2, 3], [1, 2, 3], {
            priorityWeight: priorityWeight,
            preferredRoomWeight: 1,
            preferredTableWeight: 1,
            previousPlaceWeight: 0.5
        });
        var users = [
            { id: 1, name: 'Praktikant', base_priority: '1' },  // Low priority
            { id: 2, name: 'Mitarbeiter', base_priority: '3' },  // Medium priority
            { id: 3, name: 'Manager', base_priority: '5' }       // High priority
        ];
        am.setUserPriorities(users);

        // User 1: prefers table 1, others are suitable, was at table 1 yesterday
        am.setPreferredTables(1, [1], "1");
        am.setPreviousPlace(1, 1);

        // User 2: prefers table 1, others are suitable
        am.setPreferredTables(2, [1], "1");

        // User 3: no preferences

        var matrix = am.getMatrix();

        // User 1: table 1 = 10+1+0.5=11.5, tables 2,3 = 10
        // User 2: table 1 = 30+1=31, tables 2,3 = 30
        // User 3: all tables = 50

        console.log('User 1 (priority 1) at table 1:', matrix[0][0], '(expected: 11.5)');
        console.log('User 2 (priority 3) at table 1:', matrix[1][0], '(expected: 31)');
        console.log('User 3 (priority 5) at table 1:', matrix[2][0], '(expected: 50)');

        // Check that User 3 (priority 5) always wins
        if (matrix[2][0] > matrix[1][0] && matrix[1][0] > matrix[0][0]) {
            console.log('✓ testComplexScenario passed - higher priority always wins!');
        } else {
            console.error('Priority ordering is broken!');
        }
    }

    this.runAllTests = function () {
        console.log('========================================');
        console.log('AssessmentMatrix Tests Started');
        console.log('========================================');
        _this.testCreation();
        _this.testUserPriorities();
        _this.testPreferredRoom();
        _this.testPreferredTables();
        _this.testOtherTablesNotPassed();
        _this.testPreviousPlace();
        _this.testComplexScenario();
        console.log('========================================');
        console.log('All Tests Completed');
        console.log('========================================');
    }
}