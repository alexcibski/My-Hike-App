const hikes = [
    {
        name: 'Mount Si',
        miles: 8,
        elevationGain: 3150,
        description: 'Out and back trail to the top of Mount Si',
        city: 'North Bend',
        state: 'WA',
        routePic: 'assets/mtsi.jpeg',
        inclinePic: 'assets/mtsimap.jpeg',
        additionalInfo: 'Trailhead parking lot is open from dawn until dusk. Parking lot is busiest on weekends so plan accordingly.'
    },
    {
        name: 'Baker Lake Trail',
        miles: 9,
        elevationGain: 500,
        description: 'Lakeside trail that follows the east bank of Baker Lake with waterfront campsites every few miles.',
        city: 'Concrete',
        state: 'WA',
        routePic: 'assets/bakerlake.jpeg',
        inclinePic: 'assets/bakerlakemap.jpeg',
        additionalInfo: 'Limited parking at trailhead. Do not forget to self register at station before entering forest.'
    },
    {
        name: 'Cape Falcon Trail',
        miles: 5,
        elevationGain: 597,
        description: 'Lolipop shaped out and back with beautiful coastal views.',
        city: 'Arch Cape',
        state: 'OR',
        routePic: 'assets/capefalcon.jpeg',
        inclinePic: 'assets/capefalconmap.jpeg',
        additionalInfo: 'parking along route 101 as well as a designated parking lot just south of trailhead.'
    },
    {
        name: 'Trail of Ten Falls',
        miles: 7,
        elevationGain: 700,
        description: 'Old growth forest trail that brings hikers to ten different waterfalls.',
        city: 'Mehama',
        state: 'OR',
        routePic: 'assets/polesbridge.jpeg',
        inclinePic: 'assets/tenfallsmap.jpeg',
        additionalInfo: 'Five dollar fee to park a vehicle in the Silver Falls State Park at trailhead.'
    },
    {
        name: 'Blue Lake Trail',
        miles: 4.4,
        elevationGain: 1050,
        description: 'Out and back hike to a beautiful alpine lake',
        city: 'Concrete',
        state: 'WA',
        routePic: 'assets/bluelake.jpeg',
        inclinePic: 'assets/lakepic.jpeg',
        additionalInfo: 'Northwest Forest Pass for parking'
    }
]

//export the seed data to models/index.js
module.exports = hikes