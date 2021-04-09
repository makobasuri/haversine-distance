(function(root, factory) {
  "use strict";
  if (typeof define === 'function' && define.amd) {
      define('circleToPolygon', factory)
  } else if (typeof module === 'object' && module.exports) {
      module.exports = factory()
  } else {
      root.circleToPolygon = factory()
  }
}(this, function() {

	// equatorial mean radius of Earth (in meters)
	const R = 6378137;

	const squared = (x) => x * x
	const toRad = (x) => x * Math.PI / 180.0
	const hav = (x) => squared(Math.sin(x / 2))

	// hav(theta) = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLon - aLon)
	return function haversineDistance(a, b) {
		const aLat = toRad(a.latitude || a.lat)
		const bLat = toRad(b.latitude || b.lat)
		const aLng = toRad(a.longitude || a.lng || a.lon)
		const bLng = toRad(b.longitude || b.lng || b.lon)
		const ht = hav(bLat - aLat) + Math.cos(aLat) * Math.cos(bLat) * hav(bLng - aLng)

		return 2 * R * Math.asin(Math.sqrt(ht))
	}
}))
