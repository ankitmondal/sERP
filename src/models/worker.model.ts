export class workerModel {
   public workerName: string;
   public wAddress: string;
   public wPhone: string;
   public wAge?: number;
   public kID?: number;
   
    constructor( workerName: string, wAddress: string, wPhone: string, wAge?: number, kID?: number){
        this.kID = kID;
        this.workerName= workerName;
        this.wAddress= wAddress;
        this.wAge= wAge;
        this.wPhone= wPhone;
    } 
}