import React from "react";
import "react-base-table/styles.css";
import BaseTable, { AutoResizer } from "react-base-table";
import { fixedColumns, getHeight, genData, rowRenderer } from "./util.js";

export default function Matrix(props) {
  const data = props.data;
  const name = props.name;
  return (
    <div className="tailwind">
      <div className="mb-8" key={name}>
        <div className={`w-full ${getHeight(name)}`}>
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
