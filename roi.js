const revenueEl = document.querySelector("#revenue");
const DSOEL = document.querySelector("#dso");
const peopleEl = document.querySelector("#people");
const salaryEl = document.querySelector("#salary");
const defaultHEl = document
  .querySelector("#default__h")
  .getAttribute("data-value");
const res = document.querySelector(".below-result");
const res2 = document.querySelector(".res__2");
const res4 = document.querySelector(".aging-result");
const res3 = document.querySelector(".result-container");
const defaultPEl = document
  .querySelector("#default__m")
  .getAttribute("data-value");
const humanOptions = Array.from(document.querySelectorAll(".workingc"));

const productivityOptions = Array.from(
  document.querySelectorAll(".productivity")
);
const r = document.querySelectorAll(".radio");
const currentInput = document.querySelector("#current__input");
const daysOneInput = document.querySelector("#days__one__input");
const daysTwoInput = document.querySelector("#days__two__input");
const daysThreeInput = document.querySelector("#days__three__input");
const inputs = document.querySelectorAll(".input");
const errorText = document.querySelector(".error-message");

let val;
const stateObj = {
  revenue: isNaN(parseInt(revenueEl.value)) ? 0 : parseInt(revenueEl.value),
  DSO: isNaN(parseInt(DSOEL.value)) ? 0 : parseInt(DSOEL.value),
  people: isNaN(parseInt(peopleEl.value)) ? 0 : parseInt(peopleEl.value),
  salary: isNaN(parseInt(salaryEl.value)) ? 0 : parseInt(salaryEl.value),
  defaultH: isNaN(parseInt(defaultHEl)) ? 0 : parseInt(defaultHEl),
  defaultP: isNaN(parseInt(defaultPEl)) ? 0 : parseInt(defaultPEl),
  noOfDays: 0,
  cashFlow: 0,
  workingCapital: 0,
  youSave: 0,
  productivitySave: 0,
  finalSave: 0,
};
const AgingState = {
  current__input: parseInt(currentInput.value),
  days__one__input: parseInt(daysOneInput.value),
  days__two__input: parseInt(daysTwoInput.value),
  days__three__input: parseInt(daysThreeInput.value),
  defaultH: isNaN(parseInt(defaultHEl)) ? 0 : parseInt(defaultHEl),
  defaultP: isNaN(parseInt(defaultPEl)) ? 0 : parseInt(defaultPEl),
  current__inputVal: 0,
  days__one__inputVal: 0,
  days__two__inputVal: 0,
  days__three__inputVal: 0,
  totalAgingSave: 0,
  opCost: 0,
  AgingFinalSave: 0,
};
const forMatter = (num) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
  }).format(num);
};
const template = () => {
  return `<div  id="w-node-a143d1e2-173e-04c9-f7c6-61d890ff6453-90ff63c9"
                    data-w-id="a143d1e2-173e-04c9-f7c6-61d890ff6453"
                    class="text-block-64">
                     You just accelerated
                    <strong class="highlight-color-text">${forMatter(
                      stateObj.revenue
                    )}</strong>
                    <br />of your revenue by
                    <strong class="highlight-color-text"> ${forMatter(
                      stateObj.noOfDays
                    )} days,</strong>
                    providing <br />additional cash flow of
                    <strong class="highlight-color-text">${forMatter(
                      stateObj.cashFlow
                    )} </strong
                    ><br />and saved your enterprise <br /><strong
                      class="highlight-color-text"
                      >${forMatter(stateObj.workingCapital)} </strong
                    >in working capital savings!
                   
                  </div>

          <div data-w-id="a143d1e2-173e-04c9-f7c6-61d890ff6467" class="text-block-64">
                    You will also save
                    <strong class="highlight-color-text blue-highlight"
                      >${forMatter(stateObj.youSave)}</strong
                    ><br />for
                    <strong class="highlight-color-text">${
                      stateObj.noOfDays
                    } days</strong>
                    Growfin saves you, <br />as reduced DSO savings.
                  </div>`;
};
const template2 = () => {
  return `  <div class="text-block-64">
                    You will save
                    <strong class="highlight-color-text blue-highlight"
                      >${forMatter(stateObj.productivitySave)}</strong
                    ><br />with increased productivity!
                  </div>`;
};
const template3 = () => {
  return `<div class="text-block-61">Congratulations!</div>
                  <div class="text-block-62">
                    You will save <span class="text-span-13">${forMatter(
                      stateObj.finalSave
                    )}</span> with
                    Growfin!
                  </div>
                  <div class="text-block-63">Here is how?</div>`;
};
const templateAging = () => {
  return `<div class="text-block-61">Congratulations!</div>
                  <div class="text-block-62">
                    You will save <span class="text-span-13">${forMatter(
                      AgingState.AgingFinalSave
                    )}</span> with
                    Growfin!
                  </div>
                  <div class="text-block-63">Here is how?</div>`;
};
const DSOCalculator = () => {
  stateObj.noOfDays = Math.round((stateObj.defaultH / 100) * stateObj.DSO);
  stateObj.cashFlow = Math.round((stateObj.defaultH / 100) * stateObj.revenue);
  stateObj.workingCapital = Math.round(
    stateObj.revenue * (stateObj.noOfDays / 365)
  );
  stateObj.youSave = Math.round((7 / 100) * stateObj.workingCapital);
  stateObj.productivitySave = Math.round(
    (stateObj.defaultP / 100) * stateObj.salary * stateObj.people
  );
  stateObj.finalSave = Math.round(stateObj.youSave + stateObj.productivitySave);
};
const handleChange = () => {
  revenueEl.addEventListener("input", (e) => {
    stateObj.revenue =
      e.target.value === "" || e.target.value === typeof ""
        ? 0
        : parseInt(e.target.value);
    DSOCalculator();
    AgingCalculator();
    updateTree();
  });
  DSOEL.addEventListener("input", (e) => {
    stateObj.DSO =
      e.target.value === "" || e.target.value === typeof ""
        ? 0
        : parseInt(e.target.value);
    DSOCalculator();
    updateTree();
  });
  peopleEl.addEventListener("input", (e) => {
    stateObj.people =
      e.target.value === "" || e.target.value === typeof ""
        ? 0
        : parseInt(e.target.value);
    DSOCalculator();
    AgingCalculator();
    updateTree();
  });
  salaryEl.addEventListener("input", (e) => {
    stateObj.salary =
      e.target.value === "" || e.target.value === typeof ""
        ? 0
        : parseInt(e.target.value);
    DSOCalculator();
    AgingCalculator();
    updateTree();
  });
  humanOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      const attr = option.getAttribute("data-value");

      stateObj.defaultH = parseInt(attr);
      DSOCalculator();
      AgingCalculator();
      updateTree();
    });
  });
  productivityOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      const attr = option.getAttribute("data-value");

      stateObj.defaultP = parseInt(attr);
      DSOCalculator();
      AgingCalculator();
      updateTree();
    });
  });
};
const megaTotal = () => {
  return (val =
    parseInt(currentInput.value) +
    parseInt(daysOneInput.value) +
    parseInt(daysTwoInput.value) +
    parseInt(daysThreeInput.value));
};
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    megaTotal();
    AgingState[input.id] =
      e.target.value === "" || e.target.value === typeof ""
        ? 0
        : parseInt(e.target.value);
    if (val > 100 || val < 100) {
      inputs.forEach((input) => {
        input.classList.add("error");
      });
      errorText.classList.remove("hide-error");
    } else {
      inputs.forEach((input) => {
        input.classList.remove("error");
      });
      errorText.classList.add("hide-error");
      AgingCalculator();
      updateTree();
    }
  });
});
const AgingCalculator = () => {
  AgingState.current__inputVal = Math.round(
    (AgingState.current__input / 100) *
      stateObj.revenue *
      (stateObj.defaultH / 100)
  );
  AgingState.days__one__inputVal = Math.round(
    (AgingState.days__one__input / 100) *
      stateObj.revenue *
      (stateObj.defaultH / 100)
  );
  AgingState.days__two__inputVal = Math.round(
    (AgingState.days__two__input / 100) *
      stateObj.revenue *
      (stateObj.defaultH / 100)
  );
  AgingState.days__three__inputVal = Math.round(
    (AgingState.days__three__input / 100) *
      stateObj.revenue *
      (stateObj.defaultH / 100)
  );
  AgingState.totalAgingSave =
    AgingState.current__inputVal +
    AgingState.days__one__inputVal +
    AgingState.days__two__inputVal +
    AgingState.days__three__inputVal;
  AgingState.opCost = Math.round((7 / 100) * AgingState.totalAgingSave);
  AgingState.AgingFinalSave = AgingState.opCost + stateObj.productivitySave;
};
const updateTree = () => {
  res.innerHTML = template();
  res2.innerHTML = template2();
  res3.innerHTML = template3();
  res4.innerHTML = templateAging();
};
handleChange();
DSOCalculator();
AgingCalculator();
updateTree();
