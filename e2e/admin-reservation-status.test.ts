import { expect, test, type Page } from "@playwright/test";

type ReservationStatus = "접수" | "확인중" | "완료" | "취소";

const ADMIN_EMAIL = process.env.ADMIN_ID!;
const ADMIN_PASSWORD = process.env.ADMIN_PW!;
const STATUS_VALUES: ReservationStatus[] = ["접수", "확인중", "완료", "취소"];

const extractStatusFromText = (text: string | null): ReservationStatus => {
  const source = text ?? "";
  const status = STATUS_VALUES.find((value) => source.includes(value));

  if (!status) {
    throw new Error(`상태 텍스트를 해석할 수 없습니다: "${source}"`);
  }

  return status;
};

const chooseNextStatus = (
  currentStatus: ReservationStatus,
): ReservationStatus =>
  STATUS_VALUES.find((status) => status !== currentStatus) ?? currentStatus;

const updateStatus = async (page: Page, status: ReservationStatus) => {
  const statusCombobox = page.getByRole("combobox");

  await expect(statusCombobox).toBeVisible();
  await statusCombobox.click();
  await page.getByRole("option", { name: status, exact: true }).click();
  await expect(statusCombobox).toContainText(status);

  await page.getByRole("button", { name: "상태 저장", exact: true }).click();
  await expect(
    page.getByText("예약 상태가 성공적으로 변경되었습니다.", { exact: true }),
  ).toBeVisible();
};

test("관리자가 예약 상태를 변경하고 실제 반영 후 원복한다", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "데이터 충돌 방지를 위해 chromium에서만 실행",
  );
  test.skip(
    !ADMIN_EMAIL || !ADMIN_PASSWORD,
    "관리자 계정 환경변수가 필요합니다.",
  );

  let reservationDetailPath: string | null = null;
  let originalStatus: ReservationStatus | null = null;
  let changedStatus: ReservationStatus | null = null;

  try {
    // 1) 관리자 로그인
    await page.goto("/login");
    await page.getByRole("textbox", { name: "이메일" }).fill(ADMIN_EMAIL);
    await page.getByRole("textbox", { name: "비밀번호" }).fill(ADMIN_PASSWORD);
    await page
      .locator("form")
      .getByRole("button", { name: "로그인", exact: true })
      .click();

    // 홈페이지 리다이렉트 대기 (로그인 성공 확인)
    await expect(page).toHaveURL(/.*localhost:3000\/?$/);

    // 2) 관리자 예약 목록 이동 후 첫 예약 상세 진입
    await page.goto("/admin/reservations");
    await expect(page).toHaveURL(/\/admin\/reservations$/);

    const firstReservationLink = page
      .locator("tbody tr a[href^='/admin/reservations/']")
      .first();
    await expect(firstReservationLink).toBeVisible();

    const detailHref = await firstReservationLink.getAttribute("href");
    if (!detailHref) {
      throw new Error("예약 상세 링크 href를 찾지 못했습니다.");
    }

    reservationDetailPath = detailHref;

    await firstReservationLink.click();
    await page.waitForURL(`**${reservationDetailPath}`);

    // 3) 현재 상태 확인 후 다른 상태로 변경
    const statusCombobox = page.getByRole("combobox");
    await expect(statusCombobox).toBeVisible();

    originalStatus = extractStatusFromText(await statusCombobox.textContent());
    const nextStatus = chooseNextStatus(originalStatus);

    await updateStatus(page, nextStatus);
    changedStatus = nextStatus;

    // 4) 새로고침 후 상세 페이지 상태가 실제로 변경되었는지 확인
    await page.reload();
    await expect(page).toHaveURL(new RegExp(reservationDetailPath));
    await expect(page.getByRole("combobox")).toContainText(nextStatus);

    // 5) 목록으로 돌아가 동일 예약 row 상태도 변경되었는지 확인
    await page.getByRole("link", { name: "예약 목록으로 돌아가기" }).click();
    await page.waitForURL("**/admin/reservations");

    const targetRow = page
      .locator("tbody tr")
      .filter({ has: page.locator(`a[href='${reservationDetailPath}']`) })
      .first();

    await expect(targetRow).toBeVisible();
    await expect(
      targetRow.getByText(nextStatus, { exact: true }),
    ).toBeVisible();
  } finally {
    // 6) 테스트 종료 시 상태 원복
    if (!reservationDetailPath || !originalStatus || !changedStatus) {
      return;
    }

    if (originalStatus === changedStatus) {
      return;
    }

    await page.goto(reservationDetailPath);
    await expect(page).toHaveURL(new RegExp(reservationDetailPath));

    const statusCombobox = page.getByRole("combobox");
    await expect(statusCombobox).toBeVisible();
    const currentStatus = extractStatusFromText(
      await statusCombobox.textContent(),
    );

    if (currentStatus !== originalStatus) {
      await updateStatus(page, originalStatus);
      await page.reload();
      await expect(page.getByRole("combobox")).toContainText(originalStatus);
    }
  }
});
