import { AppDataSource } from "../../src/data-source";
import { Repair } from "../../src/entities/Repair";
import { BaseService } from "../../src/services/BaseService";

describe("Repair Service - unit", () => {
  let service: BaseService<Repair>;
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
    service = new BaseService<Repair>(Repair, "repairid" as any);
  });

  afterAll(() => jest.restoreAllMocks());

  test("findAll works", async () => {
    fakeRepo.find.mockResolvedValue([{ repairid: 1 }]);
    expect(await service.findAll()).toEqual([{ repairid: 1 }]);
  });

  test("create works", async () => {
    const data = { vehicleid: 1, mechanicid: 1 } as any;
    fakeRepo.create.mockReturnValue(data);
    fakeRepo.save.mockResolvedValue({ repairid: 2, ...data });
    expect(await service.create(data)).toEqual({ repairid: 2, ...data });
  });

    test("findOne returns null when not found", async () => {
    fakeRepo.findOne.mockResolvedValue(null);
    expect(await (service as any).repo.findOne(9999)).toBeNull();
  });
});
