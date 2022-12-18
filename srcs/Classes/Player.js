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
		if (TURN_COUNT < 20)
			this.occupyCenterLine();
		else
			this.randomWalk();
		process.stdout.write("WAIT");
		process.stdout.write('\n');
	}

	randomWalk() {
		this.myTiles.forEach( tile => {
			const amount = 1;
			this._moveRandom(tile);
			if (tile.canSpawn && this.myMatter >= 10 && this._isGoodPlaceToSpawn(tile)) {
				tile.spawn(amount);
				this.myMatter -= COST;
			}
		})
	}

	occupyCenterLine() {
		// spawn bot at closet tile
		const centerTiles = this.neutralTiles.filter(tile => tile.x === Math.round(width / 2));
		centerTiles.forEach( centerTile => {
			const amount = 1;
			const moveableTiles = this.myTiles.filter(tile => tile.units > 0 && tile.checked === false);
			if (!moveableTiles.length)
				return ;
			const minDist = this._minManhattanDist(centerTile, moveableTiles);
			const closestTile = moveableTiles.find(myTile => this._manhattanDist(myTile, centerTile) === minDist);
			closestTile.checked = true;
			if (closestTile.canSpawn && this.myMatter >= 10 && this._isGoodPlaceToSpawn(closestTile)) {
				closestTile.spawn(amount);
				this.myMatter -= COST;
			};
			// TODO: move method abstract.
			closestTile.move(amount, centerTile.x, centerTile.y);
			this.tiles[closestTile.x + closestTile.y * width].units -= amount;
		})
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

	_isGoodPlaceToSpawn(tile) {
		const currentX = tile.x;
		const currentY = tile.y;
		const upTile = this.tiles[currentX + (currentY + 1) * width];
		const leftTile = this.tiles[currentX - 1 + currentY * width];
		const rightTile = this.tiles[currentX + 1 + currentY * width] ;
		const downTile = this.tiles[currentX + (currentY - 1) * width];

		if (currentX === 0 || currentY === 0 || currentX === width - 1 || currentY === height - 1)
			return false;
		if (upTile.owner === 1 && leftTile.owner === 1 && rightTile.owner === 1 && downTile.owner === 1)
			return false;
		if (upTile.scrapAmount === 0 || leftTile.scrapAmount === 0 || rightTile.scrapAmount === 0 || downTile.scrapAmount === 0)
			return false;
		return true;
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

	_manhattanDist = (tile1, tile2) => {
		return Math.abs(tile1.x - tile2.x) + Math.abs(tile1.y - tile2.y);
	}

	_minManhattanDist = (destTile, tiles) => {
		let min = Infinity;
		tiles.forEach(originTile => {
				if (min > this._manhattanDist(destTile, originTile))
					min = this._manhattanDist(destTile, originTile);
			})
		return min;
	}
}