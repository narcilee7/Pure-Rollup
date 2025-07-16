import type { RollupASTNode, Scope } from './ast';
import type { TransformResult } from './transform';
import type { CustomPluginOptions } from './plugin';

// 模块类型
export type ModuleType = 'js' | 'ts' | 'json' | 'css' | 'asset' | 'external';

// 模块状态
export type ModuleStatus = 'unloaded' | 'loading' | 'loaded' | 'parsed' | 'analyzed' | 'transformed';

// 模块接口
export interface Module {
  id: string;
  type: ModuleType;
  status: ModuleStatus;
  code: string | null;
  originalCode: string | null;
  ast: RollupASTNode | null;
  scope: Scope | null;
  
  // 依赖关系
  dependencies: Set<string>;
  dynamicDependencies: Set<string>;
  importers: Set<string>;
  dynamicImporters: Set<string>;
  
  // 导入导出
  imports: Map<string, ImportInfo>;
  exports: Map<string, ExportInfo>;
  reexports: Map<string, ReexportInfo>;
  
  // 元数据
  meta: CustomPluginOptions;
  isEntry: boolean;
  isExternal: boolean;
  isIncluded: boolean;
  
  // 副作用
  moduleSideEffects: boolean | 'no-treeshake';
  hasDefaultExport: boolean;
  syntheticNamedExports: boolean | string;
  
  // 转换结果
  transformResult: TransformResult | null;
  
  // 源映射
  sourcemap: any;
  sourcemapChain: any[];
  
  // 缓存
  cacheKey: string;
  
  // 时间戳
  lastModified: number;
  
  // 文件信息
  size: number;
  
  // 方法
  load(): Promise<void>;
  parse(): Promise<void>;
  transform(): Promise<void>;
  analyze(): Promise<void>;
  include(): void;
  exclude(): void;
  addDependency(id: string): void;
  addDynamicDependency(id: string): void;
  addImporter(id: string): void;
  addDynamicImporter(id: string): void;
  getExportedNames(): string[];
  getImportedNames(): string[];
  hasExport(name: string): boolean;
  hasImport(name: string): boolean;
}

// 外部模块
export interface ExternalModule {
  id: string;
  isExternal: true;
  isEntry: boolean;
  isIncluded: boolean;
  
  // 导入导出信息
  importers: Set<string>;
  dynamicImporters: Set<string>;
  
  // 元数据
  meta: CustomPluginOptions;
  moduleSideEffects: boolean | 'no-treeshake';
  syntheticNamedExports: boolean | string;
}

// 导入信息
export interface ImportInfo {
  source: string;
  name: string;
  imported: string;
  isNamespace: boolean;
  isDefault: boolean;
  node: RollupASTNode;
}

// 导出信息
export interface ExportInfo {
  name: string;
  exported: string;
  local: string;
  isDefault: boolean;
  node: RollupASTNode;
}

// 重新导出信息
export interface ReexportInfo {
  source: string;
  name: string;
  imported: string;
  exported: string;
  isNamespace: boolean;
  node: RollupASTNode;
}

// 模块图
export interface ModuleGraph {
  modules: Map<string, Module>;
  externalModules: Map<string, ExternalModule>;
  entryModules: Set<string>;
  
  // 方法
  addModule(module: Module): void;
  getModule(id: string): Module | ExternalModule | undefined;
  hasModule(id: string): boolean;
  removeModule(id: string): void;
  addDependency(from: string, to: string): void;
  addDynamicDependency(from: string, to: string): void;
  getDependencies(id: string): Set<string>;
  getDynamicDependencies(id: string): Set<string>;
  getImporters(id: string): Set<string>;
  getDynamicImporters(id: string): Set<string>;
  getModules(): Module[];
  getExternalModules(): ExternalModule[];
  getEntryModules(): Module[];
  topologicalSort(): Module[];
  findCircularDependencies(): string[][];
  getModuleSize(id: string): number;
  getTotalSize(): number;
  clear(): void;
}

// 模块加载器
export interface ModuleLoader {
  load(id: string): Promise<Module>;
  resolve(id: string, importer?: string): Promise<string | null>;
  transform(module: Module): Promise<void>;
  invalidate(id: string): void;
  getLoadedModules(): Module[];
  clearCache(): void;
}

// 模块解析器
export interface ModuleResolver {
  resolve(id: string, importer?: string, options?: ResolveOptions): Promise<ResolvedModule | null>;
  isExternal(id: string, importer?: string): boolean;
  addAlias(from: string, to: string): void;
  clearCache(): void;
}

// 解析选项
export interface ResolveOptions {
  skipSelf?: boolean;
  custom?: CustomPluginOptions;
}

// 已解析模块
export interface ResolvedModule {
  id: string;
  external: boolean;
  moduleSideEffects: boolean | 'no-treeshake';
  syntheticNamedExports: boolean | string;
  meta: CustomPluginOptions;
}

// 模块依赖
export interface ModuleDependency {
  id: string;
  importer: string;
  isDynamic: boolean;
  isOptional: boolean;
  node: RollupASTNode;
}

// 模块缓存
export interface ModuleCache {
  get(id: string): Module | undefined;
  set(id: string, module: Module): void;
  has(id: string): boolean;
  delete(id: string): void;
  clear(): void;
  size: number;
}

// 模块分析器
export interface ModuleAnalyzer {
  analyze(module: Module): Promise<void>;
  findDependencies(module: Module): string[];
  findExports(module: Module): ExportInfo[];
  findImports(module: Module): ImportInfo[];
  checkSideEffects(module: Module): boolean;
}

// 模块统计
export interface ModuleStats {
  totalModules: number;
  totalSize: number;
  entryModules: number;
  externalModules: number;
  largestModule: {
    id: string;
    size: number;
  };
  dependencies: {
    [moduleId: string]: number;
  };
  buildTime: number;
}

// 模块工厂
export interface ModuleFactory {
  create(id: string, code: string, options?: ModuleOptions): Module;
  createExternal(id: string, options?: ExternalModuleOptions): ExternalModule;
}

// 模块选项
export interface ModuleOptions {
  type?: ModuleType;
  isEntry?: boolean;
  meta?: CustomPluginOptions;
  moduleSideEffects?: boolean | 'no-treeshake';
  syntheticNamedExports?: boolean | string;
}

// 外部模块选项
export interface ExternalModuleOptions {
  isEntry?: boolean;
  meta?: CustomPluginOptions;
  moduleSideEffects?: boolean | 'no-treeshake';
  syntheticNamedExports?: boolean | string;
}