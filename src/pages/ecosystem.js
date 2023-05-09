import React, {useState} from "react";
import Layout from "@theme/Layout";
import EcoCards from "../components/EcoCards";
import ecoObj from '@site/data/ecosystem.js';
import PropTypes from 'prop-types';
import Select, {selectClasses} from '@mui/base/Select';
import Option, {optionClasses} from '@mui/base/Option';
import Popper from '@mui/base/Popper';
import {styled} from '@mui/system';


// create combine the arrays from each category.
let eObj = ecoObj;
// add type as a property to each object to use in the tile cta.
Object.keys(eObj).forEach(key => {
  ecoObj[key].forEach((obj) => {
    obj.type = key.charAt(0).toUpperCase() + key.slice(1);;
  })
});

let allArr = [];
Object.keys(ecoObj).forEach(key => {
  allArr = [...allArr, ...ecoObj[key]];
});

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  margin-top: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &.${selectClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(Option)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledPopper = styled(Popper)`
  z-index: 10;
`;

const Paragraph = styled('p')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  margin: 10px 0;
  color: ${theme.palette.mode === 'dark' ? grey[400] : grey[700]};
  `,
);

function CustomSelect(props) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <Select {...props} components={components} />;
}

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.func,
    Root: PropTypes.elementType,
  }),
};

export default function Home() {
  const [searchString, setSearch] = useState('');
  const [value, setValue] = React.useState(0);
  return (
    <Layout
      title={`Ecosystem`}
      description="Learn about the basics of using Apache Pulsar"
    >
      <div className="page-wrap tailwind">
        <section className="hero">
          <div className="inner text--left">
            <div className="row">
              <div className="col col--8">
                <h1>Ecosystem</h1>
                <p>To build better streaming data pipelines and event-driven applications, you can use the powerful extensions to Pulsar, including <a href="/docs/next/io-overview">connectors</a>, protocol handlers, tools, and more. Additionally, you can develop applications using <a href="/docs/next/client-libraries">client libraries</a>.</p>
                <p>This page lists both built-in and third-party tools. Note that some of the third-party tools were not tested throughly by the community, and may not work as expected. Only open source components with an <a href="https://opensource.org/licenses">OSI approved licenses</a> are allowed. </p>

              </div>
            </div>
          </div>
        </section>

          <section className="main-content waves-bg py-12 mb-24">
            <form className="search-form relative z10 text--center">
              <div className="ml-2 px-2">
                <CustomSelect className="inline-block px-4 cursor-pointer ml-4 underline-offset-1 text-sm" name="search" defaultValue={0} value={value} onChange={setValue}>
                  <StyledOption value={0}>Filter by Type</StyledOption>
                  <StyledOption value={1}>Client API</StyledOption>
                  <StyledOption value={2}>Client Wrapper</StyledOption>
                  <StyledOption value={3}>Database Integration</StyledOption>
                  <StyledOption value={4}>IO</StyledOption>
                  <StyledOption value={5}>Logging</StyledOption>
                  <StyledOption value={6}>Observability</StyledOption>
                  <StyledOption value={7}>Protocol Handlers</StyledOption>
                  <StyledOption value={8}>Search and Query </StyledOption>
                  <StyledOption value={9}>Security Plugin</StyledOption>
                  <StyledOption value={10}>Stream Processing</StyledOption>
                  <StyledOption value={11}>Tools</StyledOption>
                </CustomSelect>
                <input type="text" className="ml-2 px-2" name="search" placeholder="Search" value={searchString} onChange={e => setSearch(e.target.value)} onFocus="if(value==''){value='';this.style.color='#000'}" onBlur="if(!value){value=defaultValue; this.style.color='#999'}" />

                <Paragraph>
                  {value == 0 && <EcoCards search={searchString} resources={allArr} />}
                  {value == 1 && <EcoCards search={searchString} resources={ecoObj.client_api} />}
                  {value == 2 && <EcoCards search={searchString} resources={ecoObj.client_wrapper} />}
                  {value == 3 && <EcoCards search={searchString} resources={ecoObj.database_integration} />}
                  {value == 4 && <EcoCards search={searchString} resources={ecoObj.io} />}
                  {value == 5 && <EcoCards search={searchString} resources={ecoObj.logging} />}
                  {value == 6 && <EcoCards search={searchString} resources={ecoObj.observability} />}
                  {value == 7 && <EcoCards search={searchString} resources={ecoObj.protocol_handlers} />}
                  {value == 8 && <EcoCards search={searchString} resources={ecoObj.search_and_query} />}
                  {value == 9 && <EcoCards search={searchString} resources={ecoObj.security_plugins} />}
                  {value == 10 && <EcoCards search={searchString} resources={ecoObj.stream_processing} />}
                  {value == 11 && <EcoCards search={searchString} resources={ecoObj.tools} />}
                </Paragraph>
              </div>
            </form>
        </section>
      </div>
    </Layout>
  );
}
