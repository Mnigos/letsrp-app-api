auth = '';
counts = [0, 0, 0];

auth = getCookie('auth');

function getApplications() {
  document.querySelector(`#app_toapprove`).innerHTML = '';
  document.querySelector(`#app_rejected`).innerHTML = '';
  document.querySelector(`#app_approved`).innerHTML = '';
  url = `/applications/wl/raw`;
  counts = [0, 0, 0];
  var req = new XMLHttpRequest();
  req.open('GET', url, false);
  req.setRequestHeader('authorization', auth);
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
      if (app_status === 'toapprove') counts[0] = counts[0] + 1;
      if (app_status === 'rejected') counts[1] = counts[1] + 1;
      if (app_status === 'approved') counts[2] = counts[2] + 1;
      if (app_status === 'toapprove') {
        statusButtons = `<button class="app_approve" onclick="setStatus(${i},'approved')">APPROVE</button>`;
        statusButtons += `<button class="app_reject" onclick="setStatus(${i},'rejected')">REJECT</button>`;
      } else {
        statusButtons = `<button class="app_toapprove" onclick="setStatus(${i},'toapprove')">DELETE STATUS</button>`;
      }
      statusButtons += `<button class="app_delete" onclick="deleteApplication(${i})"><div style="display: inline;color: red">DELETE</div></button>`;

      checkbox = `<input type="checkbox" id='app_${i}_checkbox' class="sel_checkbox" onclick="countChecks()">`;
      statusButtons = `<div id="app_${i}_actions" class="app_actions"><button id='app_${i}_B' class="app_B" onclick="showMore(${i})">MORE</button>${statusButtons}</div>`;
      obj.innerHTML = `<div id="app_${i}_content" class="app_content">${checkbox}  <div id="app_${i}_index" class="app_index app_field_txt">INDEX: ${i}</div> <div id="app_${i}_name" class="app_name app_field_txt">NAME: &nbsp;<b>${encodeURI(el.name)}</b></div><div id="app_${i}_dc" class="app_dc app_field_txt">DC: &nbsp;<b>${encodeURI(el.dc)}</b></div> <div id="app_${i}_old" class="app_old app_field_txt">OLD: &nbsp;<b>${encodeURI(el.old)}</b></div> <div id="app_${i}_date" class="app_date app_field_txt">DATE: &nbsp;<b>${encodeURI(el.date)}</b></div></div>` + statusButtons;
      applications_obj.appendChild(obj);
    });
  }
  document.querySelector(`#app_toapprove_count`).innerHTML = counts[0];
  document.querySelector(`#app_rejected_count`).innerHTML = counts[1];
  document.querySelector(`#app_approved_count`).innerHTML = counts[2];
  document.querySelector(`#toapp_B`).disabled = false;
  document.querySelector(`#rej_B`).disabled = false;
  document.querySelector(`#app_B`).disabled = false;
  if (counts[0] < 1) showSection(0, true);
  if (counts[1] < 1) showSection(1, true);
  if (counts[2] < 1) showSection(2, true);
  document.querySelector('#app_toapprove_checkbox').checked = false;
  document.querySelector('#app_rejected_checkbox').checked = false;
  document.querySelector('#app_approved_checkbox').checked = false;
  countChecks();
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
  } else {
    statusButtons = `<button onclick="setStatus(${i},'toapprove')">DELETE STATUS</button>`;
  }
  statusButtons += `<button onclick="deleteApplication(${i})"><div style="display: inline;color: red">DELETE</div></button>`;
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
  var req = new XMLHttpRequest();
  req.open('POST', `/applications/wl/setStatus`, false);
  req.setRequestHeader('authorization', auth);
  req.setRequestHeader('Content-type', 'application/json');
  req.send(JSON.stringify({ index: index, status: status }));
  if (req.responseText === 'Success') {
    alert(`Status changed successfully to ${status}`);
  } else {
    alert(`Error while changing status to ${status}`);
  }
  getApplications();
}

function setStatusBulk(elements, status) {
  var req = new XMLHttpRequest();
  req.open('POST', `/applications/wl/setStatus/bulk`, false);
  req.setRequestHeader('authorization', auth);
  req.setRequestHeader('Content-type', 'application/json');
  req.send(JSON.stringify({ elements: elements, status: status }));
  if (req.responseText === 'Success') {
    alert(`(BULK ${elements.length}) Status changed successfully to ${status}`);
  } else {
    alert(`(BULK ${elements.length}) Error while changing status to ${status}`);
  }
  getApplications();
}

