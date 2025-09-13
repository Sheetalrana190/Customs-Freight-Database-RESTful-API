import { AppDataSource } from "../../src/data-source";
import { Vehicle } from "../../src/entities/Vehicle";
import { BaseService } from "../../src/services/BaseService";

describe("Vehicle Service - unit", () => {
  let service: BaseService<Vehicle>;
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
    service = new BaseService<Vehicle>(Vehicle, "vehicleid" as any);
  });

  afterAll(() => jest.restoreAllMocks());

  test("findAll works", async () => {
    fakeRepo.find.mockResolvedValue([{ vehicleid: 1 }]);
    expect(await service.findAll()).toEqual([{ vehicleid: 1 }]);
  });

  test("create works", async () => {
    const data = { brand: "Test" } as any;
    fakeRepo.create.mockReturnValue(data);
    fakeRepo.save.mockResolvedValue({ vehicleid: 2, ...data });
    expect(await service.create(data)).toEqual({ vehicleid: 2, ...data });
  });

  test("findOne returns null when not found", async () => {
    fakeRepo.findOne.mockResolvedValue(null);
    expect(await (service as any).repo.findOne(9999)).toBeNull();
  });

});
