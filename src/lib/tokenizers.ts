import { encoding_for_model } from '@dqbd/tiktoken';

export interface TokenOffset {
  start: number;
  end: number;
  slice: string;
}

export interface TokenizationResult {
  ids: number[];
  offsets: TokenOffset[];
}

export type EncodingName = 'gpt2' | 'cl100k_base';

// Map encoding names to model names
const encodingMap: Record<EncodingName, string> = {
  'gpt2': 'gpt2',
  'cl100k_base': 'gpt-4'
};

export async function tokenize(
  text: string, 
  encoding: EncodingName
): Promise<TokenizationResult> {
  try {
    const modelName = encodingMap[encoding];
    const enc = encoding_for_model(modelName as any);
    
    const ids = enc.encode(text);
    const tokens: TokenOffset[] = [];
    
    // For now, create approximate character-based offsets
    // This is a simplified approach - in a full implementation you'd want
    // byte-level offsets for accurate highlighting
    let currentPos = 0;
    for (let i = 0; i < ids.length; i++) {
      const tokenBytes = enc.decode(new Uint32Array([ids[i]]));
      const token = new TextDecoder().decode(tokenBytes);
      const tokenLength = token.length;
      
      tokens.push({
        start: currentPos,
        end: currentPos + tokenLength,
        slice: token
      });
      
      currentPos += tokenLength;
    }
    
    enc.free();
    return { ids: Array.from(ids), offsets: tokens };
  } catch (error) {
    console.error('Tokenization failed:', error);
    return { ids: [], offsets: [] };
  }
}
