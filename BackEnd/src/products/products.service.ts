import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService {

  private todos: Product[] = [{"id":"1","title":"test","completed":false},{"id":"2","title":"tes2","completed":true}];

  
  
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }
  
  findAll() {
    console.log('Fetching all todos');
    if (this.todos.length === 0) {
      return [];
    }
    return this.todos;
  }

  findOne(id: string): Product| undefined {
    const foundId = this.todos.find(todo => todo.id === id);
    if (!foundId) {
      return undefined;
    }
    console.log('Found todo with id:', foundId.id);
    return foundId;

  }


  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
