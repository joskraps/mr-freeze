import {MrFreeze} from '../../src/mr-freeze';
import {createStore} from 'redux';

interface IStoreState {
    name: string;
    baz: {
        foo: string;
        bar: number;
    };
}

const initialState = {
    baz: {
        bar: 22,
        foo: 'hey',
    },
    name: 'Joel',
};

const testReducer = (state: IStoreState, actions: Redux.Action) => {
    return initialState;
};

describe('Mr Freeze', () => {
    let store: Redux.Store<IStoreState>;
    let testMrFreeze: MrFreeze;

    beforeEach(() => {
        store = createStore<IStoreState>(testReducer, initialState);
        testMrFreeze = new MrFreeze();
    });

    describe('store does not exist', () => {
        it('should return false when it does not exist', () => {
            expect(testMrFreeze.exists('test2')).toBeFalsy();
        });

    });

    describe('store exists', () => {
        beforeEach(() => {
            testMrFreeze.freeze(store, 'test');
        });

        it('should return true when it does exist', () => {
            expect(testMrFreeze.exists('test')).toBeTruthy();
        });
    });

    describe('thawing a frozen store', () => {
        let thawedStore: Redux.Store<IStoreState>;

        beforeEach(() => {
            testMrFreeze.freeze(store, 'test');
            thawedStore = testMrFreeze.thaw('test');
        });

        it('should return the correct object', () => {
            const state = thawedStore.getState();
            expect(state.name).toBe('Joel');
            expect(state.baz.bar).toBe(22);
            expect(state.baz.foo).toBe('hey');
        });

        describe('when a value is changed on a thawed store', () => {
            beforeEach(() => {
                thawedStore.getState().baz.foo = 'yo';
            });

            it('should not affect other thawed stores', () => {
                const anotherThawedStore = testMrFreeze.thaw('test');
                expect(anotherThawedStore.getState().baz.foo).toBe('hey');
            });
        });
    });
});
