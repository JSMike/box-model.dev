import fsSync from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

export type TypeReferenceMeta = {
  name: string;
  module?: string;
  package?: string;
  start: number;
  end: number;
};

export type ComponentTypeInfo = {
  text: string;
  references?: TypeReferenceMeta[];
};

export type ComponentProperty = {
  propertyName: string;
  attributeName?: string;
  type?: ComponentTypeInfo;
  default?: string;
  description?: string;
  reflects?: boolean;
  readonly?: boolean;
  deprecated?: boolean | string;
  privacy?: 'public';
};

export type ComponentEvent = {
  name: string;
  description?: string;
  type: ComponentTypeInfo;
  bubbles?: boolean;
  composed?: boolean;
  deprecated?: boolean | string;
};

export type ComponentSlot = {
  name: string;
  description?: string;
};

export type ComponentCssPart = {
  name: string;
  description?: string;
};

export type ComponentCssProperty = {
  name: string;
  description?: string;
  default?: string;
};

export type ComponentMeta = {
  tagName: string;
  className: string;
  sourcePath: string;
  modulePath: string;
  directoryName: string;
  summary?: string;
  description?: string;
  deprecated?: boolean | string;
  properties: ComponentProperty[];
  events: ComponentEvent[];
  slots: ComponentSlot[];
  cssParts: ComponentCssPart[];
  cssProperties: ComponentCssProperty[];
};

export type ComponentMetadataResult = {
  components: ComponentMeta[];
  /** Bubbling event names for React/Preact/Solid typings only. */
  events: string[];
  warnings: string[];
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_ROOT = path.resolve(__dirname, '../src');
const TSCONFIG_PATH = path.resolve(__dirname, '../tsconfig.lib.json');
const EXCLUDED_SUFFIXES = ['.spec.ts', '.stories.ts', '.test.ts'];
const MAX_TYPE_TEXT_LENGTH = 512;

const TYPE_KEYWORDS = new Set([
  'string',
  'number',
  'boolean',
  'true',
  'false',
  'null',
  'undefined',
  'void',
  'any',
  'unknown',
  'never',
  'object',
  'bigint',
  'readonly',
]);

const SAFE_GLOBALS = new Set([
  'Array',
  'ReadonlyArray',
  'Record',
  'Partial',
  'Readonly',
  'Map',
  'Set',
  'Date',
  'Promise',
  'Element',
  'HTMLElement',
  'Node',
  'Event',
  'CustomEvent',
  'File',
  'Blob',
  'FormData',
]);

export async function collectComponentMetadata(): Promise<ComponentMetadataResult> {
  const componentFiles = await discoverComponentFiles();
  return collectComponentMetadataFromFiles(componentFiles);
}

export function tagStemFromTagName(tagName: string): string {
  return tagName.endsWith('-box') ? tagName.slice(0, -4) : tagName;
}

/**
 * Classify whether CEM type text is Angular checkable (tier-1/2 envelope).
 * Returns issues for reporting; empty array means checkable.
 */
export function lintAngularCheckType(
  type: ComponentTypeInfo | undefined
): string[] {
  if (!type?.text?.trim()) return ['missing type text'];
  if (type.text.length > MAX_TYPE_TEXT_LENGTH)
    return ['type text exceeds 512 chars'];

  const scan = scanTypeText(type.text);
  if (!scan) return ['type text failed envelope scan'];

  const issues: string[] = [];
  // Every named type needs an exact CEM reference. Platform/default-library types are named
  // through the specification's `global:` package rather than being inferred by consumers.
  const named = scan.identifiers.filter((id) => !TYPE_KEYWORDS.has(id.text));
  const refs = type.references ?? [];

  for (const id of named) {
    const covering = refs.find(
      (ref) =>
        ref.start === id.start &&
        ref.end === id.end &&
        ref.name === id.text &&
        type.text.slice(ref.start, ref.end) === ref.name
    );
    if (!covering) {
      issues.push(`uncovered identifier "${id.text}" at ${id.start}:${id.end}`);
      continue;
    }
    if (!covering.module && covering.package !== 'global:') {
      issues.push(
        `reference "${id.text}" missing module (required; no root package export)`
      );
    }
  }

  for (const ref of refs) {
    if (ref.start === undefined || ref.end === undefined) {
      issues.push(`reference "${ref.name}" missing start/end`);
      continue;
    }
    if (type.text.slice(ref.start, ref.end) !== ref.name) {
      issues.push(`reference "${ref.name}" span mismatch`);
    }
  }

  return issues;
}

/**
 * Collect metadata for an explicit file list (used by golden-fixture tests).
 * Files must be part of the given program roots / tsconfig.
 */
export async function collectComponentMetadataFromFiles(
  filePaths: string[],
  options?: { tsconfigPath?: string }
): Promise<ComponentMetadataResult> {
  const program = createProgram(options?.tsconfigPath, filePaths);
  const checker = program.getTypeChecker();
  const components: ComponentMeta[] = [];
  const bubblingEvents = new Set<string>();
  const warnings: string[] = [];

  for (const filePath of filePaths) {
    const sourceFile = program.getSourceFile(filePath);
    if (!sourceFile) {
      warnings.push(`source file not in program: ${filePath}`);
      continue;
    }
    const tagConstants = extractTagConstants(sourceFile);
    const fileComponents = await extractComponents({
      sourceFile,
      tagConstants,
      sourcePath: filePath,
      checker,
      program,
      warnings,
    });

    for (const component of fileComponents) {
      components.push(component);
      for (const event of component.events) {
        if (event.bubbles) {
          bubblingEvents.add(event.name);
        }
      }
    }
  }

  components.sort((a, b) => a.tagName.localeCompare(b.tagName));

  return {
    components,
    events: Array.from(bubblingEvents).sort((a, b) => a.localeCompare(b)),
    warnings,
  };
}

async function discoverComponentFiles(): Promise<string[]> {
  const directories = await fs.readdir(SRC_ROOT, { withFileTypes: true });
  const componentFiles: string[] = [];

  for (const entry of directories) {
    if (!entry.isDirectory()) continue;
    const directoryPath = path.join(SRC_ROOT, entry.name);
    const files = await fs.readdir(directoryPath, { withFileTypes: true });
    const hasIndexExport = files.some(
      (file) => file.isFile() && file.name === 'index.ts'
    );
    if (!hasIndexExport) continue;

    for (const file of files) {
      if (!file.isFile()) continue;
      if (!file.name.endsWith('.ts')) continue;
      if (file.name === 'index.ts') continue;
      if (EXCLUDED_SUFFIXES.some((suffix) => file.name.endsWith(suffix)))
        continue;
      componentFiles.push(path.join(directoryPath, file.name));
    }
  }

  return componentFiles;
}

function createProgram(
  tsconfigPath = TSCONFIG_PATH,
  extraRootNames: string[] = []
): ts.Program {
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (configFile.error) {
    const message = ts.flattenDiagnosticMessageText(
      configFile.error.messageText,
      '\n'
    );
    throw new Error(`Unable to read tsconfig: ${message}`);
  }

  const parsed = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(tsconfigPath)
  );
  const rootNames = Array.from(
    new Set([...parsed.fileNames, ...extraRootNames])
  );

  return ts.createProgram({
    rootNames,
    options: parsed.options,
  });
}

