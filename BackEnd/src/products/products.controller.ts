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
    const product = this.productsService.create(dto);
    if (!product) {
      return res.status(400).json({
        message: 'Error creating product',
      });
    }
    return res.status(201).json({
      message: 'Todo created successfully',
      data: product
    });
  }

  @Get()
  findAll(@Res() res: Response) {
    const product = this.productsService.findAll();
    return res.status(200).json({
      message: 'Todos fetched successfully',
      data: product
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id:  string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
