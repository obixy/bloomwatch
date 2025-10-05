function importImage(filename: string) {
  return `/` + filename;
}

const images = [
  { date: '2019-02-06', file: '20190206.png' },
  { date: '2019-02-11', file: '20190211.png' },
  { date: '2019-02-17', file: '20190217.png' },
  { date: '2019-03-13', file: '20190313.png' },
  { date: '2019-03-18', file: '20190318.png' },
  { date: '2019-03-28', file: '20190328.png' },
  { date: '2019-04-07', file: '20190407.png' },
  { date: '2019-04-12', file: '20190412.png' },
  { date: '2019-04-22', file: '20190422.png' },
];

const previsionImage = importImage('prevision.png');
const satelliteViewImage = importImage('satellite-view.png');

export const mapTimeline: Record<string, string> = {};
images.forEach(({ date, file }) => {
  mapTimeline[date] = importImage(file);
});

mapTimeline['prevision'] = previsionImage;
mapTimeline['satellite-view'] = satelliteViewImage;
