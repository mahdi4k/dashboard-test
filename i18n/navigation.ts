import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { getPathname, useRouter, usePathname, Link, redirect } = createNavigation(routing);
