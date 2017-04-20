
var size;// = 4;

var c;// = new Array(size);
var im;// = new Array(size);
var nm;// = 0;
var lbl;

function game(){
	var s = document.getElementById("size").value;
	size = parseInt(s);
	//alert(size);
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

	var board = document.getElementById("board");
	while (board.hasChildNodes()) {
    	board.removeChild(board.lastChild);
	}

	var tbl = document.createElement("table");
	board.appendChild(tbl);
	var tb = document.createElement("tbody");
	tbl.appendChild(tb); 

	for (let i = 0; i < size; i++) {
		let row = document.createElement("tr");
		tb.appendChild(row);
		for (let j = 0; j < size; j++) {
			td = document.createElement("td");
			row.appendChild(td);
			im[i][j] = document.createElement("img");
			//im[i][j] = document.createElement("object");
			//im[i][j] = document.createElement("embed");
			td.appendChild(im[i][j]);
			//im[i][j].src = 'img/blank.jpg';
			im[i][j].src = 'svg/blank.svg';
			//im[i][j].data = 'svg/blank.svg';
			//im[i][j].type = 'image/svg+xml';
			//im[i][j].width = board.width / size;//100/size;
			im[i][j].style.width = 'calc((40vw) / '+size+')';
			im[i][j].style.background_color = 'white'; 
			//im[i][j].height = 100/size;
			im[i][j].addEventListener("click", function(){
				change(i, j);
			}, false);
		}
	}

	lbl = document.createElement("label");
	board.appendChild(lbl);
	lbl.innerText = "Number of moves: " + nm;
}
function change(i, j) {
	//alert(i);
	if (finished()){
		return;
	}
	nm += 1;
	lbl.innerText = "Number of moves: " + nm;
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
		lbl.innerHTML = "You did it!<br/>Number of moves: " + nm;
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
			//im[i][j].src = 'img/blank.jpg';
			im[i][j].src = 'svg/blank.svg';
			//im[i][j].data = 'svg/blank.svg';
		else if (c[i][j] == -1)
			//im[i][j].src = 'img/full.jpg';
			im[i][j].src = 'svg/full.svg';
			//im[i][j].data = 'svg/full.svg';
		}
	}
}
//}