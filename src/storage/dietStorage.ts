import AsyncStorage from "@react-native-async-storage/async-storage";

const DIET_STORAGE_KEY = "diet-storage";

export type DietProps = {
  id: string;
  name: string;
  description: string;
  date: string;
  hour: string;
  inDiet: boolean;
};

async function get(): Promise<DietProps[]> {
  const storage = await AsyncStorage.getItem(DIET_STORAGE_KEY);
  const response = storage ? JSON.parse(storage) : []; // se tiver conteudo converta para objeto, caso contrario retorna um array vazio

  return response;
}

async function save(newLink: DietProps) {
  try {
    const storage = await get();
    const update = JSON.stringify([...storage, newLink]); // trasnforma em string

    await AsyncStorage.setItem(DIET_STORAGE_KEY, update);
  } catch (error) {
    throw error;
  }
}

// atualiza uma refeição existente no armazenamento
async function update(id: string, updatedData: Partial<DietProps>) {
  try {
    const storage = await get();
    const updatedStorage = storage.map(
      (item) => (item.id === id ? { ...item, ...updatedData } : item) // atualiza os campos da refeição correspondente ao ID
    );

    await AsyncStorage.setItem(
      DIET_STORAGE_KEY,
      JSON.stringify(updatedStorage)
    );
  } catch (error) {
    throw error;
  }
}

async function remove(id: string) {
  try {
    const storage = await get();
    const updated = storage.filter((link) => link.id != id); // romovendo pelo id

    await AsyncStorage.setItem(DIET_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    throw error;
  }
}

export const dietStorage = { get, save, update, remove };
