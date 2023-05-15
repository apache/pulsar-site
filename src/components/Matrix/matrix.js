import React from "react";
import "react-base-table/styles.css";
import BaseTable, { AutoResizer } from "react-base-table";
import { fixedColumns, getStyle, genData, rowRenderer } from "./util.js";

export default function Matrix(props) {
  const data = props.data;
  const name = props.name;

  return (
    <div>
      <div key={name}>
        <div style={getStyle(name)}>
          <AutoResizer>
            {({ width, height }) => (
              <BaseTable
                fixed
                width={width}
                height={height}
                columns={fixedColumns}
                data={genData(data)}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoResizer>
        </div>
      </div>
    </div>
  );
}
