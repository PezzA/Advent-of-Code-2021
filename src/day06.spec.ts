import { parseData, PartOne, runDays, runList } from "./day06";

const testData = `3,4,3,1,2`


test('parseData works', () => {
    const data = parseData(testData)
    expect(data).toHaveLength(5)
    expect(data[0]).toBe(3)
    expect(data[4]).toBe(2)
});

test('should tick correctly', () => {
    const data = parseData(testData)

    let newData = runList(data)

    expect(newData).toMatchObject([2, 3, 2, 0, 1])

    newData = runList(data)
    expect(newData).toMatchObject([1, 2, 1, 6, 0, 8])

    newData = runList(data)
    expect(newData).toMatchObject([0, 1, 0, 5, 6, 7, 8])

    newData = runList(data)
    expect(newData).toMatchObject([6, 0, 6, 4, 5, 6, 7, 8, 8])
});

test('it should work', () => {
    const data = parseData(testData)
    //expect(runDays(data, 80)).toHaveLength(5934)
});

const repro = 7
function getFirstForDate(age :number, daysRemaining:number): number{
    console.log(age, daysRemaining)
    let days = age + 1
    let fish = 1
    while (days < daysRemaining) {
        console.log('spawn')
        days += repro
        fish += getFirstForDate(repro+2,daysRemaining-repro)
    }
   
    return fish
}

test('one fish', () => {
    console.log(runDays([5], 16).length)
    console.log(getFirstForDate(5, 16))

    /*
        const firstFish = Math.floor(days/repro);//days left / repro time
        let total = firstFish;
        for(let i=0; i < firstFish; i++){
    
            const timeRemaining  = (days-2) - (i * repro)
            total += Math.floor(timeRemaining / repro) 
        }
    
        console.log(total)
    */
});