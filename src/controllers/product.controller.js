import { ProductService } from "../services/index.js";
import CustomError from "../services/errors/custom_error.js";
import EErros from "../services/errors/enums.js";
import { generateProductErrorInfo } from "../services/errors/info.js";
import logger from '../logger.js'
import { sendDeletedProductEmail } from './mail.controller.js';

export const createProductController = async (req, res) => {
  try {
    const product = req.body
    if (!product.title || !product.price || !product.description || !product.code || !product.stock || !product.category) {
      const errorInfo = generateProductErrorInfo(product);
      CustomError.createError({
        name: "Product creation Error",
        cause: errorInfo,
        message: "Error typing to create a product",
        code: EErros.INVALID_TYPES_ERROR
      })
      logger.error(errorInfo)
    }

    const result = await ProductService.create(product)
    const products = await ProductService.getAll()

    req.io.emit('productList', products); // emite el evento updatedProducts con la lista de productos
    res.status(201).json({ status: 'success', payload: result });
  } catch (error) {
    logger.error(error.cause)
    res.status(500).json({ status: 'error', error: error.cause });
  }
}

export const updateProductController = async (req, res) => {
  try {
    const productId = req.params.pid;
    const updatedFields = req.body;
    const updatedProduct = await ProductService.update(productId, updatedFields)

    if (!updatedProduct) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    const products = await ProductService.getAll();

    req.io.emit('productList', products);

    res.status(200).json(updatedProduct);
  } catch (error) {
    logger.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

export const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.pid;

    // Obtener el producto a eliminar
    const product = await ProductService.getById(productId);

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    const userInfo = {
      email: req.session.user.email,
      role: req.session.user.role,
    };

    if (userInfo.role === 'admin' || product.owner === userInfo.email) {
      // El usuario es un administrador o el propietario del producto, puede eliminarlo
      const deletedProduct = await ProductService.delete(productId);

      if (!deletedProduct) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      // Enviar un correo electrónico al propietario del producto
      const emailResult = await sendDeletedProductEmail(product, userInfo.email);

      // Actualizar la lista de productos
      const products = await ProductService.getAll();
      req.io.emit('productList', products);

      res.status(200).json({ message: 'Producto eliminado', emailStatus: emailResult });
    } else {
      // El usuario no tiene permisos para eliminar este producto
      res.status(403).json({ error: 'No tienes permisos para eliminar este producto' });
    }
  } catch (error) {
    logger.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const readProductController = async (req, res) => {
  const id = req.params.pid;
  try {
    const product = await ProductService.getById(id)
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    logger.error('Error al leer el producto:', error);
    res.status(500).json({ error: 'Error al leer el producto' });
  }
}

export const readAllProductsController = async (req, res) => {
  logger.http('¡Solicitud recibida!');

  const result = await ProductService.getAllPaginate(req)
  res.status(result.statusCode).json(result.response)
}
