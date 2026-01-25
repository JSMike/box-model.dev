import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

export type ComponentProperty = {
  attributeName: string;
  propertyName: string;
};

export type ComponentMeta = {
  tagName: string;
  className: string;
  sourcePath: string;
  properties: ComponentProperty[];
  events: string[];
};

export type ComponentMetadataResult = {
  components: ComponentMeta[];
  events: string[];
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_ROOT = path.resolve(__dirname, '../src');
const TSCONFIG_PATH = path.resolve(__dirname, '../tsconfig.lib.json');
const EXCLUDED_SUFFIXES = ['.spec.ts', '.stories.ts', '.test.ts'];

export async function collectComponentMetadata(): Promise<ComponentMetadataResult> {
  const componentFiles = await discoverComponentFiles();
  const program = createProgram();
  const components: ComponentMeta[] = [];
  const bubblingEvents = new Set<string>();

  for (const filePath of componentFiles) {
    const sourceFile = program.getSourceFile(filePath);
    if (!sourceFile) continue;
    const tagConstants = extractTagConstants(sourceFile);
    const fileComponents = extractComponents(sourceFile, tagConstants, filePath);

    for (const component of fileComponents) {
      components.push(component);
      component.events.forEach((eventName) => bubblingEvents.add(eventName));
    }
  }

  components.sort((a, b) => a.tagName.localeCompare(b.tagName));

  return {
    components,
    events: Array.from(bubblingEvents).sort((a, b) => a.localeCompare(b)),
  };
}

async function discoverComponentFiles(): Promise<string[]> {
  const directories = await fs.readdir(SRC_ROOT, { withFileTypes: true });
  const componentFiles: string[] = [];

  for (const entry of directories) {
    if (!entry.isDirectory()) continue;
    const directoryPath = path.join(SRC_ROOT, entry.name);
    const files = await fs.readdir(directoryPath, { withFileTypes: true });
    const hasIndexExport = files.some((file) => file.isFile() && file.name === 'index.ts');
    if (!hasIndexExport) continue;

    for (const file of files) {
      if (!file.isFile()) continue;
      if (!file.name.endsWith('.ts')) continue;
      if (file.name === 'index.ts') continue;
      if (EXCLUDED_SUFFIXES.some((suffix) => file.name.endsWith(suffix))) continue;
      componentFiles.push(path.join(directoryPath, file.name));
    }
  }

  return componentFiles;
}

function createProgram(): ts.Program {
  const configFile = ts.readConfigFile(TSCONFIG_PATH, ts.sys.readFile);
  if (configFile.error) {
    const message = ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n');
    throw new Error(`Unable to read tsconfig: ${message}`);
  }

  const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(TSCONFIG_PATH));

  return ts.createProgram({
    rootNames: parsed.fileNames,
    options: parsed.options,
  });
}

function extractComponents(
  sourceFile: ts.SourceFile,
  tagConstants: Map<string, string>,
  sourcePath: string
): ComponentMeta[] {
  const components: ComponentMeta[] = [];

  for (const statement of sourceFile.statements) {
    if (!ts.isClassDeclaration(statement) || !statement.name) continue;

    const tagName = resolveCustomElementTag(statement, tagConstants, sourceFile);
    if (!tagName) continue;

    const properties = extractComponentProperties(statement, sourceFile);
    const events = Array.from(extractBubblingEvents(statement, sourceFile)).sort((a, b) =>
      a.localeCompare(b)
    );

    components.push({
      tagName,
      className: statement.name.text,
      sourcePath,
      properties,
      events,
    });
  }

  return components;
}

function extractComponentProperties(
  declaration: ts.ClassDeclaration,
  sourceFile: ts.SourceFile
): ComponentProperty[] {
  const properties: ComponentProperty[] = [];

  for (const member of declaration.members) {
    if (!ts.isPropertyDeclaration(member)) continue;
    const decorators = readDecorators(member);
    if (!decorators.length) continue;

    if (
      member.modifiers?.some(
        (mod) =>
          mod.kind === ts.SyntaxKind.PrivateKeyword || mod.kind === ts.SyntaxKind.ProtectedKeyword
      )
    ) {
      continue;
    }

    const propertyDecorator = decorators.find((decorator) =>
      isDecoratorNamed(decorator, 'property', sourceFile)
    );
    if (!propertyDecorator) continue;

    const propertyName = getPropertyName(member.name, sourceFile);
    if (!propertyName) continue;

    const attributeName = getAttributeName(propertyDecorator, propertyName);
    if (!attributeName) continue;

    properties.push({ attributeName, propertyName });
  }

  return dedupeProperties(properties);
}

function extractBubblingEvents(
  declaration: ts.ClassDeclaration,
  sourceFile: ts.SourceFile
): Set<string> {
  const events = new Set<string>();

  function visit(node: ts.Node) {
    if (
      ts.isNewExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'CustomEvent'
    ) {
      const [eventNameNode, optionsNode] = node.arguments ?? [];
      if (!eventNameNode || !ts.isStringLiteralLike(eventNameNode)) {
        return;
      }

      const bubbles = optionsNode && ts.isObjectLiteralExpression(optionsNode)
        ? hasTrueBubblesOption(optionsNode)
        : false;

      if (bubbles) {
        events.add(eventNameNode.text);
      }
    }

    node.forEachChild(visit);
  }

  declaration.forEachChild(visit);
  return events;
}

function hasTrueBubblesOption(node: ts.ObjectLiteralExpression): boolean {
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = getPropertyName(prop.name, node.getSourceFile());
    if (name !== 'bubbles') continue;
    return prop.initializer.kind === ts.SyntaxKind.TrueKeyword;
  }
  return false;
}

function dedupeProperties(properties: ComponentProperty[]): ComponentProperty[] {
  const map = new Map<string, ComponentProperty>();
  for (const property of properties) {
    map.set(property.attributeName, property);
  }
  return Array.from(map.values()).sort((a, b) => a.attributeName.localeCompare(b.attributeName));
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
  const decorators = readDecorators(declaration);
  if (!decorators.length) {
    return undefined;
  }

  for (const decorator of decorators) {
    if (!isDecoratorNamed(decorator, 'customElement', sourceFile)) {
      continue;
    }

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

function getAttributeName(decorator: ts.Decorator, fallback: string): string | undefined {
  const callExpression = getCallExpression(decorator);
  const [optionsArg] = callExpression?.arguments ?? [];
  if (optionsArg && ts.isObjectLiteralExpression(optionsArg)) {
    for (const prop of optionsArg.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const name = getPropertyName(prop.name, optionsArg.getSourceFile());
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

function toAttributeName(propertyName: string): string {
  return propertyName.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function getPropertyName(name: ts.PropertyName, sourceFile: ts.SourceFile): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name)) {
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

function getCallExpression(decorator: ts.Decorator): ts.CallExpression | undefined {
  return ts.isCallExpression(decorator.expression) ? decorator.expression : undefined;
}

function readDecorators(node: ts.Node): readonly ts.Decorator[] {
  if (!ts.canHaveDecorators(node)) {
    return [];
  }
  return ts.getDecorators(node) ?? [];
}
