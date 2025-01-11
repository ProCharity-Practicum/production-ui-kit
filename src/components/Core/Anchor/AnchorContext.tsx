import { createContext } from 'react';
import { AnchorContextType } from '@/components/Core/Anchor/AnchorProvider.tsx';

export const AnchorContext = createContext<AnchorContextType>({});
