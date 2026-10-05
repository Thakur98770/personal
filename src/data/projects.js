export const projects = [];

export const getProject = (slug) => projects.find((project) => project.slug === slug);
