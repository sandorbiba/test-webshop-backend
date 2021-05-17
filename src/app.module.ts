import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ProductsModule, OrdersModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}