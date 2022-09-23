const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({include: Product}).then(tags => {
    res.json(tags)
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {include: Product}).then(tag => {
    res.json(tag)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then(tag => {
    res.json(tag)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.findByPk(req.params.id).then(tag => {
    tag.set(req.body)
    tag.save().then(tag => {
      res.json(tag)
    })
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.findByPk(req.params.id).then(tag => {
    tag.destroy().then(result => {
      res.json({success: true})
    })
  })
});

module.exports = router;
