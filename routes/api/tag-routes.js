const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      { model: Product }
    ]
  })
  .then((tags) => res.json(tags))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include : [
      { model: Product }
    ]
  })
  .then((tags) => res.json(tags))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => {
   if (Array.isArray(req.body.productIds) && req.body.productIds.length) {
     const tagProductIdArr = req.body.productIds.map((product_id) => ({
       tag_id: tag.id,
       product_id,
     }));
     return Product.bulkCreate(tagProductIdArr);
   } else {
     return null;
   }
  })
  .then(() => {
   res.status(200).json({ message: 'Tag Successfully Created!' });
  })
  .catch((err) => {
   console.log(err);
   res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: { 
      id: req.params.id 
    },
  })
  .then((tag) => {
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    return res.status(200).json({ message: 'Tag Succesfully Updated!' });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { 
      id: req.params.id 
    },
  })
  .then((tag) => {
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    return res.status(200).json({ message: 'Tag Succesfully Deleted!' });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
