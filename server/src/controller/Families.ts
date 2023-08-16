import { Request, Response } from 'express';
import Family from '../models/Family'

export const createFamily =async (req: Request, res: Response) => {
        const {familyName,mother,father,children} = req.body
        try {
            await Family.create({
                familyName:familyName,
                mother:mother,
                father:father,
                children:children
            })
            res.status(200).json({message:"successfully create!"})
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
  }