import { create } from 'zustand';

export interface CartItemOption {
  label: string;
  value: string;
}

export interface CartItem {
  id: string;
  menuId: string;
  storeId: string;
  storeName: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  allergies: string[];
  options: CartItemOption[];
}

interface CartState {
  items: CartItem[];
  storeId: string | null;
  storeName: string | null;

  // Actions
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  storeId: null,
  storeName: null,

  addItem: (item) => {
    const { items, storeId } = get();

    // 다른 가게 메뉴가 있으면 장바구니 초기화
    if (storeId && storeId !== item.storeId) {
      set({
        items: [{ ...item, id: generateId() }],
        storeId: item.storeId,
        storeName: item.storeName,
      });
      return;
    }

    // 같은 메뉴가 있는지 확인 (옵션까지 같아야 함)
    const existingIndex = items.findIndex(
      (i) =>
        i.menuId === item.menuId &&
        JSON.stringify(i.options) === JSON.stringify(item.options)
    );

    if (existingIndex >= 0) {
      // 기존 메뉴 수량 증가
      const newItems = [...items];
      newItems[existingIndex].quantity += item.quantity;
      set({ items: newItems });
    } else {
      // 새 메뉴 추가
      set({
        items: [...items, { ...item, id: generateId() }],
        storeId: item.storeId,
        storeName: item.storeName,
      });
    }
  },

  removeItem: (id) => {
    const { items } = get();
    const newItems = items.filter((item) => item.id !== id);

    if (newItems.length === 0) {
      set({ items: [], storeId: null, storeName: null });
    } else {
      set({ items: newItems });
    }
  },

  updateQuantity: (id, quantity) => {
    if (quantity < 1) return;

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [], storeId: null, storeName: null });
  },

  getTotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));

// 고유 ID 생성
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
