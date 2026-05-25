import { portfolioProjects, type Project } from '../data/projects';
import { mergeAndDedupeProjects } from './projectUtils';

export const loadMergedProjects = async (): Promise<Project[]> => {
  try {
    const [{ collection, getDocs }, { db }] = await Promise.all([
      import('firebase/firestore'),
      import('../firebase'),
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
    return portfolioProjects;
  }
};
