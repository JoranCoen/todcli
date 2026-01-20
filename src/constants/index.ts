import { IssueType } from '@/types/issue';

enum GradientMap {
  Cristal = 'cristal',
  Teen = 'teen',
  Mind = 'mind',
  Morning = 'morning',
  Vice = 'vice',
  Passion = 'passion',
  Fruit = 'fruit',
  Instagram = 'instagram',
  Atlas = 'atlas',
  Retro = 'retro',
  Summer = 'summer',
  Pastel = 'pastel',
  Rainbow = 'rainbow',
};

const issueColorMap = {
  [IssueType.Error]: 'red',
  [IssueType.Warning]: 'yellow',
  [IssueType.Bug]: 'magenta',
  [IssueType.Info]: 'cyan',
};

export { GradientMap, issueColorMap };
