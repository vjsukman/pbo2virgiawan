import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Matakuliah {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  kode: string;

  @Column()
  nama: string;

  @Column()
  sks: number;

  @Column()
  semester: string;

  @Column()
  jurusan: string;
}
