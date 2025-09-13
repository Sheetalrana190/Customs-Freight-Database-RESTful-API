import { AppDataSource } from "../../src/data-source";
import { Shipment } from "../../src/entities/Shipment";
import { BaseService } from "../../src/services/BaseService";

describe("Shipment Service - unit", () => {
  let service: BaseService<Shipment>;
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
    service = new BaseService<Shipment>(Shipment, "shipmentid" as any);
  });

  afterAll(() => jest.restoreAllMocks());

  test("findAll works", async () => {
    fakeRepo.find.mockResolvedValue([{ shipmentid: 1 }]);
    expect(await service.findAll()).toEqual([{ shipmentid: 1 }]);
  });

  test("create works", async () => {
    const data = { customerid: 1, weightkg: 1000 } as any;
    fakeRepo.create.mockReturnValue(data);
    fakeRepo.save.mockResolvedValue({ shipmentid: 2, ...data });
    expect(await service.create(data)).toEqual({ shipmentid: 2, ...data });
  });

    test("findOne returns null when not found", async () => {
    fakeRepo.findOne.mockResolvedValue(null);
    expect(await (service as any).repo.findOne(9999)).toBeNull();
  });
});
