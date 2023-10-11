import { Module } from '@nestjs/common';
import { AmazonModule } from './amazon/amazon.module';


@Module({
  imports: [
    
    AmazonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
