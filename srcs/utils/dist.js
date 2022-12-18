_manhattanDist = (tile1, tile2) => {
	return Math.abs(tile1.x - tile2.x) + Math.abs(tile1.y - tile2.y);
}

_minManhattanDist = (destTile, tiles) => {
	let min = Infinity;
	tiles.forEach(originTile => {
			if (min > _manhattanDist(destTile, originTile))
				min = _manhattanDist(destTile, originTile);
		})
		return min;
}