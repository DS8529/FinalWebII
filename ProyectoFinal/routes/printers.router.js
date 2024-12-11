import express from "express";
export const printersRouter = express.Router();
import { index, create, show, update, destroy } from "../services/printers.service.js";

import { createprinterschema, getprinterschema, updateprinterschema } from "../schemas/printers.schema.js";
import { validatorHandler } from "../middleware/validator.handler.js";

printersRouter.get("/", async (req, res) => {
    const printers = await index();
    console.log('GET /api/v1/printers');
    res.json({printers});
})

printersRouter.post('/', 
    validatorHandler(createprinterschema, 'body'),
    async (req, res) => {
        const printer = req.body;
        const newprinter = await create(printer);
        console.log('POST /api/v1/printers');
        res.status(201).json({printer: newprinter});
    }
)

printersRouter.get('/:id', 
    validatorHandler(getprinterschema, 'params'),
    async (req, res) => {
        console.log('GET /api/v1/printers/:id');
        const id = req.params.id;
        const printer = await show(id);
        if (!printer) {
            return res.status(404)
            .json({error: 'printer not found'});
        }
        res.json({printer});
    }
)

printersRouter.put('/:id', 
    validatorHandler(getprinterschema, 'params'),
    validatorHandler(updateprinterschema, 'body'),
    async (req, res) => {
        console.log('PUT /api/v1/printers/:id');
        const id = req.params.id;
        const printer = req.body;
        const updatedprinter = await update(id, printer);
        if (!updatedprinter) {
            return res.status(404)
            .json({error: 'printer not found'});
        }
        res.json({printer: updatedprinter});
    }
)

printersRouter.delete('/:id',
    validatorHandler(getprinterschema, 'params'),
    async (req, res) => {
        console.log('DELETE /api/v1/printers/:id');
        const id = req.params.id
        const printer = await destroy(id);
        if(!printer){
            return res.status(404).json({error: 'printer not found', 'deleted': false});
        }
        res.status(200).json({printer: printer, 'deleted': true});
    }
)