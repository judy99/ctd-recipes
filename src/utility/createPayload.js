export function createPayload({
  title,
  category,
  ingredients,
  method,
  notes,
  photoUrl,
}) {
  const record = {
    fields: {
      title,
      category,
      ingredients,
      method,
      notes,
      photo: photoUrl,
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
