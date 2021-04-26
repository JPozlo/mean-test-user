import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://test-user-0:7kFgnOAn2SwFBfIN@cluster0.rzfn6.mongodb.net/meanTestUserDB?retryWrites=true&w=majority", {
      autoCreate: true
    }),
    ProductModule,
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
