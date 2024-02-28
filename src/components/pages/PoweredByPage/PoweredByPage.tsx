import * as React from "react";

import Layout from "@theme/Layout";
import Translate from "@docusaurus/Translate";
import users from "../../../../data/users";

import s from './PoweredByPage.module.css';
import BrowserOnly from "@docusaurus/BrowserOnly";

const PoweredByPage = () => {
  return (
    <Layout>
      <div className="tailwind">
        <div className="my-12 container">
          <header>
            <h2>
              <Translate>
                Companies using or contributing to Apache Pulsar
              </Translate>
            </h2>
            <hr />
          </header>

          <div className={s.logo_wrapper}>
            {users.map((c) => (
              <div className={`${s.logo_box}`}>
                <a href={c.url} title={c.name} target="_blank" className={c.logo_white && s.logo_black_background}>
                  <BrowserOnly>
                    {() => (
                      <>
                        {c.logo === undefined ? (
                          <span>{c.name}</span>
                        ) : (
                          <img
                            src={c.logo}
                            alt={c.name}
                            className={c.logo.endsWith(".svg") && s.logo_svg}
                          />
                        )}
                      </>
                    )}
                  </BrowserOnly>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PoweredByPage;
