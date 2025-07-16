import { RenderedModule } from './chunk';
import type { Plugin } from './plugin';
import type { WatchOptions } from './watch';

// 输入配置
export interface InputOptions {
  // 输入文件
  input: string | string[] | Record<string, string>;
  
  // 外部依赖
  external?: ExternalOption;
  
  // 插件
  plugins?: Plugin[];
  
  // 输入选项
  context?: string;
  moduleContext?: Record<string, string>;
  
  // 实验性功能
  experimentalCacheExpiry?: number;
  
  // 性能选项
  perf?: boolean;
  
  // 缓存
  cache?: boolean | RollupCache;
  
  // 监听选项
  watch?: WatchOptions;
  
  // 其他选项
  preserveEntrySignatures?: 'strict' | 'allow-extension' | 'exports-only' | false;
  strictDeprecations?: boolean;
  
  // 日志选项
  onwarn?: WarningHandler;
  
  // 树摇选项
  treeshake?: boolean | TreeshakingOptions;
  
  // 最大并行文件数
  maxParallelFileOps?: number;
}

// 输出配置
export interface OutputOptions {
  // 输出文件
  file?: string;
  dir?: string;
  
  // 输出格式
  format?: ModuleFormat;
  
  // 输出名称
  name?: string;
  
  // 全局变量
  globals?: Record<string, string> | ((id: string) => string);
  
  // 源映射
  sourcemap?: boolean | 'inline' | 'hidden';
  sourcemapFile?: string;
  sourcemapPathTransform?: (relativeSourcePath: string, sourcemapPath: string) => string;
  
  // 代码分割
  entryFileNames?: string | ((chunkInfo: PreRenderedChunk) => string);
  chunkFileNames?: string | ((chunkInfo: PreRenderedChunk) => string);
  assetFileNames?: string | ((assetInfo: PreRenderedAsset) => string);
  
  // 输出选项
  banner?: string | (() => string | Promise<string>);
  footer?: string | (() => string | Promise<string>);
  intro?: string | (() => string | Promise<string>);
  outro?: string | (() => string | Promise<string>);
  
  // 压缩选项
  compact?: boolean;
  
  // 其他选项
  extend?: boolean;
  esModule?: boolean;
  exports?: 'default' | 'named' | 'none' | 'auto';
  externalLiveBindings?: boolean;
  freeze?: boolean;
  indent?: string | boolean;
  namespaceToStringTag?: boolean;
  noConflict?: boolean;
  prefer?: 'default' | 'named';
  strict?: boolean;
  
  // 插件钩子
  plugins?: Plugin[];
  
  // 输出插件
  manualChunks?: Record<string, string[]> | ((id: string) => string | undefined);
  
  // 动态导入
  dynamicImportFunction?: string;
  
  // 保留模块
  preserveModules?: boolean;
  preserveModulesRoot?: string;
  
  // 交互式
  interop?: boolean | 'auto' | 'esModule' | 'default' | 'defaultOnly';
  
  // 验证
  validate?: boolean;
}

// 完整配置
export interface RollupOptions extends InputOptions {
  output?: OutputOptions | OutputOptions[];
}

// 标准化配置
export interface NormalizedInputOptions extends InputOptions {
  input: string[];
  plugins: Plugin[];
  external: ExternalFunction;
  treeshake: TreeshakingOptions;
  context: string;
  moduleContext: Record<string, string>;
  preserveEntrySignatures: 'strict' | 'allow-extension' | 'exports-only' | false;
  strictDeprecations: boolean;
  onwarn: WarningHandler;
  cache: RollupCache | false;
  perf: boolean;
  maxParallelFileOps: number;
}

