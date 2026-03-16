import aWeekInManhattan from "./aWeekInManhattan";
import banffInEarlyMay from "./banffInEarlyMay";
import dubaiIn24Hours from "./dubaiIn24Hours";

const seedTravelPosts = [aWeekInManhattan, dubaiIn24Hours, banffInEarlyMay].sort(
  (left, right) => (left.displayOrder || 0) - (right.displayOrder || 0)
);

export { aWeekInManhattan, banffInEarlyMay, dubaiIn24Hours, seedTravelPosts };
