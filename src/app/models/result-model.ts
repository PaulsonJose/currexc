import { RateModel } from "./rate-model";

export class ResultModel {
    name?:string;
    base?:string;
    date?:string;
    transferAmount:number = 1;
    serviceCharge?:number = 0;
    rates?:Array<RateModel>;
}
