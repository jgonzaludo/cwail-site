import { encode } from 'gpt-tokenizer';

export interface TokenOffset {
  start: number;
  end: number;
  slice: string;
}

export interface TokenizationResult {
  ids: number[];
  offsets: TokenOffset[];
}

export async function tokenize(
  text: string, 
  encoding: 'gpt2' | 'cl100k_base'
): Promise<TokenizationResult> {
  try {
    const ids = encode(text, encoding);
    
    // For now, we'll create simple character-based offsets
    // In a real implementation, you'd want to map tokens back to character positions
    const offsets: TokenOffset[] = [];
    let currentPos = 0;
    
    // This is a simplified approach - in practice you'd need the actual tokenizer
    // to provide byte-level offsets for accurate highlighting
    for (let i = 0; i < ids.length; i++) {
      const tokenLength = Math.min(4, text.length - currentPos); // Approximate
      offsets.push({
        start: currentPos,
        end: currentPos + tokenLength,
        slice: text.slice(currentPos, currentPos + tokenLength)
      });
      currentPos += tokenLength;
    }
    
    return { ids, offsets };
  } catch (error) {
    console.error('Tokenization failed:', error);
    return { ids: [], offsets: [] };
  }
}
