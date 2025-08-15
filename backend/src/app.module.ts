import { Module, Session } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { BrandsModule } from './modules/brands/brands.module';
import { Collection, Transaction } from 'typeorm';
import {
  Account,
  BlogPost,
  Brand,
  BrandAccount,
  BrandPartner,
  BrandPaymentMapping,
  Categories,
  Category,
  CollectionProduct,
  Customers,
  EfMigrationsHistory,
  ExtraCategory,
  GroupProduct,
  Menu,
  MenuProduct,
  MenuStore,
  Order,
  OrderDetail,
  OrderHistory,
  OrderItems,
  OrderUser,
  Orders,
  Payment,
  PaymentType,
  Payments,
  Product,
  ProductInGroup,
  Products,
  Promotion,
  PromotionOrderMapping,
  PromotionProductMapping,
  Role,
  Store,
  StoreAccount,
  User,
  Users,
  Variant,
  VariantOptions,
  VariantProductMapping,
} from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // const isTest = configService.get<string>('NODE_ENV') === 'test';
        // const isDev = configService.get<string>('NODE_ENV') === 'development';

        // if (isTest || isDev) {
        //   // Use SQLite for testing and development when SQL Server is not available
        //   return {
        //     type: 'sqlite',
        //     database: ':memory:',
        //     entities: [
        //       User,
        //       Product,
        //       Category,
        //       Customer,
        //       Order,
        //       OrderItem,
        //       Payment,
        //     ],
        //     synchronize: true,
        //     logging: false,
        //   };
        // }

        // Production SQL Server configuration
        return {
          type: 'mssql',
          host: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT') || '1433'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [
            Account,
            BlogPost,
            Brand,
            BrandAccount,
            BrandPartner,
            BrandPaymentMapping,
            Categories,
            Category,
            Collection,
            CollectionProduct,
            Customers,
            EfMigrationsHistory,
            ExtraCategory,
            GroupProduct,
            Menu,
            MenuProduct,
            MenuStore,
            Order,
            OrderDetail,
            OrderHistory,
            OrderItems,
            OrderUser,
            Orders,
            Payment,
            PaymentType,
            Payments,
            Product,
            ProductInGroup,
            Products,
            Promotion,
            PromotionOrderMapping,
            PromotionProductMapping,
            Role,
            Session,
            Store,
            StoreAccount,
            Transaction,
            User,
            Users,
            Variant,
            VariantOptions,
            VariantProductMapping,
          ],
          synchronize: configService.get<string>('NODE_ENV') === 'development',
          logging: true,
          options: {
            encrypt: false,
            trustServerCertificate: true,
          },
        };
      },
      inject: [ConfigService],
    }),
    ProductsModule,
    AuthModule,
    BrandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
