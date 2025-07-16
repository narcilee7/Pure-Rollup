import type { Node as AcornNode } from 'acorn';
import type { Program } from 'estree';

// 基础AST节点类型
export interface BaseNode {
  type: string;
  start: number;
  end: number;
  loc?: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  };
}

// 扩展的AST节点类型
export interface RollupASTNode extends BaseNode {
  // Rollup特有属性
  included?: boolean;
  rendered?: boolean;
  
  // 作用域信息
  scope?: Scope;
  
  // 源映射信息
  source?: string;
  
  // 父节点引用
  parent?: RollupASTNode;
  
  // 子节点
  children?: RollupASTNode[];
}

// 程序根节点
export interface RollupProgram extends RollupASTNode {
  type: 'Program';
  body: RollupASTNode[];
  sourceType: 'module' | 'script';
}

// 导入声明
export interface ImportDeclaration extends RollupASTNode {
  type: 'ImportDeclaration';
  specifiers: ImportSpecifier[];
}

// 导入说明符
export interface ImportSpecifier extends RollupASTNode {
  type: 'ImportSpecifier' | 'ImportDefaultSpecifier' | 'ImportNamespaceSpecifier';
  local: Identifier;
  imported?: Identifier;
}

// 导出声明
export interface ExportDeclaration extends RollupASTNode {
  type: 'ExportNamedDeclaration' | 'ExportDefaultDeclaration' | 'ExportAllDeclaration';
  declaration?: RollupASTNode;
  specifiers?: ExportSpecifier[];
}

// 导出说明符
export interface ExportSpecifier extends RollupASTNode {
  type: 'ExportSpecifier';
  local: Identifier;
  exported: Identifier;
}

// 标识符
export interface Identifier extends RollupASTNode {
  type: 'Identifier';
  name: string;
}

// 字面量
export interface Literal extends RollupASTNode {
  type: 'Literal';
  value: string | number | boolean | null;
  raw?: string;
}

// 函数声明
export interface FunctionDeclaration extends RollupASTNode {
  type: 'FunctionDeclaration';
  id: Identifier | null;
  params: Pattern[];
  body: BlockStatement;
  async?: boolean;
  generator?: boolean;
}

// 变量声明
export interface VariableDeclaration extends RollupASTNode {
  type: 'VariableDeclaration';
  declarations: VariableDeclarator[];
  kind: 'var' | 'let' | 'const';
}

// 变量声明器
export interface VariableDeclarator extends RollupASTNode {
  type: 'VariableDeclarator';
  id: Pattern;
  init?: RollupASTNode;
}

// 块语句
export interface BlockStatement extends RollupASTNode {
  type: 'BlockStatement';
  body: RollupASTNode[];
}

// 模式（用于解构等）
export interface Pattern extends RollupASTNode {
  // 可以是 Identifier, ObjectPattern, ArrayPattern 等
}

// 作用域信息
export interface Scope {
  type: 'module' | 'function' | 'block' | 'catch';
  parent?: Scope;
  children: Scope[];
  variables: Map<string, Variable>;
  node: RollupASTNode;
}

// 变量信息
export interface Variable {
  name: string;
  kind: 'var' | 'let' | 'const' | 'function' | 'class' | 'import' | 'param';
  node: RollupASTNode;
  scope: Scope;
  references: Reference[];
  isUsed: boolean;
  isExported: boolean;
  isImported: boolean;
  mutated: boolean;
}

// 引用信息
export interface Reference {
  node: RollupASTNode;
  scope: Scope;
  isRead: boolean;
  isWrite: boolean;
}

// AST访问器
export interface ASTVisitor {
  enter?: (node: RollupASTNode, parent?: RollupASTNode) => void;
  leave?: (node: RollupASTNode, parent?: RollupASTNode) => void;
}

// AST遍历选项
export interface WalkOptions {
  enter?: (node: RollupASTNode, parent?: RollupASTNode) => void;
  leave?: (node: RollupASTNode, parent?: RollupASTNode) => void;
  skip?: () => void;
}

// 源映射位置
export interface SourceLocation {
  source: string;
  line: number;
  column: number;
  name?: string;
}

// 魔术字符串（用于代码转换）
export interface MagicString {
  toString(): string;
  append(content: string): MagicString;
  prepend(content: string): MagicString;
  remove(start: number, end: number): MagicString;
  overwrite(start: number, end: number, content: string): MagicString;
  trim(): MagicString;
  generateMap(options?: any): any;
}