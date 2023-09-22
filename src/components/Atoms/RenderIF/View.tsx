import React from 'react';

type Props = {
  condition: boolean;
  AlternativeComponent?: JSX.Element;
  children: React.ReactNode;
};

export function RenderIF({condition, AlternativeComponent, children}: Props) {
  if (!condition && AlternativeComponent) {
    return <>{AlternativeComponent}</>;
  }
  return <>{condition && children}</>;
}
