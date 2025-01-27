/*
	x00, y00, z00:
		x00 	....xn
		y00 	....yn
		z00 	....xn_xor_yn
		z00 	....zn
		jfs 	....xn_and_yn
		none 	....carry_n_prev
		none 	....carry_n_prev_and_xn_xor_yn
		none 	....carry_n

	x45, y45, z45: 
		x45 	....xn
		y45 	....yn
		none 	....xn_xor_yn
		z45 	....zn
		none 	....xn_and_yn
		none 	....carry_n_prev
		none 	....carry_n_prev_and_xn_xor_yn
		none 	....carry_n
*/

//swapped wire(anu terminal) 
/*
	a normal ADDER:
	x01, y01, z01: 
		x01 	....xn
		y01 	....yn
		wsb 	....xn_xor_yn
		z01 	....zn
		vqv 	....xn_and_yn
		jfs 	....carry_n_prev
		dqt 	....carry_n_prev_and_xn_xor_yn
		rqf 	....carry_n
*/


/*
in: z09
*/

// four pairs of gates whose output wires have been swapped


/*
x00, y00, z00: 
	x00 	....xn
	y00 	....yn
	z00 	....xn_xor_yn
	none 	....zn
	jfs 	....xn_and_yn
	none 	....carry_n_prev
	none 	....carry_n_prev_and_xn_xor_yn
	none 	....carry_n
x01, y01, z01: 
x02, y02, z02: 
x03, y03, z03: 
x04, y04, z04: 
x05, y05, z05: 
x06, y06, z06: 
x07, y07, z07: 
x08, y08, z08: 
x09, y09, z09: 
	x09 	....xn
	y09 	....yn
	bbp 	....xn_xor_yn
	hnd 	....zn
	rbr 	....xn_and_yn
	wwg 	....carry_n_prev
	z09 	....carry_n_prev_and_xn_xor_yn
	none 	....carry_n
	********************************* hnd, z09
	
	step 0: if there is none in the complete_ADDER obtained from forward rhs for all exept lhs for carry_n_prev
	step 1: find the 2 AND gates, 2 XOR gates, 1 OR gate involved
	step 2: figure out what swap shall make it normal ?
	
	> wwg (confirm) cause no issue in x08, y08 level
	> x09 (confirm)
	> y09 (confirm)

	y09 XOR x09 -> bbp
	y09 AND x09 -> rbr
	bbp AND wwg -> z09  .... since hnd OR rbr -> kmf, where rbr = xn AND yn
	wwg XOR bbp -> hnd	.... this gotta be z09 since wwg is confirmed and bbp is confirmed
	rbr OR hnd -> kmf

x10, y10, z10: 
x11, y11, z11: 
x12, y12, z12: 
x13, y13, z13: 
x14, y14, z14: 
x15, y15, z15: 
x16, y16, z16: 
x17, y17, z17: 
x18, y18, z18: 
x19, y19, z19: 
x20, y20, z20: 
x21, y21, z21: 
x22, y22, z22: 
x23, y23, z23: 
	x23 	....xn
	y23 	....yn
	mfr 	....xn_xor_yn
	bks 	....zn
	z23 	....xn_and_yn
	scw 	....carry_n_prev
	qhm 	....carry_n_prev_and_xn_xor_yn
	none 	....carry_n
	********************************* bks, z23
	> scw (confirm) cause no issue in x22, y32 level
	x23	(confirm)
	y23 (confirm)

	1 (output swap) to make it normal ? 
	y23 XOR x23 -> mfr
	mfr XOR scw -> bks	.... should be z23, because scw is confirmed and ,fr is xn XOR yn is confirmed
	x23 AND y23 -> z23  .... should be bks
	scw AND mfr -> qhm
	qhm OR bks -> dch

x24, y24, z24: 
	dch .... carry_n_pre

x25, y25, z25: 
x26, y26, z26: 
x27, y27, z27: 
x28, y28, z28: 
x29, y29, z29: 
x30, y30, z30: 
x31, y31, z31: 
x32, y32, z32: 
x33, y33, z33: 
x34, y34, z34: 
x35, y35, z35: 
	rdh 	.... carry_n

x36, y36, z36: 

	# since none in carry_n_prev of x37, y37, z37 level
	step 0: if there is none in the complete_ADDER obtained from forward rhs for all exept lhs for carry_n_prev
	step 1: find the 2 AND gates, 2 XOR gates, 1 OR gate involved
	step 2: figure out what swap shall make it normal ?
	
	x36 XOR y36 -> wvp	....correct
	wvp XOR rdh -> z36	....correct
	x36 AND y36 -> mdk	....correct
	rdh AND wvp -> cbd	....correct
	mdk OR cbd -> ghr	....correct
	



x37, y37, z37: 
	x37 	....xn
	y37 	....yn
	nrn 	....xn_xor_yn
	none 	....zn
	tjp 	....xn_and_yn
	none 	....carry_n_prev
	none 	....carry_n_prev_and_xn_xor_yn
	none 	....carry_n
	**** swapped output wires?
	
	step 0: if there is none in the complete_ADDER obtained from forward rhs for all exept lhs for carry_n_prev
	step 1: find the 2 AND gates, 2 XOR gates, 1 OR gate involved
	step 2: figure out what swap shall make it normal ?

	-> ghr (confirm) cause no issue in x26, y36 level
	x37	(confirm)
	y37 (confirm)

	2 (output swap) to make it normal ? here are all 5 gates equation involved
		tjp AND ghr -> kpb		.... swap-1
		kpb OR nrn -> ggh		.... swap-1
		ghr XOR tjp -> z37 		
		xn_and_yn -> tjp		.... swap-0 (got to either nrn or kpb)
		xn_xor_yn -> nrn 		.... swap-0 (it got to be tjp) because ghr(carry_prev is confirmed) and tjp and ghr are involved in XOR which leads to zn
	
	corrected version:
		tjp AND ghr -> kpb
		kpb OR nrn -> ggh
		ghr XOR tjp -> z37
		xn_and_yn -> nrn	
		xn_xor_yn -> tjp 

x38, y38, z38: 
	ggh ....carry_prev
	
x39, y39, z39: 
x40, y40, z40: 
x41, y41, z41: 
x42, y42, z42: 
x43, y43, z43: 
x44, y44, z44: 
x45, y45, z45: 
	x45 	....xn
	y45 	....yn
	none 	....xn_xor_yn
	none 	....zn
	none 	....xn_and_yn
	none 	....carry_n_prev
	none 	....carry_n_prev_and_xn_xor_yn
	none 	....carry_n


after 3 swaps

	x 	 : 25491299606221n
	y 	 : 27561610995737n
	x + y: 53052910601958n
	
	just sum(from z wire): 53190349489894


even after all 3 swaps
@ z37:
x37 	....xn
y37 	....yn
nrn 	....xn_xor_yn
none 	....xn_xor_yn_back
none 	....zn
tjp 	....xn_and_yn
none 	....xn_and_yn_back
none 	....carry_n_prev
none 	....carry_n_prev_and_xn_xor_yn
none 	....carry_n_prev_and_xn_xor_yn_back
none 	....carry_n	


25491299606221n
27561610995737n
53052910601958n
sum(from z wire): 53052910536422

 10111001011110010011111011011 1001111011001101
 11001000100010011000000001000 0110100000011001
110000010000000101011111100011 0000011011100110


@z16

x16, y16, z16: 
x16 	....xn
y16 	....yn
mqf 	....xn_xor_yn
mqf 	....xn_xor_yn_back
tdv 	....zn
pwk 	....xn_and_yn
pwk 	....xn_and_yn_back
jkw 	....carry_n_prev
ncj 	....carry_n_prev_and_xn_xor_yn
ncj 	....carry_n_prev_and_xn_xor_yn_back
z16 	....carry_n

zn should be z16


*/



