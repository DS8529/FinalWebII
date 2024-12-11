import { sequelize } from '../libs/sequelize.js';

async function index() {
    console.log('INDEX /api/v1/printers');
    const printers = await sequelize.models.printer.findAll();
    return printers;
}

async function create(printer) {
    console.log('CREATE /api/v1/printers');
    const newprinter = await sequelize.models.printer.create({
        name: printer.name,
        done: printer.done || false,
        brand: printer.brand || null,
        price: printer.price || null,
        category: printer.category || null,
        description: printer.description || null,
        model: printer.model || null,
        colorSupport: printer.colorSupport || false,
        connectivity: printer.connectivity || null,
        printSpeed: printer.printSpeed || null
    });
    return newprinter;
}

async function show(id) {
    console.log('SHOW /api/v1/printers/:id');
    const printer = await sequelize.models.printer.findByPk(id); 
    return printer;
}

async function update(id, printer) {
    console.log('UPDATE /api/v1/printers/:id');
    const searchedprinter = await sequelize.models.printer.findByPk(id); 
    if (!searchedprinter) {
        return false;
    }

    const [rowsAffected, [updatedprinter]] = await sequelize.models.printer.update({
        name: printer.name,
        done: printer.done || false,
        brand: printer.brand || null,
        price: printer.price || null,
        category: printer.category || null,
        description: printer.description || null,
        model: printer.model || null,
        colorSupport: printer.colorSupport || false,
        connectivity: printer.connectivity || null,
        printSpeed: printer.printSpeed || null
    }, {
        where: { id },
        returning: true
    });
    return updatedprinter;
}

async function destroy(id) {
    console.log('DESTROY /api/v1/printers/:id');
    const printer = await sequelize.models.printer.findByPk(id); 
    if (!printer) {
        return false;
    }

    await sequelize.models.printer.destroy({ 
        where: {
            id
        }
    });
    return printer;
}

async function getProductsGroupedByCategory() {
    console.log('GET PRODUCTS GROUPED BY CATEGORY');
    const products = await sequelize.models.printer.findAll();
    const categories = {};

    // Agrupar productos por categoría
    products.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = { name: product.category, products: [] };
        }
        categories[product.category].products.push({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    });

    // Convertir objeto a arreglo
    return Object.values(categories);
}

export {
    index,
    create,
    show,
    update,
    destroy,
    getProductsGroupedByCategory
};
