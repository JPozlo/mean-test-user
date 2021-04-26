import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://efmwgwet:uUK3DISxW4t65yjJAaU2uFqJPD9eIENB@clam.rmq.cloudamqp.com/efmwgwet'],
      queue: 'user_queue',
      queueOptions: {
        durable: false
      },
    },
  })
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: "http://localhost:4200"
  })

  microservice.listen(() => {
    console.log("Microservices is listening");
  })
  await app.startAllMicroservices(() => {
    console.log("Microservices 2 is listening");
  })
  await app.startAllMicroservicesAsync();
  await app.listen(8001);
}
bootstrap();
