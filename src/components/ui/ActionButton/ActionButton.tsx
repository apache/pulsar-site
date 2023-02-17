import React from 'react';
import s from './ActionButton.module.css'

export type ActionButtonProps = {
  title: string;
  type?: 'normal' | 'primary';
  onClick?: () => void;
  htmlType?: 'button' | 'submit' | 'reset';
  link?: {
    href: string;
    isExternal?: boolean;
  }
};

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const className = `${s.ActionButton} ${props.type === 'primary' ? s.Primary : ''}`;

  if (props.link) {
    return (
      <a
        className={className}
        href={props.link.href}
        target={props.link.isExternal ? '_blank' : undefined}
        rel={props.link.isExternal ? 'noopener noreferrer' : undefined}
      >
        {props.title}
      </a>
    );
  }

  return (
    <button
      className={className}
      type={props.htmlType || 'button'}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}

export default ActionButton;
