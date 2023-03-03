import React, {useState} from 'react';
import ThumbDown from './thumbs-down.svg';
import ThumbUp from './thumbs-up.svg';

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

    let card_style = {borderWidth: '1px', padding: '3px', display: 'flex'}
    let thumb_style = {
        justifyContent: 'center', display: 'flex', borderRadius: '99999px',
        width: '2.5rem', height: '2.5rem',
    }
    if (!activeKey) {
        thumb_style['cursor'] = "pointer"
    }
    return (
        <div className="border">
            <div style={{color: 'var(--ifm-toc-link-color)'}}>
                Was this helpful?
            </div>
            <div style={card_style}>
                <div style={{
                    ...thumb_style,
                    background: activeKey === 'up' ? "#84bef5" : "",
                    color: activeKey === 'up' ? "#e9f1f2" : "",
                }}
                     onClick={() => handleThumbClick('up')}
                >
                    <ThumbUp/>
                </div>
                <div style={{
                    ...thumb_style, marginLeft: '30px',
                    background: activeKey === 'down' ? "#84bef5" : "",
                    color: activeKey === 'down' ? "#e9f1f2" : "",
                }}
                     onClick={() => handleThumbClick('down')}
                >
                    <ThumbDown/>
                </div>
            </div>
        </div>
    );
};


export default ArticleThumb;
