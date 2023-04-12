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

import { languages, client } from "../../data/matrix.js";

const _key = (language) => language.replace(".", "").replace(" ", "");
const genColomns = () => {
  return ["Feature", "Sub"].concat(languages).map((language, index) => {
    return {
      key: _key(language),
      dataKey: _key(language),
      title: language === "Sub" ? "" : language,
      width: index > 1 ? 120 : 150,
    };
  });
};

const genData = () => {
  const datas = [];
  client.forEach((feature) => {
    if (feature.Children) {
      feature.Children.forEach((child, index) => {
        const data = {
          id: feature.Feature + "-" + child.Feature,
          Feature: index > 0 ? "" : feature.Feature,
          Sub: child.Feature,
          rowSpan: () => (index > 0 ? 1 : feature.Children.length),
          isLast: index === feature.Children.length - 1,
        };
        languages.forEach((language) => {
          if (language === "Feature") {
            data["Sub"] = child["Feature"];
          } else {
            data[_key(language)] = child[_key(language)];
          }
        });
        datas.push(data);
      });
    } else {
      const data = {
        id: feature.Feature,
        Feature: feature.Feature,
        Sub: "",
        rowSpan: () => 1,
      };
      languages.forEach((language) => {
        data[_key(language)] = feature[_key(language)];
      });
      datas.push(data);
    }
  });
  return datas;
};

const columns = genColomns();
const data = genData();

const fixedColumns = columns.map((column, columnIndex) => {
  let frozen;
  if (columnIndex < 2) frozen = Column.FrozenDirection.LEFT;
  if (columnIndex === 0) {
    return { ...column, frozen, rowSpan: ({ rowData }) => rowData.rowSpan() };
  }
  return { ...column, frozen };
});

const rowRenderer = ({ rowData, rowIndex, cells, columns }) => {
  const rowSpan = columns[0].rowSpan({ rowData, rowIndex });
  if (rowData.Sub.length > 0 && !rowData.isLast) {
    const cell = cells[0];
    const style = {
      ...cell.props.style,
      height: rowSpan * 50,
      alignSelf: "flex-start",
      zIndex: 1,
      borderBottom: "0px",
    };
    cells[0] = React.cloneElement(cell, { style });
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
                />
              )}
            </AutoResizer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
