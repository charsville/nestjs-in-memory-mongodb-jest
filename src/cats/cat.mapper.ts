import { CatDocument } from './cat.schema';
import { CatDto } from './cat.dto';

export const CatMapper = (cat: CatDocument): CatDto => {
  const { name, age, breed } = cat;
  return new CatDto(name, age, breed);
};
