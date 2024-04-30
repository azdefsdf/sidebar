export class Invoice {
    idInvoice!: number; // Optional for new data, as ID is auto-generated
    invoiceNumber!: string;
    invoiceDate!: string; // Assuming you want to store date as string
    deliveryAddress!: string;
    totalAmount!: number;
    company!: string;
}
