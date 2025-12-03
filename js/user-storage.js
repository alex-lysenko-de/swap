// TODO: Add an ability to add/remove users dynamically (button "add user" buttons "remove" next to each user select)
// TODO: save users data in local storage
function UserStorage() {
    var _this = this;
    var users = [
        { id: 1, name: 'Alex', position: 'Mitarbeiter', base_priority: '5' },
        { id: 2, name: 'Björn', position: 'Mitarbeiter', base_priority: '5' },
        { id: 3, name: 'Clemens', position: 'Mitarbeiter', base_priority: '5' },
        { id: 4, name: 'Diana', position: 'Mitarbeiter', base_priority: '5' },
        { id: 5, name: 'Dominik', position: 'Mitarbeiter', base_priority: '5' },
        { id: 6, name: 'Lasse', position: 'Mitarbeiter', base_priority: '5' },
        { id: 7, name: 'Marvin', position: 'Mitarbeiter', base_priority: '5' },
        { id: 8, name: 'Max', position: 'Mitarbeiter', base_priority: '5' },
        { id: 9, name: 'Patrick', position: 'Student', base_priority: '3' },
        { id: 10, name: 'Paul', position: 'Student', base_priority: '3' },
        { id: 11, name: 'Otto', position: 'Student', base_priority: '3' },
        { id: 12, name: 'Robin', position: 'Student', base_priority: '3' },
        { id: 13, name: 'Stefan', position: 'Student', base_priority: '3' },
        { id: 14, name: 'Thilo', position: 'Student', base_priority: '3' },
        { id: 15, name: 'Tim', position: 'Student', base_priority: '3' },
        { id: 16, name: 'Viktoria', position: 'Praktikant', base_priority: '1' },
        { id: 17, name: 'Wesley', position: 'Praktikant', base_priority: '1' },
        { id: 18, name: 'Xenia', position: 'Praktikant', base_priority: '1' },
        { id: 19, name: 'Yann', position: 'Praktikant', base_priority: '1' },
        { id: 20, name: 'Zoe', position: 'Praktikant', base_priority: '1' },
    ];

    this.getAll = function (){
        return users;
    }
    this.get = function (userIds) {
        var result = [];
        userIds.forEach(id => {
            var filtered = users.filter(user => user.id == id);
            if (filtered.length) {
                result.push(filtered[0]);
            }
        });
        return result;
    };

}