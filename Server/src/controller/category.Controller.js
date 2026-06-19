//crud
//creeate-read-update-delete

import Category from "../model/category.Model.js"
export const createcategory=async (req,res) => {
    try {
       const{name,description,image} =req.body

//validaion
if(!name){
    return res.status(400).json({message:"name is required"})
}

 const category = await Category.create({ name, description, image });
  return res.status(201).json({ message: "category created done", category });
    } catch (error) {
         return res.status(500).json({ message: "internel server error" });
    }

}



export const getALLcategories=async (req,res) => {
    try {
        const categories= await Category.find()
        if(categories.length===0){
  return res.status(200).json({ message: "no categories yet", categories:[] });

        }
          return res
            .status(200)
            .json({ message: " categories found", categories});

    } catch (error) {
                return res
                  .status(500)
                  .json({ message: "internel server error" });
 
    }
}
export const updateCategory =async (req,res) => {
    try {
        
        const id= req.params.id
               const { name, description, image } = req.body;

         const category = await Category.findOne({ id });
         if(!category){
              return res.status(404).json({ message: "category not found" });
         }
        let oldCat = {
          name: category.name,
          description: category.description,
          image: category.image
        };
        const newCategory=Ctegory.findByIdAndUpdate(id,{ name, description, image },{new:true})
  return res.status(200).json({ message: "category update", newCategory });
    } catch (error) {
         return res.status(500).json({ message: "internel server error" });
 
    }
}
export const deleteCategory=async (req,res) => {
    try {
        const id=req.params.id
        if (!id) {
          return res.status(400).json({ message: "no category chossen to delete" });
        }
        r;
       const deleteCat= await  Category.findByIdAndDelete(id) 
       if (!deleteCat){
        return res.status(400).json({ message: "not deleted"})
       }
         return res.status(200).json({ message: "message is deleted" });
    } catch (error) {
         return res.status(500).json({ message: "internel server error" });
    }
}


//error types:
//400-499 client error
//500-599 server error
//200-299 done
//300-399 message