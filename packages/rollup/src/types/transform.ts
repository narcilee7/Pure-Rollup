export interface TransformResult {
    code: string;
    map?: any;
    ast?: any;
    meta?: any;
    syntheticNamedExports?: boolean | string;
    moduleSideEffects?: boolean | 'no-treeshake';
  }
  
  export interface TransformOptions {
    id: string;
    code: string;
    ast?: any;
    meta?: any;
  }
  
  export interface Transformer {
    transform(options: TransformOptions): Promise<TransformResult>;
}