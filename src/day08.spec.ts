import * as Day08 from "./day08"

const testData =`be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

const workedExample =`acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`


test('it should parseData', ()=>{
    const data = Day08.parseData(testData.split('\n'))

    expect(data[0].output).toHaveLength(4)
    expect(data[0].signals).toHaveLength(10)
})

test('it shoudl find letters', ()=> {
    
    const signals = "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab".split(" ");
    const outputs = "cdfeb fcadb cdfeb cdbaf".split(" ");

    expect(Day08.detectA(signals)).toBe("d")
    expect(Day08.detectB(signals)).toBe("e")
    expect(Day08.detectC(signals)).toBe("a")
    expect(Day08.detectD(signals)).toBe("f")
    expect(Day08.detectE(signals)).toBe("g")
    expect(Day08.detectF(signals)).toBe("b")
    // dont need to find g    

})

test('finds lettes', ()=>{

    const signals = 'bae febac abcgf eabfgd cbagfd gefcba abedfcg efcda eb becg'.split(" ");
    const outputs = 'fcgab gafbed aedcfbg eb'.split(' ');
    
    console.log(Day08.detectA(signals))
    console.log(Day08.detectB(signals))
    console.log(Day08.detectC(signals))
    console.log(Day08.detectD(signals))
    console.log(Day08.detectE(signals))
    console.log(Day08.detectF(signals))
})

test('it should work', ()=>{
    let total=0;
    const data = Day08.parseData(testData.split('\n'))

    data.forEach(line => {
        total+=Day08.getNumberValue(line)
    });
    expect(total).toBe(61229)
})