let IN = 
`x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
x05: 0
x06: 1
x07: 1
x08: 0
x09: 1
x10: 1
x11: 1
x12: 1
x13: 0
x14: 0
x15: 1
x16: 1
x17: 1
x18: 0
x19: 1
x20: 1
x21: 0
x22: 1
x23: 1
x24: 1
x25: 1
x26: 1
x27: 0
x28: 0
x29: 1
x30: 0
x31: 0
x32: 1
x33: 1
x34: 1
x35: 1
x36: 0
x37: 1
x38: 0
x39: 0
x40: 1
x41: 1
x42: 1
x43: 0
x44: 1
y00: 1
y01: 0
y02: 0
y03: 1
y04: 1
y05: 0
y06: 0
y07: 0
y08: 0
y09: 0
y10: 0
y11: 1
y12: 0
y13: 1
y14: 1
y15: 0
y16: 0
y17: 0
y18: 0
y19: 1
y20: 0
y21: 0
y22: 0
y23: 0
y24: 0
y25: 0
y26: 0
y27: 0
y28: 1
y29: 1
y30: 0
y31: 0
y32: 1
y33: 0
y34: 0
y35: 0
y36: 1
y37: 0
y38: 0
y39: 0
y40: 1
y41: 0
y42: 0
y43: 1
y44: 1

y40 AND x40 -> wdr
kpc OR jsd -> chv
jwm AND nbr -> pbb
mrn XOR mck -> z31
x37 AND y37 -> nrn
x13 XOR y13 -> jdm
nfw OR bbc -> wkc
y02 AND x02 -> qff
tdg XOR sjk -> z35
pjv AND fnq -> hrr
x36 AND y36 -> mdk
bnf OR vcn -> kbg
rfk AND qcq -> mnr
x38 XOR y38 -> bbq
ghr XOR tjp -> z37
x40 XOR y40 -> vtq
x39 XOR y39 -> drm
bcj OR qff -> jwm
y25 XOR x25 -> fnq
jdm AND wkc -> nrm
y30 XOR x30 -> wpg
mmp OR tjk -> rbc
x17 AND y17 -> dbh
x06 XOR y06 -> pgb
wpg AND jtf -> sqj
bgs AND rbc -> bvb
jdq AND gqw -> qbq
rqf XOR rjt -> z02
mdk OR cbd -> ghr
y32 XOR x32 -> hvk
psj XOR jfw -> z21
x36 XOR y36 -> wvp
wvd OR dgc -> fqf
dds XOR kmh -> z33
sfv AND rdb -> qmq
mvk XOR gkm -> z04
y22 XOR x22 -> wkb
wwg XOR bbp -> z09
djv OR mqd -> fgt
wkb XOR nfn -> z22
bkn OR ssg -> gng
nfn AND wkb -> tgj
y41 AND x41 -> wvd
qtk OR jnq -> wwg
x21 AND y21 -> jpq
kjb XOR bcm -> z34
x28 AND y28 -> drt
cqk XOR hns -> z15
x10 AND y10 -> ksw
dch AND tsc -> fkr
x44 XOR y44 -> nct
y20 XOR x20 -> bgs
ggh AND bbq -> bkn
pgb AND jbb -> kth
x01 AND y01 -> vqv
jfs AND wsb -> dqt
twn OR tkb -> jkw
y18 AND x18 -> smg
ttm OR tcv -> jtf
mfr XOR scw -> z23
x00 AND y00 -> jfs
bns AND qjr -> tgq
y03 XOR x03 -> nbr
ggh XOR bbq -> z38
y43 XOR x43 -> rdb
qht XOR kbg -> z08
jtf XOR wpg -> z30
bgf AND fqf -> fpf
gng XOR drm -> z39
y09 XOR x09 -> bbp
hmv OR fpf -> sfv
kjb AND bcm -> kbp
x15 XOR y15 -> hns
x35 XOR y35 -> sjk
bns XOR qjr -> z14
hfw OR pjj -> dds
qbq OR krf -> jbb
vtq AND dpf -> cvp
x21 XOR y21 -> jfw
rfk XOR qcq -> z18
y02 XOR x02 -> rjt
wvp XOR rdh -> z36
y39 AND x39 -> wjk
njw OR bvb -> psj
y09 AND x09 -> rbr
qdp AND kcs -> bnf
qmq OR spr -> cvc
x33 AND y33 -> rdv
sjk AND tdg -> ctf
y31 XOR x31 -> mck
hbj XOR jdn -> z27
vhf AND tdv -> vdn
x19 AND y19 -> tjk
y07 XOR x07 -> kcs
y07 AND x07 -> vcn
y34 XOR x34 -> kjb
y08 XOR x08 -> qht
hbc OR kdq -> jdq
bbp AND wwg -> hnd
x15 AND y15 -> twn
fdp AND shq -> ttm
y29 AND x29 -> tcv
x33 XOR y33 -> kmh
brw AND rnw -> dgc
x16 AND y16 -> pwk
nvh OR vdt -> vdm
rkp OR tgj -> scw
fmr OR sjh -> z45
scw AND mfr -> qhm
rdv OR dhg -> bcm
x04 XOR y04 -> mvk
x44 AND y44 -> fmr
y32 AND x32 -> pjj
kmf XOR mss -> z10
y38 AND x38 -> ssg
x22 AND y22 -> rkp
rqf AND rjt -> bcj
rbc XOR bgs -> z20
y29 XOR x29 -> shq
gbc OR wjk -> dpf
sqj OR bnd -> mrn
x13 AND y13 -> bhn
tdv XOR vhf -> z17
x00 XOR y00 -> z00
y28 XOR x28 -> nfk
kgv XOR wrk -> z26
x11 AND y11 -> jsd
cmm OR wkm -> jdn
x10 XOR y10 -> mss
rbr OR hnd -> kmf
wdr OR cvp -> rnw
y42 XOR x42 -> bgf
brw XOR rnw -> z41
x06 AND y06 -> ndm
y34 AND x34 -> tfn
y25 AND x25 -> dbm
y43 AND x43 -> spr
y23 XOR x23 -> mfr
rdb XOR sfv -> z43
ncj OR pwk -> tdv
gcp OR fkr -> pjv
y11 XOR x11 -> rcr
jdm XOR wkc -> z13
y30 AND x30 -> bnd
jkw XOR mqf -> z16
rcr AND cpj -> kpc
dpf XOR vtq -> z40
x08 AND y08 -> jnq
chv AND dpg -> nfw
y04 AND x04 -> kdq
vdm XOR nfk -> z28
y01 XOR x01 -> wsb
mss AND kmf -> hhm
fgt AND hvk -> hfw
hvk XOR fgt -> z32
x27 XOR y27 -> hbj
gqw XOR jdq -> z05
x12 XOR y12 -> dpg
fnq XOR pjv -> z25
drt OR mdh -> fdp
tjp AND ghr -> kpb
qhm OR bks -> dch
jbb XOR pgb -> z06
x16 XOR y16 -> mqf
psj AND jfw -> ffm
nfk AND vdm -> mdh
y26 XOR x26 -> wrk
mnr OR smg -> gbr
gkm AND mvk -> hbc
x31 AND y31 -> mqd
x12 AND y12 -> bbc
jfs XOR wsb -> z01
x23 AND y23 -> bks
y41 XOR x41 -> brw
hbj AND jdn -> nvh
tfn OR kbp -> tdg
dpg XOR chv -> z12
y17 XOR x17 -> vhf
fdp XOR shq -> z29
nct XOR cvc -> z44
bgf XOR fqf -> z42
x19 XOR y19 -> fff
x35 AND y35 -> ddp
x20 AND y20 -> njw
mck AND mrn -> djv
cpj XOR rcr -> z11
nbr XOR jwm -> z03
tsc XOR dch -> z24
x27 AND y27 -> vdt
cqk AND hns -> tkb
vdn OR dbh -> qcq
ffm OR jpq -> nfn
y14 XOR x14 -> bns
bhn OR nrm -> qjr
y03 AND x03 -> qvr
fff XOR gbr -> z19
qdp XOR kcs -> z07
x37 XOR y37 -> tjp
fqv OR tgq -> cqk
ctf OR ddp -> rdh
kgv AND wrk -> cmm
drm AND gng -> gbc
dbm OR hrr -> kgv
rdh AND wvp -> cbd
vqv OR dqt -> rqf
cvc AND nct -> sjh
y42 AND x42 -> hmv
hhm OR ksw -> cpj
y05 XOR x05 -> gqw
x05 AND y05 -> krf
mqf AND jkw -> ncj
x18 XOR y18 -> rfk
y14 AND x14 -> fqv
kpb OR nrn -> ggh
kbg AND qht -> qtk
pbb OR qvr -> gkm
x24 AND y24 -> gcp
y24 XOR x24 -> tsc
kth OR ndm -> qdp
gbr AND fff -> mmp
dds AND kmh -> dhg
x26 AND y26 -> wkm`;