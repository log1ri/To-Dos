import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService {

  private todos: Product[] = [{"id":"1","title":"test","completed":false},{"id":"2","title":"tes2","completed":true}];

  findAll() {
    return this.todos;
  }


  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }


  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
