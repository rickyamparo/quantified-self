const $ = require('jquery')

const sortTable = (table, switcher) => {
  const tableRows = `tbody.${table}-table tr`
	var rows = $(tableRows).get();
	rows.sort(function(a, b) {
		const A = getVal(a);
		const B = getVal(b);
		if(A < B) {return -1*switcher;}
		if(A > B) {return 1*switcher;}
  return 0;
  });

  function getVal(element){
		var v = $(element).children('td').eq(1).text().toUpperCase();
		if($.isNumeric(v)){
 			v = parseInt(v,10);
		}
		return v;
  }

  $.each(rows, function(index, row) {
     $(`tbody.${table}-table`).append(row);
  });
}

module.exports = {sortTable}
