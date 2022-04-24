import { Company } from "../models/models";
import { u128, logging } from "near-sdk-as";

export function create(
  name: string,
  logo: string,
  description: string,
  promoVideo: string,
  employeeNumber: number,
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
