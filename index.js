'use strict';

var L          = require('./leaflet.js')
  , level1Data = require('./data/level1-ways-weightings.json')
  , level2Data = require('./data/level2-ways-weightings.json')
  , level3Data = require('./data/level3-ways-weightings.json')
  , level4Data = require('./data/level4-ways-weightings.json')

var map = L.map('map')
  .fitBounds([
    [-43.577988,172.515934],
    [-43.461397,172.749529]
  ])

L.Icon.Default.imagePath = '/images'

// L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
L.tileLayer('http://{s}.tiles.mapbox.com/v3/digitalsadhu.jbf3mhe1/{z}/{x}/{y}.png', {
  attribution: '',
  maxZoom: 18
}).addTo(map)

function geojsonStyles(feature) {
  var color = '#00FF00' //default green
  if (feature.properties.weighting < 8 && feature.properties.weighting > 4)
    color = '#CD5C5C' //red
  if (feature.properties.weighting < 5 && feature.properties.weighting > 0)
    color = '#FFA500' //orange
  if (feature.properties.weighting > 7) color = '#000000'
  return {
    color: color,
    opacity: 1
  }
}

var level1 = L.geoJson(level1Data, {
  style: geojsonStyles
})

var level2 = L.geoJson(level2Data, {
  style: geojsonStyles
})

var level3 = L.geoJson(level3Data, {
  style: geojsonStyles
})

var level4 = L.geoJson(level4Data, {
  style: geojsonStyles
})

map.setZoom(8)

var currZoom = map.getZoom()
map.on('zoomend', function () {
  var newZoom = map.getZoom()
  var inwards = newZoom > currZoom
  var outwards = !inwards

  if (inwards) {
    if (newZoom === 10) level1.addTo(map)
    if (newZoom === 12) level2.addTo(map)
    if (newZoom === 14) level3.addTo(map)
    if (newZoom === 16) level4.addTo(map)
  }

  if (outwards) {
    if (newZoom === 9) level1.removeFrom(map)
    if (newZoom === 11) level2.removeFrom(map)
    if (newZoom === 13) level3.removeFrom(map)
    if (newZoom === 15) level4.removeFrom(map)
  }

  currZoom = newZoom
})
