import {cloneDeep} from 'lodash';
import {Store} from 'redux';

interface IStoreAndState {
    store: Store<any>;
    originalState: any;
}

export class MrFreeze {
    private states: { [id: string]: IStoreAndState };
    private thawCopyFunction: (storeState: any, clonedState: any) => any;

    constructor() {
        this.states = {};
    }

    public exists(key: string): boolean {
        return this.states[key] != null;
    }

    public freeze(store: Store<any>, key: string): Store<any> {
        this.states[key] = { store, originalState: {...store.getState()} };
        return this.thaw(key);
    }

    public thaw(key: string): Store<any> {
        if (this.exists(key)) {
            const store = this.states[key].store;
            const originalState = this.states[key].originalState;
            const clonedState = cloneDeep(originalState);
            const storeState = store.getState();
            const keys = Object.keys(clonedState);
            const length = keys.length;

            if (!this.thawCopyFunction) {
                this.createThawCopyFunction(storeState);
            }

            this.thawCopyFunction(storeState, clonedState);

            return store;
        } else {
            return null;
        }
    }

    private createThawCopyFunction(storeState: any) {
        const functionCode = [];

        Object.keys(storeState).forEach((key) => {
            functionCode.push(`storeState.${key} = clonedState.${key}`);
        });

        this.thawCopyFunction = new Function('storeState', 'clonedState', functionCode.join('\n')) as any;
    }
}

export const mrFreeze = new MrFreeze();
