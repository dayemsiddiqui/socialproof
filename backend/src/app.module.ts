import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiVersionGuard } from '@nestjsx/api-version';
import { ShopifyModule } from './shopify/shopify.module';

@Module({
  imports: [OrdersModule, ShopifyModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ApiVersionGuard,
    },
  ],
})
export class AppModule {}
