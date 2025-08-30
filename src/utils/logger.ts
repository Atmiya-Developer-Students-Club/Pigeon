export function log(msg: string, ...args: any[]) {
  console.log(`[${new Date().toISOString()}] ${msg}`, ...args);
}
export function logError(msg: string, ...args: any[]) {
  console.error(`[${new Date().toISOString()}] ERROR: ${msg}`, ...args);
}
