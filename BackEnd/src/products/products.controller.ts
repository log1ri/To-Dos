import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto, @Res() res: Response) {
    const todo = this.productsService.create(dto);
    if (!todo) {
      return res.status(400).json({
        message: 'Error creating todo',
      });
    }
    return res.status(201).json({
      message: 'Todo created successfully',
      data: todo
    });
  }

  @Get()
  findAll(@Res() res: Response) {
    const todos = this.productsService.findAll();
    return res.status(200).json({
      message: 'Todos fetched successfully',
      data: todos
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const todo = this.productsService.findOne(id);
    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found',
      });
    }
    return res.status(200).json({
      message: 'Todo fetched successfully',
      data: todo
    });
  }

  @Patch(':id')
  update(@Param('id') id:  string, @Body() dto: UpdateProductDto, @Res() res: Response) {
    const updatedTodo = this.productsService.update(id, dto);
    if (!updatedTodo) {
      return res.status(404).json({
        message: 'Todo not found',
      });
    }
    return res.status(200).json({
      message: 'Todo updated successfully',
      data: updatedTodo
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const removedTodo = this.productsService.remove(id);
    if (!removedTodo) {
      return res.status(404).json({
        message: 'Todo not found',
      });
    }
    return res.status(200).json({
      message: 'Todo removed successfully',
      data: removedTodo
    });
  }
}
