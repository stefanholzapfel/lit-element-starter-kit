import { LitElementStateSubscriptionFunction } from './litElementState';

export class LitElementStateSubscription<P> {
    previousValue: P = null;
    value: P = null;
    path: string[];
    
    private subscriptionFunction;
    private unsubscribeFunction: (subscription: LitElementStateSubscription<P>) => void;
    
    constructor(
        path: string[],
        subscriptionFunction: LitElementStateSubscriptionFunction<P>,
        unsubscriptionFunction: (
            subscription: LitElementStateSubscription<any>
        ) => void
    ) {
        this.path = path;
        this.subscriptionFunction = subscriptionFunction;
        this.unsubscribeFunction = unsubscriptionFunction;
    }
    
    next(value: P) {
        this.previousValue = this.value;
        this.value = value;
        this.emitValue();
    }
    
    emitValue() {
        this.subscriptionFunction(
            {
                current: this.value,
                next: null
            }
        );
    }
    
    unsubscribe() {
        this.unsubscribeFunction(this);
    }
}
