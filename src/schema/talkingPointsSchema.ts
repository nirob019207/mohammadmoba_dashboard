// import { z } from "zod";

// const talkingPointsSchema = z.object({
//   cleanlinessLevel: z.string().min(0, "Please provide a valid cleanliness level"),
//   cookingHabit: z.string().min(1, "Please provide cooking habits"),
//   houseMateRelation: z.string().min(1, "Please provide housemate relation"),
//   financialHabit: z.string().min(1, "Please provide financial habits"),
//   communicationStyle: z.string().min(1, "Please provide communication style"),
//   petFriendlyDescription: z.string().min(1, "Please provide pet friendly description"),
//   hostFriend: z.string().min(1, "Please provide hosting habits"),
//   workRoutine: z.string().min(1, "Please provide work routine"),
//   sleepSchedule: z.string().min(0, "Please provide a valid sleep schedule"),
//   consumeAlcohol: z.string().min(1, "Please provide alcohol consumption details"),
//   vapingProduct: z.string().min(1, "Please provide vaping product usage"),
//   drugDescription: z.string().min(1, "Please provide drug usage details"),
//   regardingHealth: z.string().min(1, "Please provide health-related habits"),
//   relagiouseDescription: z.string().min(1, "Please provide religious beliefs"),
//   haveAllergies: z.string().min(1, "Please provide allergy details"),
// });

// export default talkingPointsSchema;


import { z } from "zod";

const talkingPointsSchema = z.object({
  cleanlinessLevel: z.any(),
  cookingHabit: z.any(),
  houseMateRelation: z.any(),
  financialHabit: z.any(),
  communicationStyle: z.any(),
  petFriendlyDescription: z.any(),
  hostFriend: z.any(),
  workRoutine: z.any(),
  sleepSchedule: z.any(),
  consumeAlcohol: z.any(),
  vapingProduct: z.any(),
  drugDescription: z.any(),
  regardingHealth: z.any(),
  relagiouseDescription: z.any(),
  haveAllergies: z.any(),
  anyThingElse:z.any(),
  potentialDescription:z.any()
});

export default talkingPointsSchema;
