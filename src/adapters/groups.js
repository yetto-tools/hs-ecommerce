const groupAdapter = (group) => {
  return {
    id: Number(group.id) || 0,
    name: group.name,
    description: group.description,
    members: group.members,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
  };
};

export default groupAdapter;
