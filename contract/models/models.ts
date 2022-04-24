import {
  PersistentUnorderedMap,
  math,
  context,
  u128,
  ContractPromiseBatch,
} from "near-sdk-as";

export const companies = new PersistentUnorderedMap<u32, Company>("companies");

@nearBindgen
export class Company {
  id: u32;
  owner: string = context.sender;
  name: string;
  logo: string;
  description: string;
  promoVideo: string;
  employeeNumber: number;
  needMoney: u128;
  totalMoney: u128;

  constructor(
    name: string,
    logo: string,
    description: string,
    promoVideo: string,
    employeeNumber: number,
    neededMoney: u128,
    totalMoney: u128
  ) {
    this.id = math.hash32(name);
    this.name = name;
    this.logo = logo;
    this.description = description;
    this.promoVideo = promoVideo;
    this.employeeNumber = employeeNumber;
    this.needMoney = neededMoney;
    this.totalMoney = totalMoney;
  }
}
