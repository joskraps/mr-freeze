import * as Promise from 'bluebird';
import {cloneDeep} from 'lodash';

export interface IStateProps {
    stateName: string;
    state: any;
}

export class Cryo {
    private states: { [id: string]: IStateProps; };

    constructor() {
        this.states = {};
    }

    public existsSync(key: string): boolean {
        return this.states[key] != null;
    }

    public exists(key: string): Promise<boolean> {
        return Promise.resolve(this.states[key] != null);
    }

    public freeze(store: any, key: string): Promise<void> {
        this.states[key] = <IStateProps>{ state: store, stateName: key };

        return Promise.resolve();
    }

    public freezeSync(store: any, key: string): boolean {
        this.states[key] = <IStateProps>{ state: store, stateName: key };

        return true;
    }

    public thaw(key: string): Promise<any> {
        if (this.exists(key)) {
            return Promise.resolve(cloneDeep(this.states[key].state));
        }

        return Promise.resolve(null);
    }

    public thawSync(key: string): any {
        if (this.exists(key)) {
            return cloneDeep(this.states[key].state);
        }

        return null;
    }
}
