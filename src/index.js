// Step 1: HTML Structure Initialization
const app = document.getElementById("app");
app.innerHTML = `
<header>PIXEL PALETTE<header>
`;

// Step 2: State Management
const state = {
  backgroundColor: "white",
  color: "#ff0000",
  column: 10,
  row: 10,
};

// Step 3: Utility Functions
const resetState = () => {
  state.backgroundColor = "white";
  state.column = 10;
  state.row = 10;
}

const inputChangeHandler = (key, value) => {
  state[key] = value;
  createGrid();
}

const createContainerDiv = (containerId) => {
  const container = document.createElement("div");
  container.id = containerId;
  return container;
};

const createLabeledInput = (labelText, inputId, inputType = "text", inputValue) => {
  const container = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");

  label.htmlFor = inputId;
  label.innerHTML = labelText;
  input.id = inputId;
  input.type = inputType;
  input.value = inputValue;
  container.classList = 'labeledInputContainer'

  container.appendChild(label);
  container.appendChild(input);

  return { container, input };
};

const createGrid = () => {
  pixelContainer.innerHTML = "";

  pixelContainer.style.gridTemplateColumns = `repeat(${state.column},30px)`;
  pixelContainer.style.gridTemplateRows = `repeat(${state.row},30px)`;

  for (let i = 0; i < state.row * state.column; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.style.backgroundColor = state.backgroundColor;
    pixel.addEventListener("mousedown", (e) => {
      const selectedColor = inputColor.value;
      e.target.style.backgroundColor = selectedColor;
    });
    pixelContainer.appendChild(pixel);
  }
};

const createLayout = () => {
  const appContainer = createContainerDiv("appContainer");
  const operationContainer = createContainerDiv("operationContainer");
  const btnContainer = createContainerDiv("btnContainer");
  const pixelContainer = createContainerDiv("pixelContainer");

  app.appendChild(appContainer);
  appContainer.appendChild(operationContainer);
  appContainer.appendChild(pixelContainer);  
  
  const {container: inputColorContainer, input: inputColor} = createLabeledInput(
    "Color ",
    "inputColor",
    "color",
    "#ff0000"
  );
  
  const { container: inputRowContainer, input: inputRow } = createLabeledInput("Row ", "inputRow", "number", 10);
  const { container: inputColumnContainer, input: inputColumn } = createLabeledInput(
    "Column ",
    "inputColumn",
    "number",
    10
  );
  
  const resetBtn = document.createElement("button");
  resetBtn.id = "resetBtn";
  resetBtn.innerHTML = "RESET";
  
  const inputSizeContainer = createContainerDiv("inputSizeContainer");
  const inputContainer = createContainerDiv("inputContainer");
  
  inputContainer.appendChild(inputColorContainer);
  operationContainer.appendChild(inputContainer);
  inputSizeContainer.appendChild(inputColumnContainer);
  inputSizeContainer.appendChild(inputRowContainer);
  inputContainer.appendChild(inputSizeContainer);
  btnContainer.appendChild(resetBtn);
  operationContainer.appendChild(btnContainer);

  createGrid();

  return {inputColor, inputRow, inputColumn, resetBtn};

}

const {inputColor, inputRow, inputColumn, resetBtn} = createLayout();

// Step 4: Event Listeners

inputRow.addEventListener("change", (input) => {
  inputChangeHandler('row', parseInt(input.target.value)) 
});

inputColumn.addEventListener("change", (input) => {
  inputChangeHandler('column', parseInt(input.target.value))
});

resetBtn.addEventListener("click", () => {
  resetState();
  inputRow.value = state.row;
  inputColumn.value = state.column;
  inputColor.value = state.color;
  createGrid();
});