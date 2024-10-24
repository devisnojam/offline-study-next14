"use server";

import { Redirect } from "@/@types/server-response.type";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export async function excuteRedirect(
  pathname: string,
  type?: keyof typeof RedirectType
): Promise<Redirect> {
  console.log("Server action - redirect");

  revalidatePath("/", "layout");
  redirect(pathname, type ? RedirectType[type] : RedirectType.replace);
}
