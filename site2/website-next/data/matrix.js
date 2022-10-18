module.exports = {
  subHeader: [
    {
      label: "Feature",
      align: "center",
      prop: "feature",
      width: 150,
      fixed: 'left',
    },
    {
      label: "Java",
      headerAlign: "center",
      subColumns: [
        {
          label: "Code",
          align: "center",
          prop: "javaCode",
          width: 120,
        },
        {
          label: "Docs",
          align: "center",
          prop: "JavaDocs",
          width: 120,
        }
      ]
    },
    {
      label: "C++",
      headerAlign: "center",
      subColumns: [
        {
          label: "Code",
          align: "center",
          prop: "c_Code",
          width: 120,
        },
        {
          label: "Docs",
          align: "center",
          prop: "c_Docs",
          width: 120,
        }
      ]
    },
    {
      label: "GO",
      headerAlign: "center",
      subColumns: [
        {
          label: "Code",
          align: "center",
          prop: "goCode",
          width: 120,
        },
        {
          label: "Docs",
          align: "center",
          prop: "goDocs",
          width: 120,
        }
      ]
    },
    {
      label: "Python",
      headerAlign: "center",
      subColumns: [
        {
          label: "Code",
          align: "center",
          prop: "pythonCode",
          width: 120,
        },
        {
          label: "Docs",
          align: "center",
          prop: "pythenDocs",
          width: 120,
        }
      ]
    },
    {
      label: "NodeJs",
      headerAlign: "center",
      subColumns: [
        {
          label: "Code",
          align: "center",
          prop: "nodejsCode",
          width: 120,
        },
        {
          label: "Docs",
          align: "center",
          prop: "nodejsDocs",
          width: 120,
        }
      ]
    },
    {
      label: "WebSocket",
      headerAlign: "center",
      subColumns: [
        {
          label: "Code",
          align: "center",
          prop: "websocketCode",
          width: 120,
        },
        {
          label: "Docs",
          align: "center",
          prop: "websocketDoc",
          width: 120,
        }
      ]
    },
    {
      label: "C#/DotPulsar",
      headerAlign: "center",
      subColumns: [
        {
          label: "Code",
          align: "center",
          prop: "dotPulsarCode",
          width: 120,
        },
        {
          label: "Docs",
          align: "center",
          prop: "dotPulsarDoc",
          width: 120,
        }
      ]
    },
    {
      label: "Rest",
      headerAlign: "center",
      subColumns: [
        {
          label: "Code",
          align: "center",
          prop: "restCode",
          width: 120,
        },
        {
          label: "Docs",
          align: "center",
          prop: "restDocs",
          width: 120,
        }
      ]
    }
  ],
  tableHeader: [
    {
      type: 'expand',
      fixed: 'left'
    },
    {
      label: "",
      prop: 'type'
    }
  ],
  data: [
    {
      type: "Client",
      children: [
        {
          feature: "Proxy",
          javaCode: true,
          javaDoc: true,
          c_Code: false,
          c_Doc: false,
          goCode: true,
          goDoc: true,
          pythonCode: false,
          pythonDoc: false,
          nodejsCode: false,
          nodejsDoc: false,
          websocketCode: false,
          websocketDoc: false,
          dotPulsarCode: false,
          dotPulsarDoc: false,
          restCode: false,
          restDoc: false
        },
        {
          feature: "Proxy2",
          javaCode: true,
          javaDoc: true,
          c_Code: false,
          c_Doc: false,
          goCode: true,
          goDoc: true,
          pythonCode: false,
          pythonDoc: false,
          nodejsCode: false,
          nodejsDoc: false,
          websocketCode: false,
          websocketDoc: false,
          dotPulsarCode: false,
          dotPulsarDoc: false,
          restCode: false,
          restDoc: false
        }
      ]
    },
    {
      type: "next",
      children: [
        {
          feature: "Proxy",
          javaCode: true,
          javaDoc: true,
          c_Code: false,
          c_Doc: false,
          goCode: true,
          goDoc: true,
          pythonCode: false,
          pythonDoc: false,
          nodejsCode: false,
          nodejsDoc: false,
          websocketCode: false,
          websocketDoc: false,
          dotPulsarCode: false,
          dotPulsarDoc: false,
          restCode: false,
          restDoc: false
        },
        {
          feature: "Proxy",
          javaCode: true,
          javaDoc: true,
          c_Code: false,
          c_Doc: false,
          goCode: true,
          goDoc: true,
          pythonCode: false,
          pythonDoc: false,
          nodejsCode: false,
          nodejsDoc: false,
          websocketCode: false,
          websocketDoc: false,
          dotPulsarCode: false,
          dotPulsarDoc: false,
          restCode: false,
          restDoc: false
        }
      ]
    },
    // {
    //   type: "Producer",
    //   feature: "Proxy",
    //   javaCode: true,
    //   javaDoc: true,
    //   c_Code: false,
    //   c_Doc: false,
    //   goCode: true,
    //   goDoc: true,
    //   pythonCode: false,
    //   pythonDoc: false,
    //   nodejsCode: false,
    //   nodejsDoc: false,
    //   websocketCode: false,
    //   websocketDoc: false,
    //   dotPulsarCode: false,
    //   dotPulsarDoc: false,
    //   restCode: false,
    //   restDoc: false
    // },
    
  ]
}