// ENGCHN = Chinese
// ENGHIN = Hindi

export const JWT = process.env.JWT || '';
if (!JWT) {
	throw new Error('JWT environment variable is not set');
}

export const GOAL_UID = process.env.GOAL_UID || '';
if (!GOAL_UID) {
	throw new Error('GOAL_UID environment variable is not set');
}
