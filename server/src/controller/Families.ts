import { Request, Response } from 'express';
import Family from '../models/Family'

export const createFamily =async (req: Request, res: Response) => {
        const {familyName,mother,father,children} = req.body
        if(!req.body){
            return res.status(404).json({message:"Plead add a Field"})
        }
        try {
          const newFam =  await Family.create({
                familyName:familyName,
                mother:mother,
                father:father,
                children:children
            })

          return res.status(200).json({newFam})
        } catch (error) {
            console.log(error)
        }
};
export const getFamily =async (req: Request, res: Response) => {
    try {
        const fam = await Family.find({})
        res.status(200).json(fam)
    } catch (error) {
        console.log(error)
    }
};

export const deleteFamily=async(req:Request,res: Response)=>{
    const {_id} = req.body
    try {
        const fam = await Family.findByIdAndDelete({_id})  
        return res.json({"deleted Successfully": fam})
    } catch (error) {
        console.log(error)
    }

}
export const updateFamily=async(req:Request,res: Response)=>{
    try {
        const { familyName, mother, father, children } = req.body;
        const familyId = req.params.id; // Assuming you have an endpoint like '/updateFamily/:id'
        
        console.log(familyId)
        const updatedFamily = await Family.findByIdAndUpdate(
          familyId,
          {
            familyName,
            mother,
            father,
            children,
          },
          { new: true } // This option returns the updated document
        );
    
        if (!updatedFamily) {
          return res.status(404).json({ message: 'Family not found' });
        }
    
        return res.json({ updatedFamily });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    
}

// const {_id} = req.body
// try {
//     const subj = await Subject.findByIdAndDelete({_id})    
//    return res.json({"deleted Successfully": subj})
// } catch (error) {
//     console.log(error)
// }

  module.exports ={
    createFamily,
    getFamily,
    deleteFamily,
    updateFamily,
  }