function deleteBulk(elements) {
  if (confirm(`Are you sure you want to delete ALL of ${JSON.stringify(elements)} application?`)) {
    if (confirm(`Are you REALLY sure you want to delete ALL of ${JSON.stringify(elements)} application?`)) {
      var req = new XMLHttpRequest();
      req.open('POST', `/applications/wl/delete/bulk`, false);
      req.setRequestHeader('authorization', auth);
      req.setRequestHeader('Content-type', 'application/json');
      req.send(JSON.stringify({ elements: elements }));
      if (req.responseText === 'Success') {
        alert(`(BULK ${elements.length}) Applications deleted`);
      } else {
        alert(`(BULK ${elements.length}) Error deleting applications`);
      }
      getApplications();
    }
  }

}

function showSection(id, hide) {
  function showSectionWithName(tag1, tag2) {
    document.querySelector(tag1).style.display = 'none';
    document.querySelector(tag2).innerHTML = 'Show';
    document.querySelector(tag2).onclick = function() {
      showSection(id);
    };
    if (counts[id] < 1) {
      document.querySelector(tag2).disabled = true;
      return;
    }
    if (hide) return;
    document.querySelector(tag1).style.display = '';
    document.querySelector(tag2).innerHTML = 'Hide';
    document.querySelector(tag2).onclick = function() {
      showSection(id, true);
    };
  }

  if (id == 0) {
    showSectionWithName('#app_toapprove', '#toapp_B');
  }
  if (id == 1) {
    showSectionWithName('#app_rejected', '#rej_B');
  }
  if (id == 2) {
    showSectionWithName('#app_approved', '#app_B');
  }
}

function deleteApplication(index) {
  if (confirm(`Are you sure you want to delete #${index} application?`)) {
    var req = new XMLHttpRequest();
    req.open('POST', `/applications/wl/delete`, false);
    req.setRequestHeader('Content-type', 'application/json');
    req.setRequestHeader('authorization', auth);
    req.send(JSON.stringify({ index: index }));
    if (req.responseText === 'Success') {
      alert(`Application deleted`);
    } else {
      alert(`Error while deleting application`);
    }
    getApplications();
  } else {

  }

}

selectedIndexes = [];

function countChecks() {
  selectedIndexes = [];
  sel_actions = document.querySelector('#selection_actions');
  checkboxes = document.querySelectorAll('.sel_checkbox');

  checkboxes.forEach(el => {
    if (el.checked === true) {
      index = el.id.replace('_checkbox', '').replace('app_', '');
      selectedIndexes.push(index);
    }
  });

  section0_boxes = [];
  section1_boxes = [];
  section2_boxes = [];
  checkboxes.forEach(el => {
    index = el.id.replace('_checkbox', '').replace('app_', '');
    if (content[index].status === 'toapprove') section0_boxes.push(el);
  });
  checkboxes.forEach(el => {
    index = el.id.replace('_checkbox', '').replace('app_', '');
    if (content[index].status === 'rejected') section1_boxes.push(el);
  });
  checkboxes.forEach(el => {
    index = el.id.replace('_checkbox', '').replace('app_', '');
    if (content[index].status === 'approved') section2_boxes.push(el);
  });

  section_boxes = [[false, false], [false, false], [false, false]];
  section0_boxes.forEach(el => {
    if (el.checked) section_boxes[0][0] = true;
    if (!el.checked) section_boxes[0][1] = true;
  });
  section1_boxes.forEach(el => {
    if (el.checked) section_boxes[1][0] = true;
    if (!el.checked) section_boxes[1][1] = true;
  });
  section2_boxes.forEach(el => {
    if (el.checked) section_boxes[2][0] = true;
    if (!el.checked) section_boxes[2][1] = true;
  });

  document.querySelector('#app_toapprove_checkbox').indeterminate = false;
  if (section_boxes[0][0] && section_boxes[0][1]) document.querySelector('#app_toapprove_checkbox').indeterminate = true;
  if (section_boxes[0][0] && !section_boxes[0][1]) document.querySelector('#app_toapprove_checkbox').checked = true;
  if (!section_boxes[0][0] && !section_boxes[0][1]) document.querySelector('#app_toapprove_checkbox').checked = false;
  if (!section_boxes[0][0] && section_boxes[0][1]) document.querySelector('#app_toapprove_checkbox').checked = false;

  document.querySelector('#app_rejected_checkbox').indeterminate = false;
  if (section_boxes[1][0] && section_boxes[1][1]) document.querySelector('#app_rejected_checkbox').indeterminate = true;
  if (section_boxes[1][0] && !section_boxes[1][1]) document.querySelector('#app_rejected_checkbox').checked = true;
  if (!section_boxes[1][0] && !section_boxes[1][1]) document.querySelector('#app_rejected_checkbox').checked = false;
  if (!section_boxes[1][0] && section_boxes[1][1]) document.querySelector('#app_rejected_checkbox').checked = false;

  document.querySelector('#app_approved_checkbox').indeterminate = false;
  if (section_boxes[2][0] && section_boxes[2][1]) document.querySelector('#app_approved_checkbox').indeterminate = true;
  if (section_boxes[2][0] && !section_boxes[2][1]) document.querySelector('#app_approved_checkbox').checked = true;
  if (!section_boxes[2][0] && !section_boxes[2][1]) document.querySelector('#app_approved_checkbox').checked = false;
  if (!section_boxes[2][0] && section_boxes[2][1]) document.querySelector('#app_approved_checkbox').checked = false;

  document.getElementById('selection_count').innerHTML = selectedIndexes.length;

  if (selectedIndexes.length > 0) {
    document.querySelectorAll('.sel_action').forEach(el => {
      el.disabled = false;
    });
  } else {
    document.querySelectorAll('.sel_action').forEach(el => {
      el.disabled = true;
    });
  }
}

