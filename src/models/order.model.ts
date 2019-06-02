export class orderModel {
 
    constructor(       
        public orderID?: number,
        public kID?: number,
        public itemID?: number, 
        public quantity?: number,
        public melt?: number,
        public advancedRawMat?: number,
        public totalRawMat?: number,
        public expectedDate?: Date,
        public createDate?: Date,
        public closingDate?: Date,
        public description?: string,
    public oStatus?: number,
    public oType?: number){}
}