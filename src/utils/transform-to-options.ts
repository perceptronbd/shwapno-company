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
    value: item.name, // Use the 'name' property as the value
    label: item.name,
  }));
};

export const transformToOptionsWithId = <T extends Identifiable>(
  items: T[],
): Option[] => {
  return items.map((item) => ({
    value: item.id, // Use the 'id' property as the value
    label: item.name,
  }));
};
