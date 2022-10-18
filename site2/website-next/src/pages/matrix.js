import * as React from "react";
import ReactDOM from 'react-dom';
import Layout from "@theme/Layout";
import { Table } from 'element-react';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import Icon from '@mui/material/Icon';
import 'element-theme-default';

const matrixObj = require("../../data/matrix.js");
const data = matrixObj.data

const subHeader = matrixObj.subHeader.map(subRow => {
  if (subRow.subColumns) {
    let subColumns = subRow.subColumns
    subColumns.forEach( subColumnsItem => {
      subColumnsItem.render = function(subColumnsItemRow, subColumnsItemColoum) {
        if (subColumnsItemRow[subColumnsItemColoum.prop]) {
          return (
            <span>true</span>
          )
        } else {
          return (
            <span>false</span>
          )
        }
        
      }
    })
  }
  // console.log('subRow-------',subRow)

  return subRow
})

const tableHead = matrixObj.tableHeader.map( row => {
  
  if (row.type == "expand") {
    row.expandPannel = function(row) {
      return (
        <Table
          style={{width: '100%'}}
          columns={subHeader}
          data={row.children}
          border={false}
        />
      )
    }
  }

  return row
})


export default function Matrix() {
  return (
    <Layout>
      <div className="matrix-padding-x">
        <section className="matrix-margin-top">
          <Table
            style={{width: '100%'}}
            showHeader={false}
            columns={tableHead}
            data={data}
            border={false}
          />
        </section>
      </div>
    </Layout>
  )
}