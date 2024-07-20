const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage: storage,
}).single('photo'); 

exports.upload = upload;
exports.createProduct = catchAsync(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded!' });
    }
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        photo: {
          data: req.file.filename,
          contentType: 'image/png'
        }
      });
    newProduct.save()
    res.status(201).json(newProduct);
});


exports.getProduct = catchAsync(async(req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json(product);
});


exports.getProducts = catchAsync(async(req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
});

exports.updateProduct = catchAsync(async(req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    if(updatedData.price || updatedData.discount){
        const product = await Product.findById(id);

        if(product) {
            const price = updatedData.price !== undefined ? updatedData.price : product.price;
            const discount = updatedData.discount !== undefined ? updatedData.discount : product.discount;
            updatedData.priceWithDiscount = (price * (100 - discount)) / 100;
        }else{
            return res.status(404).json({message: "product not found."});
        }
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    });
    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json( {data: {
            product: updatedProduct
    }});
});

exports.deleteProduct = catchAsync(async(req, res) => {
    const id = req.params.id;

    const product = await Product.findByIdAndDelete(id);

    res.status(204).json({data: undefined});
}) 