export interface RollupOptions {
    input: string | string[] | Record<string, string>;
    // TODO 实现Plugin类型
    // plugins?: Plugin[];
    // TODO 实现扩展类型
    // external?: ExternalOption;
    // TODO 实现warning控制器
    // onwarn?: WraningHandler;
    // TODO 实现watch参数类型
    // watch?: WatchOptions;
    // TODO 实现cache参数类型
    // cache?: RollupCache;
    preserveEntrySignatures?: 'strict' | 'allow-extension' | 'exports-only' | false;
    strictDeprecations?: boolean;
    maxParallelFileOps?: number;
    pref?: boolean;
    // TODO 完善Treeshake
    treeshake?: boolean | TreeshakeOptions;
    experimentalCacheExpiry?: number;
    experimentalLogSideEffects?: boolean;
}

export interface OutputOptions {
    dir?: string;
    file?: string;
    format?: ModuleFormat;
    name?: string;
    globals?: GlobalsOption;
    plugins?: Plugin[];
    assetFileNames?: string | ((assetInfo: AssetInfo) => string);
    banner?: string | (() => string | Promise<string>);
    chunkFileNames?: string | ((chunkInfo: ChunkInfo) => string);
    compact?: boolean;
    entryFileNames?: string | ((chunkInfo: ChunkInfo) => string);
    extend?: boolean;
    externalLiveBindings?: boolean;
    footer?: string | (() => string | Promise<string>);
    hoistTransitiveImports?: boolean;
    indent?: string | boolean;
    inlineDynamicImports?: boolean;
    interop?: InteropType | GetInterop;
    intro?: string | (() => string | Promise<string>);
    manualChunks?: ManualChunksOption;
    minifyInternalExports?: boolean;
    outro?: string | (() => string | Promise<string>);
    paths?: OptionsPaths;
    preserveModules?: boolean;
    preserveModulesRoot?: string;
    sourcemap?: boolean | 'inline' | 'hidden';
    sourcemapExcludeSources?: boolean;
    sourcemapFile?: string;
    sourcemapPathTransform?: SourcemapPathTransformOption;
    strict?: boolean;
    systemNullSetters?: boolean;
    validate?: boolean;
    exports?: 'auto' | 'default' | 'named' | 'none';
    esModule?: boolean;
    freeze?: boolean;
    namespaceToStringTag?: boolean;
    noConflict?: boolean;
    preferConst?: boolean;
    sanitizeFileName?: boolean | ((fileName: string) => string);
    amd?: {
      id?: string;
      autoId?: boolean;
      basePath?: string;
      define?: string;
      forceJsExtensionForImports?: boolean;
    };
}

export type ModuleFormat = 'amd' | 'cjs' | 'es' | 'iife' | 'system' | 'umd';

export type ExternalOption = 
    | (string | RegExp)[]
    | string
    | RegExp
    | ((source: string, importer: string | undefined, isResolved: boolean) => boolean | null | undefined);

export type GlobalsOption = Record<string, string> | ((id: string) => string);

export interface TreeshakeOptions {
    annotations?: boolean;
    moduleSideEffects?: ModuleSideEffectsOption;
    propertyReadSideEffects?: boolean;
    tryCatchDeoptimization?: boolean;
    unknownGlobalSideEffects?: boolean;
    correctVarValueBeforeDeclaration?: boolean;
    manualPureFunctions?: string[];
    preset?: 'smallest' | 'safest' | 'recommended';
}

export type ModuleSideEffectsOption = 
    | boolean
    | 'no-external'
    | string[]
    | ((id: string, external: boolean) => boolean);

export interface WatchOptions {
    buildDelay?: number;
    chokidar?: any;
    clearScreen?: boolean;
    exclude?: string | RegExp | (string | RegExp)[];
    include?: string | RegExp | (string | RegExp)[];
    skipWrite?: boolean; 
}

export interface RollupCache {
    modules: ModuleJSON[];
    plugins?: Record<string, any>;
}

export interface ModuleJSON {
    id: string;
    code: string;
    originalCode: string;
    originalSourcemap: ExistingRawSourceMap | null;
    ast: any;
    sourcemapChain: DecodedSourceMapOrMissing[];
    resolvedIds: Record<string, string>;
    transformDependencies: string[];
    customTransformCache: boolean;
    meta: CustomPluginOptions;
    syntheticNamedExports: boolean | string;
}

export interface ModuleDependency {
    id: string;
    name: string;
    importedNames: string[];
    isExternal: boolean;
    isDynamic: boolean;
    source: string;
    importer: string;
}

export interface ModuleExport {
    name: string;
    localName: string;
    isDefault: boolean;
    isNamespace: boolean;
    node: AstNode;
  }
  
export interface ModuleImport {
    name: string;
    localName: string;
    isDefault: boolean;
    isNamespace: boolean;
    source: string;
    node: AstNode;
}

export interface ModuleScope {
    type: 'module' | 'function' | 'block';
    parent?: ModuleScope;
    children: ModuleScope[];
    variables: Map<string, Variable>;
    references: Map<string, Reference>;
}

export interface Variable {
    name: string;
    isParameter: boolean;
    isDefault: boolean;
    isNamespace: boolean;
    isExternal: boolean;
    isExported: boolean;
    isReassigned: boolean;
    isUsed: boolean;
    declarations: AstNode[];
    references: Reference[];
    scope: ModuleScope;
}


export interface Reference {
    name: string;
    node: AstNode;
    scope: ModuleScope;
    variable?: Variable;
    isRead: boolean;
    isWrite: boolean;
}