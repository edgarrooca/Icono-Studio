import type { Project } from '../data/projects';

export const loadMergedProjects = async (): Promise<Project[]> => {
  try {
    const [{ collection, getDocs }, { db }, { portfolioProjects }, { mergeAndDedupeProjects }] = await Promise.all([
      import('firebase/firestore'),
      import('../firebase'),
      import('../data/projects'),
      import('./projectUtils'),
    ]);

    const projectsSnapshot = await getDocs(collection(db, 'projects'));
    if (projectsSnapshot.empty) {
      return portfolioProjects;
    }

    const remoteProjects = projectsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Project
    );

    return mergeAndDedupeProjects(portfolioProjects, remoteProjects);
  } catch (error) {
    console.error('Error loading remote projects:', error);
    const { portfolioProjects } = await import('../data/projects');
    return portfolioProjects;
  }
};
