import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { MatakuliahService } from './matakuliah.service';
import { CreateMatakuliahDto } from './dto/create-matakuliah.dto';
import { UpdateMatakuliahDto } from './dto/update-matakuliah.dto';

@Controller('matakuliah')
export class MatakuliahController {
  constructor(private readonly matakuliahService: MatakuliahService) {}

  @Post()
  create(@Body() createMatakuliahDto: CreateMatakuliahDto) {
    return this.matakuliahService.create(createMatakuliahDto);
  }

  @Get()
  findAll() {
    return this.matakuliahService.findAll();
  }

  @Get(':kode')
  findOne(@Param('kode') kode: string) {
    const matkul = this.matakuliahService.findOne(kode);
    if (!matkul) {
      throw new NotFoundException(
        `Matakuliah dengan kode ${kode} tidak ditemukan`,
      );
    }
    return matkul;
  }

  @Put(':kode')
  update(
    @Param('kode') kode: string,
    @Body() updateMatakuliahDto: UpdateMatakuliahDto,
  ) {
    try {
      const updated = this.matakuliahService.update(kode, updateMatakuliahDto);
      if (!updated) {
        throw new NotFoundException(
          `Matakuliah dengan kode ${kode} tidak ditemukan`,
        );
      }
      return updated;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Terjadi kesalahan tak dikenal');
    }
  }

  @Delete(':kode')
  remove(@Param('kode') kode: string) {
    const deleted = this.matakuliahService.remove(kode);
    if (!deleted) {
      throw new NotFoundException(
        `Matakuliah dengan kode ${kode} tidak ditemukan`,
      );
    }
    return deleted;
  }
}
