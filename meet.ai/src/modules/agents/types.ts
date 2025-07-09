import { inferRouterOutputs } from "@trpc/server";

import type {AppRouter} from  "@/trpc/route/_app"

export type AgenstGentOne=inferRouterOutputs<AppRouter >["agents"]["getOne"];