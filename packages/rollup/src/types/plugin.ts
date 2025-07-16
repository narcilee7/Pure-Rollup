// import { OutputOptions, RollupOptions } from "./config";

// export interface Plugin {
//     name: string;
//     buildStart?: (this: PluginContext, options: RollupOptions) => void | Promise<void>;
//     buildEnd?: (this: PluginContext, error?: Error) => void | Promise<void>;
//     generateBundle?: (
//       this: PluginContext,
//       options: OutputOptions,
//       bundle: OutputBundle,
//       isWrite: boolean
//     ) => void | Promise<void>;
//     load?: (this: PluginContext, id: string) => LoadResult | Promise<LoadResult>;
//     options?: (this: MinimalPluginContext, options: RollupOptions) => RollupOptions | null | undefined;
//     outputOptions?: (this: PluginContext, options: OutputOptions) => OutputOptions | null | undefined;
//     renderChunk?: (
//       this: PluginContext,
//       code: string,
//       chunk: RenderedChunk,
//       options: OutputOptions
//     ) => RenderChunkResult | Promise<RenderChunkResult>;
//     renderDynamicImport?: (
//       this: PluginContext,
//       options: {
//         customResolution: string | null;
//         format: string;
//         moduleId: string;
//         targetModuleId: string | null;
//       }
//     ) => { left: string; right: string } | null | undefined;
//     renderError?: (this: PluginContext, error: Error) => void | Promise<void>;
//     renderStart?: (
//       this: PluginContext,
//       outputOptions: OutputOptions,
//       inputOptions: RollupOptions
//     ) => void | Promise<void>;
//     resolveId?: (
//       this: PluginContext,
//       source: string,
//       importer: string | undefined,
//       options: { isEntry: boolean }
//     ) => ResolveIdResult | Promise<ResolveIdResult>;
//     resolveDynamicImport?: (
//       this: PluginContext,
//       specifier: string | any,
//       importer: string
//     ) => ResolveIdResult | Promise<ResolveIdResult>;
//     transform?: (
//       this: TransformPluginContext,
//       code: string,
//       id: string
//     ) => TransformResult | Promise<TransformResult>;
//     watchChange?: (this: PluginContext, id: string, change: { event: 'create' | 'update' | 'delete' }) => void;
//     writeBundle?: (
//       this: PluginContext,
//       options: OutputOptions,
//       bundle: OutputBundle
//     ) => void | Promise<void>;
//     closeBundle?: (this: PluginContext) => void | Promise<void>;
//     closeWatcher?: (this: PluginContext) => void | Promise<void>;
//     onLog?: (this: MinimalPluginContext, level: LogLevel, log: RollupLog) => boolean | null | undefined;
//     banner?: string | (() => string | Promise<string>);
//     footer?: string | (() => string | Promise<string>);
//     intro?: string | (() => string | Promise<string>);
//     outro?: string | (() => string | Promise<string>);
//     api?: any;
//     meta?: PluginMeta;
//   }
  
//   export interface PluginMeta {
//     rollupVersion: string;
//     watchMode: boolean;
//     [key: string]: any;
//   }
  
//   export interface PluginContext {
//     addWatchFile: (id: string) => void;
//     cache: PluginCache;
//     emitFile: (emittedFile: EmittedFile) => string;
//     error: (error: RollupError | string, pos?: number | { column: number; line: number }) => never;
//     getCombinedSourcemap: () => SourceMap;
//     getFileName: (fileReferenceId: string) => string;
//     getModuleIds: () => IterableIterator<string>;
//     getModuleInfo: (moduleId: string) => ModuleInfo | null;
//     getWatchFiles: () => string[];
//     load: (options: { id: string; resolveDependencies?: boolean }) => Promise<ModuleInfo>;
//     parse: (code: string, options?: any) => any;
//     resolve: (
//       source: string,
//       importer?: string,
//       options?: { isEntry?: boolean; skipSelf?: boolean }
//     ) => Promise<ResolveIdResult>;
//     setAssetSource: (assetReferenceId: string, source: string | Uint8Array) => void;
//     warn: (warning: RollupWarning | string, pos?: number | { column: number; line: number }) => void;
//     debug: (message: string, pos?: number | { column: number; line: number }) => void;
//     info: (message: string, pos?: number | { column: number; line: number }) => void;
//     meta: PluginContextMeta;
//   }
  
//   export interface TransformPluginContext extends PluginContext {
//     getCombinedSourcemap: () => SourceMap;
//   }
  
//   export interface MinimalPluginContext {
//     meta: PluginContextMeta;
//     debug: (message: string) => void;
//     error: (error: RollupError | string) => never;
//     info: (message: string) => void;
//     warn: (warning: RollupWarning | string) => void;
//   }
  
//   export interface PluginContextMeta {
//     rollupVersion: string;
//     watchMode: boolean;
//   }
  
//   export interface PluginCache {
//     get(key: string): any;
//     set(key: string, value: any): void;
//     has(key: string): boolean;
//     delete(key: string): boolean;
//   }
  
//   export interface EmittedFile {
//     type: 'asset' | 'chunk';
//     id?: string;
//     name?: string;
//     fileName?: string;
//     source?: string | Uint8Array;
//     code?: string;
//     map?: SourceMap;
//     facadeModuleId?: string;
//     implicitlyLoadedAfter?: string[];
//     implicitlyLoadedBefore?: string[];
//     importer?: string;
//     isDynamicEntry?: boolean;
//     isEntry?: boolean;
//     isImplicitEntry?: boolean;
//     preserveSignature?: 'strict' | 'allow-extension' | 'exports-only' | false;
//   }
  