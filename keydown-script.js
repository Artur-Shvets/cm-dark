'use strict'

let lastElement;
let isInput = false;
let lastClick;

document.addEventListener('click', (e) => {
  if (mainParent) {
    if (e.target.classList.contains('block')) {
      e.target.setAttribute('contenteditable', 'true');
      e.target.focus();
      isInput = true;
    } else {
      isInput = false;
    };
  };
});


function createNewBlock (str, classList, focus) {
  let newBlock = document.createElement('span');
  newBlock.setAttribute('contenteditable', 'true');
  if (classList) {
    classList.split(' ').forEach((item) => {
      newBlock.classList.add(item);
    });
  };
  if (str) {
    newBlock.innerText = str;
  } else {
    newBlock.innerText = '';
  };
  lastElement.after(newBlock);
  lastElement = newBlock;
  if (focus) {
    newBlock.focus();
  };
};

document.addEventListener('keyup', e => {
  console.log(e.keyCode)
  if (e.keyCode == 39 && document.getSelection().focusOffset == e.target.innerText.length) {
    if (e.target == e.target.parentElement.children[e.target.parentElement.children.length-1]) {
      console.log('Right Edge')
    } else {
      e.target.nextSibling.focus();
    };
  };
  if (e.keyCode == 37 && document.getSelection().focusOffset == 0) {
    if (e.target == e.target.parentElement.children[0]) {
      console.log('Left Edge');
    } else {
      e.target.previousSibling.focus();
    };
  };

  if (isInput && e.keyCode == 13) {
    lastElement = document.activeElement;
    lastElement.innerText = lastElement.innerText.split('\n').join('');
  };


  if (isInput && e.keyCode != 9 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 13) {
    lastElement = document.activeElement;
    let txt = lastElement.innerText;
    let lastSym = txt[txt.length-1];
    let lastTxt = txt.slice(0, txt.length-1);

    if (txt == 'doc') {
      lastElement.innerText = 'document';
      lastElement.classList.add('block', 'orange-string', 'orange-shadow');
      createNewBlock('.', 'string cyan-string');
      createNewBlock(false, 'string blue-string', true);
    };
    if (txt == 'win') {
      lastElement.innerText = 'window';
      lastElement.classList.add('block', 'orange-string', 'orange-shadow');
      createNewBlock('.', 'string cyan-string');
      createNewBlock(false, 'string blue-string', true);
    };
    if (txt == 'addE' || txt == 'adde') {
      let addEBlock = document.getElementById('test1').cloneNode(true);
      addEBlock.id = 'test-input';
      if (lastElement.parentElement.children[0].innerText == 'window') {
        addEBlock.getElementsByClassName('orange-string')[0].innerText = 'window'
      };
      lastElement.parentElement.replaceWith(addEBlock);
    };
    if (lastSym == '.') {
      lastElement.innerText = lastTxt;
      createNewBlock(lastSym, 'string cyan-string');
      createNewBlock(false, 'string blue-string', true);
    };
    if (e.keyCode == 32) {
      lastElement.innerText = lastElement.innerText.split(' ').join('');
      createNewBlock(false, 'p-left', true);
    };
    if (lastSym == '"') {
      lastElement.innerText = lastTxt;
      createNewBlock('"', 'string cyan-string');
      createNewBlock('', 'block green-string green-shadow', true);
      createNewBlock('"', 'string cyan-string');
      createNewBlock(false, false, false);
    };
    if (lastSym == "'") {
      lastElement.innerText = lastTxt;
      createNewBlock("'", 'string cyan-string');
      createNewBlock(false, 'block green-string green-shadow', true);
      createNewBlock("'", 'string cyan-string');
      createNewBlock(false, false, false);
    };
    if (lastSym == '{') {
      lastElement.innerText = lastTxt;
      createNewBlock(lastSym, 'string cyan-string');
      createNewBlock(false, false, true);
      createNewBlock('}', 'string cyan-string');
      createNewBlock(false, false, false);
    };
    if (lastSym == '[') {
      lastElement.innerText = lastTxt;
      createNewBlock(lastSym, 'string cyan-string');
      createNewBlock(false, false, true);
      createNewBlock(']', 'string cyan-string');
      createNewBlock(false, false, false);
    };
    if (lastSym == '(') {
      lastElement.innerText = lastTxt;
      createNewBlock(lastSym, 'string cyan-string');
      createNewBlock(false, false, true);
      createNewBlock(')', 'string cyan-string');
      createNewBlock(false, false, false);
    };
  };
});
