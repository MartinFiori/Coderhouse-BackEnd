const fs = require('fs');

const productsPath = __dirname + './../files/products.json';

class ProductsManager {
    addProduct = async (product) => {
        if (fs.existsSync(productsPath)) {
            try {
                let getProducts = await fs.promises.readFile(productsPath, 'utf-8', null, 2);
                const products = JSON.parse(getProducts);
                if (products.length === 0) {
                    product.id = 1;
                    products.push(product);
                    await fs.promises.writeFile(productsPath, JSON.stringify(products, null, 2));
                    return {
                        status: 'success',
                        message: 'First product added'
                    };
                }
                console.log("probando")
                product.id = products[products.length - 1].id + 1;
                products.push(product);
                await fs.promises.writeFile(productsPath, JSON.stringify(products, null, 2));
                return {
                    status: 'success',
                    message: "1 product added"
                };
            } catch (error) {
                return {
                    status: "error",
                    error: error
                }
            }
        } else {
            try {
                product.id = 1;
                await fs.promises.writeFile(productsPath, JSON.stringify([product], null, 2));
                return {
                    status: 'success',
                    message: 'First product created'
                }
            } catch (error) {
                return {
                    status: 'error',
                    error: error
                }
            }
        }
    }
    getAllProducts = async () => {
        if (fs.existsSync(productsPath)) {
            try {
                const getProducts = await fs.promises.readFile(productsPath, 'utf-8', null, 2);
                const products = JSON.parse(getProducts);
                return {
                    status: 'success',
                    payload: products
                }
            } catch (error) {
                return {
                    status: 'error',
                    error: error
                }
            }
        } else {
            return {
                status: 'success',
                payload: []
            }
        }
    }
    findProductById = async (prod_id) => {
        if (!prod_id) return res.status(500).send({
            status: "error",
            message: "Couldn't find an id"
        })
        if (fs.existsSync(productsPath)) {
            try {
                let getProducts = await fs.promises.readFile(productsPath, 'utf-8');
                let products = JSON.parse(getProducts);
                let productFound = products.find(prod => prod.id === parseInt(prod_id))
                if (productFound) return {
                    status: "succes",
                    message: productFound
                }
            } catch (error) {
                return {
                    status: "error",
                    error: error
                }
            }
        }
    }
    deleteById = async (prod_id) => {
        if (!prod_id) return res.status(500).send({
            status: "error",
            message: "Couldn't find an id"
        })
        if (fs.existsSync(productsPath)) {
            try {
                let getProducts = await fs.promises.readFile(productsPath, 'utf-8');
                let products = JSON.parse(getProducts);
                let productFound = products.filter(prod => prod.id !== parseInt(prod_id))
                await fs.promises.writeFile(productsPath, JSON.stringify(productFound, null, 2))
                if (productFound) return {
                    status: "succes",
                    message: productFound
                }
            } catch (error) {
                return {
                    status: "error",
                    error: error
                }
            }
        }
    }
}

module.exports = ProductsManager;