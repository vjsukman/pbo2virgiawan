import { Injectable } from '@nestjs/common';
import { Matakuliah } from './entities/matakuliah.entity';
import { CreateMatakuliahDto } from './dto/create-matakuliah.dto';
import { UpdateMatakuliahDto } from './dto/update-matakuliah.dto';

@Injectable()
export class MatakuliahService {
  private data: Matakuliah[] = [];

  create(createMatakuliahDto: CreateMatakuliahDto): Matakuliah {
    const newMatakuliah = new Matakuliah(
      createMatakuliahDto.kode,
      createMatakuliahDto.nama,
      createMatakuliahDto.sks,
      createMatakuliahDto.semester,
      createMatakuliahDto.jurusan,
    );
    this.data.push(newMatakuliah);
    return newMatakuliah;
  }

  findAll(): Matakuliah[] {
    return this.data;
  }

  findOne(kode: string): Matakuliah | undefined {
    return this.data.find((m) => m.kode === kode);
  }

  update(
    kode: string,
    updateMatakuliahDto: UpdateMatakuliahDto,
  ): Matakuliah | null {
    if (
      !updateMatakuliahDto.kode ||
      !updateMatakuliahDto.nama ||
      !updateMatakuliahDto.sks ||
      !updateMatakuliahDto.semester ||
      !updateMatakuliahDto.jurusan
    ) {
      throw new Error('Semua field wajib diisi untuk update');
    }
    const index = this.data.findIndex((m) => m.kode === kode);
    if (index === -1) return null;
    const updated = new Matakuliah(
      updateMatakuliahDto.kode,
      updateMatakuliahDto.nama,
      updateMatakuliahDto.sks,
      updateMatakuliahDto.semester,
      updateMatakuliahDto.jurusan,
    );
    this.data[index] = updated;
    return updated;
  }

  remove(kode: string): Matakuliah | null {
    const index = this.data.findIndex((m) => m.kode === kode);
    if (index === -1) return null;
    const deleted = this.data[index];
    this.data.splice(index, 1);
    return deleted;
  }
}
