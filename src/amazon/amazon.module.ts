import { Module } from '@nestjs/common';
import { AmazonService } from './amazon.service';
import { AmazonController } from './amazon.controller';

@Module({
  providers: [AmazonService],
  controllers: [AmazonController]
})
export class AmazonModule {}
