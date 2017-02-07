// import {Cryo} from '../../src/cryo';
// import {createStore} from 'redux';

// interface IStoreState {
//     name: string;
// }

// describe('Cryo', () => {
//     let store: Redux.Store<IStoreState>;
//     let testCryo: Cryo;

//     beforeEach(() => {
//         store = createStore<IStoreState>((state: IStoreState, action: Redux.Action) => {name: 'Joel'});
//         testCryo = new Cryo();
//     });

//     describe('store does not exist', () => {
//         it('should return false when it does not exist', () => {
//             expect(testCryo.exists('test2')).toBeFalsy();
//         });

//     });

//     describe('store exists', () => {
//         beforeEach(() => {
//             testCryo.freeze(store, 'test');
//         });

//         it('should return true when it does exist', () => {
//             expect(testCryo.exists('test')).toBeTruthy();
//         });
//     });

//     describe('thawing a frozen store', () => {
//         it('should return the correct object', () => {
//             expect(returnO).toEqual(testO);
//         });

//         describe('when the new object changes a value', () => {
//             it('should not change the original objects value', () => {
//                 returnO.name = 'joel2';
//                 let returnO2 = testCryo.thaw('test');
//                 expect(returnO.name).toEqual('joel2');
//                 expect(returnO2.name).toEqual('joel');
//                 expect(returnO).not.toEqual(returnO2);
//                 expect(returnO2).toEqual(testO);
//             });
//         });
//     });
// });
