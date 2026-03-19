export interface AirLearnGoal {
    goalUID: string; // Ex: "ENGCHN"
    commonFolderName: string; // Ex: "chinese-english"
};

export type AirLearnGoalMap = {
    [goalUID: string]: AirLearnGoal
};

export const GOALS: AirLearnGoalMap = {
    ENGCHN: {
        goalUID: "ENGCHN",
        commonFolderName: "chinese-english",
    },
    ENGHIN: {
        goalUID: "ENGHIN",
        commonFolderName: "hindi-english",
    },
};
