import React, { useState } from 'react';
import ThumbDown from './thumbs-down.svg';
import ThumbUp from './thumbs-up.svg';
import s from './ArticleThumb.module.css';

const ArticleThumb = () => {
  const [activeKey, setActiveKey] = useState();
  const handleThumbClick = (val) => {
    if (!activeKey) {
      setActiveKey(val)
      if (window && (window._paq)) {
        window._paq.push(['trackEvent', 'Website Feedback', val, location.pathname])
      }
    }
  }

  let card_style = { borderWidth: '1px', padding: '3px', display: 'flex' }
  let thumb_style = {
    justifyContent: 'center', display: 'flex', borderRadius: '99999px',
    width: '2.5rem', height: '2.5rem',
  }
  if (!activeKey) {
    thumb_style['cursor'] = "pointer"
  }
  return (
    <div className="border">
      <div style={{ color: "var(--ifm-toc-link-color)" }}>
        Was this helpful?
      </div>
      <div style={card_style}>
        <div
          style={{
            ...thumb_style,
            background: activeKey === "up" ? "var(--text-color)" : "",
            color: activeKey === "up" ? "#fff" : "",
          }}
          onClick={() => handleThumbClick("up")}
        >
          <ThumbUp />
        </div>
        <div
          style={{
            ...thumb_style,
            background: activeKey === "down" ? "var(--text-color)" : "",
            color: activeKey === "down" ? "#fff" : "",
          }}
          onClick={() => handleThumbClick("down")}
        >
          <ThumbDown />
        </div>
      </div>

      <div className={s.Actions}>
        <a
          target='_blank'
          className={s.Action}
          href="https://github.com/apache/pulsar-site/issues/new"
        >
          💡 Suggest changes
        </a>
        <a
          target='_blank'
          className={s.Action}
          href="https://github.com/apache/pulsar/discussions/new?category=q-a"
        >
          🛟 Get support
        </a>
      </div>
    </div>
  );
};


export default ArticleThumb;
