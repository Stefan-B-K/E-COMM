
import MainRepository from './_main.js'

class ProductsRepository extends MainRepository {}

export default new ProductsRepository('./ecomm/products.json')