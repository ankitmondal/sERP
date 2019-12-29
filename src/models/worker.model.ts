import { DateTime } from "ionic-angular";

export class workerModel {
    public kID :number;
    public workerName :string;
    public userName :string ;
    public lastUpdated? :DateTime
    public wAddress:string ;
    public wPhone :string;
    public wAge? : number;

    constructor(
         workerName: string,
         wAddress: string,
         wPhone: string,
         wAge?: number, 
         kID?: number){
            this.workerName = workerName;
            this.wAddress = wAddress;
            this.wPhone= wPhone;
            this.wAge=wAge;
            this.kID=kID;
            this.userName ="";
            this.lastUpdated = null;
        } 
}