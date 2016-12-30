import * as Promise from 'bluebird';
import * as _ from 'lodash';

export interface IStateProps {
    stateName: string;
    state: any;
}

export interface ICryo {
    exists(key: string): Promise<boolean>;
    existsSync(key: string): boolean;
    freeze(store: any, key: string): Promise<void>;
    freezeSync(store: any, key: string): boolean
    thaw(key: string): Promise<any>;
    thawSync(key: string): any;
}

export class Cryo implements ICryo {
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
            return Promise.resolve(_.cloneDeep(this.states[key].state));
        }

        return Promise.resolve(null);
    }

    public thawSync(key: string): any {
        if (this.exists(key)) {
            return _.cloneDeep(this.states[key].state);
        }

        return null;
    }
}
