const router = require('express').Router();
const db = require('../db');
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
      address: req.body.address,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      singleStall: req.body.singleStall,
      hasLedge: req.body.hasLedge,
      isFree: req.body.isFree,
      cleanliness: req.body.cleanliness,
    });
    res.json(place);
  } catch (err) {
    next(err);
  }
});
