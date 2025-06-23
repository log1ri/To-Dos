import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(dto: CreateProductDto): Promise<Product>  {
    const created = await this.productModel.create({
      title: dto.title,
      completed: false,
    });
    console.log('Created todo:', created);
    return created;
  }
  
  async findAll(): Promise<Product[]> {
    console.log('Fetching all todos');
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product | null> {
    const found = await this.productModel.findById(id).exec();
    if (!found) {
      console.log('Todo not found with id:', id);
      return null;
    }
    console.log('Found todo with id:', found.id);
    return found;
  }


  async update(id: string, dto: UpdateProductDto): Promise<Product | null> {
    const updated = await this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) {
      console.log(`Todo with id ${id} not found for update`);
      return null;
    }
    console.log('Updated todo:', updated);
    return updated;
  }

  async remove(id: string) {
    const removed = await this.productModel.findByIdAndDelete(id).exec();
    if (!removed) { 
      console.log(`Todo with id ${id} not found for removal`);
      return null;
    }
    console.log('Removed todo:', removed);
    return removed;
  }


  
}
