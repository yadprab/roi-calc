const revenue_input_element = document.querySelector("#revenue");
const dso_input_element = document.querySelector("#dso");
const people_input_element = document.querySelector("#people");
const salary_input_element = document.querySelector("#salary");
const revenue_value = revenue_input_element.getAttribute("data-default");
const dso_value = dso_input_element.getAttribute("data-default");
const people_value = people_input_element.getAttribute("data-default");
const salary_value = salary_input_element.getAttribute("data-default");
const default_working_cap_value = document
  .querySelector("#default-capital")
  .getAttribute("data-value");
const default_productivity_value = document
  .querySelector("#default-productivity")
  .getAttribute("data-value");

const working_capital_values = Array.from(
  document.querySelectorAll(".capital-tabs-link")
);

const productivity_capital_value = Array.from(
  document.querySelectorAll(".productivity-tabs-link")
);
const currentInput = document.querySelector("#current__input");
const daysOneInput = document.querySelector("#days__one__input");
const daysTwoInput = document.querySelector("#days__two__input");
const daysThreeInput = document.querySelector("#days__three__input");
const currentInput_value = currentInput.getAttribute("data-default");
const daysOneInput_value = daysOneInput.getAttribute("data-default");
const daysTwoInput_value = daysTwoInput.getAttribute("data-default");
const daysThreeInput_value = daysThreeInput.getAttribute("data-default");
const tabSwitch = document.querySelectorAll(".tabl-link");
const inputs = document.querySelectorAll(".inputs");
const errorText = document.querySelector(".error-text");
const result_dso_working = document
  .querySelector(".working-capital-tabs")
  .querySelectorAll(".w-tab-pane");

const result_productivity_working = document
  .querySelector(".productivity-capital-tabs")
  .querySelectorAll(".w-tab-pane");

const top_result = document.querySelector(".top-result-area");

let current_tab = "DSO";
let value_res;

const stateObj = {
  revenue: isNaN(parseInt(revenue_value)) ? 0 : parseInt(revenue_value),
  DSO: isNaN(parseInt(dso_value)) ? 0 : parseInt(dso_value),
  people: isNaN(parseInt(people_value)) ? 0 : parseInt(people_value),
  salary: isNaN(parseInt(salary_value)) ? 0 : parseInt(salary_value),
  defaultH: isNaN(parseInt(default_working_cap_value))
    ? 0
    : parseInt(default_working_cap_value),
  defaultP: isNaN(parseInt(default_productivity_value))
    ? 0
    : parseInt(default_productivity_value),
  noOfDays: 0,
  cashFlow: 0,
  workingCapital: 0,
  youSave: 0,
  productivitySave: 0,
  finalSave: 0,
};

const AgingState = {
  current__input: parseInt(currentInput_value),
  days__one__input: parseInt(daysOneInput_value),
  days__two__input: parseInt(daysTwoInput_value),
  days__three__input: parseInt(daysThreeInput_value),
  defaultH: isNaN(parseInt(default_working_cap_value))
    ? 0
    : parseInt(default_working_cap_value),
  defaultP: isNaN(parseInt(default_productivity_value))
    ? 0
    : parseInt(default_productivity_value),
  current__inputVal: 0,
  days__one__inputVal: 0,
  days__two__inputVal: 0,
  days__three__inputVal: 0,
  totalAgingSave: 0,
  opCost: 0,
  AgingFinalSave: 0,
};

const dso_tooltip_ele = document.querySelector(".dso-tooltip");

const amt_tooltip_ele = document.querySelector(".amt-tooltip");
const dso_result_tooltip_ele = document.querySelector(".workingc-tooltip");

const prod_tooltip_ele = document.querySelector(".productivity-tooltip");

const tooltip_dso = () =>
  `<p class='tooltip-text'> ${stateObj.noOfDays}  days is calculated as  ${stateObj.defaultH}%  of your DSO, which is  ${stateObj.DSO}  days.</p> `;

const tooltip_amt = () =>
  `<p class='tooltip-text dso-tooltip-text'>This is the amount of revenues that you will collect in ${
    stateObj.noOfDays
  } days, given that you have to collect ${forMatter(
    stateObj.revenue
  )} in 365 days.
     Calculated as (Revenues that need to be collected) multiplied by (${
       stateObj.noOfDays
     } days / 365 days)</p>`;

const tooltip_dso_result = () => `
 <p class='tooltip-text'> This is the interest realized on your working capital savings of ${stateObj.workingCapital} calculated as 7% of the amount.</p>
`;

const tooltip_aging_result = () => `
   <p class='tooltip-text'>This is the interest realized on your working capital savings of ${AgingState.totalAgingSave} calculated as 7% of the amount.</p>
`;

