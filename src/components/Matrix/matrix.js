import React from "react";
import "react-base-table/styles.css";
import BaseTable, { AutoResizer } from "react-base-table";
import { fixedColumns, getStyle, genData, rowRenderer } from "./util.js";
import s from "./Matrix.module.css";

export default function Matrix(props) {
  const data = props.data;
  const name = props.name;

  return (
    <div className={s.Matrix} style={getStyle(name)}>
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
  );
}
