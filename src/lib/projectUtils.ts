import type { Project } from '../data/projects';

function normalizeProjectText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function hasProjectValue(value: unknown) {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'string') {
    return value.trim() !== '';
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return true;
}

function getProjectIdentity(project: Partial<Project>) {
  if (typeof project.title === 'string' && project.title.trim() !== '') {
    return `title:${normalizeProjectText(project.title)}`;
  }

  if (typeof project.link === 'string' && project.link.trim() !== '') {
    return `link:${project.link.trim().toLowerCase()}`;
  }

  if (project.id !== null && project.id !== undefined) {
    return `id:${project.id.toString().trim().toLowerCase()}`;
  }

  return '';
}

function mergeProjectData(base: Project, incoming: Project) {
  const merged: Record<string, unknown> = { ...base };

  Object.entries(incoming).forEach(([key, value]) => {
    if (hasProjectValue(value)) {
      merged[key] = value;
    }
  });

  return merged as unknown as Project;
}

export function mergeAndDedupeProjects(primaryProjects: Project[], secondaryProjects: Project[] = []) {
  const mergedProjects = new Map<string, Project>();

  [...primaryProjects, ...secondaryProjects].forEach((project) => {
    const identity = getProjectIdentity(project);

    if (!identity) {
      return;
    }

    const existingProject = mergedProjects.get(identity);

    if (existingProject) {
      mergedProjects.set(identity, mergeProjectData(existingProject, project));
      return;
    }

    mergedProjects.set(identity, project);
  });

  return Array.from(mergedProjects.values()).filter(p => {
    const title = (p.title || '').toLowerCase();
    const id = (p.id || '').toString().toLowerCase();
    // Remove specifically the old Dogcat Madrid versions
    if (title.includes('dogcat') && title.includes('madrid')) return false;
    if (id.includes('dogcat-madrid')) return false;
    return true;
  });
}
