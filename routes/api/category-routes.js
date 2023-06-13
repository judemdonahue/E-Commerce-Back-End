const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      { model: Product }
    ]
  })
  .then((categories) => res.json(categories))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [
      { model: Product }
    ]
  })
  .then((categories) => res.json(categories))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      category_name: "Basketball",
      productIds: [1, 2, 3, 4]
    }
  */
 Category.create(req.body)
 .then((category) => {
  if (Array.isArray(req.body.productIds) && req.body.productIds.length) {
    const categoryTagIdArr = req.body.productIds.map((product_id) => ({
      category_id: category.id,
      product_id,
    }));
    return Category.bulkCreate(categoryTagIdArr);
  } else {
    return null;
  }
 })
 .then(() => {
  res.status(200).json({ message: 'Category Successfully Created!' });
 })
 .catch((err) => {
  console.log(err);
  res.status(400).json(err);
 });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { 
      id: req.params.id 
    },
  })
  .then((category) => {
    if (!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    return res.status(200).json({ message: 'Category Succesfully Updated!' });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { 
      id: req.params.id 
    },
  })
  .then((category) => {
    if (!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    return res.status(200).json({ message: 'Category Succesfully Deleted!' });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
