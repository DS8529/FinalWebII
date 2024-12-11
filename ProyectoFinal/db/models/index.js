import { definePrinters } from './printers.models.js'
import { defineUsers } from './users.model.js'



export function defineModels(sequelize){
    definePrinters(sequelize)
    defineUsers(sequelize)
}