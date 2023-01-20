const slugify = require('slugify')
const Product = require('../models/product')
const Category = require('../models/category')
const User = require('../models/user')

exports.createProduct = (req, res) => {

    const { name, brand, price, size, quantity, description, productPictures, category } = req.body;

    const product = new Product({
        name: name,
        brand,
        slug: name,
        price,
        size,
        quantity,
        description,
        productPictures,
        category
    })

    product.save((error, product) => {
        if (error) res.status(400).json({ error })
        if (product) {
            return res.status(200).json({ product });
        }
    })

}

exports.getProduct = (req, res) => {
    Product.find({})
        .exec((error, products) => {
            if (error) return res.status(400).json({ error })

            if (products) {
                return res.status(201).json({ products });
            }
        })
}

exports.getProductbyFilter = async (req, res) => {
    try {
        const querObj = { ...req.query }
        console.log(querObj);

        let queryStr = JSON.stringify(querObj);
        queryStr = queryStr.replace(/\b{gte|gt|lte|lt}\b/g, (match) => `$${match}`);

        Product.find(JSON.parse(queryStr))
            .exec((error, products) => {
                if (error) return res.status(400).json({ error })

                if (products) {
                    console.log(products)
                    return res.status(201).json(products);
                }
            })
    }
    catch (error) {
        throw new Error(error)
    }
}



exports.getproductbycategory = (req, res) => {
    console.log(req.params.id)
    const cat = req.params.id
    Category.findById(req.params.id)
        .exec((error, category) => {
            if (error) return res.status(400).json({ error })

            if (category) {
                Product.find({ category: cat })
                    .exec((error, products) => {
                        if (error) return res.status(400).json({ error })

                        if (products) {
                            return res.status(200).json({ products });
                        }
                    })

            }
        })

}
