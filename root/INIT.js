function _A()
{
	for(let year of LOC.YEAR)
		for(let file of year.FILES)
		{
			/*let a = document.createElement("a");
			a.setAttribute("class", "link");
			a.setAttribute("target", "blank");

			let span_desc = document.createElement("span");
			span_desc.setAttribute("class", "desc");

			let file_time = file.time.toString().padStart(4, ' ');
			span_desc.innerHTML = `${file_time} .... <l>${file.desc}</l> ${file.day}`;

			// ./2024-1/Day-4-xmas/index-xmas.html
			a.setAttribute(
				"href", 
				`./${year.val}-1/Day-${file.day}-${file.desc}/index-${file.desc}.html`
			);

			a.appendChild(span_desc);
			query(".link-holder").appendChild(a);*/

			let a = document.createElement("a");
		    a.classList.add("link");
		    a.setAttribute(
				"href", 
				`./${year.val}/Day-${file.day}-${file.desc}/index-${file.desc}.html`
			);

		    let timeSpan = document.createElement("span");
		    timeSpan.classList.add("time");
		    timeSpan.innerHTML = file.time;

		    let descSpan = document.createElement("span");
		    descSpan.classList.add("desc");
		    descSpan.innerHTML = `<l>${file.desc}</l> ${file.day}`;

		    a.appendChild(timeSpan);
		    a.appendChild(descSpan);
		    query(".link-holder").appendChild(a);
		}
}

/*
50 .... mul-it-over 3
5400 .... xmas 4
150 .... print-queue 5
1200 .... guard-gallivant 6
7000 .... bridge-repair 7
180 .... antinode 8
360 .... disk-frag 9


50 	  .... mul-it-over 3
5400  .... xmas 4
150   .... print-queue 5
1200  .... guard-gallivant 6
7000  .... bridge-repair 7
180   .... antinode 8
360   .... disk-frag 9

*/

function query(str)
{
	return document.querySelector(str);
}

document.title = "Advent";
_A();
