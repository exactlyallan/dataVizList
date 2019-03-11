/* main.js */

// Load CSV from published google drive sheet created by IFTT from twitter with #bookmark tag
Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vR0zFeq39Xdw0wZrf7OvzKauc2wdfsNSwLIkUHnrsGupCubXER5_kMnOpHuXQ44ziCiXnN_L4ltKU2Q/pub?gid=0&single=true&output=csv", {
	download: true,
	header: true,
	complete: function(results) {

		if(results.data.length > 0){
			buildList(results.data)	
		} else {
			var contentBody = document.getElementById('content');
			var noData = document.createElement('div')
			noData.innerHTML = "<h2>No Data ¯\\_(ツ)_/¯</h2>"
			contentBody.appendChild(noData)

		}

	}
});

function buildList(data){

	var contentBody = document.getElementById('content');

	// reverse order
	for(let i=data.length-1; i>=0; i--){
		var listBlock = document.createElement('div')
		listBlock.classList.add('content-block')
		
		// if missing link remove 404
		var dataLink = data[i].Link
		if(dataLink.includes('missing_link')){
			dataLink = '#link'+i
		}

		// remove #bookmark text
		var dataText = data[i].Text
		dataText = dataText.replace('#bookmark', '')

		var dataTwitter = data[i].Twitter
		var dataDate = data[i].Date

		listBlock.innerHTML = "<div id='link"+i+"'><div class='content-number'>"+ i + "</div><a class='content-link' href='"+ dataLink +"' target='_blank'>" + dataText +"</a></div> <a class='content-source' href='"+ dataTwitter +"' target='_blank'> — Twitter "+ dataDate +" </a>"
		contentBody.appendChild(listBlock)
	}


}