declare global {
  type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];
}

export {};
