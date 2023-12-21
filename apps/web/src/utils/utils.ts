import { toast } from "sonner"
import * as z from "zod"

export function isMacOs() {
  if (typeof window === "undefined") return false

  return window.navigator.userAgent.includes("Mac")
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (err instanceof Error) {
    return toast(err.message)
  } else {
    return toast("Something went wrong, please try again later.")
  }
}

export function processPath(path: string) {
  const segments = path.split('/').filter(segment => segment !== '');

  if (segments.length === 4) {
    return `${segments[0]}/${segments[1]}`;
  } else if (segments.length > 2) {
    return segments.length > 2 ? segments.slice(0, 2).join('/') : path;
  } else {
    return path.replace(/\/$/, '');
  }
}

export function processStorePath(path: string) {
  const segments = path.split('/').filter(segment => segment !== '');

  if (segments.length === 3) {
    return null;
  } else if (segments.length === 4) {
    return segments[3];
  }
}
