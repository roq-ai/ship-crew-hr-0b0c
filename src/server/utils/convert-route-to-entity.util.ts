const mapping: Record<string, string> = {
  companies: 'company',
  'crew-members': 'crew_member',
  logs: 'log',
  schedules: 'schedule',
  ships: 'ship',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
