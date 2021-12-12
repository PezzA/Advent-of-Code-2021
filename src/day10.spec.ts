import { Chunk, readLine } from "./day10"

const testCases = [
    ["{([(<{}[<>[]}>{[]{[(<()>", "}"],
    ["[[<[([]))<([[{}[[()]]]", ")"],
    ["[{[{({}]{}}([{[{{{}}([]", "]"],
    ["[<(<(<(<{}))><([]([]()", ")"],
    ["<{([([[(<>()){}]>(<<{{", ">"],
    ["({(<(())[]>[[{[]{<()<>>", ""]
]

const testData = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`.split('\n')

test.each(testCases)('testing %s, expecting %s', (data, expected) => {
    let chunk: Chunk = { delimter: data[0], closed: false, subChunks: [] }

    function testfunc() {
        readLine(data, 1, chunk)
    }

    if (expected !== "") {
        expect(testfunc).toThrowError(expected)
    } else {
        expect(testfunc).not.toThrow()
    }
})

test('it works', () => {

    let total = 0;

    for (let i = 0; i < testData.length; i++) {
        let chunk: Chunk = { delimter: testData[i][0], closed: false, subChunks: [] }

        try {
            readLine(testData[i], 1, chunk)
        } catch (err: unknown) {
            let val="";
            if (typeof err === "string") {
                val = err
            } else if (err instanceof Error) {
                val = err.message 
            }

            switch (val) {
                case ")":
                    total += 3
                    break;
                case "]":
                    total += 57;
                    break;
                case "}":
                    total += 1197
                    break;
                case ">":
                    total += 25137
            }
        }
    }

    console.log(total)
});