
var size;// = 4;

var c;// = new Array(size);
var im;// = new Array(size);
var nm;// = 0;
var lbl;

function game(){
	var s = $("#size").val();
	size = parseInt(s);
	prepare();
}

function prepare() {

	nm = 0;
	c = new Array(size);
	im = new Array(size);
	for (let i = 0; i < size; i++){
		c[i] = new Array(size); //1
		for(let j = 0; j < size;++j)
			c[i][j] = 1;
		im[i] = new Array(size);
	}

	
	var board = $("#board");
	board.empty();

	var tbl = $("<table>");
	board.append(tbl);
	let tb = $("<tbody>");
	 tbl.append(tb); 

	for (let i = 0; i < size; i++) {
		row = $("<tr>");
		tb.append(row);
		for (let j = 0; j < size; j++) {
			td = $("<td>");
			row.append(td);
			im[i][j] = $("<img/>",{
				src:'svg/blank.svg',
				css:{
					"width":'calc((50vw) / '+size+')',
					"background-color" : "white"
				},
				click:function(){
					change(i, j);
				}
			});
			td.append(im[i][j]);
		}
	}

	lbl = $("<label>");
	board.append(lbl);
	lbl.text("Number of moves: " + nm);
}
function change(i, j) {
	if (finished()){
		return;
	}
	nm += 1;
	lbl.text("Number of moves: " + nm);
	c[i][j] *= -1;
	if (i > 0){
		c[i - 1][j] *= -1;
	}
	if (j > 0){
		c[i][j - 1] *= -1;
	}
	if (i < size - 1){
		c[i + 1][j] *= -1;
	}
	if (j < size - 1){
		c[i][j + 1] *= -1;
	}
	render();
	if (finished()){
		lbl.html("You did it!<br/>Number of moves: " + nm);
	}
}
function finished() {
	flag = true;
	for (let i = 0; i < size; i++)
	for (let j = 0; j < size; j++)
		if (c[i][j] == 1)
			flag = false;
	return flag;
}
function render() {
	for (i = 0; i < size; i++) {
		for (let j=0; j < size; ++j){
			if (c[i][j] == 1)
				im[i][j].attr("src" , 'svg/blank.svg');
			else if (c[i][j] == -1){
				im[i][j].attr("src" , 'svg/full.svg');
			}
		}
	}
}
//}