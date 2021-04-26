import { Controller, Get, HttpService, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService
        ,private http: HttpService){}

    @Get()
    async all(){
        return await this.productService.all();
    }

    @Post("/:id/like")
    async addLike(@Param("id") id: number){
        const product = await this.productService.findOne(id);

        this.http.post(`http//localhost:8000/api/products/${id}/like`, product.id).subscribe((res => {
            console.log(res);
        }))

        return await this.productService.update(id, {likes: product.likes + 1})
    }

    @EventPattern("product_create")
    async productCreate(product: any){
        await this.productService.create(product);
    }

    @EventPattern("product_update")
    async productUpdate(product: any){
     await this.productService.update(product.id, product);
    }

    
    @EventPattern("product_delete")
    async productDelete(id: number){
     await this.productService.delete(id);
    }
}
