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

  // if (id !== undefined) {
  //   record.id = id;
  // }

  // if (photoUrl === undefined) {
  //   record.fields.isCompleted = false;
  // }

  return {
    records: [record],
  };
}
