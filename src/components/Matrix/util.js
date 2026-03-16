import React from "react";
import "react-base-table/styles.css";
import { Column } from "react-base-table";
import { languages } from "@site/data/matrix";

const _key = (language) => {
  if (typeof language === 'string') {
    return language.replace(".", "").replace(" ", "");
  }
  return language.name.replace(".", "").replace(" ", "");
};

export const genColumns = () => {
  return ["Feature", "Sub"].concat(languages).map((language, index) => {
    const displayName = typeof language === 'string' ? language : language.name;
    const url = typeof language === 'string' ? null : language.url;
    
    return {
      key: _key(language),
      dataKey: _key(language),
      title: url ? (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            color: '#0066cc',
            textDecoration: 'none',
            fontWeight: '500'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {displayName}
        </a>
      ) : (
        <span>{displayName}</span>
      ),
      width:
        index === 0
          ? 180
          : index === 1
          ? 150
          : index === 7 // DotPulsar
          ? 120
          : index === 8 // .NET
          ? 100
          : index === 9 // WS
          ? 90
          : index === 11 // REST
          ? 126
          : 74,
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
          const key = _key(language);
          if (typeof language === 'string') {
            data[key] = child[key];
          } else {
            data[key] = child[key] !== undefined ? child[key] : child[language.name];
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
        const key = _key(language);
        if (typeof language === 'string') {
          data[key] = feature[key];
        } else {
          data[key] = feature[key] !== undefined ? feature[key] : feature[language.name];
        }
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

export const getStyle = (name) => {
  if (name === "client") return { height: '45rem' };
  if (name === "producer") return { height: '62rem' };
  if (name === "consumer") return { height: '60rem' };
  if (name === "reader") return { height: '25rem' };
  if (name === "tableview") return { height: '14rem' };
  return { height: '45rem' };
};

const columns = genColumns();

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
