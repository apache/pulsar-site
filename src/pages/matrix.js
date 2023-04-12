import Layout from "@theme/Layout";
import React from "react";
import "react-base-table/styles.css";
import BaseTable, { Column, AutoResizer } from "react-base-table";
import {
  languages,
  client,
  producer,
  reader,
  consumer,
} from "../../data/matrix.js";

const _key = (language) => language.replace(".", "").replace(" ", "");
const genColomns = () => {
  return ["Feature", "Sub"].concat(languages).map((language, index) => {
    return {
      key: _key(language),
      dataKey: _key(language),
      title: language === "Sub" ? "" : language,
      width: index > 1 ? 132 : 154,
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

const genData = (values) => {
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

const genCount = (values) => {
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

const getHeigh = (values) => {
  return "h-[" + genCount(values) * 50 + "px]";
};

const columns = genColomns();

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

const titles = ["Client", "Producer", "Consumer", "Reader"];
export default function Matrix() {
  return (
    <Layout>
      <div className="tailwind">
        <div className="my-12 container">
          {[client, producer, consumer, reader].map((values, index) => {
            return (
              <div className="mb-8" key={index}>
                <div className="font-bold text-xl mb-4">{titles[index]}</div>
                <div className={`w-full ${getHeigh(values)}`}>
                  <AutoResizer>
                    {({ width, height }) => (
                      <BaseTable
                        fixed
                        width={width}
                        height={height}
                        columns={fixedColumns}
                        data={genData(values)}
                        rowRenderer={rowRenderer}
                      />
                    )}
                  </AutoResizer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
