import React, { useState } from "react";
function CheckBox({
  selectedCheckboxes,
  setSelectedCheckboxes,
  label,
  items,
  invalidText,
  checkboxClassName,
  id
  
}) {
  const [noneOfTheAboveSelected, setnoneOfTheAboveSelected] = useState(false);
  function handleCheckboxChange() {
    let newSelectedCheckboxes = [];

    const checkedBoxes = document.querySelectorAll(
      `input[type='checkbox'][class='form-check-input ${id}']:checked`
    );
    checkedBoxes.forEach((checkBox) => {
      newSelectedCheckboxes.push(checkBox.value);
    });
    console.log(newSelectedCheckboxes);

    if (
      newSelectedCheckboxes.includes("None of the above") &&
      newSelectedCheckboxes.length > 1
    ) {
      checkedBoxes.forEach((checkbox) => {
        if (checkbox.value !== "None of the above") {
          checkbox.checked = false;
        }
      });
      newSelectedCheckboxes = ["None of the above"];
      setSelectedCheckboxes(newSelectedCheckboxes);
    } else {
      setSelectedCheckboxes(newSelectedCheckboxes);
    }

    setnoneOfTheAboveSelected(
      newSelectedCheckboxes.includes("None of the above")
    );

    console.log(noneOfTheAboveSelected);
    
  }
  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className="mb-3" id={id}>
        {items.map((item, index) => (
          <div
            className={`form-check ${
              selectedCheckboxes.length > 0 ? "" : "is-invalid"
            }${" " + checkboxClassName}`}
            key={item}
          >
            <input
              className={`form-check-input ${id}`}
              type="checkbox"
              value={item}
              id={id+index}
              onChange={handleCheckboxChange}
              disabled={
                item == "None of the above" ? false : noneOfTheAboveSelected
              }
            />
            <label className="form-check-label" htmlFor={id+index}>
              {item}
            </label>
          </div>
        ))}
        <div className="invalid-feedback">{invalidText}</div>
      </div>
    </>
  );
}
export default CheckBox;
