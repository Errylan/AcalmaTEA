export const createHyperfocusSession = () => ({
    id: Date.now().toString(),
    startedAt: new Date().toISOString(),
    topic: '',
    messages: [],
    impacts:{
        sleep: null,
        food: null,
        hydration: null,
        hygiene: null,
        responsibilities: null,
        distress: null,

    },

    endedAt: null,


});

export const createMessage = (role, content) => ({
  id: `${Date.now()}-${Math.random()}`,
  role,
  content,
  createdAt: new Date().toISOString(),
});