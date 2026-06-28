export const splitName = (fullName) => {
  if (!fullName) return { firstName: "", lastName: "" };
  const parts = fullName.trim().split(" ");
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || "",
  };
};

export const mapUserData = (apiUser) => {
  const { firstName, lastName } = splitName(apiUser.name);
  return {
    id: apiUser.id,
    firstName,
    lastName,
    email: apiUser.email,
    department: "IT",
    phone: apiUser.phone || "",
    website: apiUser.website || "",
    company: apiUser.company?.name || "",
  };
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const getPaginationIndices = (currentPage, pageSize) => {
  return {
    startIndex: (currentPage - 1) * pageSize,
    endIndex: currentPage * pageSize,
  };
};

export const getTotalPages = (totalItems, pageSize) => {
  return Math.ceil(totalItems / pageSize);
};
