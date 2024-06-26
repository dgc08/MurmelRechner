var registers = [];
var line = 0;
var shouldExecute = false;

var sleepDuration = 1000;

function updateSpeedLabel() {
  if (sleepDuration != 0) {
    const freq = 1000 / sleepDuration;
    document.getElementById('speedLabel').innerText = `Instructions/s: ${freq}`;
  }
  else {
    document.getElementById('speedLabel').innerText = 'Instructions/s: MAX';
  }
}

function increaseSpeed() {
  sleepDuration = sleepDuration / 2;
  if (sleepDuration < 10) {
    sleepDuration = 0;
  }
  updateSpeedLabel();
}

function decreaseSpeed() {
  if (sleepDuration == 1000) {
    return;
  }

  if (sleepDuration == 0) {
    sleepDuration = 15.625; // 64 Hz
  }
  else {
    sleepDuration *= 2;
  }

  updateSpeedLabel();
}

function resetSpeed() {
  sleepDuration = 1000;
  updateSpeedLabel();
}

function processLine() {
  pointer.style.color = '#04aa6d';
  return executeLine();
}

function executeLine() {
  cleanCode();

  const code = getCleanCode();
  if (code == null) {
    shouldExecute = false;
    return;
  }
  if (line > code.length-1) {
    shouldExecute = false;
    return;
  }

  // setup pointer
  const pointer = document.getElementById('pointer');

  const content = code[line];
  const cmd = content.substring(0, 3);

  // Dereference any pointers
  param = content.substring(3, content.length).trim();
  derefs = 0;
  while (param.charAt() == '*') {
    derefs++;
    param = param.substring(1, content.length);
  }
  param = parseInt(param);
  while (derefs > 0) {
    newParam = registers[param];
    if (newParam == null) newParam = 0;
    param = newParam;
    derefs--;
  }

  // set pointer to line
  const lines = document.getElementById('editing').value.split('\n');
  let linesOfCode = 0;

  for (let i = 0; i < lines.length; i++) {
    const lineContent = lines[i];
    if (lineContent != '' && !lineContent.startsWith(';')) linesOfCode++; // check if this line is code
    if (linesOfCode-1 == line) {
      pointer.style.top = i * 20 - 4 + 'pt';
      break;
    }
  }

  // evaluate code
  switch (cmd) {
    case 'jmp':
      line = param;
      return

    case 'tst':
    checkRegisterCount(param);
      if (registers[param]==0)
        line++;
      if (registers[param] == null){
        line++;
        registers[param] = 0;
      }
      break;

    case 'hlt':
      shouldExecute = false;
      return;

    case 'inc':
      addToRegister(param);
      break;

    case 'dec':
      removeFromRegister(param);
      break;

    default:
      break;
  }

  line++;
  return;
}

async function execute() {
  shouldExecute = true;
  while (shouldExecute) {
    processLine();
    await sleep(sleepDuration);
  }
  await sleep(sleepDuration);
  resetSimulator();
}

function sleep(milliseconds) {
  if (sleepDuration == 0) {
    return new Promise((resolve) => setTimeout(resolve, 0)); // A small delay is needed or the screen won't properly update (for some reason putting 0 here works, javascript kinda strange)
  }
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function resetSimulator() {
  line = 0;
  shouldExecute = false;
  pointer.style.top = '-4pt';
  pointer.style.color = 'red';
}
