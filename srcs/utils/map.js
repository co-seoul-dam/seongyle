_xInMap = (value) => {
	if (value < width && value >= 0) {
		return value;
	}
	if (value >= width) {
		return _xInMap(2 * (width - 1) - value);
	}
	if (value < 0) {
		return _xInMap(-value);
	}
}

_yInMap = (value) => {
	if (value < height && value >= 0) {
		return value;
	}
	if (value >= height) {
		return _yInMap(2 * (height - 1) - value);
	}
	if (value < 0) {
		return _yInMap(-value);
	}
}