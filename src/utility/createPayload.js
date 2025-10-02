export function createPayload({ id, title, isCompleted }) {
  const record = {
    fields: {
      title,
      isCompleted,
    },
  };

  if (id !== undefined) {
    record.id = id;
  }

  if (isCompleted === undefined) {
    record.fields.isCompleted = false;
  }

  return {
    records: [record],
  };
}
