import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillCategory } from './skill-category.entity';
import { Repository } from 'typeorm';
import { CreateSkillCategoryDto } from './skills-category.dtos';
import { OrganizationsService } from '../organizations/organizations.service';

@Injectable()
export class SkillsCategoryService {
  constructor(
    @InjectRepository(SkillCategory)
    private skillCategoryRepository: Repository<SkillCategory>,
    private organizationsService: OrganizationsService,
  ) {}

  async createSkillCategory(data: CreateSkillCategoryDto) {
    const organization = await this.organizationsService.findOrganizationById(data.organizationId);
    if (!organization) {
      throw new NotFoundException('Organization not found.');
    }

    const skillCategory = this.skillCategoryRepository.create({
      name: data.categoryName,
      organization,
    });

    return await this.skillCategoryRepository.save(skillCategory);
  }

  async findSkillCategoryById(categoryId: number) {
    const category = await this.skillCategoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new NotFoundException('SKill category not found');
    }
    return category;
  }
}
