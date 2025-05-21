import { IsString, IsNumber } from 'class-validator';

export class CreateMatakuliahDto {
  @IsString({ message: 'Kode Mata Kuliah' })
  kode: string;

  @IsString({ message: 'Nama tidak boleh kosong' })
  nama: string;

  @IsNumber({}, { message: 'SKS harus berupa angka' })
  sks: number;

  @IsString({ message: 'Semester harus berupa teks' })
  semester: string;

  @IsString({ message: 'Jurusan harus berupa teks' })
  jurusan: string;
}
