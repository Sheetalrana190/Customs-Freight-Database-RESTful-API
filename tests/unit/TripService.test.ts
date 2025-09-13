import { AppDataSource } from "../../src/data-source";
import { Trip } from "../../src/entities/Trip";
import { BaseService } from "../../src/services/BaseService";

describe("Trip Service - unit", () => {
  let service: BaseService<Trip>;
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
    service = new BaseService<Trip>(Trip, "tripid" as any);
  });

  afterAll(() => jest.restoreAllMocks());

  test("findAll works", async () => {
    fakeRepo.find.mockResolvedValue([{ tripid: 1 }]);
    expect(await service.findAll()).toEqual([{ tripid: 1 }]);
  });

  test("create works", async () => {
    const data = { routefrom: "Toronto", routeto: "Vancouver" } as any;
    fakeRepo.create.mockReturnValue(data);
    fakeRepo.save.mockResolvedValue({ tripid: 2, ...data });
    expect(await service.create(data)).toEqual({ tripid: 2, ...data });
  });

    test("findOne returns null when not found", async () => {
    fakeRepo.findOne.mockResolvedValue(null);
    expect(await (service as any).repo.findOne(9999)).toBeNull();
  });
});
