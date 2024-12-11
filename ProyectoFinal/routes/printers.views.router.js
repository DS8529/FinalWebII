import express from "express";
import { index, create, update, destroy, getProductsGroupedByCategory } from "../services/printers.service.js";

export const printersViewsRouter = express.Router();


printersViewsRouter.get("/", async (req, res) => {
    try {
        const categories = await getProductsGroupedByCategory();
        res.render("home", { categories, user: req.user || null });
    } catch (error) {
        console.error("Error in GET /:", error.message);
        res.status(500).send("Error al cargar página principal.");
    }
});


printersViewsRouter.use((req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/auth/login");
    }
});


printersViewsRouter.get("/list", async (req, res) => {
    try {
        const printers = await index();
        res.render("index", {
            printers,
            user: req.user
        });
    } catch (error) {
        console.error("Error in GET /list:", error.message);
        res.status(500).send("Error loading printers.");
    }
});


printersViewsRouter.post("/", async (req, res) => {
    try {
        console.log("body", req.body);
        let { name, done, brand, price, category, description } = req.body;
        done = done === "on";
        await create({ name, done, brand, price, category, description });
        res.redirect("/printers");
    } catch (error) {
        console.error("Error in POST /:", error.message);
        res.status(500).send("Error creating printer.");
    }
});


printersViewsRouter.post("/edit/:id", async (req, res) => {
    try {
        console.log("params", req.params);
        console.log("body", req.body);
        const { id } = req.params;
        let { name, done, brand, price, category, description } = req.body;
        done = done === "on";
        await update(id, { name, done, brand, price, category, description });
        res.redirect("/printers");
    } catch (error) {
        console.error("Error in POST /edit/:id:", error.message);
        res.status(500).send("Error editing printer.");
    }
});


printersViewsRouter.post("/destroy/:id", async (req, res) => {
    try {
        console.log("params", req.params);
        const { id } = req.params;
        await destroy(id);
        res.redirect("/printers");
    } catch (error) {
        console.error("Error in POST /destroy/:id:", error.message);
        res.status(500).send("Error deleting printer.");
    }
});
