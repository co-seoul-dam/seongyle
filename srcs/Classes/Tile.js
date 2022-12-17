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