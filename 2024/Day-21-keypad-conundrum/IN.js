let IN = 
`964A
246A
973A
682A
180A`;


let IN_PAD = 
`789
456
123
 0A

 ^A
<v>`;

let IN_PAD_ref = 
`+---+---+---+
| 7 | 8 | 9 |
+---+---+---+
| 4 | 5 | 6 |
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
    | 0 | A |
    +---+---+

    +---+---+
    | ^ | A |
+---+---+---+
| < | v | > |
+---+---+---+`;


/*

<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
v<<A>>^A<A>AvA<^AA>A<vAAA>^A
<A^A>^^AvvvA
029A


permutation prefer dx first since its given as 
char_x * abs(dx) + char_y * abs(dy)

A< = ["<v<A", "v<<A"] , level: 0

	<v<A, 	level: 1
		
		A<,		
			<v<A, 	level: 2
				return 4
		<v
			>A, 	level: 2
				return 2
		v<
			>A,		level: 2
				return 2
		<A
			>>^A,	level: 4
				return 4


	<v<A, 	level: 1
		A<,		
			<v<A, 	level: 2
				return 4
		<v
			>A, 	level: 2
				return 2
		v<
			>A,		level: 2
				return 2
		<A
			>>^A,	level: 4
				return 4


Advent		one of the shortest dkey combination
----------
[68] 029A: <vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
[60] 980A: <v<A>>^AAAvA^A<vA<AA>>^AvAA<^A>A<v<A>A>^AAAvA<^A>A<vA>^A<A>A
[68] 179A: <v<A>>^A<vA<A>>^AAvAA<^A>A<v<A>>^AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A
[64] 456A: <v<A>>^AA<vA<A>>^AAvAA<^A>A<vA>^A<A>A<vA>^A<A>A<v<A>A>^AAvA<^A>A
[64] 379A: <v<A>>^AvA^A<vA<AA>>^AAvA<^A>AAvA^A<vA>^AA<A>A<v<A>A>^AAAvA<^A>A

// 68 * 29, 60 * 980, 68 * 179, 64 * 456, and 64 * 379 = 126384

Oren		
----------
029A 68
	DOC_COUNT: (5) [Map(4), Map(12), Map(19), Map(19), Map(0)]
980A 60
	DOC_COUNT: (5) [Map(8), Map(12), Map(19), Map(19), Map(0)]
179A 68
	DOC_COUNT: (5) [Map(11), Map(16), Map(19), Map(19), Map(0)]
456A 64
	DOC_COUNT: (5) [Map(15), Map(16), Map(19), Map(19), Map(0)]
379A 64
	DOC_COUNT: (5) [Map(17), Map(16), Map(19), Map(19), Map(0)]
*/