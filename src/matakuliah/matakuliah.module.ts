import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatakuliahService } from './matakuliah.service';
import { MatakuliahController } from './matakuliah.controller';
import { Matakuliah } from './entities/matakuliah.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Matakuliah])],
  controllers: [MatakuliahController],
  providers: [MatakuliahService],
})
export class MatakuliahModule {}
