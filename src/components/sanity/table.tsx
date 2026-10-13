type TableRow = {
  _key?: string;
  cells?: string[];
};

type TableValue = {
  rows?: TableRow[];
};

// The @sanity/table plugin shape has no explicit header flag; by convention
// the first row holds the column labels, so it is rendered in <thead>.
export function TableComponent({ value }: { value: TableValue }) {
  const rows = value?.rows;
  if (!rows?.length) return null;

  const [headerRow, ...bodyRows] = rows;
  const headerCells = headerRow?.cells ?? [];

  return (
    <div className="w-full overflow-x-auto my-4 rounded-lg border border-mist-300">
      <table className="min-w-full w-max border-collapse text-left">
        <thead>
          <tr>
            {headerCells.map((cell, cellIndex) => (
              <th
                key={cellIndex}
                className="border border-mist-300 bg-mist-100 px-4 py-2 font-semibold"
              >
                {cell ?? ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr key={row._key ?? rowIndex}>
              {(row.cells ?? []).map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-mist-300 px-4 py-2"
                >
                  {cell ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
