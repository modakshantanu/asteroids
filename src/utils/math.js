var polygonsIntersect = require("polygons-intersect");


// Returns random number in range [low,high]
export function randomBetween(low, high) {
	return low + Math.random()*(high-low);
}

export function checkPolygonIntersection (arr1, arr2) {
	if (polygonsIntersect(arr1,arr2).length !== 0) return true;
	return false;

}
