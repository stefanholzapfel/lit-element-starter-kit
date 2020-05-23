import { DeepReadonly } from 'ts-essentials';

export type LitElementStateSubscriptionFunction<P> = (
    value: StateChange<P>
) => void;

export interface StateChange<P> {
    readonly previous: DeepReadonly<P> | null
    readonly current: DeepReadonly<P> | null
}

export interface SubscribeStateOptions {
    getInitialValue: boolean;
    autoUnsubscribe?: boolean;
}

export interface State {
    app: {
        mobile: boolean;
        language: string;
        previousRoute: string;
        currentRoute: string;
    }
    components: {
        main: {
        
        }
        page1: {
        
        },
        page2: {
        
        }
    }
}
