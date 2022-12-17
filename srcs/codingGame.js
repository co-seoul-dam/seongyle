import "./Classes/Player.js"
import "./Classes/Tile.js"

var inputs = readline().split(' ');
const width = parseInt(inputs[0]);
const height = parseInt(inputs[1]);
let TURN_COUNT = 0;
const COST = 10;

// game loop
while (true) {
	let tiles = [];
    var inputs = readline().split(' ');
    const myMatter = parseInt(inputs[0]);
    const oppMatter = parseInt(inputs[1]);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            var inputs = readline().split(' ');
            const scrapAmount = parseInt(inputs[0]);
            const owner = parseInt(inputs[1]);
            const units = parseInt(inputs[2]);
            const recycler = parseInt(inputs[3]);
            const canBuild = parseInt(inputs[4]);
            const canSpawn = parseInt(inputs[5]);
            const inRangeOfRecycler = parseInt(inputs[6]);
			const tile = new Tile(j, i, scrapAmount, owner, units, recycler, canBuild, canSpawn, inRangeOfRecycler);
			tiles.push(tile);
        }
    }
	const player = new Player(tiles, myMatter, oppMatter);
	player.takeStrategy();
	TURN_COUNT += 1;
}
