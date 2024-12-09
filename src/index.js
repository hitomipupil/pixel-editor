// Step 1: HTML Structure Initialization
const app = document.getElementById("app");
app.innerHTML = `
<h1>Pixel Editor</h1>
`;

// Step 2: State Management
const state = {
  backgroundColor: "#555",
  column: 5,
  row: 5,
};

// Step 3: Utility Functions
const createContainerDiv = (containerId) => {
  const container = document.createElement("div");
  container.id = containerId;
  return container;
};

const appContainer = createContainerDiv("appContainer");
const operationContainer = createContainerDiv("operationContainer");
const inputContainer = createContainerDiv("inputContainer");
const inputSizeContainer = createContainerDiv('inputSizeContainer');
const btnContainer = createContainerDiv("btnContainer");
const pixelContainer = createContainerDiv("pixelContainer");

const organizeContainer = () => {
  app.appendChild(appContainer);
  appContainer.appendChild(operationContainer);
  operationContainer.appendChild(inputContainer);
  operationContainer.appendChild(btnContainer);
  appContainer.appendChild(pixelContainer);  
}

organizeContainer();

const createGrid = () => {
  pixelContainer.innerHTML = "";

  pixelContainer.style.gridTemplateColumns = `repeat(${state.column},30px)`;
  pixelContainer.style.gridTemplateRows = `repeat(${state.row},30px)`;

  for (let i = 0; i < state.row * state.column; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.style.backgroundColor = state.backgroundColor;
    pixel.addEventListener("click", (e) => {
      const selectedColor = inputColor.value;
      e.target.style.backgroundColor = selectedColor;
    });
    pixelContainer.appendChild(pixel);
  }
};

createGrid();

const createLabeledInput = (labelText, inputId, inputType = "text") => {
  const container = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");

  label.htmlFor = inputId;
  label.innerHTML = labelText;
  input.id = inputId;
  input.type = inputType;
  container.id = 'labeledInputContainer'

  container.appendChild(label);
  container.appendChild(input);

  return container;
};

const inputColorContainer = createLabeledInput(
  "Color: ",
  "inputColor",
  "color"
);

const inputRowContainer = createLabeledInput("Row: ", "inputRow", "number");
const inputColumnContainer = createLabeledInput(
  "Column: ",
  "inputColumn",
  "number"
);
const resetBtn = document.createElement("button");
resetBtn.id = "resetBtn";
resetBtn.innerHTML = "RESET";

const organizeInput = () => {
  inputContainer.appendChild(inputColorContainer);
  inputSizeContainer.appendChild(inputColumnContainer);
  inputSizeContainer.appendChild(inputRowContainer);
  inputContainer.appendChild(inputSizeContainer);
  btnContainer.appendChild(resetBtn);
}

organizeInput();

const inputColor = document.getElementById("inputColor");
const inputColumn = document.getElementById("inputColumn");
const inputRow = document.getElementById("inputRow");
inputColor.value = state.backgroundColor;
inputColumn.value = state.column;
inputRow.value = state.row;

// Step 4: Event Listeners
const inputChangeHandler = (key, value) => {
  state[key] = value;
  createGrid();
}

inputColumn.addEventListener("change", (input) => {
  inputChangeHandler('column', parseInt(input.target.value))
});

inputRow.addEventListener("change", (input) => {
  inputChangeHandler('row', parseInt(input.target.value)) 
});

resetBtn.addEventListener("click", () => {
  state.backgroundColor = "#555";
  state.column = 5;
  state.row = 5;
  inputRow.value = state.row;
  inputColumn.value = state.column;
  inputColor.value = state.backgroundColor;
  createGrid();
});