type ExtractContext = {
  sourceFile: ts.SourceFile;
  tagConstants: Map<string, string>;
  sourcePath: string;
  checker: ts.TypeChecker;
  program: ts.Program;
  warnings: string[];
};

async function extractComponents(
  ctx: ExtractContext
): Promise<ComponentMeta[]> {
  const { sourceFile, tagConstants, sourcePath, checker, warnings } = ctx;
  const components: ComponentMeta[] = [];
  const directoryName = path.basename(path.dirname(sourcePath));
  const modulePath = `${directoryName}.js`;

  for (const statement of sourceFile.statements) {
    if (!ts.isClassDeclaration(statement) || !statement.name) continue;

    const hasCustomElement = readDecorators(statement).some((decorator) =>
      isDecoratorNamed(decorator, 'customElement', sourceFile)
    );
    if (!hasCustomElement) continue;

    const tagName = resolveCustomElementTag(
      statement,
      tagConstants,
      sourceFile
    );
    if (!tagName) {
      warnings.push(
        `${path.relative(SRC_ROOT, sourcePath)}: @customElement on ${
          statement.name.text
        } but tag could not be resolved`
      );
      continue;
    }

    const classDocs = parseClassJsDoc(statement);
    const properties = extractComponentProperties(
      statement,
      sourceFile,
      checker,
      modulePath,
      warnings
    );
    const events = mergeEvents(
      extractDispatchedEvents(
        statement,
        sourceFile,
        checker,
        modulePath,
        warnings
      ),
      classDocs.events,
      warnings,
      statement.name.text
    );
    const slots = mergeNamedItems(
      extractSlots(statement, sourceFile),
      classDocs.slots,
      warnings,
      'slot',
      statement.name.text
    );
    const cssParts = mergeNamedItems(
      extractCssParts(statement, sourceFile),
      classDocs.cssParts,
      warnings,
      'csspart',
      statement.name.text
    );
    const cssProperties = await extractCssProperties(
      sourcePath,
      tagName,
      warnings
    );

    components.push({
      tagName,
      className: statement.name.text,
      sourcePath,
      modulePath,
      directoryName,
      summary: classDocs.summary,
      description: classDocs.description,
      deprecated: classDocs.deprecated,
      properties,
      events,
      slots,
      cssParts,
      cssProperties,
    });
  }

  return components;
}

function extractComponentProperties(
  declaration: ts.ClassDeclaration,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  modulePath: string,
  warnings: string[]
): ComponentProperty[] {
  const properties: ComponentProperty[] = [];
  const setters = new Set<string>();
  const className = declaration.name?.text ?? 'Anonymous';

  for (const member of declaration.members) {
    if (ts.isSetAccessor(member)) {
      const name = getPropertyName(member.name);
      if (name) setters.add(name);
    }
  }

  for (const member of declaration.members) {
    if (ts.isPropertyDeclaration(member)) {
      const property = extractPropertyDeclaration(
        member,
        sourceFile,
        checker,
        modulePath,
        warnings,
        className
      );
      if (property) properties.push(property);
      continue;
    }

    if (ts.isGetAccessor(member)) {
      const name = getPropertyName(member.name);
      if (!name || setters.has(name)) continue;
      if (
        isPrivateOrProtected(member) ||
        name.startsWith('#') ||
        name.startsWith('_')
      )
        continue;

      const decorators = readDecorators(member);
      const propertyDecorator = decorators.find((decorator) =>
        isDecoratorNamed(decorator, 'property', sourceFile)
      );
      const type = resolveMemberType(
        member,
        sourceFile,
        checker,
        modulePath,
        warnings,
        className,
        name
      );
      properties.push({
        propertyName: name,
        attributeName: propertyDecorator
          ? getAttributeName(propertyDecorator, name)
          : undefined,
        type,
        description: getJsDocDescription(member),
        deprecated: getJsDocDeprecated(member),
        readonly: true,
        reflects: propertyDecorator
          ? getReflects(propertyDecorator)
          : undefined,
        privacy: 'public',
      });
    }
  }

  return dedupeProperties(properties);
}

