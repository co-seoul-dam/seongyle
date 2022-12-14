// class  start
class Tile
{
	constructor(x, y, scrapAmount, owner, units, recycler, canBuild, canSpawn, inRangeOfRecycler)
	{
		this.x = x;
		this.y = y;
		this.scrapAmount = scrapAmount;
		this.owner = owner;
		this.units = units;
		this.recycler = recycler;
		this.canBuild = canBuild;
		this.canSpawn = canSpawn;
		this.inRangeOfRecycler = inRangeOfRecycler;
	}

	// actions
	move(amount, toX, toY) {
		process.stdout.write(`MOVE ${amount} ${this.x} ${this.y} ${toX} ${toY};`);
	}

	spawn(amount) {
		process.stdout.write(`SPAWN ${amount} ${this.x} ${this.y};`);
	}
};

class Player
{	
	constructor(tiles, myMatter, oppMatter)
	{
		this.tiles = tiles;
		this.myTiles = tiles.filter(tile => tile.owner === 1);
		this.foeTiles = tiles.filter(tile => tile.owner === 0);
		this.neutralTiles = tiles.filter(tile => tile.owner === -1);
		this.myMatter = myMatter;
		this.oppMatter = oppMatter;
		this.endure = 0;
	}

	takeStrategy() {
		// switch strategy in proper condition
		this.randomWalk();
	}

	randomWalk() {
		this.myTiles.forEach( tile => {
			const amount = 1;
			this._moveRandom(tile);
			if (tile.canSpawn && this.myMatter >= 10)
				tile.spawn(amount);
			}
		)
		process.stdout.write('\n');
	}

	// private utils
	_moveRandom(tile) {
		const step = 1;
		const amount = tile.units;
		const uniform_data = Math.random();
		let toX = tile.x;
		let toY = tile.y;

		if (tile.units <= 0)
			return ;
		if (uniform_data < 0.25)
			toX += step;
		else if (uniform_data < 0.5)
			toY += step;
		else if (uniform_data < 0.75)
			toX -= step;
		else if (uniform_data < 1)
			toY -= step;
		toX = this._xInMap(toX);
		toY = this._yInMap(toY);
		this.endure += 1;
		if (this.endure <= 42 && (this.tiles[toX + toY * width].scrapAmount <= 0 || this.tiles[toX + toY * width].owner === 1))
		{
			this._moveRandom(tile);
			this.endure = 0;
			return ;
		}
		tile.move(amount, toX , toY);
	}

	_xInMap = (value) => {
		if (value < width && value >= 0) {
			return value;
		}
		if (value >= width) {
			return this._xInMap(2 * (width - 1) - value);
		}
		if (value < 0) {
			return this._xInMap(-value);
		}
	}
	_yInMap = (value) => {
		if (value < height && value >= 0) {
			return value;
		}
		if (value >= height) {
			return this._yInMap(2 * (height - 1) - value);
		}
		if (value < 0) {
			return this._yInMap(-value);
		}
	}
}

// class end

var inputs = readline().split(' ');
const width = parseInt(inputs[0]);
const height = parseInt(inputs[1]);
let turnCount = 0;

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
	turnCount += 1;
}
