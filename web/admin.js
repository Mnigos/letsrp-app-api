auth = '';
counts = [0,0,0];

if (location.href.split('?').length > 1) {
  let args = location.href.split('?')[1].split('=');
  if (args) {
    args.forEach((el, i) => {
      if (el === 'auth') {
        if (args[i + 1]) {
          auth = args[i + 1];
        }
      }
    });
  }
}
url = `/applications/wl/raw?auth=${auth}`;

var req = new XMLHttpRequest();
req.open('GET', url, false);
req.send(null);
data = JSON.parse(req.responseText);

if (!data.message.error) {
  content = data.message.content;
  content.forEach((el, i) => {
    app_status = el.status;
    applications_obj = document.querySelector(`#app_${app_status}`);
    obj = document.createElement('div');
    obj.id = `app_${i}`;
    obj.class = 'app_';
    statusButtons = ``;
    if(app_status==='toapprove')counts[0] = counts[0]+1;
    if(app_status==='approved')counts[1] = counts[1]+1;
    if(app_status==='rejected')counts[2] = counts[2]+1;
    if (app_status === 'toapprove') {
      statusButtons = `<button onclick="setStatus(${i},'approved')">APPROVE</button>`;
      statusButtons += `<button onclick="setStatus(${i},'rejected')">REJECT</button>`;
    }else {
      statusButtons = `<button onclick="setStatus(${i},'toapprove')">DELETE STATUS</button>`;
    }
    obj.innerHTML = `NAME: <b>${encodeURI(el.name)}</b>&nbsp;&nbsp; DC: ${encodeURI(el.dc)} -&nbsp;&nbsp;- &nbsp;OLD: ${encodeURI(el.old)} &nbsp;&nbsp; DATE: ${encodeURI(el.date)} <button id='app_${i}_B' class="app_B" onclick="showMore(${i})">MORE</button>` + statusButtons;
    applications_obj.appendChild(obj);
  });
}

function showMore(index) {
  thiscontent = content[index];
  document.querySelectorAll('.app_B').forEach(el => {
    el.innerHTML = 'MORE';
  });
  document.getElementById(`app_${index}_B`).innerHTML = 'HIDE';
  document.getElementById(`app_${index}_B`).onclick = function() {
    hideMore(index);
  };
  document.querySelectorAll('#info').forEach(el => {
    el.parentElement.removeChild(el);
  });
  i = index;
  app_status = content[i].status;
  statusButtons = ``;
  if (app_status === 'toapprove') {
    statusButtons = `<button onclick="setStatus(${i},'approved')">APPROVE</button>`;
    statusButtons += `<button onclick="setStatus(${i},'rejected')">REJECT</button>`;
  }else {
    statusButtons = `<button onclick="setStatus(${i},'toapprove')">DELETE STATUS</button>`;
  }
  info_obj = document.createElement('div');
  info_obj.style.color = 'black';
  info_obj.id = 'info';
  document.getElementById(`app_${index}`).appendChild(info_obj);
  info_obj.style['border-style'] = 'double';
  info_obj.style['line-break'] = 'anywhere';
  info_obj.innerHTML = `
  INFO: (i=${index}) &nbsp;&nbsp;&nbsp; STATUS: ${app_status}<br>
  NAME: <b>${thiscontent.name}</b><br>
  DC: <b>${thiscontent.dc}</b><br>
  HEX: <b>${thiscontent.hex}</b><br><br>
  DATE: <b>${thiscontent.date}</b><br>
  OLD: <b>${thiscontent.old}</b><br><br>
  STORY: <b>${thiscontent.story}</b><br>
  IDEA: <b>${thiscontent.idea}</b><br>
  ACTION: <b>${thiscontent.action}</b><br>
  EXPERIENCE: <b>${thiscontent.experience}</b><br>
  <button onclick="info_obj.innerHTML = '';info_obj.style['border-style'] = '';">HIDE</button>
  ${statusButtons}
  `;

}

function hideMore(index) {
  document.querySelectorAll('.app_B').forEach(el => {
    el.innerHTML = 'MORE';
  });
  document.getElementById(`app_${index}_B`).onclick = function() {
    showMore(index);
  };
  document.querySelectorAll('#info').forEach(el => {
    el.parentElement.removeChild(el);
  });
}

function setStatus(index, status) {
  req.open('POST', `/applications/wl/setStatus?auth=${auth}`, false);
  req.setRequestHeader('Content-type', 'application/json');
  req.send(JSON.stringify({ index: index, status: status }));
  if(req.responseText==='Succes'){
    alert(`Status changed succesfully to ${status}`)
  }else {
    alert(`Error while changing status to ${status}`)
  }
  location.reload();
}
showSection(-1);
function showSection(id){
  document.querySelector('#app_toapprove').style.display = 'none';
  document.querySelector('#app_approved').style.display = 'none';
  document.querySelector('#app_rejected').style.display = 'none';
  document.querySelector('#toapp_B').innerHTML = "Show";
  document.querySelector('#toapp_B').onclick = function(){showSection(0)}
  document.querySelector('#rej_B').innerHTML = "Show";
  document.querySelector('#rej_B').onclick = function(){showSection(1)}
  document.querySelector('#app_B').innerHTML = "Show";
  document.querySelector('#app_B').onclick = function(){showSection(2)}
  if(id==0){
    document.querySelector('#app_toapprove').style.display = '';
    document.querySelector('#toapp_B').innerHTML = "Hide";
    document.querySelector('#toapp_B').onclick = function(){showSection(-1)}
  }
  if(id==1){
    document.querySelector('#app_rejected').style.display = '';
    document.querySelector('#rej_B').innerHTML = "Hide";
    document.querySelector('#rej_B').onclick = function(){showSection(-1)}
  }
  if(id==2){
    document.querySelector('#app_approved').style.display = '';
    document.querySelector('#app_B').innerHTML = "Hide";
    document.querySelector('#app_B').onclick = function(){showSection(-1)}
  }
}



