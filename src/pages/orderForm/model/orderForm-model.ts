export interface IOrderForm {
    id: number;
    client: string;
    costOfBdc: number;
    externalProvider: string;
    frameworkContractNumber: string;
    requestIdentifier: string;
    signatureDate: Date;
    service: string;
    taskDeadline: Date;
    sourceLanguage: string;
    targetLanguage: string;
    commitmentNumber: string;
    fileUrl: string;
}
