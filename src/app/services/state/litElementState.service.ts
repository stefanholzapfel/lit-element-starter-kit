import { LitElement } from 'lit-element';
import { DeepPartial, DeepReadonly } from 'ts-essentials';
import {
    LitElementStateSubscriptionFunction,
    State,
    SubscribeStateOptions
} from './litElementState';
import { LitElementStateSubscription } from './litElementStateSubscription';

export class LitElementStateService {
    static async init(
        initialState: DeepPartial<State>,
        subscribeOptions?: SubscribeStateOptions
    ): Promise<LitElementStateService> {
        if (subscribeOptions) {
            LitElementStateService.subscribeOptions = {
                ...LitElementStateService.subscribeOptions,
                ...subscribeOptions
            };
        }
        return LitElementStateService;
    }
    
    private static _state: State;
    static get state(): DeepReadonly<State> {
        return this._state;
    };
    
    private static subscribeOptions: SubscribeStateOptions = {
        getInitialValue: true,
        autoUnsubscribe: true
    };
    
    private static stateSubscriptions: LitElementStateSubscription<any>[] = [];
    
    static set(statePartial: DeepPartial<State>): void {
        const newState = {
            ...this.state,
            ...statePartial
        };
        for (const subscription of this.stateSubscriptions) {
            // TODO: introduce parameter to emit only when change in value happened and not on re-set?
            const changedPartial = this.getPartial(
                subscription.path,
                statePartial
            );
            if (changedPartial !== 'path_not_found') {
                subscription.next(this.getPartial(
                    subscription.path,
                    newState
                ) as DeepPartial<State>);
            }
        }
        this._state = newState as State;
    };
    
    // Overloads
    static subscribe<K1 extends keyof State>(
        k1: K1,
        subscriptionFunction: LitElementStateSubscriptionFunction<State[K1]>,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1]>;
    static subscribe<K1 extends keyof State,
        K2 extends keyof State[K1]>(
        k1: K1,
        k2: K2,
        subscriptionFunction: LitElementStateSubscriptionFunction<State[K1][K2]>,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1][K2]>;
    static subscribe<K1 extends keyof State,
        K2 extends keyof State[K1],
        K3 extends keyof State[K1][K2]>(
        k1: K1,
        k2: K2,
        k3: K3,
        subscriptionFunction: LitElementStateSubscriptionFunction<State[K1][K2][K3]>,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1][K2][K3]>;
    static subscribe<K1 extends keyof State,
        K2 extends keyof State[K1],
        K3 extends keyof State[K1][K2],
        K4 extends keyof State[K1][K2][K3]>(
        k1: K1,
        k2: K2,
        k3: K3,
        k4: K4,
        subscriptionFunction: LitElementStateSubscriptionFunction<State[K1][K2][K3][K4]>,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1][K2][K3][K4]>;
    // Implementation
    static subscribe<Part>(
        ...params: (string | LitElementStateSubscriptionFunction<Part> | SubscribeStateOptions)[]
    ): LitElementStateSubscription<Part> {
        let options = this.subscribeOptions;
        if (params[params.length - 1].hasOwnProperty('getInitialValue')) {
            options = params.pop() as SubscribeStateOptions;
        }
        const subscriptionFunction = params.pop() as LitElementStateSubscriptionFunction<Part>;
        return this.subscribeHelper(params as string[], subscriptionFunction, options);
    }
    
    // Overloads
    static connect<K1 extends keyof State>(
        k1: K1,
        propertyName: string,
        litElement: LitElement,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1]>;
    static connect<K1 extends keyof State,
        K2 extends keyof State[K1]>(
        k1: K1,
        k2: K2,
        propertyName: string,
        litElement: LitElement,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1][K2]>;
    static connect<K1 extends keyof State,
        K2 extends keyof State[K1],
        K3 extends keyof State[K1][K2]>(
        k1: K1,
        k2: K2,
        k3: K3,
        propertyName: string,
        litElement: LitElement,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1][K2][K3]>;
    static connect<K1 extends keyof State,
        K2 extends keyof State[K1],
        K3 extends keyof State[K1][K2],
        K4 extends keyof State[K1][K2][K3]>(
        k1: K1,
        k2: K2,
        k3: K3,
        k4: K4,
        property: any,
        litElement: LitElement,
        options?: SubscribeStateOptions
    ): LitElementStateSubscription<State[K1][K2][K3][K4]>;
    // Implementation
    static connect<Part>(
        ...params: (string | LitElement | SubscribeStateOptions)[]
    ): LitElementStateSubscription<Part> {
        let options = this.subscribeOptions;
        if (params[params.length - 1].hasOwnProperty('getInitialValue')) {
            options = params.pop() as SubscribeStateOptions;
        }
        const litElement = params.pop() as LitElement;
        const propertyName = params.pop() as string;
        const subscriptionFunction = data => {
            // @ts-ignore
            if (litElement && litElement[propertyName]) {
                litElement[propertyName] = data.current;
            } else {
                throw new Error('LitElement or property on LitElement not found! Maybe the element was removed' +
                    ' but connectedProperty not unsubscribed?');
            }
        }
        return this.subscribeHelper(params as string[], subscriptionFunction, options);
    }
    
    static getSubscribeOptions(): Readonly<SubscribeStateOptions> {
        return LitElementStateService.subscribeOptions;
    }
    
    // Private helper functions
    
    private static subscribeHelper<Part>(
        path: string[],
        subscriptionFunction: LitElementStateSubscriptionFunction<Part>,
        options: SubscribeStateOptions): LitElementStateSubscription<Part> {
        const subscription = new LitElementStateSubscription<Part>(
            path,
            subscriptionFunction,
            this.unsubscribe.bind(this)
        );
        if (options.getInitialValue) {
            const partial = this.getPartial(
                subscription.path,
                this.state
            ) as Part;
            subscription.next(partial ? partial : null);
        }
        this.stateSubscriptions.push(subscription);
        return subscription;
    }
    
    
    private static unsubscribe(subscription: LitElementStateSubscription<DeepPartial<State>>) {
        const subIndex = this.stateSubscriptions.indexOf(subscription);
        if (subIndex >= 0) {
            this.stateSubscriptions.splice(
                subIndex,
                1
            );
        }
    }
    
    private static getPartial(segments: string[], object: DeepPartial<State>): DeepPartial<State> | 'path_not_found' {
        let partial = object;
        for (const segment of segments) {
            if (segment in partial) {
                partial = partial[segment];
            } else {
                return 'path_not_found';
            }
        }
        return partial;
    }
    
}