function extractPropertyDeclaration(
  member: ts.PropertyDeclaration,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  modulePath: string,
  warnings: string[],
  className: string
): ComponentProperty | undefined {
  const decorators = readDecorators(member);
  if (!decorators.length) return undefined;

  if (isPrivateOrProtected(member)) return undefined;

  const propertyName = getPropertyName(member.name);
  if (
    !propertyName ||
    propertyName.startsWith('#') ||
    propertyName.startsWith('_')
  ) {
    return undefined;
  }

  const propertyDecorator = decorators.find((decorator) =>
    isDecoratorNamed(decorator, 'property', sourceFile)
  );
  if (!propertyDecorator) return undefined;

  const attributeName = getAttributeName(propertyDecorator, propertyName);
  const reflects = getReflects(propertyDecorator);
  const type = resolveMemberType(
    member,
    sourceFile,
    checker,
    modulePath,
    warnings,
    className,
    propertyName
  );
  const defaultValue = member.initializer
    ? member.initializer.getText(sourceFile)
    : undefined;
  const readonly = member.modifiers?.some(
    (mod) => mod.kind === ts.SyntaxKind.ReadonlyKeyword
  );

  return {
    propertyName,
    attributeName,
    type,
    default: defaultValue,
    description: getJsDocDescription(member),
    deprecated: getJsDocDeprecated(member),
    reflects: reflects || undefined,
    readonly: readonly || undefined,
    privacy: 'public',
  };
}

function resolveMemberType(
  member: ts.PropertyDeclaration | ts.GetAccessorDeclaration,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  modulePath: string,
  warnings: string[],
  className: string,
  propertyName: string
): ComponentTypeInfo | undefined {
  if (member.type) {
    return buildTypeInfoFromNode(
      member.type,
      sourceFile,
      checker,
      modulePath,
      warnings,
      className
    );
  }

  const type = checker.getTypeAtLocation(member);
  const text = checker.typeToString(
    type,
    member,
    ts.TypeFormatFlags.NoTruncation
  );
  if (!text || text.length > MAX_TYPE_TEXT_LENGTH) {
    warnings.push(
      `${className}.${propertyName}: inferred type missing or too long`
    );
    return undefined;
  }

  if (isSelfContainedTypeText(text)) {
    return { text };
  }

  const expanded = checker.typeToString(
    type,
    member,
    ts.TypeFormatFlags.InTypeAlias | ts.TypeFormatFlags.NoTruncation
  );
  if (
    expanded &&
    expanded.length <= MAX_TYPE_TEXT_LENGTH &&
    isSelfContainedTypeText(expanded)
  ) {
    return { text: expanded };
  }

  const aliasOrSymbol = type.aliasSymbol ?? type.getSymbol();
  if (aliasOrSymbol) {
    const name = aliasOrSymbol.getName();
    if (text === name || text.startsWith(name)) {
      const resolved = resolveSymbolReference(
        aliasOrSymbol,
        checker,
        modulePath,
        name,
        0,
        name.length
      );
      if (resolved) {
        return { text: name, references: [resolved] };
      }
    }
  }

  warnings.push(
    `${className}.${propertyName}: un-annotated type "${text}" is not self-contained and could not be referenced or expanded`
  );
  return { text };
}

function buildTypeInfoFromNode(
  typeNode: ts.TypeNode,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  modulePath: string,
  warnings?: string[],
  className?: string
): ComponentTypeInfo {
  const text = typeNode.getText(sourceFile);
  const typeStart = typeNode.getStart(sourceFile);
  const references: TypeReferenceMeta[] = [];
  let mustExpand = false;
  const nodeModulePackages = new Set<string>();

  const visit = (node: ts.Node) => {
    if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName)) {
      const name = node.typeName.text;
      if (TYPE_KEYWORDS.has(name)) {
        node.typeArguments?.forEach(visit);
        return;
      }

      const start = node.typeName.getStart(sourceFile) - typeStart;
      const end = start + name.length;
      const symbol = checker.getSymbolAtLocation(node.typeName);
      const resolved = symbol
        ? resolveSymbolReference(symbol, checker, modulePath, name, start, end)
        : undefined;

      if (resolved) {
        references.push(resolved);
      } else {
        mustExpand = true;
        if (symbol && isNodeModulesSymbol(symbol, checker)) {
          const pkg =
            resolveOwningPackageName(symbolDeclFileName(symbol, checker)) ??
            'unknown';
          nodeModulePackages.add(pkg);
        }
      }
    }
    node.forEachChild(visit);
  };
  visit(typeNode);

  if (
    mustExpand ||
    references.some((ref) => !ref.module && ref.package !== 'global:')
  ) {
    const type = checker.getTypeFromTypeNode(typeNode);
    const expanded = checker.typeToString(
      type,
      typeNode,
      ts.TypeFormatFlags.InTypeAlias | ts.TypeFormatFlags.NoTruncation
    );
    if (
      expanded &&
      expanded.length <= MAX_TYPE_TEXT_LENGTH &&
      isSelfContainedTypeText(expanded)
    ) {
      return { text: expanded };
    }
    if (nodeModulePackages.size && warnings && className) {
      warnings.push(
        `${className}: type "${text}" from node_modules (${[
          ...nodeModulePackages,
        ].join(', ')}) could not be expanded to a self-contained type`
      );
    }
  }

  return references.length ? { text, references } : { text };
}

function symbolDeclFileName(
  symbol: ts.Symbol,
  checker: ts.TypeChecker
): string | undefined {
  let target = symbol;
  if (symbol.flags & ts.SymbolFlags.Alias) {
    try {
      target = checker.getAliasedSymbol(symbol);
    } catch {
      target = symbol;
    }
  }
  return target.getDeclarations()?.[0]?.getSourceFile().fileName;
}

function isNodeModulesSymbol(
  symbol: ts.Symbol,
  checker: ts.TypeChecker
): boolean {
  const fileName = symbolDeclFileName(symbol, checker);
  return !!fileName?.includes('node_modules');
}

