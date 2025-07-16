import { OutputBundle } from "./bundle";
import { Chunk } from "./chunk";
import { OutputOptions } from "./config";

export interface CodeGenerator {
    generate(chunks: Chunk[], options: OutputOptions): Promise<OutputBundle>;
  }
  
  export interface SourceMapGenerator {
    generate(code: string, map: any): any;
  }
  