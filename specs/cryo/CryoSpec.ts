import { Cryo } from '../../src/cryo';

describe('Cryo sync', () => {
    let testCryo = new Cryo();
    let testO = { id: 0, name: 'joel' };
    testCryo.freezeSync(testO, 'test');

    describe('state does not exist', () => {
        it('should return false when it does not exist', () => {
            expect(testCryo.existsSync('test2')).toBeFalsy();
        });

    });

    describe('state exist', () => {
        it('should return true when it does exist', () => {
            expect(testCryo.existsSync('test')).toBeTruthy();
        });
    });

    describe('thaw exist', () => {
        let returnO = testCryo.thawSync('test');
        it('should return the correct object', () => {
            expect(returnO).toEqual(testO);
        });

        describe('when the new object changes a value', () => {
            it('should not change the original objects value', () => {
                returnO.name = 'joel2';
                let returnO2 = testCryo.thawSync('test');
                expect(returnO.name).toEqual('joel2');
                expect(returnO2.name).toEqual('joel');
                expect(returnO).not.toEqual(returnO2);
                expect(returnO2).toEqual(testO);
            });
        });
    });
});
