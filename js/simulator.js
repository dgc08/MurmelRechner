var registers = [];
var line = 1;
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
  if (line > code.length) {
    shouldExecute = false;
    return;
  }

  // setup pointer
  const pointer = document.getElementById('pointer');

  const content = code[line - 1]
  const cmd = content.substring(0, 3);
  const param = parseInt(content.substring(3, content.length));

  // set pointer to line
  const lines = document.getElementById('editing').value.split('\n');
  let linesOfCode = 0;

  for (let i = 0; i < lines.length; i++) {
    const lineContent = lines[i];
    if (lineContent != '' && !lineContent.startsWith(';')) linesOfCode++; // check if this line is code
    if (linesOfCode == line) {
      pointer.style.top = i * 20 - 4 + 'pt';
      break;
    }
  }

  // evaluate code
  switch (cmd) {
    case 'jmp':
      line = param - 1;
      break;

    case 'tst':
      // If register exists and it does not conatin content
      if (registers[param] != null && !(registers[param] > 0)) line++;
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
    if (!shouldExecute) {
      await sleep(sleepDuration);
      resetSimulator();
    }
  }
}

function sleep(milliseconds) {
  if (sleepDuration == 0) {
    return new Promise((resolve) => setTimeout(resolve, 0.1)); // A small delay is needed or the screen won't properly update
  }
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function resetSimulator() {
  line = 1;
  shouldExecute = false;
  pointer.style.top = '-4pt';
  pointer.style.color = 'red';
}
