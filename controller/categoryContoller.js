//const CategoryModel = require("../models/categoryModel");


// class category{


    
//             async getAllCategories(req, res) {
//             try {
//                 const categories = await CategoryModel.find();
//                 res.render("categories", {
//                     categories
//                 });
//             } catch (error) {
//                 console.log(error);
//                 res.status(500).send("Error fetching categories");
//             }
//         }
    
//         async createCategoryForm(req, res) {
//             try {
//                 res.render('addcategory');
//             } catch (err) {
//                 throw err;
//             }
//         }
    
//         async addCategory(req, res) {
//             try {
//                 const { name, description } = req.body;
    
//                 if (!name) {
//                     return res.status(400).send("Category name is required");
//                 }
    
//                 const newCategory = await CategoryModel.create({
//                     name,
//                     description
//                 });
    
//                 if (newCategory) {
//                     return res.redirect("/admin/categories");
//                 }
//             } catch (error) {
//                 console.log(error);
//                 if (error.code === 11000) { // Duplicate key error
//                     return res.status(400).send("Category already exists");
//                 }
//                 res.status(500).send("Error creating category");
//             }
//         }
    
//         async editCategoryForm(req, res) {
//             try {
//                 const categoryId = req.params.id;
//                 const category = await CategoryModel.findById(categoryId);
                
//                 if (!category) {
//                     return res.status(404).send("Category not found");
//                 }
                
//                 res.render('editcategory', { category });
//             } catch (error) {
//                 console.log(error);
//                 res.status(500).send("Error fetching category");
//             }
//         }
    
//         async updateCategory(req, res) {
//             try {
//                 const categoryId = req.params.id;
//                 const { name, description } = req.body;
                
//                 if (!name) {
//                     return res.status(400).send("Category name is required");
//                 }
                
//                 const updatedCategory = await CategoryModel.findByIdAndUpdate(
//                     categoryId,
//                     { name, description },
//                     { new: true }
//                 );
                
//                 if (updatedCategory) {
//                     return res.redirect("/admin/categories");
//                 } else {
//                     return res.status(404).send("Category not found");
//                 }
//             } catch (error) {
//                 console.log(error);
//                 if (error.code === 11000) {
//                     return res.status(400).send("Category name already exists");
//                 }
//                 res.status(500).send("Error updating category");
//             }
//         }
    
//         //////
    
// }

// module.exports = new category();






const CategoryModel = require("../models/categoryModel");

class Category {
    // Combined method to get all categories and render the page with both list and form
    async getAllCategories(req, res) {
        try {
            const categories = await CategoryModel.find();
            res.render("categories", {
                categories,
                formAction: "/admin/categories/add"
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("Error fetching categories");
        }
    }
    
    // No separate form rendering method needed anymore
    
    // Add a new category
    async addCategory(req, res) {
        try {
            const { name } = req.body;
            
            if (!name) {
                return res.status(400).send("Category name is required");
            }
            
            const newCategory = await CategoryModel.create({
                name
            });
            
            if (newCategory) {
                return res.redirect("/admin/categories");
            }
        } catch (error) {
            console.log(error);
            if (error.code === 11000) { // Duplicate key error
                return res.status(400).send("Category already exists");
            }
            res.status(500).send("Error creating category");
        }
    }
}

module.exports = new Category();