function resolveOwningPackageName(
  fileName: string | undefined
): string | undefined {
  if (!fileName || !fileName.includes('node_modules')) return undefined;
  let dir = path.dirname(fileName);
  while (dir && dir !== path.dirname(dir)) {
    const pkgPath = path.join(dir, 'package.json');
    if (fsSync.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fsSync.readFileSync(pkgPath, 'utf-8')) as {
          name?: string;
        };
        if (pkg.name) return pkg.name;
      } catch {
        // continue walking
      }
    }
    dir = path.dirname(dir);
  }
  return undefined;
}

function resolveSymbolReference(
  symbol: ts.Symbol,
  checker: ts.TypeChecker,
  modulePath: string,
  name: string,
  start: number,
  end: number
): TypeReferenceMeta | undefined {
  let target = symbol;
  if (symbol.flags & ts.SymbolFlags.Alias) {
    try {
      target = checker.getAliasedSymbol(symbol);
    } catch {
      target = symbol;
    }
  }

  if (isGlobalSymbol(target)) {
    return { name, package: 'global:', start, end };
  }

  const declFile = target.getDeclarations()?.[0]?.getSourceFile();
  if (declFile?.fileName.includes('node_modules')) {
    // Force expansion — package-only refs aren't Angular-checkable without a module path.
    return undefined;
  }

  if (isExportedSymbol(target, checker)) {
    if (declFile) {
      const dir = path.basename(path.dirname(declFile.fileName));
      return { name, module: `${dir}.js`, start, end };
    }
    return { name, module: modulePath, start, end };
  }

  // Unexported — caller expands
  return undefined;
}

function isGlobalSymbol(symbol: ts.Symbol): boolean {
  const declarations = symbol.getDeclarations() ?? [];
  if (!declarations.length) {
    return (
      SAFE_GLOBALS.has(symbol.getName()) || TYPE_KEYWORDS.has(symbol.getName())
    );
  }
  return declarations.some((declaration) => {
    const file = declaration.getSourceFile();
    return (
      file.isDeclarationFile &&
      (file.fileName.includes('lib.dom') ||
        file.fileName.includes('typescript/lib'))
    );
  });
}

function isExportedSymbol(symbol: ts.Symbol, checker: ts.TypeChecker): boolean {
  if (symbol.flags & ts.SymbolFlags.Alias) return true;
  const declarations = symbol.getDeclarations() ?? [];
  for (const declaration of declarations) {
    if (ts.canHaveModifiers(declaration)) {
      const mods = ts.getModifiers(declaration);
      if (mods?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword)) {
        return true;
      }
    }
    // export { Foo } / export type { Foo }
    if (declaration.parent && ts.isExportSpecifier(declaration.parent)) {
      return true;
    }
  }

  // Check module exports of containing source file
  const decl = declarations[0];
  if (!decl) return false;
  const sourceFile = decl.getSourceFile();
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) return false;
  const exported = checker.getExportsOfModule(moduleSymbol);
  return exported.some(
    (item) =>
      item.escapedName === symbol.escapedName ||
      item.getName() === symbol.getName()
  );
}

function extractDispatchedEvents(
  declaration: ts.ClassDeclaration,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  modulePath: string,
  warnings: string[]
): ComponentEvent[] {
  const events = new Map<string, ComponentEvent>();
  const className = declaration.name?.text ?? 'Anonymous';

  function visit(node: ts.Node) {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'dispatchEvent' &&
      node.arguments[0]
    ) {
      const eventArg = node.arguments[0];
      const extracted = extractEventFromExpression(
        eventArg,
        sourceFile,
        checker,
        modulePath
      );
      if (extracted) {
        const existing = events.get(extracted.name);
        if (existing) {
          const typeChanged = existing.type.text !== extracted.type.text;
          const bubblesChanged = !!existing.bubbles !== !!extracted.bubbles;
          const composedChanged = !!existing.composed !== !!extracted.composed;
          if (typeChanged || bubblesChanged || composedChanged) {
            warnings.push(
              `${className}: event "${extracted.name}" dispatched multiple times with conflicting type/bubbles/composed; keeping bubbling-preferred merge`
            );
          }
          if (!existing.bubbles && extracted.bubbles) {
            events.set(extracted.name, extracted);
          }
        } else {
          events.set(extracted.name, extracted);
        }
      } else {
        const { line } = sourceFile.getLineAndCharacterOfPosition(
          node.getStart(sourceFile)
        );
        warnings.push(
          `${className}: dispatchEvent argument is not an inline \`new\` expression (line ${
            line + 1
          }); event may be missing from CEM`
        );
      }
    }
    node.forEachChild(visit);
  }

  declaration.forEachChild(visit);
  return Array.from(events.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

function extractEventFromExpression(
  expression: ts.Expression,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  modulePath: string
): ComponentEvent | undefined {
  if (!ts.isNewExpression(expression)) return undefined;
  if (!ts.isIdentifier(expression.expression)) return undefined;

  const ctorName = expression.expression.text;
  const [nameArg, optionsArg] = expression.arguments ?? [];

  if (ctorName === 'CustomEvent' || ctorName === 'Event') {
    if (!nameArg || !ts.isStringLiteralLike(nameArg)) return undefined;

    const eventName = nameArg.text;
    const bubbles =
      optionsArg && ts.isObjectLiteralExpression(optionsArg)
        ? hasBooleanOption(optionsArg, 'bubbles')
        : false;
    const composed =
      optionsArg && ts.isObjectLiteralExpression(optionsArg)
        ? hasBooleanOption(optionsArg, 'composed')
        : false;

    let typeInfo: ComponentTypeInfo;
    if (ctorName === 'CustomEvent') {
      typeInfo = buildCustomEventType(
        expression,
        optionsArg,
        sourceFile,
        checker,
        modulePath
      );
    } else {
      typeInfo = globalTypeInfo('Event');
    }

    return {
      name: eventName,
      type: typeInfo,
      bubbles: bubbles || undefined,
      composed: composed || undefined,
      description: undefined,
      deprecated: undefined,
    };
  }

  // Custom Event subclass — resolve name from constructor `super('name', …)` when possible.
  const symbol = checker.getSymbolAtLocation(expression.expression);
  const eventName =
    (nameArg && ts.isStringLiteralLike(nameArg) ? nameArg.text : undefined) ??
    resolveEventNameFromSubclass(symbol, checker);
  if (!eventName) return undefined;

  const bubbles =
    optionsArg && ts.isObjectLiteralExpression(optionsArg)
      ? hasBooleanOption(optionsArg, 'bubbles')
      : undefined;
  const composed =
    optionsArg && ts.isObjectLiteralExpression(optionsArg)
      ? hasBooleanOption(optionsArg, 'composed')
      : undefined;

  let typeInfo: ComponentTypeInfo;
  if (symbol && isExportedSymbol(symbol, checker)) {
    typeInfo = {
      text: ctorName,
      references: [
        { name: ctorName, module: modulePath, start: 0, end: ctorName.length },
      ],
    };
  } else {
    typeInfo = globalTypeInfo('Event');
  }

  return {
    name: eventName,
    type: typeInfo,
    bubbles: bubbles || undefined,
    composed: composed || undefined,
    description: undefined,
    deprecated: undefined,
  };
}

function resolveEventNameFromSubclass(
  symbol: ts.Symbol | undefined,
  checker: ts.TypeChecker
): string | undefined {
  if (!symbol) return undefined;
  let target = symbol;
  if (symbol.flags & ts.SymbolFlags.Alias) {
    try {
      target = checker.getAliasedSymbol(symbol);
    } catch {
      target = symbol;
    }
  }

  const declaration = target.getDeclarations()?.find(ts.isClassDeclaration);
  if (!declaration) return undefined;

  let eventName: string | undefined;
  const visit = (node: ts.Node) => {
    if (eventName) return;
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.SuperKeyword &&
      node.arguments[0] &&
      ts.isStringLiteralLike(node.arguments[0])
    ) {
      eventName = node.arguments[0].text;
      return;
    }
    node.forEachChild(visit);
  };
  declaration.forEachChild(visit);
  return eventName;
}

