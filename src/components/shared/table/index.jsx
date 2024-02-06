"use client";

import clsx from "clsx";
import PropTypes from "prop-types";

const Table = ({ data, columns, size = "medium", id }) => {
  const renderCell = (row, column) => {
    if (column.render) {
      return column.render(row);
    } else {
      return row[column.name];
    }
  };

  return (
    <table
      id={id}
      className={clsx("min-w-max w-full table-fixed", {
        "text-sm": size === "small",
        "text-base": size === "medium",
        "text-lg": size === "large",
      })}
    >
      <thead>
        <tr>
          {columns.map((c, index) => (
            <th
              key={`col_${index}`}
              className={clsx(
                " font-normal border-b-2 border-gray-300 text-left leading-4 text-slate-500 uppercase tracking-wider",
                {
                  "px-2 py-1 text-xs": size === "small",
                  "px-2 py-2 text-sm": size === "medium",
                  "px-2 py-4 text-base": size === "large",
                }
              )}
              style={{
                width: c.width ? c.width : undefined,
                minWidth: c.minWidth ? c.minWidth : undefined,
                maxWidth: c.maxWidth ? c.maxWidth : undefined,
              }}
            >
              {c.display}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data && data.length ? (
          data.map((d, index) => (
            <tr key={`row-${index}`}>
              {columns.map((c, colIndex) => (
                <td
                  key={`cell-${index}-${colIndex}`}
                  className={clsx(
                    "whitespace-no-wrap border-b border-gray-300",
                    {
                      "px-2 py-1": size === "small",
                      "px-2 py-2": size === "medium",
                      "px-2 py-4": size === "large",
                    }
                  )}
                >
                  {renderCell(d, c)}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colspan={columns.length}>No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Table;
