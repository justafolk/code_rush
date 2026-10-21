/**
 * Transpiler / preprocessor for multi-language browser execution.
 * JavaScript runs directly.
 * TypeScript has type annotations stripped client-side for zero-latency execution.
 */

export function stripTypeScriptTypes(tsCode) {
  let code = tsCode;

  // Remove type imports
  code = code.replace(/import\s+type\s+[^;]+;/g, '');

  // Remove interfaces
  code = code.replace(/interface\s+[A-Za-z0-9_<>,\s]+\{[\s\S]*?\}/g, '');

  // Remove type aliases: type X = ...;
  code = code.replace(/type\s+[A-Za-z0-9_<>,\s]+\s*=\s*[^;]+;/g, '');

  // Remove generic type parameters on functions: function foo<T>(...)
  code = code.replace(/function\s+([A-Za-z0-9_]+)\s*<[^>]+>\s*\(/g, 'function $1(');

  // Remove return types: ): ReturnType { or ): ReturnType => {
  code = code.replace(/\)\s*:\s*[A-Za-z0-9_<>[\],\s|&?]+\s*(=>|\{)/g, ') $1');

  // Remove parameter type annotations: foo: number, bar?: string[]
  // Match `identifier?: type` or `identifier: type` before comma or closing paren
  code = code.replace(/([A-Za-z0-9_]+)\s*\??\s*:\s*[A-Za-z0-9_<>[\],\s|&]+(?=[,)])/g, '$1');

  // Remove 'as Type' assertions
  code = code.replace(/\s+as\s+[A-Za-z0-9_<>[\],\s|&]+/g, '');

  return code;
}

export function preprocessCode(code, language = 'javascript') {
  if (language === 'typescript') {
    return stripTypeScriptTypes(code);
  }
  return code;
}
