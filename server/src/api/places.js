const router = require('express').Router();
const db = require('../db');
const geo = require('mapbox-geocoding');
geo.setAccessToken(process.env.MAPBOX_ACCESS_TOKEN);

const mapboxCache = require('./cache/mapboxCache');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const places = await db.models.place.findAll();
    res.json(places);
  } catch (err) {
    next(err);
  }
});

router.get('/:placeId', async (req, res, next) => {
  try {
    const place = await db.models.place.findOne({
      where: {
        id: +req.params.placeId,
      },
      include: [
        { model: db.models.comment, include: { model: db.models.user } },
      ],
    });
    if (!place) {
      next();
    } else {
      res.json(place);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const place = await db.models.place.create({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      // latitude: req.body.latitude,
      // longitude: req.body.longitude,
      singleStall: req.body.singleStall,
      hasLedge: req.body.hasLedge,
      isFree: req.body.isFree,
      cleanliness: req.body.cleanliness,
      borough: req.body.borough,
      handicapAccessible: req.body.handicapAccessible,
      openYearRound: req.body.openYearRound,
      genderNeutral: req.body.genderNeutral,
    });
    res.json(place);
  } catch (err) {
    next(err);
  }
});

router.post('/geocode', async (req, res, next) => {
  try {
    let query = req.body.address.toLowerCase();
    // check if request has been made, if so then just return that result
    if (!mapboxCache.geocode[query]) {
      await geo.geocode('mapbox.places', req.body.address, function(
        err,
        geoData
      ) {
        if (err) {
          res.status(401).send(err.message);
        } else {
          mapboxCache.geocode[query] = {
            placeName: geoData.features[0].place_name,
            coords: [
              geoData.features[0].center[1],
              geoData.features[0].center[0],
            ],
          };
          res.json(mapboxCache.geocode[query]);
        }
      });
    } else {
      res.json(mapboxCache.geocode[query]);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/reverse-geocode', async (req, res, next) => {
  try {
    let query = [req.body.long, req.body.lat].join(',');
    // check if request has been made, if so then just return that result
    if (!mapboxCache.reverseGeocode[query]) {
      await geo.reverseGeocode(
        'mapbox.places',
        req.body.long,
        req.body.lat,
        function(err, geoData) {
          if (err || !geoData) {
            res.status(401).send('Error looking up coords');
          }

          mapboxCache.reverseGeocode[query] = {
            address: geoData.features[0].place_name,
          };
          res.json(mapboxCache.reverseGeocode[query]);
        }
      );
    } else {
      res.json(mapboxCache.reverseGeocode[query]);
    }
  } catch (err) {
    next(err);
  }
});
