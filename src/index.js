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
const resetState = () => {
  state.backgroundColor = "#555";
  state.column = 5;
  state.row = 5;
};

const inputChangeHandler = (key, value) => {
  state[key] = value;
  createGrid();
};

const createContainerDiv = (containerId) => {
  const container = document.createElement("div");
  container.id = containerId;
  return container;
};

const createLabeledInput = (labelText, inputId, inputType = "text") => {
  const container = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");

  label.htmlFor = inputId;
  label.innerHTML = labelText;
  input.id = inputId;
  input.type = inputType;
  container.classList.add("labeledInputContainer");

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
    pixel.addEventListener("click", (e) => {
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
  operationContainer.appendChild(btnContainer);
  appContainer.appendChild(pixelContainer);

  const { container: inputColorContainer, input: inputColor } =
    createLabeledInput("Color: ", "inputColor", "color");

  const { container: inputRowContainer, input: inputRow } = createLabeledInput(
    "Row: ",
    "inputRow",
    "number",
  );
  const { container: inputColumnContainer, input: inputCol } =
    createLabeledInput("Column: ", "inputColumn", "number");

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

  createGrid();

  return { inputColor, inputCol, inputRow, resetBtn };
};

const { inputColor, inputCol, inputRow, resetBtn } = createLayout();

// Step 4: Event Listeners
inputCol.addEventListener("change", (input) => {
  inputChangeHandler("column", parseInt(input.target.value));
});

inputRow.addEventListener("change", (input) => {
  inputChangeHandler("row", parseInt(input.target.value));
});

resetBtn.addEventListener("click", () => {
  resetState();

  inputRow.value = state.row;
  inputCol.value = state.column;
  inputColor.value = state.backgroundColor;

  createGrid();
});
