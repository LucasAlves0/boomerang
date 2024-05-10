// Importa a função 'create' da biblioteca Zustand, que é usada para criar uma store de estado.
import { create } from 'zustand';

// Define uma interface TypeScript para descrever a forma do estado e das funções na store.
interface useStoreModalStore {
  isOpen: boolean;   // Propriedade booleana para determinar se o modal está aberto ou fechado.
  onOpen: () => void; // Função para abrir o modal.
  onClose: () => void; // Função para fechar o modal.
}

// Exporta o hook 'useStoreModal', que utiliza a função 'create' de Zustand para definir a store.
export const useStoreModal = create<useStoreModalStore>((set) => ({
  isOpen: false, // Estado inicial para 'isOpen' definido como false, indicando que o modal está fechado inicialmente.
  onOpen: () => set({ isOpen: true }), // Define a função 'onOpen', que ao ser chamada, atualiza 'isOpen' para true.
  onClose: () => set({ isOpen: false }), // Define a função 'onClose', que ao ser chamada, atualiza 'isOpen' para false.
}));
