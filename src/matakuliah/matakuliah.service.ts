import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Matakuliah } from './entities/matakuliah.entity';
import { CreateMatakuliahDto } from './dto/create-matakuliah.dto';
import { UpdateMatakuliahDto } from './dto/update-matakuliah.dto';

@Injectable()
export class MatakuliahService {
  constructor(
    @InjectRepository(Matakuliah)
    private readonly repo: Repository<Matakuliah>,
  ) {}

  findAll(): Promise<Matakuliah[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Matakuliah> {
    const data = await this.repo.findOneBy({ id });
    if (!data) {
      throw new NotFoundException(`Matakuliah dengan ID ${id} tidak ditemukan`);
    }
    return data;
  }

  async create(dto: CreateMatakuliahDto): Promise<Matakuliah> {
    const mhs = this.repo.create(dto);
    return this.repo.save(mhs);
  }

  async update(id: number, dto: UpdateMatakuliahDto): Promise<Matakuliah> {
    const existing = await this.repo.findOneBy({ id });
    if (!existing) throw new NotFoundException('Matakuliah tidak ditemukan');

    const updated = this.repo.merge(existing, dto);
    return this.repo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Matakuliah tidak ditemukan');
    }
  }
}