const tooltip_prod = () =>
  `<p class='tooltip-text'>Calculated as ${stateObj.defaultP}% of your total cost of resources, which is ${stateObj.salary} multiplied by ${stateObj.people} resources in this case.</p>`;

function handleCurrentTab(tab) {
  current_tab = tab === "Tab 2" ? "AGING_SPLIT" : "DSO";

  if (tab === "Tab 1") {
    errorText.classList.add("hide-error");
  }
}
tabSwitch.forEach((tab) => {
  tab.addEventListener("click", () => {
    handleCurrentTab(tab.getAttribute("data-w-tab"));
    updateTree();
  });
});

const forMatter = (t) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
  }).format(t);

const dso_working_template = () =>
  ` <div class="dso-text-result">Growfin can reduce your DSO by <br><span class="dso-days"> ${
    stateObj.noOfDays
  }  days </span>,  saving you <span class="dso-amt">  ${forMatter(
    stateObj.workingCapital
  )}  </span> in Working Capital and <span class="result dso-result">  ${forMatter(
    stateObj.youSave
  )}  </span> as reduced DSO savings.</div>`;

const aging_working_template = () =>
  `<div class="dso-text-result">You just accelerated<span class="dso-amt">  ${forMatter(
    AgingState.totalAgingSave
  )}  </span>   leading to savings of <span class="result dso-result">  ${forMatter(
    AgingState.opCost
  )} </span>  in opportunity cost.</div>`;

const top_result_template = () => `
            <div class="tooltip result-tooltip hide">
                <p class="tooltip-text">This is your sum total of working capital and productivity savings.</p>
              </div>
              <div class="text-block-71">
                  You will save <span class="result-value"> ${
                    current_tab === "DSO"
                      ? forMatter(stateObj.finalSave)
                      : forMatter(AgingState.AgingFinalSave)
                  } </span>  with
                  Growfin
                </div>`;

const productivity_template = () => `<div class="productivity--text">
                            You will also save
                             <span class="result productivity-result"> ${forMatter(
                              stateObj.productivitySave
                            )} </span>  <br />With
                            increased productivity
                          </div>`;

const DSOCalculator = () => {
  (stateObj.noOfDays = Math.round((stateObj.defaultH / 100) * stateObj.DSO)),
    (stateObj.cashFlow = Math.round(
      (stateObj.defaultH / 100) * stateObj.revenue
    )),
    (stateObj.workingCapital = Math.round(
      stateObj.revenue * (stateObj.noOfDays / 365)
    )),
    (stateObj.youSave = Math.round(0.07 * stateObj.workingCapital)),
    (stateObj.productivitySave = Math.round(
      (stateObj.defaultP / 100) * stateObj.salary * stateObj.people
    )),
    (stateObj.finalSave = Math.round(
      stateObj.youSave + stateObj.productivitySave
    ));
};

function megaTotal() {
  const current_state = {
    current_currentInput: isNaN(parseInt(currentInput.value))
      ? parseInt(currentInput_value)
      : parseInt(currentInput.value),
    current_daysOneInput: isNaN(parseInt(daysOneInput.value))
      ? parseInt(daysOneInput_value)
      : parseInt(daysOneInput.value),
    current_daysTwoInput: isNaN(parseInt(daysTwoInput.value))
      ? parseInt(daysTwoInput_value)
      : parseInt(daysTwoInput.value),
    current_daysThreeInput: isNaN(parseInt(daysThreeInput.value))
      ? parseInt(daysThreeInput_value)
      : parseInt(daysThreeInput.value),
  };
  value_res =
    current_state.current_currentInput +
    current_state.current_daysOneInput +
    current_state.current_daysTwoInput +
    current_state.current_daysThreeInput;
}

inputs.forEach((t) => {
  t.addEventListener("input", (e) => {
    megaTotal(),
      (AgingState[t.id] =
        "" === e.target.value || "string" === e.target.value
          ? 0
          : parseInt(e.target.value)),
      value_res > 100 || value_res < 100
        ? (inputs.forEach((t) => {
            t.classList.add("error");
          }),
          errorText.classList.remove("hide-error"))
        : (inputs.forEach((t) => {
            t.classList.remove("error");
          }),
          errorText.classList.add("hide-error"),
          AgingCalculator(),
          updateTree());
  });
});
const AgingCalculator = () => {
  (AgingState.current__inputVal = Math.round(
    (AgingState.current__input / 100) *
      stateObj.revenue *
      (stateObj.defaultH / 100)
  )),
    (AgingState.days__one__inputVal = Math.round(
      (AgingState.days__one__input / 100) *
        stateObj.revenue *
        (stateObj.defaultH / 100)
    )),
    (AgingState.days__two__inputVal = Math.round(
      (AgingState.days__two__input / 100) *
        stateObj.revenue *
        (stateObj.defaultH / 100)
    )),
    (AgingState.days__three__inputVal = Math.round(
      (AgingState.days__three__input / 100) *
        stateObj.revenue *
        (stateObj.defaultH / 100)
    )),
    (AgingState.totalAgingSave =
      AgingState.current__inputVal +
      AgingState.days__one__inputVal +
      AgingState.days__two__inputVal +
      AgingState.days__three__inputVal),
    (AgingState.opCost = Math.round(0.07 * AgingState.totalAgingSave)),
    (AgingState.AgingFinalSave = AgingState.opCost + stateObj.productivitySave);
};