function buildCustomEventType(
  expression: ts.NewExpression,
  optionsArg: ts.Expression | undefined,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  modulePath: string
): ComponentTypeInfo {
  const customEventReference = globalTypeReference('CustomEvent', 0);

  if (expression.typeArguments?.[0]) {
    const detailNode = expression.typeArguments[0];
    const detailInfo = buildTypeInfoFromNode(
      detailNode,
      sourceFile,
      checker,
      modulePath
    );
    const prefix = 'CustomEvent<';
    const text = `${prefix}${detailInfo.text}>`;
    const references = (detailInfo.references ?? []).map((ref) => ({
      ...ref,
      start: ref.start + prefix.length,
      end: ref.end + prefix.length,
    }));
    return { text, references: [customEventReference, ...references] };
  }

  if (optionsArg && ts.isObjectLiteralExpression(optionsArg)) {
    for (const prop of optionsArg.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const name = getPropertyName(prop.name);
      if (name !== 'detail') continue;
      const detailType = checker.getTypeAtLocation(prop.initializer);
      const detailText = checker.typeToString(
        detailType,
        prop.initializer,
        ts.TypeFormatFlags.NoTruncation
      );
      if (
        detailText &&
        detailText !== 'any' &&
        detailText.length <= MAX_TYPE_TEXT_LENGTH
      ) {
        if (isSelfContainedTypeText(detailText)) {
          return {
            text: `CustomEvent<${detailText}>`,
            references: [customEventReference],
          };
        }
      }
    }
  }

  return globalTypeInfo('CustomEvent');
}

function globalTypeReference(name: string, start: number): TypeReferenceMeta {
  return {
    name,
    package: 'global:',
    start,
    end: start + name.length,
  };
}

function globalTypeInfo(name: string): ComponentTypeInfo {
  return {
    text: name,
    references: [globalTypeReference(name, 0)],
  };
}

