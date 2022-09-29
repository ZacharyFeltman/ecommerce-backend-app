const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({include: Product}).then(categories => {
    res.json(categories)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {include: Product}).then(category => {
    res.json(category)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then(category => {
    res.json(category)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.findByPk(req.params.id).then(category => {
    category.set(req.body)
    category.save().then(category => {
      res.json(category)
    })
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.findByPk(req.params.id).then(category => {
    category.destroy().then(result => {
      res.json({success: true})
    })
  })
});


module.exports = router;
