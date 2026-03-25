import { test, expect } from "@playwright/test";

const USER_EMAIL = process.env.USER_ID!;
const USER_PASSWORD = process.env.USER_PW!;

test.describe("예약 흐름", () => {
  test("예약을 생성하고, 내역을 확인한 뒤 삭제", async ({ page }) => {
    // 1. Navigation and Login
    await page.goto("/login");
    await page.getByRole("textbox", { name: "이메일" }).fill(USER_EMAIL);
    await page.getByRole("textbox", { name: "비밀번호" }).fill(USER_PASSWORD);
    await page
      .locator("form")
      .getByRole("button", { name: "로그인", exact: true })
      .click();

    // 홈페이지 리다이렉트 대기 (로그인 성공 확인)
    await expect(page).toHaveURL(/.*localhost:3000\/?$/);

    // 2. Create Reservation
    await page.goto("/reservations/new");

    // 텍스트 필드 입력
    await page.getByRole("textbox", { name: "성함" }).fill("E2E 테스트 유저");
    await page.getByRole("textbox", { name: "연락처" }).fill("010-9999-9999");
    await page.getByRole("textbox", { name: "이메일" }).fill("test@test.com");
    await page
      .getByRole("textbox", { name: "내용" })
      .fill("테스트 상담 예약입니다.");

    // 사건유형 선택
    await page.getByText("사건유형을 선택해주세요").click();
    await page.getByRole("option", { name: "민사" }).click();

    // 날짜 선택 (오늘 이후의 첫 사용 가능한 날짜 클릭)
    await page.getByText("날짜를 선택해주세요").click();
    // disabled 속성이 없는 첫번째 예약 가능 일자 클릭
    await page.locator("button[data-day]:not([disabled])").first().click();

    // 예약 가능한 시간이 서버에서 조회되기를 잠시 대기
    await page.waitForTimeout(1000);

    // 상담시간 선택
    await page.getByText("상담시간을 선택해주세요").click();
    await page.getByRole("option").first().click();

    // 개인정보 동의 체크박스
    await page.getByText("개인정보 이용에 동의합니다").click();

    // 예약하기 버튼 제출
    await page.getByRole("button", { name: "예약하기" }).click();

    // 3. Verify Reservation List
    // 성공 시 예약 목록 페이지로 이동
    await page.waitForURL("**/reservations");

    // 방금 전 생성한 예약이 보이는지 확인
    const reservationLink = page.getByText("E2E 테스트 유저").first();
    await expect(reservationLink).toBeVisible();

    // 상세보기 클릭
    await reservationLink.click();

    // 4. Delete Reservation
    // 상세 페이지 렌더링 확인
    await expect(page.getByText("기본 정보")).toBeVisible();

    // 삭제 버튼(휴지통 아이콘) 클릭
    // 헤더에 있는 버튼 중 두번째 버튼(수정, 삭제 순서이므로)
    await page.locator("button.bg-transparent").nth(1).click();

    // 삭제 후 다시 목록 페이지로 리다이렉트 되는지 확인
    await page.waitForURL("**/reservations");
  });
});
