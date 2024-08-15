import { ClientViewModel } from "./client-view-model";
import { ServiceExecuterViewModel } from "./serviceExecuter-view-model";

export class ServiceOrderViewModel {
    public id: string = "";
    public serviceNumber: number = 0;
    public serviceTitle: string = "";
    public serviceDate: Date = new Date();
    public serviceValue: number = 0;
    public serviceClient: ClientViewModel = new ClientViewModel();
    public serviceExecuter: ServiceExecuterViewModel = new ServiceExecuterViewModel();
}