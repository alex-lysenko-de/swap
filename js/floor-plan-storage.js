const FLOOR_PLAN_BASE_NAME = "FloorPlan";

function FloorPlanStorage() {
    var _this = this;
    this.loadFloorPlan = function (planId) {
        var st = localStorage.getItem(FLOOR_PLAN_BASE_NAME + planId);
        var plan = (st) ? JSON.parse(st) : floorPlanMocks[planId];
        return plan;
    };

    this.saveFloorPlan = function (planId, plan) {
        fixFloorPlan(plan);
        localStorage.setItem(FLOOR_PLAN_BASE_NAME + planId, JSON.stringify(plan));
    };

    this.resetFloorPlan = function (planId) {
        localStorage.setItem(FLOOR_PLAN_BASE_NAME + planId, "");
    };

    this.getRoomList = function (planId) {
        const plan = _this.loadFloorPlan(planId);
        const result = [];
        plan.rooms.forEach(room => {
            const item = { id: room.id };
            let nameArr = plan.rnames.filter(rname => rname.roomId == room.id);
            item.name = (nameArr.length) ? nameArr[0].text : `Room (id=${room.id})`;
            result.push(item);
        });
        return result;
    };

    this.getTables = function (planId, roomId = null) {
        const plan = _this.loadFloorPlan(planId);
        const tables = (roomId) ? plan.tables.filter(table => table.roomId == roomId) : plan.tables;
        return tables;
    };

    // ---------------------------
    // FIX FLOORPLAN IMPLEMENTATION
    // ---------------------------
    function fixFloorPlan(plan) {
        if (!plan) return;

        // 1) Rooms: assign ids based on sorted rids.text (numeric if possible)
        if (Array.isArray(plan.rids) && Array.isArray(plan.rooms)) {
            assignRoomIdsFromRids(plan);
        } else {
            // fallback: ensure rooms have some ids
            ensureSequentialIds(plan.rooms);
        }

        // 2) rnames/rids: set their roomId by point-in-room (inclusive)
        if (Array.isArray(plan.rnames)) {
            assignPointItemsToRooms(plan.rnames, plan.rooms, 'roomId');
            // ensure rnames have id if needed
            ensureIds(plan.rnames);
        }
        if (Array.isArray(plan.rids)) {
            assignPointItemsToRooms(plan.rids, plan.rooms, 'roomId');
            ensureIds(plan.rids);
        }

        // 3) Tables: set sequential ids 1..N, set roomId by rect-in-room (or center fallback)
        if (Array.isArray(plan.tables)) {
            plan.tables.forEach((t, i) => { t.id = i + 1; });
            assignRectItemsToRooms(plan.tables, plan.rooms, 'roomId');
            // 4) inRoomId: group by roomId and sort top->bottom then left->right
            fixInGroupId(plan.tables, 'roomId', 'inRoomId');
        }

        // finally reorder rooms array by ascending id (so rooms[0].id === 1 ...)
        if (Array.isArray(plan.rooms)) {
            plan.rooms.sort((a, b) => (a.id || 0) - (b.id || 0));
        }
    }

    // ---------------------------
    // Helpers
    // ---------------------------

    function parseAsNumberIfPossible(s) {
        const n = parseFloat(s);
        return isFinite(n) ? n : null;
    }

    function assignRoomIdsFromRids(plan) {
        const rooms = plan.rooms;
        const rids = plan.rids.slice(); // shallow copy

        // sort rids by numeric text if possible, otherwise lexicographically
        rids.sort((a, b) => {
            const na = parseAsNumberIfPossible(a.text);
            const nb = parseAsNumberIfPossible(b.text);
            if (na !== null && nb !== null) return na - nb;
            if (na !== null) return -1;
            if (nb !== null) return 1;
            return String(a.text).localeCompare(String(b.text));
        });

        // clear current room ids (we'll assign new ones)
        // but preserve other properties
        // assign id = position in sorted rids for the room that contains the rid point
        let assignedRoomIds = new Set();
        for (let i = 0; i < rids.length; i++) {
            const rid = rids[i];
            const targetId = i + 1;
            // find first room containing the rids point (inclusive)
            const foundRoom = rooms.find(r => isPointInRoomInclusive(rid.left, rid.top, r));
            if (foundRoom) {
                foundRoom.id = targetId;
                assignedRoomIds.add(foundRoom);
                // also mark rid.roomId to be consistent
                rid.roomId = foundRoom.id;
            } else {
                // If not found, try matching by rname coords (if exist) or skip
                // keep rid.roomId null
            }
        }

        // For any rooms still without id assign next sequential ids
        let maxAssigned = rooms.reduce((m, r) => Math.max(m, r.id || 0), 0);
        rooms.forEach(r => {
            if (!r.hasOwnProperty('id') || r.id === null) {
                maxAssigned++;
                r.id = maxAssigned;
            }
        });
    }

    function ensureIds(arr) {
        if (!Array.isArray(arr)) return;
        let maxId = getMaxValue(arr, 'id');
        arr.forEach(item => {
            if (!item.hasOwnProperty('id')) {
                maxId++;
                item.id = maxId;
            }
        });
    }

    function ensureSequentialIds(arr) {
        if (!Array.isArray(arr)) return;
        arr.forEach((item, idx) => {
            item.id = idx + 1;
        });
    }

    function isPointInRoomInclusive(x, y, room) {
        if (!room) return false;
        const x1 = room.left;
        const x2 = room.left + room.width;
        const y1 = room.top;
        const y2 = room.top + room.height;
        return (x >= x1 && x <= x2 && y >= y1 && y <= y2);
    }

    function isRectInRoomInclusive(tbl, room) {
        if (!room || !tbl) return false;
        const rx1 = room.left;
        const rx2 = room.left + room.width;
        const ry1 = room.top;
        const ry2 = room.top + room.height;

        const t1x = tbl.left;
        const t2x = tbl.left + (tbl.width || 0);
        const t1y = tbl.top;
        const t2y = tbl.top + (tbl.height || 0);

        return (t1x >= rx1 && t2x <= rx2 && t1y >= ry1 && t2y <= ry2);
    }

    function assignPointItemsToRooms(itemsArr, roomsArr, sKey) {
        if (!Array.isArray(itemsArr) || !Array.isArray(roomsArr)) return;
        itemsArr.forEach(item => {
            const x = item.left;
            const y = item.top;
            const cont = roomsArr.find(r => isPointInRoomInclusive(x, y, r));
            item[sKey] = cont ? cont.id : null;
        });
    }

    function assignRectItemsToRooms(itemsArr, roomsArr, sKey) {
        if (!Array.isArray(itemsArr) || !Array.isArray(roomsArr)) return;
        itemsArr.forEach(item => {
            // try full-rect containment first
            const cont = roomsArr.find(r => isRectInRoomInclusive(item, r));
            if (cont) {
                item[sKey] = cont.id;
                return;
            }
            // fallback: use center point of item
            const cx = (item.left || 0) + (item.width || 0) / 2;
            const cy = (item.top  || 0) + (item.height || 0) / 2;
            const cont2 = roomsArr.find(r => isPointInRoomInclusive(cx, cy, r));
            item[sKey] = cont2 ? cont2.id : null;
        });
    }

    function fixInGroupId(arr, key, inGroupKey) {
        if (!Array.isArray(arr)) return;
        // group by key value (roomId)
        const groups = arr.reduce((acc, item) => {
            const k = (item.hasOwnProperty(key) && item[key] != null) ? String(item[key]) : '__undefined__';
            if (!acc[k]) acc[k] = [];
            acc[k].push(item);
            return acc;
        }, {});

        Object.keys(groups).forEach(groupKey => {
            const group = groups[groupKey];
            // Sort top -> then left (both ascending). If top equal within a small epsilon,
            // we still sort by left.
            group.sort((a, b) => {
                if (a.top === b.top) return (a.left || 0) - (b.left || 0);
                return (a.top || 0) - (b.top || 0);
            });
            group.forEach((item, idx) => {
                item[inGroupKey] = idx + 1;
            });
        });
    }

    function getMaxValue(arr, key) {
        if (!Array.isArray(arr) || arr.length === 0) return 0;
        let maxVal = -Infinity;
        arr.forEach(item => {
            const val = (item && item.hasOwnProperty(key)) ? item[key] : -Infinity;
            if (val > maxVal) maxVal = val;
        });
        return (maxVal === -Infinity) ? 0 : maxVal;
    }
}
