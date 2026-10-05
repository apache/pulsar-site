import React from 'react';
import MDXA from '@theme-original/MDXComponents/A';

export default function MDXAnchor(props: React.ComponentProps<'a'>) {
  // The reference site is a separate Docsify application. Client-side routing
  // would display Docusaurus's 404 page instead of loading its index.html.
  if (props.href && /^\/reference(?:\/|[?#]|$)/.test(props.href)) {
    return (
      <MDXA
        {...props}
        href={`pathname://${props.href}`}
        target={props.target ?? '_self'}
      />
    );
  }
  return <MDXA {...props} />;
}
