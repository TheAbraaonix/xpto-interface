import { ClientInputModel } from "./client-input-model";
import { ServiceExecuterInputModel } from "./serviceExecuter-input-model";

export class ServiceOrderInputModel {
    public serviceNumber: number = 0;
    public serviceTitle: string = "";
    public serviceDate: Date = new Date();
    public serviceValue: number = 0;
    public client: ClientInputModel = new ClientInputModel();
    public serviceExecuter: ServiceExecuterInputModel = new ServiceExecuterInputModel();
}