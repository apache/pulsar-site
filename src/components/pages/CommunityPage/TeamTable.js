import * as React from "react";

export default function VersionsTable(props) {
  return (
    <div>
      {props.data.map((row, index) => (
          <div key={index}>
            <div>{row.name}</div>
            <div>{row.apacheId}</div>
            <div><img src={'https://github.com/'+row.apacheId+'.png'} /></div>
          </div>
      ))}
    </div>
  );
}
