import { LitElement } from 'lit-element';
import { DeepPartial } from 'ts-essentials';
import {
    LitElementStateSubscriptionFunction,
    State, SubscribeStateOptions
} from './litElementState';
import { LitElementStateService } from './litElementState.service';
import { LitElementStateSubscription } from './litElementStateSubscription';

// TODO: would be cool if we can figure out typings for a "sub"selection of state as root state on every lit-element
export class LitElementStateful extends LitElement {
    
    private autoUnsubscribeSubs: LitElementStateSubscription<any>[] = [];
    private stateService = LitElementStateService;
    
    constructor() {
        super();
    }
    
    setState(statePartial: DeepPartial<State>) {
        this.stateService.set(statePartial);
    }
    
    // Overloads
    subscribeState<K1 extends keyof State>(
        k1: K1,
        subscriptionFunction: LitElementStateSubscriptionFunction<State[K1]>
    ): LitElementStateSubscription<State[K1]> | void;
    subscribeState<K1 extends keyof State,
        K2 extends keyof State[K1]>(
        k1: K1,
        k2: K2,
        subscriptionFunction: LitElementStateSubscriptionFunction<State[K1][K2]>,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1][K2]> | void;
    subscribeState<K1 extends keyof State,
        K2 extends keyof State[K1],
        K3 extends keyof State[K1][K2]>(
        k1: K1,
        k2: K2,
        k3: K3,
        subscriptionFunction: LitElementStateSubscriptionFunction<State[K1][K2][K3]>,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1][K2][K3]> | void;
    subscribeState<K1 extends keyof State,
        K2 extends keyof State[K1],
        K3 extends keyof State[K1][K2],
        K4 extends keyof State[K1][K2][K3]>(
        k1: K1,
        k2: K2,
        k3: K3,
        k4: K4,
        subscriptionFunction: LitElementStateSubscriptionFunction<State[K1][K2][K3][K4]>,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1][K2][K3][K4]> | void;
    // Implementation
    subscribeState<Part>(
        ...params: (string | LitElementStateSubscriptionFunction<Part> | SubscribeStateOptions)[]
    ): LitElementStateSubscription<Part> | void {
        const subscription = this.stateService.subscribe.apply(this.stateService, params);
        let options = this.stateService.getSubscribeOptions();
        if (params[params.length - 1].hasOwnProperty('getInitialValue')) {
            options = params.pop() as SubscribeStateOptions;
        }
        if (options.autoUnsubscribe) {
            this.autoUnsubscribeSubs.push(subscription);
        } else {
            return subscription;
        }
    }
    
    // Overloads
    connectState<K1 extends keyof State>(
        k1: K1,
        propertyName: string,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1]>;
    connectState<K1 extends keyof State,
        K2 extends keyof State[K1]>(
        k1: K1,
        k2: K2,
        propertyName: string,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1][K2]>;
    connectState<K1 extends keyof State,
        K2 extends keyof State[K1],
        K3 extends keyof State[K1][K2]>(
        k1: K1,
        k2: K2,
        k3: K3,
        propertyName: string,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1][K2][K3]>;
    connectState<K1 extends keyof State,
        K2 extends keyof State[K1],
        K3 extends keyof State[K1][K2],
        K4 extends keyof State[K1][K2][K3]>(
        k1: K1,
        k2: K2,
        k3: K3,
        k4: K4,
        property: any,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1][K2][K3][K4]>;
    // Implementation
    connectState<Part>(
        ...params: (string | LitElement | SubscribeStateOptions)[]
    ): LitElementStateSubscription<Part> {
        let options = this.stateService.getSubscribeOptions();
        if (params[params.length - 1].hasOwnProperty('getInitialValue')) {
            options = params.pop() as SubscribeStateOptions;
        }
        params.push(this);
        params.push(options);
        const subscription = this.stateService.connect.apply(this.stateService, params);
        if (options.autoUnsubscribe) {
            this.autoUnsubscribeSubs.push(subscription);
        } else {
            return subscription;
        }
    }
    
    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.autoUnsubscribeSubs.forEach(subscription => subscription.unsubscribe())
    }
}
