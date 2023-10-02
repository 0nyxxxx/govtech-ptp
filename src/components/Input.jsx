function Input({valid,onChange,label,invalidText,id,type,hintText}) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <input
          type={type}
          className={`form-control ${valid ? "" : "is-invalid"}`}
          id={id}
          onChange={onChange}
          required
          placeholder={hintText}
        />
        <div className="invalid-feedback">{invalidText}</div>
      </div>
    </>
  );
}
export default Input;
