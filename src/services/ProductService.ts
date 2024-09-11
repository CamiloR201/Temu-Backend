import { dataSource } from '../data-source';
import { Repository } from 'typeorm';
import { Product } from '../entity/Product';

class ProductService {
    private productRepository: Repository<Product>;

    constructor() {
        this.productRepository = dataSource.getRepository(Product);
    }

    async createProduct(productData: Partial<Product>): Promise<Product> {
        const newProduct = this.productRepository.create(productData);
        return await this.productRepository.save(newProduct);
    }

    async getProducts(page: number, pageSize: number): Promise<{ data: Product[], total: number }> {
        const [data, total] = await this.productRepository.findAndCount({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        return { data, total };
    }

    async getProductById(id: number): Promise<Product | null> {
        return await this.productRepository.findOneBy({ id });
    }

    async updateProduct(id: number, productData: Partial<Product>): Promise<Product | null> {
        const product = await this.getProductById(id);
        if (!product) return null;

        Object.assign(product, productData);
        return await this.productRepository.save(product);
    }

    async deleteProduct(id: number): Promise<boolean> {
        const result = await this.productRepository.delete(id);
        return result.affected !== 0;
    }
}

export const productService = new ProductService();
