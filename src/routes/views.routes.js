import { Router, json } from 'express';
// import ProductManager from '../dao/managers/ProductsManager.js';
import productsManagerDB from '../dao/models/products.manager.js';
import messagesManagerDB from '../dao/models/messages.manager.js';
const productManager = new productsManagerDB();
const messageManager = new messagesManagerDB()

const router = Router();

// router.get("/", async (req, res) => {
//     console.log("estas en /");
//     const products = await productManager.getProducts()
//     console.log("a ver", products);
//     res.render("products", {products})
// })

router.post("/chat/:user/:message", async(req, res) => {
    let user = req.params.user;
    let message = req.params.message;
    const messages = await messageManager.addMessage(user, message)
    res.send(messages)
})

router.get("/chat", async (req, res) => {
    console.log("estas en el chat");
    const chat = await messageManager.getMessages()
    // res.send(chat)
    res.render("chat", {chat})
})


export default router;