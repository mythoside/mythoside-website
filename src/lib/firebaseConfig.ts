// Public client identifiers for the web app; they only name the project and are not secrets.
// Access is limited by firestore.rules, not by hiding this key.
export const FIREBASE_CONFIG = {
  projectId: 'mythoside',
  apiKey: 'AIzaSyCyBpGSuOsD-jjgtscUxBQ52EWsm8JYOpk',
} as const
