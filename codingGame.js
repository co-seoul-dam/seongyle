/* class */

class Map
{
	constructor(height, width) {
		this.height = height;
		this.width = width;
	}

	getCenter() {
		return [this.height/2,  this.width];
	}

	getHeight() {
		return this.height;
	}
	getWidth() {
		return this.width;
	}
};

class Tile
{
	constructor(x, y, scrapAmount, owner, units, recycler, canBuild, canSpawn, inRangeOfRecycler)
	{
		this.x = x
		this.y = y 
		this.scrapAmount = scrapAmount 
		this.owner = owner
		this.units = units
		this.recycler = recycler
		this.canBuild = canBuild 
		this.canSpawn = canSpawn
		this.inRangeOfRecycler = inRangeOfRecycler 
	}
};


var inputs = readline().split(' ');
const width = parseInt(inputs[0]);
const height = parseInt(inputs[1]);


const map = new Map(width, height);
let tiles = [];

// game loop
while (true) {
	var inputs = readline().split(' ');
	const myMatter = parseInt(inputs[0]);
	const oppMatter = parseInt(inputs[1]);
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			var inputs = readline().split(' ');
			const scrapAmount = parseInt(inputs[0]);
			const owner = parseInt(inputs[1]); // 1 = me, 0 = foe, -1 = neutral
			const units = parseInt(inputs[2]);
			const recycler = parseInt(inputs[3]);
			const canBuild = parseInt(inputs[4]);
			const canSpawn = parseInt(inputs[5]);
			const inRangeOfRecycler = parseInt(inputs[6]);
			const tile = new Tile(i, j, scrapAmount, owner, units, recycler, canBuild, canSpawn, inRangeOfRecycler);
			tiles.push(tile);
		}
	}
}
