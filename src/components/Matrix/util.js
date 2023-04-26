import React from "react";
import "react-base-table/styles.css";
import { Column } from "react-base-table";
import { languages } from "../../../data/matrix.js";
const _key = (language) => language.replace(".", "").replace(" ", "");
export const genColomns = () => {
  return ["Feature", "Sub"].concat(languages).map((language, index) => {
    return {
      key: _key(language),
      dataKey: _key(language),
      title: language === "Sub" ? "" : language,
      width: index > 1 ? 126 : 180,
      dataGetter: ({ column, rowData }) => {
        if (parseInt(rowData[column.dataKey]) === 0) {
          return "🚫";
        } else if (parseInt(rowData[column.dataKey]) === 1) {
          return "✔️";
        } else if (parseInt(rowData[column.dataKey]) === 2) {
          return "✅";
        }
        return rowData[column.dataKey];
      },
      align: index > 1 ? "center" : "left",
    };
  });
};

export const genData = (values) => {
  const datas = [];
  values.forEach((feature) => {
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

export const genCount = (values) => {
  let count = 1;
  values.forEach((feature) => {
    if (feature.Children) {
      count = count + feature.Children.length;
    } else {
      count = count + 1;
    }
  });
  return count;
};

export const getHeight = (name) => {
  if (name === "client") return "h-[700px]";
  if (name === "producer") return "h-[950px]";
  // if (name === 'consumer') return "h-[1450px]";
  if (name === "consumer") return "h-[950px]";
  if (name === "reader") return "h-[400px]";
  if (name === "tableview") return "h-[200px]";
  return "h-[700px]";
};

const columns = genColomns();

export const fixedColumns = columns.map((column, columnIndex) => {
  let frozen;
  if (columnIndex < 2) frozen = Column.FrozenDirection.LEFT;
  if (columnIndex === 0) {
    return { ...column, frozen, rowSpan: ({ rowData }) => rowData.rowSpan() };
  }
  return { ...column, frozen };
});

export const rowRenderer = ({ rowData, rowIndex, cells, columns }) => {
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