function extractSlots(
  declaration: ts.ClassDeclaration,
  sourceFile: ts.SourceFile
): ComponentSlot[] {
  const slots = new Map<string, ComponentSlot>();

  function visit(node: ts.Node) {
    if (
      ts.isTaggedTemplateExpression(node) &&
      ts.isIdentifier(node.tag) &&
      node.tag.text === 'html'
    ) {
      for (const name of extractSlotNamesFromTemplate(
        node.template.getText(sourceFile)
      )) {
        slots.set(name, { name });
      }
    }
    node.forEachChild(visit);
  }

  declaration.forEachChild(visit);
  return Array.from(slots.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

function extractCssParts(
  declaration: ts.ClassDeclaration,
  sourceFile: ts.SourceFile
): ComponentCssPart[] {
  const parts = new Map<string, ComponentCssPart>();

  function visit(node: ts.Node) {
    if (
      ts.isTaggedTemplateExpression(node) &&
      ts.isIdentifier(node.tag) &&
      node.tag.text === 'html'
    ) {
      for (const name of extractPartNamesFromTemplate(
        node.template.getText(sourceFile)
      )) {
        parts.set(name, { name });
      }
    }
    node.forEachChild(visit);
  }

  declaration.forEachChild(visit);
  return Array.from(parts.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

function extractSlotNamesFromTemplate(templateText: string): string[] {
  const names: string[] = [];
  const slotRegex = /<slot\b([^>]*)>/gi;
  let match: RegExpExecArray | null;
  while ((match = slotRegex.exec(templateText)) !== null) {
    const attrs = match[1] ?? '';
    if (/\bname\s*=\s*\$\{/.test(attrs)) {
      continue; // dynamic — rely on JSDoc
    }
    const nameMatch = /\bname\s*=\s*(?:\{)?["'`]([^"'`]+)["'`](?:\})?/.exec(
      attrs
    );
    names.push(nameMatch ? nameMatch[1] : '');
  }
  return names;
}

function extractPartNamesFromTemplate(templateText: string): string[] {
  const names: string[] = [];
  const partRegex = /\bpart\s*=\s*(?:\$\{)?["'`]([^"'`]+)["'`]/g;
  let match: RegExpExecArray | null;
  while ((match = partRegex.exec(templateText)) !== null) {
    if (match[0].includes('${')) continue;
    for (const part of match[1].trim().split(/\s+/)) {
      if (part) names.push(part);
    }
  }
  return names;
}

async function extractCssProperties(
  sourcePath: string,
  tagName: string,
  warnings: string[]
): Promise<ComponentCssProperty[]> {
  const hostPath = sourcePath.replace(/\.ts$/, '.host.scss');
  let contents: string;
  try {
    contents = await fs.readFile(hostPath, 'utf-8');
  } catch {
    return [];
  }

  const hostBlock = extractPrimaryHostBlock(contents);
  if (!hostBlock) return [];

  const stem = tagStemFromTagName(tagName);
  const props: ComponentCssProperty[] = [];
  const seen = new Set<string>();
  const lines = hostBlock.split('\n');
  let pendingComment: string | undefined;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    const blockComment = trimmed.match(/^\/\*\*?([\s\S]*?)\*\/$/);
    if (blockComment && !trimmed.includes('\n') && !/--[a-z]/.test(trimmed)) {
      pendingComment = cleanComment(blockComment[1]);
      continue;
    }

    if (
      trimmed.startsWith('/**') ||
      (trimmed.startsWith('/*') && !trimmed.endsWith('*/'))
    ) {
      const commentLines = [trimmed];
      while (
        i + 1 < lines.length &&
        !commentLines[commentLines.length - 1].includes('*/')
      ) {
        i += 1;
        commentLines.push(lines[i].trim());
      }
      pendingComment = cleanComment(
        commentLines
          .join('\n')
          .replace(/^\/\*\*?/, '')
          .replace(/\*\/$/, '')
      );
      continue;
    }

    const customPropMatch = trimmed.match(/^--([a-z0-9-]+)\s*:\s*(.+)$/);
    if (customPropMatch) {
      const name = `--${customPropMatch[1]}`;
      if (matchesStem(customPropMatch[1], stem) && !seen.has(name)) {
        const valueLines = [customPropMatch[2]];
        while (
          hasUnclosedCssValue(valueLines.join('\n')) &&
          i + 1 < lines.length
        ) {
          i += 1;
          valueLines.push(lines[i].trim());
        }
        seen.add(name);
        props.push({
          name,
          description: pendingComment,
          default: valueLines.join(' ').replace(/;$/, '').trim(),
        });
      }
      pendingComment = undefined;
      continue;
    }

    const mixinMatch = trimmed.match(
      /@include\s+theme\.custom-property\(\s*['"]([a-z0-9-]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/
    );
    if (mixinMatch) {
      const propName = mixinMatch[1];
      const name = `--${propName}`;
      if (matchesStem(propName, stem) && !seen.has(name)) {
        seen.add(name);
        props.push({
          name,
          description: pendingComment,
          default: `var(--${mixinMatch[2]})`,
        });
      }
      pendingComment = undefined;
      continue;
    }

    if (trimmed && !trimmed.startsWith('//')) {
      pendingComment = undefined;
    }
  }

  warnStemPropsOutsidePrimaryHost(
    contents,
    hostBlock,
    stem,
    tagName,
    seen,
    warnings
  );

  return props.sort((a, b) => a.name.localeCompare(b.name));
}

function hasUnclosedCssValue(value: string): boolean {
  const closers = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
  ]);
  const stack: string[] = [];
  let quote: "'" | '"' | undefined;
  let escaped = false;

  for (const character of value) {
    if (escaped) {
      escaped = false;
      continue;
    }
    if (character === '\\') {
      escaped = true;
      continue;
    }
    if (quote) {
      if (character === quote) {
        quote = undefined;
      }
      continue;
    }
    if (character === "'" || character === '"') {
      quote = character;
      continue;
    }
    const closer = closers.get(character);
    if (closer !== undefined) {
      stack.push(closer);
      continue;
    }
    if (stack.at(-1) === character) {
      stack.pop();
    }
  }

  return quote !== undefined || stack.length > 0;
}

function warnStemPropsOutsidePrimaryHost(
  contents: string,
  hostBlock: string,
  stem: string,
  tagName: string,
  declaredInPrimary: Set<string>,
  warnings: string[]
) {
  // Remove only the primary :host body so variant/media blocks remain searchable.
  const outside = contents.replace(hostBlock, '');
  const propRegex = /--([a-z0-9-]+)\s*:/g;
  let match: RegExpExecArray | null;
  const warned = new Set<string>();
  while ((match = propRegex.exec(outside)) !== null) {
    const propWithoutDashes = match[1];
    if (!matchesStem(propWithoutDashes, stem)) continue;
    const name = `--${propWithoutDashes}`;
    // Overrides of props already declared in the base :host block are fine.
    if (declaredInPrimary.has(name) || warned.has(name)) continue;
    warned.add(name);
    warnings.push(
      `${tagName}: CSS custom property ${name} appears outside the primary :host block; public API props must be declared in the base :host block`
    );
  }
}

function matchesStem(propWithoutDashes: string, stem: string): boolean {
  return propWithoutDashes === stem || propWithoutDashes.startsWith(`${stem}-`);
}

function extractPrimaryHostBlock(contents: string): string | undefined {
  const match = contents.match(/:host\s*\{/);
  if (!match || match.index === undefined) return undefined;

  const start = match.index + match[0].length;
  let depth = 1;
  let i = start;
  while (i < contents.length && depth > 0) {
    const ch = contents[i];
    if (ch === '{') depth += 1;
    else if (ch === '}') depth -= 1;
    i += 1;
  }

  return contents.slice(start, i - 1);
}

function cleanComment(raw: string): string {
  return raw
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, '').trim())
    .filter(Boolean)
    .join(' ')
    .trim();
}

type ClassJsDoc = {
  summary?: string;
  description?: string;
  deprecated?: boolean | string;
  slots: Map<string, string>;
  cssParts: Map<string, string>;
  events: Map<string, string>;
};

function parseClassJsDoc(declaration: ts.ClassDeclaration): ClassJsDoc {
  const result: ClassJsDoc = {
    slots: new Map(),
    cssParts: new Map(),
    events: new Map(),
  };

  for (const entry of ts.getJSDocCommentsAndTags(declaration)) {
    if (!ts.isJSDoc(entry)) continue;

    const comment =
      typeof entry.comment === 'string'
        ? entry.comment
        : getJsDocCommentText(entry.comment);
    if (comment?.trim()) {
      const trimmed = comment.trim();
      const paragraphs = trimmed.split(/\n\s*\n/);
      result.summary = paragraphs[0]?.trim();
      // Always populate description with the full comment; consumers often read description first.
      result.description = trimmed;
    }

    for (const tag of entry.tags ?? []) {
      applyJsDocTag(tag, result);
    }
  }

  const deprecated = getJsDocDeprecated(declaration);
  if (deprecated !== undefined) {
    result.deprecated = deprecated;
  }

  return result;
}

function applyJsDocTag(tag: ts.JSDocTag, result: ClassJsDoc) {
  const tagName = tag.tagName.text;
  const text =
    typeof tag.comment === 'string'
      ? tag.comment
      : getJsDocCommentText(tag.comment);

  if (tagName === 'deprecated') {
    result.deprecated = text?.trim() || true;
    return;
  }

  if (!text) return;

  if (tagName === 'slot') {
    const parsed = parseNamedTag(text);
    result.slots.set(parsed.name, parsed.description);
  } else if (tagName === 'csspart') {
    const parsed = parseNamedTag(text);
    if (parsed.name) {
      result.cssParts.set(parsed.name, parsed.description);
    }
  } else if (tagName === 'fires' || tagName === 'event') {
    const parsed = parseNamedTag(text);
    if (parsed.name) {
      result.events.set(parsed.name, parsed.description);
    }
  }
}

function parseNamedTag(text: string): { name: string; description: string } {
  const trimmed = text.trim();
  if (trimmed.startsWith('-')) {
    return { name: '', description: trimmed.replace(/^-+\s*/, '').trim() };
  }
  const dashMatch = /^(\S+)\s+-\s+([\s\S]+)$/.exec(trimmed);
  if (dashMatch) {
    return { name: dashMatch[1], description: dashMatch[2].trim() };
  }
  const spaceMatch = /^(\S+)\s+([\s\S]+)$/.exec(trimmed);
  if (spaceMatch) {
    return { name: spaceMatch[1], description: spaceMatch[2].trim() };
  }
  return { name: trimmed, description: '' };
}

function getJsDocCommentText(
  comment: string | ts.NodeArray<ts.JSDocComment> | undefined
): string | undefined {
  if (!comment) return undefined;
  if (typeof comment === 'string') return comment;
  return comment.map((part) => ('text' in part ? part.text : '')).join('');
}

function getJsDocDescription(node: ts.Node): string | undefined {
  const tags = ts.getJSDocCommentsAndTags(node);
  for (const entry of tags) {
    if (ts.isJSDoc(entry)) {
      const text =
        typeof entry.comment === 'string'
          ? entry.comment
          : getJsDocCommentText(entry.comment);
      if (text?.trim()) return text.trim();
    }
  }
  return undefined;
}

function getJsDocDeprecated(node: ts.Node): boolean | string | undefined {
  for (const tag of ts.getJSDocTags(node)) {
    if (tag.tagName.text === 'deprecated') {
      const text =
        typeof tag.comment === 'string'
          ? tag.comment
          : getJsDocCommentText(tag.comment);
      return text?.trim() || true;
    }
  }
  return undefined;
}

function mergeEvents(
  fromAst: ComponentEvent[],
  fromDocs: Map<string, string>,
  warnings: string[],
  className: string
): ComponentEvent[] {
  const map = new Map<string, ComponentEvent>();
  for (const event of fromAst) {
    const docDescription = fromDocs.get(event.name);
    map.set(event.name, {
      ...event,
      description: docDescription ?? event.description,
    });
  }

  for (const [name] of fromDocs) {
    if (!map.has(name)) {
      warnings.push(
        `${className}: @fires ${name} has no matching dispatchEvent in AST`
      );
    }
  }

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function mergeNamedItems<T extends { name: string; description?: string }>(
  fromAst: T[],
  fromDocs: Map<string, string>,
  warnings: string[],
  kind: 'slot' | 'csspart',
  className: string
): T[] {
  const map = new Map<string, T>();
  for (const item of fromAst) {
    map.set(item.name, {
      ...item,
      description: fromDocs.get(item.name) ?? item.description,
    });
  }

  for (const [name, description] of fromDocs) {
    if (!map.has(name)) {
      // JSDoc-only additions allowed for slots/parts
      map.set(name, { name, description } as T);
      warnings.push(
        `${className}: @${kind} ${
          name || '(default)'
        } added from JSDoc only (not found in template AST)`
      );
    }
  }

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function hasBooleanOption(
  node: ts.ObjectLiteralExpression,
  key: string
): boolean {
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = getPropertyName(prop.name);
    if (name !== key) continue;
    return prop.initializer.kind === ts.SyntaxKind.TrueKeyword;
  }
  return false;
}

function dedupeProperties(
  properties: ComponentProperty[]
): ComponentProperty[] {
  const map = new Map<string, ComponentProperty>();
  for (const property of properties) {
    map.set(property.propertyName, property);
  }
  return Array.from(map.values()).sort((a, b) =>
    a.propertyName.localeCompare(b.propertyName)
  );
}

function extractTagConstants(sourceFile: ts.SourceFile): Map<string, string> {
  const constants = new Map<string, string>();

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.initializer &&
        ts.isStringLiteralLike(declaration.initializer)
      ) {
        constants.set(declaration.name.text, declaration.initializer.text);
      }
    }
  }

  return constants;
}

function resolveCustomElementTag(
  declaration: ts.ClassDeclaration,
  tagConstants: Map<string, string>,
  sourceFile: ts.SourceFile
): string | undefined {
  for (const decorator of readDecorators(declaration)) {
    if (!isDecoratorNamed(decorator, 'customElement', sourceFile)) continue;

    const callExpression = getCallExpression(decorator);
    const [tagArg] = callExpression?.arguments ?? [];
    if (!tagArg) continue;

    if (ts.isStringLiteralLike(tagArg)) {
      return tagArg.text;
    }

    if (ts.isIdentifier(tagArg)) {
      return tagConstants.get(tagArg.text);
    }
  }

  return undefined;
}

function getAttributeName(
  decorator: ts.Decorator,
  fallback: string
): string | undefined {
  const callExpression = getCallExpression(decorator);
  const [optionsArg] = callExpression?.arguments ?? [];
  if (optionsArg && ts.isObjectLiteralExpression(optionsArg)) {
    for (const prop of optionsArg.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const name = getPropertyName(prop.name);
      if (name !== 'attribute') continue;

      if (ts.isStringLiteralLike(prop.initializer)) {
        return prop.initializer.text;
      }

      if (prop.initializer.kind === ts.SyntaxKind.FalseKeyword) {
        return undefined;
      }

      if (prop.initializer.kind === ts.SyntaxKind.TrueKeyword) {
        return toAttributeName(fallback);
      }
    }
  }

  return toAttributeName(fallback);
}

function getReflects(decorator: ts.Decorator): boolean {
  const callExpression = getCallExpression(decorator);
  const [optionsArg] = callExpression?.arguments ?? [];
  if (optionsArg && ts.isObjectLiteralExpression(optionsArg)) {
    for (const prop of optionsArg.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const name = getPropertyName(prop.name);
      if (name !== 'reflect') continue;
      return prop.initializer.kind === ts.SyntaxKind.TrueKeyword;
    }
  }
  return false;
}

function toAttributeName(propertyName: string): string {
  return propertyName.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function getPropertyName(name: ts.PropertyName): string | undefined {
  if (
    ts.isIdentifier(name) ||
    ts.isStringLiteral(name) ||
    ts.isNoSubstitutionTemplateLiteral(name)
  ) {
    return name.text;
  }
  return undefined;
}

function isDecoratorNamed(
  decorator: ts.Decorator,
  expectedName: string,
  sourceFile: ts.SourceFile
): boolean {
  const callExpression = getCallExpression(decorator);
  if (!callExpression) return false;
  const expression = callExpression.expression;
  if (ts.isIdentifier(expression)) {
    return expression.text === expectedName;
  }
  return expression.getText(sourceFile) === expectedName;
}

function getCallExpression(
  decorator: ts.Decorator
): ts.CallExpression | undefined {
  return ts.isCallExpression(decorator.expression)
    ? decorator.expression
    : undefined;
}

function readDecorators(node: ts.Node): readonly ts.Decorator[] {
  if (!ts.canHaveDecorators(node)) {
    return [];
  }
  return ts.getDecorators(node) ?? [];
}

function isPrivateOrProtected(member: ts.HasModifiers): boolean {
  return !!member.modifiers?.some(
    (mod) =>
      mod.kind === ts.SyntaxKind.PrivateKeyword ||
      mod.kind === ts.SyntaxKind.ProtectedKeyword
  );
}

function isSelfContainedTypeText(text: string): boolean {
  const scan = scanTypeText(text);
  if (!scan) return false;
  return scan.identifiers.every((id) => TYPE_KEYWORDS.has(id.text));
}

type ScanResult = {
  identifiers: Array<{ text: string; start: number; end: number }>;
};

function scanTypeText(text: string): ScanResult | null {
  const identifiers: ScanResult['identifiers'] = [];
  let i = 0;
  let inSingle = false;
  let inDouble = false;

  while (i < text.length) {
    const ch = text[i];

    if (inSingle) {
      if (ch === "'") inSingle = false;
      else if (ch === '\\') return null;
      i += 1;
      continue;
    }
    if (inDouble) {
      if (ch === '"') inDouble = false;
      else if (ch === '\\') return null;
      i += 1;
      continue;
    }

    if (ch === "'") {
      inSingle = true;
      i += 1;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      i += 1;
      continue;
    }

    if (/[A-Za-z_$]/.test(ch)) {
      const start = i;
      i += 1;
      while (i < text.length && /[A-Za-z0-9_$]/.test(text[i])) i += 1;
      // Reject qualified names Foo.Bar
      if (text[i] === '.') return null;

      // Skip property / parameter names: Ident [?]? :
      let j = i;
      while (j < text.length && /\s/.test(text[j])) j += 1;
      if (text[j] === '?') {
        j += 1;
        while (j < text.length && /\s/.test(text[j])) j += 1;
      }
      const isNameBeforeColon = text[j] === ':';
      if (!isNameBeforeColon) {
        identifiers.push({ text: text.slice(start, i), start, end: i });
      }
      continue;
    }

    if (/\s/.test(ch)) {
      i += 1;
      continue;
    }

    if ('[](){}<>|&?,:'.includes(ch)) {
      i += 1;
      continue;
    }

    // Reject suspicious punctuation
    return null;
  }

  if (inSingle || inDouble) return null;
  return { identifiers };
}
