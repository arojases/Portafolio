import type { Localized, ProjectImage } from '../models/project';

interface PortfolioConfig {
  name: string;
  github: string;
  linkedin?: string;
  email?: string;
  cv: Localized;
  photo?: ProjectImage & { transparent?: boolean };
}

export const portfolio: PortfolioConfig = {
  name: 'Ariel Rojas',
  github: 'https://github.com/arojases',
  linkedin: 'https://www.linkedin.com/in/arielrojasescudero',
  email: 'arielalejandrorojas@gmail.com',
  cv: { en: 'documents/CV_Ariel_Rojas_Software_EN.pdf', es: 'documents/CV_Ariel_Rojas_Software_ES.pdf' },
  photo: {
    src: 'images/profile/ariel-rojas.jpg',
    alt: {
      en: 'Ariel Rojas’s GitHub profile picture',
      es: 'Foto de perfil de Ariel Rojas en GitHub',
    },
  },
};
