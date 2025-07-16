import type { NormalizedInputOptions, NormalizedOutputOptions, RollupWarning } from './config';
import type { TransformResult } from './transform';
import type { RenderedChunk, OutputBundle } from './bundle';
import type { RollupASTNode } from './ast';
import { ResolveOptions } from './module';

// 插件接口
export interface Plugin {
  name: string;
  
  // 构建钩子 (Build Hooks)
  buildStart?(options: NormalizedInputOptions): Promise<void> | void;
  buildEnd?(error?: Error): Promise<void> | void;
  
  // 解析钩子 (Resolution Hooks)
  resolveId?(
    id: string,
    importer?: string,
    options?: ResolveIdOptions
  ): Promise<ResolveIdResult> | ResolveIdResult;
  
  // 加载钩子 (Load Hooks)
  load?(id: string): Promise<LoadResult> | LoadResult;
  
  // 转换钩子 (Transform Hooks)
  transform?(
    code: string,
    id: string
  ): Promise<TransformResult> | TransformResult;
  
  // 模块解析钩子
  moduleParsed?(moduleInfo: ModuleInfo): Promise<void> | void;
  
  // 生成钩子 (Generate Hooks)
  renderStart?(
    outputOptions: NormalizedOutputOptions,
    inputOptions: NormalizedInputOptions
  ): Promise<void> | void;
  
  banner?(chunk: RenderedChunk): Promise<string> | string;
  footer?(chunk: RenderedChunk): Promise<string> | string;
  intro?(chunk: RenderedChunk): Promise<string> | string;
  outro?(chunk: RenderedChunk): Promise<string> | string;
  
  renderDynamicImport?(options: RenderDynamicImportOptions): Promise<RenderDynamicImportResult> | RenderDynamicImportResult;
  
  augmentChunkHash?(chunk: RenderedChunk): Promise<string> | string;
  
  renderChunk?(
    code: string,
    chunk: RenderedChunk,
    options: NormalizedOutputOptions
  ): Promise<TransformResult> | TransformResult;
  
  generateBundle?(
    options: NormalizedOutputOptions,
    bundle: OutputBundle,
    isWrite: boolean
  ): Promise<void> | void;
  
  writeBundle?(
    options: NormalizedOutputOptions,
    bundle: OutputBundle
  ): Promise<void> | void;
  
  // 监听钩子 (Watch Hooks)
  watchChange?(id: string, change: ChangeEvent): Promise<void> | void;
  closeWatcher?(): Promise<void> | void;
  
  // 插件元数据
  meta?: PluginMeta;
}

// 插件上下文
export interface PluginContext {
  // 工具方法
  addWatchFile(id: string): void;
  cache: PluginCache;
  emitFile(emittedFile: EmittedFile): string;
  error(error: RollupError | string, pos?: number | { column: number; line: number }): never;
  getCombinedSourcemap(): any;
  getFileName(referenceId: string): string;
  getModuleIds(): IterableIterator<string>;
  getModuleInfo(id: string): ModuleInfo | null;
  getWatchFiles(): string[];
  isExternal(id: string, importer?: string, isResolved?: boolean): Promise<boolean> | boolean;
  load(options: LoadOptions): Promise<ModuleInfo>;
  parse(code: string, options?: ParseOptions): RollupASTNode;
  resolve(id: string, importer?: string, options?: ResolveOptions): Promise<ResolvedId | null>;
  setAssetSource(referenceId: string, source: string | Uint8Array): void;
  warn(warning: RollupWarning | string, pos?: number | { column: number; line: number }): void;
  
  // 元数据
  meta: PluginContextMeta;
}

// 转换上下文
export interface TransformPluginContext extends PluginContext {
  getCombinedSourcemap(): any;
}

// 插件缓存
export interface PluginCache {
  get<T = any>(key: string): T | undefined;
  set<T = any>(key: string, value: T): void;
  has(key: string): boolean;
  delete(key: string): boolean;
}

// 插件元数据
export interface PluginMeta {
  rollupVersion: string;
  watchMode: boolean;
  [key: string]: any;
}

// 插件上下文元数据
export interface PluginContextMeta {
  rollupVersion: string;
  watchMode: boolean;
  [key: string]: any;
}

