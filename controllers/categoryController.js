import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";  // Ensure .js extension is included if using ES Modules

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({
                success: false,
                message: 'Name is required'
            });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: 'Category already exists'
            });
        }
        const newCategory = await new categoryModel({
            name,
            slug: slugify(name)
        }).save();
        res.status(201).send({
            success: true,
            message: 'New Category created successfully',
            newCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error creating category',
            error
        });
    }
};

// Update category Controller
const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, {new:true});
        res.status(200).send({
            success: true,
            message: 'Category Updated Successfully',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error Updating category',
            error
        });
    }
};

// Get All Category Controller
const getAllCategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: 'All Categories List',
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error getting all categories',
            error
        });
    }
};

// Get a single Category

const getSingleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({slug: req.params.slug});
        res.status(200).send({
            success: true,
            message: 'Category Details',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:`Error getting category '${req.params.slug}'`,
            error
        });
    }
};

// Delete Category Controller
const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Category Deleted Successfully',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error Deleting category',
            error
        });
    }
};


export { createCategoryController, updateCategoryController, getAllCategoryController, getSingleCategoryController, deleteCategoryController };
