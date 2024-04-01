export class Document {
    id: number;
    documentId: string;
    status: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id : any,status: any ) {
        this.id = 0;
        this.documentId = id;
        this.status = status;
        this.userId = Math.floor(10000 + Math.random() * 90000).toString(); // Generate a random 5-digit number
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }


}
