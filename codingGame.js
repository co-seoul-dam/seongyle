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

	move(amount, toX, toY) {
		process.stdout.write(`MOVE ${amount} ${this.x} ${this.y} ${toX} ${toY};`)
	}

	moveRandom() {
		const step = 1;
		const amount = 1; // maybe amount can be random.
		const uniform_data = Math.random();
		console.error(uniform_data)

		if (this.units <= 0)
			return ;
		if (uniform_data < 0.25)
			this.move(amount, this.x + step, this.y);
		else if (uniform_data < 0.5)
			this.move(amount, this.x , this.y + step);
		else if (uniform_data < 0.75)
			this.move(amount, this.x - step, this.y);
		else if (uniform_data < 1)
			this.move(amount, this.x , this.y - step);
		else
			console.error("can't move.");
	}
};


var inputs = readline().split(' ');
const width = parseInt(inputs[0]);
const height = parseInt(inputs[1]);
const map = new Map(width, height);

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
            const owner = parseInt(inputs[1]); // 1 = me, 0 = foe, -1 = neutral
            const units = parseInt(inputs[2]);
            const recycler = parseInt(inputs[3]);
            const canBuild = parseInt(inputs[4]);
            const canSpawn = parseInt(inputs[5]);
            const inRangeOfRecycler = parseInt(inputs[6]);
			const tile = new Tile(j, i, scrapAmount, owner, units, recycler, canBuild, canSpawn, inRangeOfRecycler);
			tiles.push(tile);
        }
    }
	myTiles = tiles.filter(tile => tile.owner === 1)
	myTiles.forEach( tile => {
		tile.moveRandom();
	}
	)
	process.stdout.write('\n');
}
