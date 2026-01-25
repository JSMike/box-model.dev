// Web stub for react-native codegenNativeComponent
// This is a no-op on web - the native component codegen is only used for native builds

import type { ComponentType } from 'react';

export default function codegenNativeComponent<T>(
  _name: string,
  _options?: { interfaceOnly?: boolean }
): ComponentType<T> {
  // Return a placeholder component that will be replaced by the actual web implementation
  return (() => null) as ComponentType<T>;
}
