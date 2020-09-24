function Submit(){
	data = {};
	elements = document.querySelectorAll('.question')
	elements.forEach(el => {
		if(el.id=='old_q'){
			data[el.id.replace('_q','')] = Number(el.value);
		}else{
			data[el.id.replace('_q','')] = el.value;
		}
	});
	console.log(data);

	var req = new XMLHttpRequest();
	req.open("POST","/applications/wl", false);
	req.setRequestHeader("Content-type", "application/json");
	req.send(JSON.stringify(data));

	res = JSON.parse(req.responseText).message;
	document.querySelectorAll('.question').forEach(el=>{
		el.style['background-color'] = '';
	})
	
	if(res.error){
		alert(res.errortxt)
		if(res.cssSelector)
		document.querySelector(res.cssSelector).style['background-color'] = 'red';
	}else{
		alert(res.txt)
	}
}