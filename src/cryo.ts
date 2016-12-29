import * as Promise from 'bluebird';
import * as _ from 'lodash';

interface IStateProps {
    stateName: string;
    state: any;
}

interface ICryo {
    exists(key: string): Promise<boolean>;
    freeze(store: any, key: string): Promise<void>;
    thaw(key: string): Promise<any>;
}

export class Cryo implements ICryo {
    private states: { [id: string]: IStateProps; };

    constructor() {
        this.states = {};
    }

    public exists(key: string): Promise<boolean> {
        return Promise.resolve(this.states[key] != null);
    }

    public freeze(store: any, key: string): Promise<void> {
        this.states[key] = <IStateProps>{ state: store, stateName: key };

        return Promise.resolve();
    }

    public thaw(key: string): Promise<any> {
        if (this.exists(key)) {
            return Promise.resolve(_.cloneDeep(this.states[key].state));
        }

        return Promise.resolve(null);
    }
}