export interface NormalizedOutputOptions extends OutputOptions {
  format: ModuleFormat;
  exports: 'default' | 'named' | 'none' | 'auto';
  compact: boolean;
  extend: boolean;
  esModule: boolean;
  externalLiveBindings: boolean;
  freeze: boolean;
  indent: string;
  namespaceToStringTag: boolean;
  noConflict: boolean;
  strict: boolean;
  interop: 'auto' | 'esModule' | 'default' | 'defaultOnly';
  sourcemap: boolean | 'inline' | 'hidden';
  entryFileNames: string | ((chunkInfo: PreRenderedChunk) => string);
  chunkFileNames: string | ((chunkInfo: PreRenderedChunk) => string);
  assetFileNames: string | ((assetInfo: PreRenderedAsset) => string);
  plugins: Plugin[];
  dynamicImportFunction: string;
  preserveModules: boolean;
  validate: boolean;
}

// 模块格式
export type ModuleFormat = 'es' | 'cjs' | 'amd' | 'umd' | 'iife' | 'system';

// 外部依赖选项
export type ExternalOption = 
  | string[] 
  | string 
  | RegExp 
  | ((id: string, importer?: string, isResolved?: boolean) => boolean)
  | (string | RegExp | ((id: string, importer?: string, isResolved?: boolean) => boolean))[];

export type ExternalFunction = (id: string, importer?: string, isResolved?: boolean) => boolean;

// 树摇选项
export interface TreeshakingOptions {
  annotations?: boolean;
  moduleSideEffects?: boolean | 'no-external' | string[] | ((id: string, external: boolean) => boolean);
  propertyReadSideEffects?: boolean;
  tryCatchDeoptimization?: boolean;
  unknownGlobalSideEffects?: boolean;
  correctVarValueBeforeDeclaration?: boolean;
  manualPureFunctions?: string[];
  preset?: 'smallest' | 'safest' | 'recommended';
}

// 警告处理
export type WarningHandler = (warning: RollupWarning) => void;

// 警告信息
export interface RollupWarning {
  code?: string;
  message: string;
  frame?: string;
  loc?: {
    file?: string;
    line: number;
    column: number;
  };
  pos?: number;
  plugin?: string;
  pluginCode?: string;
  hook?: string;
  id?: string;
  url?: string;
  toString(): string;
}

// 缓存
export interface RollupCache {
  modules: ModuleRecord[];
  plugins: Record<string, any>;
}

export interface ModuleRecord {
  id: string;
  code: string;
  originalCode: string;
  originalSourcemap: any;
  ast: any;
  sourcemapChain: any[];
  resolvedIds: Record<string, string>;
  transformFiles: string[];
  dependencies: string[];
  dynamicDependencies: string[];
}

// 预渲染块信息
export interface PreRenderedChunk {
  dynamicImports: string[];
  exports: string[];
  facadeModuleId: string | null;
  isDynamicEntry: boolean;
  isEntry: boolean;
  isImplicitEntry: boolean;
  modules: Record<string, RenderedModule>;
  name: string;
  type: 'chunk';
}

// 预渲染资源信息
export interface PreRenderedAsset {
  name?: string;
  source: string | Uint8Array;
  type: 'asset';
}

// 配置加载器
export interface ConfigLoaderOptions {
  configFile?: string;
  silent?: boolean;
  clearScreen?: boolean;
}

// 默认配置
export const DEFAULT_INPUT_OPTIONS: Partial<NormalizedInputOptions> = {
  context: 'undefined',
  moduleContext: {},
  preserveEntrySignatures: 'exports-only',
  strictDeprecations: false,
  cache: false,
  perf: false,
  maxParallelFileOps: 20,
};

export const DEFAULT_OUTPUT_OPTIONS: Partial<NormalizedOutputOptions> = {
  format: 'es',
  exports: 'auto',
  compact: false,
  extend: false,
  esModule: true,
  externalLiveBindings: true,
  freeze: true,
  indent: '  ',
  namespaceToStringTag: false,
  noConflict: false,
  strict: true,
  interop: 'auto',
  sourcemap: false,
  entryFileNames: '[name].js',
  chunkFileNames: '[name]-[hash].js',
  assetFileNames: '[name]-[hash][extname]',
  dynamicImportFunction: 'import',
  preserveModules: false,
  validate: false,
};