
export interface OptimizeOptions {
    treeshake: boolean;
    minify: boolean;
    compress: boolean;
    mangle: boolean;
    deadCodeElimination: boolean;
    sideEffects: boolean;
    pureAnnotations: boolean;
}

export interface OptimizeResult {
    code: string;
    map?: SourceMap | null;
    removedNodes: AstNode[];
    warnings: OptimizeWarning[];
    stats: OptimizeStats;
}

export interface OptimizeWarning {
    message: string;
    code?: string;
    node?: AstNode;
    loc?: {
        line: number;
        column: number;
    };
}

export interface OptimizeStats {
    originalSize: number;
    optimizedSize: number;
    compressionRatio: number;
    removedNodes: number;
    removedVariables: number;
    removedFunctions: number;
}


export interface TreeshakeOptions {
    annotations: boolean;
    moduleSideEffects: boolean | 'no-external' | string[] | ((id: string) => boolean);
    propertyReadSideEffects: boolean;
    tryCatchDeoptimization: boolean;
    unknownGlobalSideEffects: boolean;
    correctVarValueBeforeDeclaration: boolean;
    manualPureFunctions: string[];
}

export interface TreeshakeResult {
    usedNodes: Set<AstNode>;
    removedNodes: Set<AstNode>;
    usedVariables: Set<string>;
    removedVariables: Set<string>;
    sideEffects: Map<AstNode, boolean>;
}

export interface DeadCodeEliminationOptions {
    removeUnusedVariables: boolean;
    removeUnusedFunctions: boolean;
    removeUnusedImports: boolean;
    removeUnusedExports: boolean;
    removeEmptyBlocks: boolean;
    removeUnreachableCode: boolean;
}

export interface DeadCodeEliminationResult {
    removedNodes: AstNode[];
    removedVariables: string[];
    removedFunctions: string[];
    removedImports: string[];
    removedExports: string[];
    stats: {
        originalNodes: number;
        removedNodes: number;
        compressionRatio: number;
    };
}
export interface MinifyOptions {
    compress: boolean;
    mangle: boolean;
    output: {
        comments: boolean;
        beautify: boolean;
        indent: string;
        semicolons: boolean;
        quotes: 'single' | 'double' | 'auto';
    };
}

export interface MinifyResult {
    code: string;
    map?: SourceMap | null;
    stats: {
        originalSize: number;
        minifiedSize: number;
        compressionRatio: number;
    };
}
