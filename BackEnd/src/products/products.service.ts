import { Injectable } from '@nestjs/common';
// Entity
import { Product } from './entities/product.entity';
// DTOs
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// Utility
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService {

  private todos: Product[] = [{"id":"1","title":"test","completed":false},{"id":"2","title":"tes2","completed":true}];

  
  
  create(dto: CreateProductDto):Product {
    const newTodo: Product ={
      id: randomUUID(),
      title: dto.title,
      completed: false,
    }

    this.todos.push(newTodo);
    console.log('New todo created:', newTodo);
    return newTodo;
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


  update(id: string, dto: UpdateProductDto): Product | undefined {
    // const updateTodo: Product = {
    //   const todo = this.findOne(id);
    //   if (!todo) return undefined;
    //   Object.assign(todo, dto);
    //   return todo;
    // }

    // const test = this.findOne(id);
    // if (!test) {
    //   console.log(`Todo with id ${id} not found for update`);
    //   return undefined;
    // }
    const todoID = this.todos.findIndex(todo => todo.id === id);
    if (todoID === -1) {
      console.log(`Todo with id ${id} not found for update`);
      return undefined;
    }

    const updatedTodo = {
      ...this.todos[todoID],
      ...dto,
    };
    this.todos[todoID] = updatedTodo;
    console.log('Updated todo:', updatedTodo);
    return updatedTodo;
  }

  remove(id: string) {
    const todoId = this.todos.findIndex(todo => todo.id === id);
    if (todoId === -1){
      console.log(`Todo with id ${id} not found for removal`);
      return undefined;
    }
    const removedTodo = this.todos.splice(todoId, 1);
    console.log('Removed todo:', removedTodo);
    return removedTodo[0];
  }
}
