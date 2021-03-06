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
  employeeNumber: u32;
  neededMoney: u128;
  totalMoney: u128;

  constructor(
    name: string,
    logo: string,
    description: string,
    promoVideo: string,
    employeeNumber: u32,
    neededMoney: u128,
    totalMoney: u128
  ) {
    this.id = math.hash32(name);
    this.name = name;
    this.logo = logo;
    this.description = description;
    this.promoVideo = promoVideo;
    this.employeeNumber = employeeNumber;
    this.neededMoney = neededMoney;
    this.totalMoney = totalMoney;
  }

  static insert(
    name: string,
    logo: string,
    description: string,
    promotionVideo: string,
    employeeNumber: u32,
    neededMoney: u128,
    totalMoney: u128
  ): Company {
    let oneNear = u128.fromString("1000000000000000000000000");
    neededMoney = u128.mul(neededMoney, oneNear);
    totalMoney = u128.mul(totalMoney, oneNear);
    //Create a new company
    const company = new Company(
      name,
      logo,
      description,
      promotionVideo,
      employeeNumber,
      neededMoney,
      totalMoney
    );

    //Insert the company into the map
    companies.set(company.id, company);

    return company;
  }

  static getCompanyById(companyId: u32): Company {
    //If company was not in list we will return error
    assert(companies.contains(companyId), "Company not found");

    //Get specific company
    return companies.getSome(companyId);
  }

  static findByIdAndUpdate(
    companyId: u32,
    name: string,
    logo: string,
    description: string,
    promoVideo: string,
    employeeNumber: u32
  ): Company {
    assert(companies.contains(companyId), "Company not found");
    //Get specific company
    const company = this.getCompanyById(companyId);

    //Update the company
    company.name = name;
    company.logo = logo;
    company.description = description;
    company.promoVideo = promoVideo;
    company.employeeNumber = employeeNumber;

    //Update the company in the map
    companies.set(company.id, company);

    return company;
  }

  static findByIdAndDelete(companyId: u32): string {
    assert(companies.contains(companyId), "Company not found");

    //Delete the company
    companies.delete(companyId);

    return "Company deleted";
  }

  static getAllCompanies(): Company[] {
    return companies.values();
  }

  static fundTheCompany(companyId: u32): Company {
    assert(companies.contains(companyId), "Company not found");

    //Get specific company
    const company = this.getCompanyById(companyId);

    //If user is the owner of company then the user cannot fund the company
    assert(!(context.sender == company.owner), "You can not fund own company");

    //Get contract name
    const contract = context.contractName;

    const XCC_GAS: u64 = 3_000_000_000_000;

    ContractPromiseBatch.create(company.owner)
      .transfer(context.attachedDeposit)
      .then(contract)
      .function_call("onTransferComplete", "{}", u128.Zero, XCC_GAS);

    company.totalMoney = u128.add(company.totalMoney, context.attachedDeposit);

    //Update the company in the map
    companies.set(company.id, company);

    return company;
  }
}
