import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, Product, Category, Customer, Order, OrderItem, Payment } from './entities';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isTest = configService.get<string>('NODE_ENV') === 'test';
        const isDev = configService.get<string>('NODE_ENV') === 'development';
        
        if (isTest || isDev) {
          // Use SQLite for testing and development when SQL Server is not available
          return {
            type: 'sqlite',
            database: ':memory:',
            entities: [User, Product, Category, Customer, Order, OrderItem, Payment],
            synchronize: true,
            logging: false,
          };
        }
        
        // Production SQL Server configuration
        return {
          type: 'mssql',
          host: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT') || '1433'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [User, Product, Category, Customer, Order, OrderItem, Payment],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
