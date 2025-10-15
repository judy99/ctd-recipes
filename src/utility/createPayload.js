export function createPayload({
  title,
  category,
  ingredients,
  method,
  notes,
  source,
  urlCloudinary,
}) {
  const record = {
    fields: {
      title,
      category,
      ingredients,
      method,
      notes,
      source,
      urlCloudinary,
    },
  };
  return {
    records: [record],
  };
}
