"use server";

import { ROUTES } from "@/constants/url";
import {
  PRIVATE_FILTER_MAX_LENGTH,
  PRIVATE_FILTERS_COOKIE_KEY,
} from "@/features/reservations/constants/admin-list";
import {
  createPageHref,
  getPublicFilters,
  normalizeTextWithMaxLength,
} from "@/features/reservations/utils/filters";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const PRIVATE_FILTERS_COOKIE_MAX_AGE = 60 * 60 * 12; // 12시간
const COOKIE_PATH = ROUTES.ADMIN.RESERVATIONS;

interface PrivateFiltersCookieValue {
  v: 1;
  name?: string;
  phone?: string;
}

function getFormStringValue(value: FormDataEntryValue | null): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  return value;
}

export async function saveFiltersAction(formData: FormData) {
  const cookieStore = await cookies();

  const name = normalizeTextWithMaxLength(
    getFormStringValue(formData.get("name")),
    PRIVATE_FILTER_MAX_LENGTH.name,
  );
  const phone = normalizeTextWithMaxLength(
    getFormStringValue(formData.get("phone")),
    PRIVATE_FILTER_MAX_LENGTH.phone,
  );

  const publicFilters = getPublicFilters({
    caseTypeId: getFormStringValue(formData.get("caseTypeId")),
    consultDate: getFormStringValue(formData.get("consultDate")),
    status: getFormStringValue(formData.get("status")),
  });

  if (name || phone) {
    const privateFilters: PrivateFiltersCookieValue = {
      v: 1,
    };

    if (name) {
      privateFilters.name = name;
    }

    if (phone) {
      privateFilters.phone = phone;
    }

    cookieStore.set(
      PRIVATE_FILTERS_COOKIE_KEY,
      encodeURIComponent(JSON.stringify(privateFilters)),
      {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: COOKIE_PATH,
        maxAge: PRIVATE_FILTERS_COOKIE_MAX_AGE,
      },
    );
  } else {
    cookieStore.set(PRIVATE_FILTERS_COOKIE_KEY, "", {
      path: COOKIE_PATH,
      maxAge: 0,
    });
  }

  redirect(createPageHref(1, publicFilters));
}

export async function clearFiltersAction() {
  const cookieStore = await cookies();

  cookieStore.set(PRIVATE_FILTERS_COOKIE_KEY, "", {
    path: COOKIE_PATH,
    maxAge: 0,
  });

  redirect(ROUTES.ADMIN.RESERVATIONS);
}
