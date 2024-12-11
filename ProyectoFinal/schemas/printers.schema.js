import Joi from 'joi';

const id = Joi.number();
const name = Joi.string().min(10).max(255);
const done = Joi.boolean();

const createPrinterSchema = Joi.object({
    name: name.required(),
    done: done.optional(),
});

const updatePrinterSchema = Joi.object({
    name: name.optional(),
    done: done.optional(),
});

const getPrinterSchema = Joi.object({
    id: id.required(),
});

export {
    createPrinterSchema,
    updatePrinterSchema,
    getPrinterSchema,
};