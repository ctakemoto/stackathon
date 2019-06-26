const router = require('express').Router();
const db = require('../db');
module.exports = router;

router.post('/:placeId', async (req, res, next) => {
  try {
    console.log('req.params.placeId', req.params.placeId);
    const place = await db.models.place.findOne({
      where: {
        id: +req.params.placeId,
      },
    });
    if (!place) {
      next();
    }
    const comment = await db.models.comment.create({
      title: req.body.title,
      body: req.body.body,
      userId: req.body.userId,
    });
    comment.setPlace(place);
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});
