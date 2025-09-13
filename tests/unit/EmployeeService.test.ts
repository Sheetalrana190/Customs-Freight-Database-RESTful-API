import { AppDataSource } from "../../src/data-source";
import { Employee } from "../../src/entities/Employee";
import { BaseService } from "../../src/services/BaseService";

describe("Employee Service - unit", () => {
  let service: BaseService<Employee>;
  const fakeRepo: any = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };

  beforeAll(() => {
    jest.spyOn(AppDataSource, "getRepository" as any).mockReturnValue(fakeRepo);
    service = new BaseService<Employee>(Employee, "employeeid" as any);
  });

  afterAll(() => jest.restoreAllMocks());

  test("findAll works", async () => {
    fakeRepo.find.mockResolvedValue([{ employeeid: 1 }]);
    expect(await service.findAll()).toEqual([{ employeeid: 1 }]);
  });

  test("create works", async () => {
    const data = { firstname: "John", lastname: "Doe" } as any;
    fakeRepo.create.mockReturnValue(data);
    fakeRepo.save.mockResolvedValue({ employeeid: 2, ...data });
    expect(await service.create(data)).toEqual({ employeeid: 2, ...data });
  });

    test("findOne returns null when not found", async () => {
    fakeRepo.findOne.mockResolvedValue(null);
    expect(await (service as any).repo.findOne(9999)).toBeNull();
  });

})