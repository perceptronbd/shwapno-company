// Generic type constraint to accept any object with 'id' and 'name'
interface Identifiable {
  id: string;
  name: string;
}

// Define the output option type
interface Option {
  value: string;
  label: string;
}

// Generic utility function to transform any array with `id` and `name`
export const transformToOptions = <T extends Identifiable>(
  items: T[],
): Option[] => {
  return items.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};
