import express from "express";
import {read, write} from "../utils/files.js";
import dayjs from "dayjs";
export const printersFileRouter = express.Router();

printersFileRouter.get("/", (req, res) => {
    let printers = read();
    let done = req.query.done;
    
    if (done === 'true') {
        done = true;
    } else if (done === 'false') {
        done = false;
    }
    console.log('req.query', req.query);
    console.log('printers', printers);
    if (req.query.done || req.query.limit) {
        printers = req.query.done ? printers.filter(printer => printer.done === done): printers;
        printers = req.query.limit ? printers.slice(0, parseInt(req.query.limit)) : printers;
        res.json(printers);
        return;
    }
    console.log('printers', printers);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(printers));
})

printersFileRouter.post('/',
    (req, res, next) => {
        req.body.ip = req.ip;
        req.body.created_at = dayjs().format('HH:mm DD-MM-YYYY');
        next();
    }, 
    (req, res) => {
    const printers = read();
   
    const printer = {
        ...req.body, //Spread operator
        id: printers.length + 1
    }
    printers.push(printer);
    
    write(printers);
    
    res.status(201).json(printers);
})

printersFileRouter.get('/:id', (req, res) => {
    const printers = read();
    const printer = printers.find(printer => printer.id === parseInt(req.params.id));
    if (printer) {
        res.json(printer);
    } else {
        res.status(404).end();
    }
})

printersFileRouter.put('/:id', 
    (req, res, next) => {
        req.body.ip = req.ip;
        req.body.updated_at = dayjs().format('HH:mm DD-MM-YYYY');
        next();
    }, 
    (req, res) => {
        const printers = read();
        let printer = printers.find(printer => printer.id === parseInt(req.params.id));
        if (printer) {
            
            printer = {
                ...printer,
                ...req.body
            }
            
            printers[
                printers.findIndex(printer => printer.id === parseInt(req.params.id))
            ] = printer;
            
            write(printers);
            res.json(printer);
        } else {
            res.status(404).end();
        }
    }
)

printersFileRouter.put('/update/to/done', (req, res) => {
    let printers = read();
    printers = printers.map(printer => {
        printer.done = true;
        printer.updated_at = dayjs().format('HH:mm DD-MM-YYYY');
        return printer;
    });
    write(printers);
    res.json(printers);
})

printersFileRouter.delete('/:id', (req, res) => {
    const printers = read();
    const printer = printers.find(printer => printer.id === parseInt(req.params.id));
    if (printer) {
        
        printers.splice(
            printers.findIndex(printer => printer.id === parseInt(req.params.id)),
            1
        );
        
        write(printers);
        res.json(printer);
    } else {
        res.status(404).end();
    }
})