const updateTree = () => {
  result_dso_working.forEach(
    (content) =>
      (content.innerHTML =
        current_tab === "DSO"
          ? dso_working_template()
          : aging_working_template())
  );
  result_productivity_working.forEach(
    (content) => (content.innerHTML = productivity_template())
  );
  top_result.innerHTML = top_result_template();

  dso_tooltip_ele.innerHTML = tooltip_dso();
  amt_tooltip_ele.innerHTML = tooltip_amt();
  dso_result_tooltip_ele.innerHTML = tooltip_dso_result();
  prod_tooltip_ele.innerHTML = tooltip_prod();
  const result_value = document.querySelector(".result-value");
  const r = document.querySelector(".result-tooltip");
  const dso_days = document.querySelectorAll(".dso-days");
  const dso_amt_re = document.querySelectorAll(".dso-amt");
  result_value.addEventListener("mouseenter", (e) => {
    r.classList.remove("hide");
  });
  result_value.addEventListener("mouseleave", (e) => {
    r.classList.add("hide");
  });
  dso_days.forEach((ele) => {
    ele.addEventListener("mouseenter", (e) => {
      dso_tooltip_ele.classList.remove("hide");
    });
    ele.addEventListener("mouseleave", (e) => {
      dso_tooltip_ele.classList.add("hide");
    });
  });
  dso_amt_re.forEach((ele) => {
    ele.addEventListener("mouseenter", (e) => {
      amt_tooltip_ele.classList.remove("hide");
    });
    ele.addEventListener("mouseleave", (e) => {
      amt_tooltip_ele.classList.add("hide");
    });
  });
  const dso_result = document.querySelectorAll(".dso-result");
  dso_result.forEach((ele) => {
    ele.addEventListener("mouseenter", (e) => {
      dso_result_tooltip_ele.classList.remove("hide");
    });
    ele.addEventListener("mouseleave", (e) => {
      dso_result_tooltip_ele.classList.add("hide");
    });
  });
  const prod_working = document.querySelectorAll(".productivity-result");
  prod_working.forEach((ele) => {
    ele.addEventListener("mouseenter", (e) => {
      prod_tooltip_ele.classList.remove("hide");
    });
    ele.addEventListener("mouseleave", (e) => {
      prod_tooltip_ele.classList.add("hide");
    });
  });
};
revenue_input_element.addEventListener("input", (t) => {
  (stateObj.revenue =
    "" === t.target.value || "string" === t.target.value
      ? 0
      : parseInt(t.target.value)),
    DSOCalculator(),
    AgingCalculator(),
    updateTree();
});
dso_input_element.addEventListener("input", (t) => {
  (stateObj.DSO =
    "" === t.target.value || "string" === t.target.value
      ? 0
      : parseInt(t.target.value)),
    DSOCalculator(),
    updateTree();
}),
  people_input_element.addEventListener("input", (t) => {
    (stateObj.people =
      "" === t.target.value || "string" === t.target.value
        ? 0
        : parseInt(t.target.value)),
      DSOCalculator(),
      AgingCalculator(),
      updateTree();
  }),
  salary_input_element.addEventListener("input", (t) => {
    (stateObj.salary =
      "" === t.target.value || "string" === t.target.value
        ? 0
        : parseInt(t.target.value)),
      DSOCalculator(),
      AgingCalculator(),
      updateTree();
  }),
  working_capital_values.forEach((t) => {
    t.addEventListener("click", (e) => {
      const a = t.getAttribute("data-value");
      (stateObj.defaultH = parseInt(a)),
        DSOCalculator(),
        AgingCalculator(),
        updateTree();
      up();
    });
  }),
  productivity_capital_value.forEach((t) => {
    t.addEventListener("click", (e) => {
      const a = t.getAttribute("data-value");
      (stateObj.defaultP = parseInt(a)),
        DSOCalculator(),
        AgingCalculator(),
        updateTree();
    });
  }),
  DSOCalculator(),
  AgingCalculator(),
  updateTree();
megaTotal();
