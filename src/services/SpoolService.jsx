export default {
    getSpools() {
        return spools;
    },
    getspoolById(id) {
        return spools.find((spool) => spool.id == id)
    },
    getActiveSpools() {
        return spools.filter((spool) => spool.isArchived === false);
    },
    getArchivedSpools() {
        return spools.filter((spool) => spool.isArchived === true);
    }
}

const spools = [
    {
        id: 1,
        name: "italy",
        format: "Super 8",
        stock: "Vision3 50D",
        type: "Daylight",
        stockType: "Color Negative",
        status: "standby",
        isArchived: false
    },
    {
        id: 2,
        name: "Cali",
        format: "Super 16",
        stock: "Vision3 200T",
        type: "Tungsten",
        stockType: "Color Negative",
        status: "at-lab",
        isArchived: false
    },
    {
        id: 3,
        name: "Backyard Test",
        format: "Super 8",
        stock: "Tri-X 7266",
        type: "Daylight/Tungsten",
        stockType: "B&W Reversal",
        status: "shooting",
        isArchived: false
    },
    {
        id: 4,
        name: "Beach Day",
        format: "Super 8",
        stock: "Ektachrome 100D",
        type: "Daylight",
        stockType: "Color Reversal",
        status: "exposed",
        isArchived: false
    },
    {
        id: 5,
        name: "Shaky Knees Fest",
        format: "Super 8",
        stock: "Vision3 500T",
        type: "Tungsten",
        stockType: "Color Negative",
        status: "received",
        isArchived: false
    },
    {
        id: 6,
        name: "Orlando",
        format: "Super 8",
        stock: "Vision3 50D",
        type: "Daylight",
        stockType: "Color Negative",
        status: "shooting",
        isArchived: true
    },
    {
        id: 7,
        name: "atlanta",
        format: "Super 8",
        stock: "Ektachrome 100D",
        type: "Daylight",
        stockType: "Color Reversal",
        status: "standby",
        isArchived: false
    },
    {
        id: 8,
        name: "Cleveland",
        format: "Super 8",
        stock: "Vision3 200T",
        type: "Tungsten",
        stockType: "Color Negative",
        status: "at-lab",
        isArchived: false
    },
    {
        id: 9,
        name: "Rigby",
        format: "Super 8",
        stock: "Tri-X 7266",
        type: "Daylight/Tungsten",
        stockType: "B&W Reversal",
        status: "standby",
        isArchived: false
    },
    {
        id: 10,
        name: "Indoor Dinner",
        format: "35mm",
        stock: "Vision3 500T",
        type: "Tungsten",
        stockType: "Color Negative",
        status: "received",
        isArchived: true
    }
]