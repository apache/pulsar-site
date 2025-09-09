declare module '!!raw-loader!*' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '@site/data/*' {
  const content: any;
  export default content;
}

declare module '@site/src/components/ui/SvgIcon/SvgIcon' {
  import React from 'react';
  export interface SvgIconProps {
    svg: string;
  }
  export default function SvgIcon(props: SvgIconProps): React.ReactElement;
}