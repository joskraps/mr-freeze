import * as _ from 'lodash';
import * as Promise from 'bluebird';

interface IStateProps {
    stateName: string,
    state: any
}

interface ICryo {
    exists(key: string): boolean;
    freeze(store: any, key: string): boolean;
    thaw(key: string): any;
}

class Cryo implements ICryo {
    states: { [id: string]: IStateProps; }

    constructor() {
        this.states = {};
    }

    public exists(key: string): Promise<boolean> {
        return Promise.resolve(this.states[key] != null);
    }

    public freeze(store: any, key: string): Promise<boolean> {
        this.states[key] = <IStateProps>{ state: store, stateName: key };

        return Promise.resolve(true);
    }

    public thaw(key: string): Promise<any> {
        if (this.exists(key)) return Promise.resolve(_.cloneDeep(this.states[key].state));

        return Promise.resolve(null);
    }
}

