import { AppDataSource } from "../data-source";
import {
  Repository,
  DeepPartial,
  ObjectLiteral,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class BaseService<T extends ObjectLiteral> {
  repo: Repository<T>;
  idColumn: keyof T;

  constructor(entity: { new (): T }, idColumn: keyof T) {
    this.repo = AppDataSource.getRepository<T>(entity);
    this.idColumn = idColumn;
  }

  findAll() {
    return this.repo.find();
  }

  async findById(id: number) {
    return this.repo.findOne({
      where: { [this.idColumn]: id } as any,
    });
  }

  create(data: DeepPartial<T>) {
    const obj = this.repo.create(data);
    return this.repo.save(obj);
  }

  async update(id: number, data: QueryDeepPartialEntity<T>) {
    await this.repo.update({ [this.idColumn]: id } as any, data);
    return this.findById(id);
  }

  async delete(id: number) {
    const result = await this.repo.delete({ [this.idColumn]: id } as any);
    return (result.affected ?? 0) > 0;
  }
}
