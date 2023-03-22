import Layout from "@theme/Layout";
import React from "react";
import "react-base-table/styles.css";
import BaseTable, {
  Column,
  SortOrder,
  AutoResizer,
  normalizeColumns,
  callOrReturn,
  unflatten,
  TableHeader as BaseTableHeader,
  TableRow as BaseTableRow,
} from "react-base-table";

const generateColumns = (count = 10, prefix = "column-", props) =>
  new Array(count).fill(0).map((column, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
  }));

const generateData = (columns, count = 200, prefix = "row-") =>
  new Array(count).fill(0).map((row, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        if (columnIndex == 0 && rowIndex % 2 == 1) {
          rowData[column.dataKey] = ``;
        } else {
          rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
        }
        return rowData;
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    );
  });

const columns = generateColumns(10);
const data = generateData(columns, 100);

const fixedColumns = columns.map((column, columnIndex) => {
  let frozen;
  if (columnIndex < 2) frozen = Column.FrozenDirection.LEFT;
  return { ...column, frozen };
});

const rowSpanIndex = 0;
fixedColumns[rowSpanIndex].rowSpan = ({ rowData, rowIndex }) =>
  rowIndex % 2 === 0 && rowIndex <= data.length - 2 ? 2 : 1;

// console.log(JSON.stringify(fixedColumns, null, 2));
// console.log(JSON.stringify(data, null, 2));
// console.log('...', fixedColumns[rowSpanIndex]);

const rowRenderer = ({ rowData, rowIndex, cells, columns }) => {
  const rowSpan = columns[rowSpanIndex].rowSpan({ rowData, rowIndex });
  if (rowSpan > 1) {
    const cell = cells[rowSpanIndex];
    const style = {
      ...cell.props.style,
      height: rowSpan * 50,
      alignSelf: "flex-start",
      zIndex: 1,
    };
    cells[rowSpanIndex] = React.cloneElement(cell, { style });
  }
  return cells;
};

export default function Matrix() {
  return (
    <Layout>
      <div className="tailwind">
        <div className="my-12 container">
          <div className="w-full h-[60vh]">
            <AutoResizer>
              {({ width, height }) => (
                <BaseTable
                  fixed
                  width={width}
                  height={height}
                  columns={fixedColumns}
                  data={data}
                  rowRenderer={rowRenderer}
                  // overscanRowCount={2}
                />
              )}
            </AutoResizer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