// 解析选项
export interface ResolveIdOptions {
  skipSelf?: boolean;
  custom?: CustomPluginOptions;
}

// 解析结果
export type ResolveIdResult = string | null | false | {
  id: string;
  external?: boolean;
  moduleSideEffects?: boolean | 'no-treeshake';
  syntheticNamedExports?: boolean | string;
  meta?: CustomPluginOptions;
};

// 加载结果
export type LoadResult = string | null | {
  code: string;
  map?: any;
  ast?: RollupASTNode;
  meta?: CustomPluginOptions;
  moduleSideEffects?: boolean | 'no-treeshake';
  syntheticNamedExports?: boolean | string;
};

// 模块信息
export interface ModuleInfo {
  id: string;
  code: string | null;
  ast: RollupASTNode | null;
  hasDefaultExport: boolean | null;
  isEntry: boolean;
  isExternal: boolean;
  isIncluded: boolean | null;
  importedIds: string[];
  importedIdResolutions: ResolvedId[];
  importers: string[];
  dynamicallyImportedIds: string[];
  dynamicallyImportedIdResolutions: ResolvedId[];
  dynamicImporters: string[];
  implicitlyLoadedAfterOneOf: string[];
  implicitlyLoadedBefore: string[];
  meta: CustomPluginOptions;
  moduleSideEffects: boolean | 'no-treeshake';
  syntheticNamedExports: boolean | string;
}

// 已解析的ID
export interface ResolvedId {
  id: string;
  external: boolean;
  moduleSideEffects: boolean | 'no-treeshake';
  syntheticNamedExports: boolean | string;
  meta: CustomPluginOptions;
}

// 加载选项
export interface LoadOptions {
  id: string;
  resolveDependencies?: boolean;
}

// 解析选项
export interface ParseOptions {
  allowReturnOutsideFunction?: boolean;
}

// 动态导入渲染选项
export interface RenderDynamicImportOptions {
  format: string;
  moduleId: string;
  targetModuleId: string;
}

// 动态导入渲染结果
export interface RenderDynamicImportResult {
  left: string;
  right: string;
}

// 发出的文件
export type EmittedFile = EmittedAsset | EmittedChunk;

// 发出的资源
export interface EmittedAsset {
  type: 'asset';
  name?: string;
  fileName?: string;
  source?: string | Uint8Array;
}

// 发出的代码块
export interface EmittedChunk {
  type: 'chunk';
  id: string;
  name?: string;
  fileName?: string;
  implicitlyLoadedAfterOneOf?: string[];
  importer?: string;
  preserveSignature?: 'strict' | 'allow-extension' | 'exports-only' | false;
}

// 文件变化事件
export interface ChangeEvent {
  event: 'create' | 'update' | 'delete';
}

// 自定义插件选项
export interface CustomPluginOptions {
  [key: string]: any;
}

// Rollup错误
export interface RollupError extends Error {
  code?: string;
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
  cause?: Error;
  stack?: string;
  toString(): string;
}

// 插件工厂
export type PluginFactory<T = any> = (options?: T) => Plugin;

// 插件钩子
export type PluginHook<T, R = T> = T | ((this: PluginContext, ...args: any[]) => R);

// 异步插件钩子
export type AsyncPluginHook<T, R = T> = T | ((this: PluginContext, ...args: any[]) => Promise<R> | R);

// 插件钩子优先级
export type HookPriority = 'first' | 'pre' | 'normal' | 'post' | 'last';

// 插件钩子配置
export interface PluginHookConfig<T> {
  handler: T;
  order?: HookPriority;
  sequential?: boolean;
}

// 插件系统
export interface PluginDriver {
  hookFirst<T>(
    hookName: string,
    parameters: any[],
    replaceContext?: (context: PluginContext) => PluginContext
  ): Promise<T>;
  
  hookSeq<T>(
    hookName: string,
    parameters: any[],
    replaceContext?: (context: PluginContext) => PluginContext
  ): Promise<T[]>;
  
  hookParallel<T>(
    hookName: string,
    parameters: any[],
    replaceContext?: (context: PluginContext) => PluginContext
  ): Promise<T[]>;
  
  hookSeqSync<T>(
    hookName: string,
    parameters: any[],
    replaceContext?: (context: PluginContext) => PluginContext
  ): T[];
}