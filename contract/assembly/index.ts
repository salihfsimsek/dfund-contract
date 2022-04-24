import { Company } from "../models/models";
import { u128, logging } from "near-sdk-as";

export function create(
  name: string,
  logo: string,
  description: string,
  promoVideo: string,
  employeeNumber: u32,
  neededMoney: u128,
  totalMoney: u128
): Company {
  return Company.insert(
    name,
    logo,
    description,
    promoVideo,
    employeeNumber,
    neededMoney,
    totalMoney
  );
}

export function getById(companyId: u32): Company {
  return Company.getCompanyById(companyId);
}

export function update(
  companyId: u32,
  name: string,
  logo: string,
  description: string,
  promoVideo: string,
  employeeNumber: u32
): Company {
  return Company.findByIdAndUpdate(
    companyId,
    name,
    logo,
    description,
    promoVideo,
    employeeNumber
  );
}

export function del(companyId: u32): string {
  return Company.findByIdAndDelete(companyId);
}

export function getCompanies(): Company[] {
  return Company.getAllCompanies();
}

export function fundTheCompany(companyId: u32): Company {
  const company = Company.fundTheCompany(companyId);
  return company;
}

export function onTransferComplete(): void {
  logging.log("transfer completed");
}
