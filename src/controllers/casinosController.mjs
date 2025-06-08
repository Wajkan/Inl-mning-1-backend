import CasinoRepository from "../repositories/casinosRepository.mjs";
import { catchErrorAsync } from "../utilities/catchErrorAsync.mjs";


export const listAllCasinos = catchErrorAsync ( async ( req, res ) => {

    const casinos = await new CasinoRepository().listAll();
    res.status(200).json({success:true, statusCode:200, block: casinos})

});

export const findById = catchErrorAsync ( async ( req, res ) => {

    const casino = await new CasinoRepository().findById(req.params.id);
    res.status(200).json({success:true, statusCode:200, block: casino})

})

export const addCasino = catchErrorAsync ( async (req,res) => {

    const casino = await new CasinoRepository().add(req.body);
    res.status(201).json({success:true, statusCode:201, block: casino})

})