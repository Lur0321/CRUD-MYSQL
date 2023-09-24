import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Breed } from 'src/breed/entities/breed.entity';

@Injectable()
export class CatsService {
  [x: string]: any;

  constructor(

    @InjectRepository(Cat)
   private readonly catRepository: Repository<Cat>, 

   @InjectRepository(Breed)
   private readonly breedRepository: Repository<Breed>
  ){}

  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedRepository.findOneBy({ name: createCatDto.breed});
    
    if(!breed){
      throw new BadRequestException('Breed not found');
    }
    return await this.catRepository.save({
      ...createCatDto,
      breed
    });
    /*const cat = this.catRepository.create(createCatDto);
    return await this.catRepository.save(cat);*/
    //return await this.catRepository.save(createCatDto);
    return;
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) { 
    /*const cat = await this.catRepository.findOneBy({id});
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    if (updateCatDto.name) {
      cat.name = updateCatDto.name;
    }

    if (updateCatDto.age) {
      cat.age = updateCatDto.age;
    }

    if (updateCatDto.breed) {
      cat.breed = updateCatDto.breed;
    }

    return this.catRepository.save(cat);*/
  }

  async remove(id: number) {
    return await this.catRepository.softDelete({id});
  }
}
