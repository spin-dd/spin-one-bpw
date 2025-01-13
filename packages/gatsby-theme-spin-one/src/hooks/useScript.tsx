import { ReactElement, useEffect } from 'react';

const createScriptElement = (node: ReactElement) => {
  if (node.type !== 'script') {
    return null;
  }
  const { src, children, async } = node.props || {};
  if (!src && !children) {
    return null;
  }

  const element = document.createElement('script');
  element.setAttribute('type', 'text/javascript');
  if (children) {
    element.innerHTML = children;
  }
  if (src) {
    element.src = src;
  }
  if (async) {
    element.async = async;
  }

  return element;
};

export const useScript = (nodes: ReactElement[]) => {
  useEffect(() => {
    const scriptElements = nodes.map((node) => createScriptElement(node)).filter((element) => element !== null);
    scriptElements.map((element) => document.head.appendChild(element));

    return () => {
      scriptElements.map((element) => document.head.removeChild(element));
    };
  }, [nodes]);
};
