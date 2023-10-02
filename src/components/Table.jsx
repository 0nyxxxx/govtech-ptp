function Table({ data, tableName }) {
  console.log(data);

  let fields = Object.keys(data[0]);
  console.log(fields);
  console.log(data[0]);
  return (
    <>
      <p>{tableName}</p>
      <table className="table table-hover "style={{ width: '1300px', height: '400px', overflow: 'auto' }}>
        <thead >
          <tr>
            {fields.map((field) => (
              <th scope="col">{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr>{/*maps row by row  */}
              {fields.map((field) => (
                Array.isArray(entry[field]) ? <td>{entry[field].map((symptom,i)=>(<span key={i}>
                  {symptom}
                  {i < entry[field].length - 1 ? ', ' : ''}
                </span>))}</td> : <td>{entry[field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default Table;
