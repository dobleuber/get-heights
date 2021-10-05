const fetch = require('cross-fetch');
const {
    getMatchingPropSum,
    getDataFile,
    processData,
    getMatchingPairs,
    formatOutput,
} = require('./main');

const mockData = require('./mocked-data.json');
const expectedData = require('./expected-data.json');
jest.mock('cross-fetch');

describe('main', () => {
    beforeEach(() => {
        fetch.mockResolvedValue({json: () => mockData});
    })

    describe('getDataFile', () => {
        it('should exist', () => {
            expect(getDataFile).toBeDefined();
        });
    
        it('should call fetch', async () => {
            const data = await getDataFile();
            expect(data).toBeDefined();
            expect(data.values).toBeDefined();
            expect(data.values.length).toBe(mockData.values.length);
        })
    });

    describe('processData', () => {
        it('should exist', () => {
            expect(processData).toBeDefined();
      });

        it('should return an sorted array with the prop values', () => {
            const {keys} = processData(mockData.values, 'h_in');
            expect(Array.isArray(keys)).toBeTruthy();
            expect(keys).toEqual(expectedData.keys);
        });

        it(`should return a dictionay with prop as key
and a list of players matching that value`, () => {
            const {players} = processData(mockData.values, 'h_in');
            expect(players).toEqual(expectedData.players);
        })
    });

    describe('getMatchingPairs', () => {
        it('should exist', () => {
            expect(getMatchingPairs).toBeDefined();
        });

        it('should return two pairs for sum 150', () => {
            const result = getMatchingPairs(expectedData.keys, 150);
            expect(result.length).toBe(1);
        })

        it('should return three pairs for sum 157', () => {
            const result = getMatchingPairs(expectedData.keys, 157);
            expect(result.length).toBe(3);
        })

        it('should return a repeated pair for sum 148', () => {
            const result = getMatchingPairs(expectedData.keys, 148);
            expect(result).toEqual([[74, 74]]);
        })
    });

    describe('getMatchingPropSum', () => {
        it('should exist', () => {
            expect(getMatchingPropSum).toBeDefined();
        });

        it('should return "[]" if sum value is too low', ()=> {
            const result = getMatchingPropSum(expectedData, 20);
            expect(result).toEqual([]);
        });

        it('should return "[]" if sum there lower than twice the lowest value', ()=> {
            const result = getMatchingPropSum(expectedData, 100);
            expect(result).toEqual([]);
        });

        it('should return "[]" if sum there bigger than twice the highest value', ()=> {
            const result = getMatchingPropSum(expectedData, 200);
            expect(result).toEqual([]);
        });

        it('should return 4 pairs for 150', ()=> {
            const result = getMatchingPropSum(expectedData, 150);
            expect(result).toEqual([
                [ 'Hassan Adams', 'Rafer Alston' ],
                [ 'Tony Allen', 'Rafer Alston'],
                [ 'Hassan Adams', 'Marcus Banks'],
                [ 'Tony Allen', 'Marcus Banks' ]
            ]);
        });

        it('should return 1 pairs for 148', ()=> {
            const result = getMatchingPropSum(expectedData, 148);
            expect(result).toEqual([["Rafer Alston", "Marcus Banks"]]);
        });

        it('should return pairs with the same height', ()=> {
            const result = getMatchingPropSum(expectedData, 154);
            expect(result).toEqual([
                [ 'Joe Alexander', 'Rafer Alston' ],
                [ 'Joe Alexander', 'Marcus Banks' ],
                [ 'Hassan Adams', 'Morris Almond' ],
                [ 'Tony Allen', 'Morris Almond' ],
                [ 'Alex Acker', 'Arron Afflalo' ],
                [ 'Alex Acker', 'Maurice Ager' ],
                [ 'Alex Acker', 'Ray Allen' ],
                [ 'Arron Afflalo', 'Maurice Ager' ],
                [ 'Arron Afflalo', 'Ray Allen' ],
                [ 'Maurice Ager', 'Ray Allen' ]
              ]);
        });
    });

    describe('formatOutput', () => {
        let logSpy;
        beforeEach(() => {
            logSpy = jest.spyOn(console, "log");
        })
        it('should exist', () => {
            expect(formatOutput).toBeDefined();
        });

        it('should render "No matches found" if pairs is an empty array', ()=>{
            formatOutput([]);
            expect(logSpy).toHaveBeenCalledWith("No matches found");
        });

        it('should render a list of pairs if pairs is not empty', ()=>{
            formatOutput([["Rafer Alston", "Hassan Adams"], ["Rafer Alston", "Tony Allen"]]);
            expect(logSpy).toHaveBeenCalledTimes(2);
            expect(logSpy.mock.calls[0]).toEqual(["- Rafer Alston\t\tHassan Adams"]);
            expect(logSpy.mock.calls[1]).toEqual(["- Rafer Alston\t\tTony Allen"]);
        });

    })
})