function deleteSelection() {
  deleteBulk(selectedIndexes);
}

function setStatusSelection(status) {
  setStatusBulk(selectedIndexes, status);
}

function selectSection(section) {
  state = false;
  tag = '';
  if (section === 0) tag = '#app_toapprove_checkbox';
  if (section === 1) tag = '#app_rejected_checkbox';
  if (section === 2) tag = '#app_approved_checkbox';
  state = false;
  if (section >= 0)
    state = document.querySelector(tag).checked;
  checkboxes = document.querySelectorAll('.sel_checkbox');

  checkboxes.forEach(el => {
    if (section < 0) el.checked = false;
    index = el.id.replace('_checkbox', '').replace('app_', '');
    if (section === 0 && content[index].status === 'toapprove') el.checked = state;
    if (section === 1 && content[index].status === 'rejected') el.checked = state;
    if (section === 2 && content[index].status === 'approved') el.checked = state;
  });
  countChecks();
}

function deselectAll() {
  selectSection(-1);
  document.querySelector('#app_toapprove_checkbox').checked = false;
  document.querySelector('#app_rejected_checkbox').checked = false;
  document.querySelector('#app_approved_checkbox').checked = false;
}

function getCookie(name) {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  } catch {
  }
}

function export_apps(type) {
  switch (type) {
    case 'json': {
      download('applications.json', JSON.stringify(content, undefined, 4));
    }
      break;
    case 'csv-s': {
      let csv = 'ID;STATUS;NAME;DC;HEX;OLD;DATE;;STORY;IDEA;ACTION;EXPERIENCE\n';
      let content2 = content;
      content.forEach((el,i) => {
        if (el.status === 'toapprove') {
          csv += `${i};${el.status.replaceAll(';',',')};${el.name.replaceAll(';',',')};${el.dc.replaceAll(';',',')};${el.hex.replaceAll(';',',')};${el.old};${el.date.replaceAll(';',',')};;${el.story.replaceAll(';',',')};${el.idea.replaceAll(';',',')};${el.action.replaceAll(';',',')};${el.experience.replaceAll(';',',')}\n`;
        }
      });
      csv+='\n'
      content.forEach((el,i) => {
        if (el.status === 'approved') {
          csv += `${i};${el.status.replaceAll(';',',')};${el.name.replaceAll(';',',')};${el.dc.replaceAll(';',',')};${el.hex.replaceAll(';',',')};${el.old};${el.date.replaceAll(';',',')};;${el.story.replaceAll(';',',')};${el.idea.replaceAll(';',',')};${el.action.replaceAll(';',',')};${el.experience.replaceAll(';',',')}\n`;
        }
      });
      csv+='\n'
      content.forEach((el,i) => {
        if (el.status === 'rejected') {
          csv += `${i};${el.status.replaceAll(';',',')};${el.name.replaceAll(';',',')};${el.dc.replaceAll(';',',')};${el.hex.replaceAll(';',',')};${el.old};${el.date.replaceAll(';',',')};;${el.story.replaceAll(';',',')};${el.idea.replaceAll(';',',')};${el.action.replaceAll(';',',')};${el.experience.replaceAll(';',',')}\n`;
        }
      });
      download('applications.csv', csv);
    }
      break;
    case 'csv-i': {
      let csv = 'ID;STATUS;NAME;DC;HEX;OLD;DATE;;STORY;IDEA;ACTION;EXPERIENCE\n';
      content.forEach((el,i) => {
        csv += `${i};${el.status.replaceAll(';',',')};${el.name.replaceAll(';',',')};${el.dc.replaceAll(';',',')};${el.hex.replaceAll(';',',')};${el.old};${el.date.replaceAll(';',',')};;${el.story.replaceAll(';',',')};${el.idea.replaceAll(';',',')};${el.action.replaceAll(';',',')};${el.experience.replaceAll(';',',')}\n`;
      });
      download('applications.csv', csv);
    }
      break;
  }
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.click();
}

getApplications();
showSection(0, false);
showSection(1, true);
showSection(2, true);

document.querySelector('#app_toapprove_checkbox').checked = false;
document.querySelector('#app_rejected_checkbox').checked = false;
document.querySelector('#app_approved_checkbox').checked = false;

