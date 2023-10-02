function Radio({ selectedRadio, setSelectedRadio, invalidText, label, items }) {
  function handleRadioChange() {
    setSelectedRadio(
      document.querySelector('input[name="contactRadio"]:checked').value
    );
  }
  return (
    <>
      <div className="mb-3" id="symptomInput">
        <label htmlFor="contactInput" className="form-label">
          {label}
        </label>
        {items.map((item) => (
          <div
            className={`form-check ${
              selectedRadio !== null ? "" : "is-invalid"
            }`}
          >
            <input
              className="form-check-input"
              type="radio"
              name="contactRadio"
              id={"radioInput" + item}
              value={item}
              onChange={handleRadioChange}
            />
            <label className="form-check-label" htmlFor={"radioInput" + item}>
              {item}
            </label>
          </div>
        ))}
        <div className="invalid-feedback">{invalidText}</div>
      </div>
    </>
  );
}
export default Radio;
