const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  console.log("Starting E2E Test...");
  const context = await browser.newContext();
  const page = await context.newPage();

  const BASE_URL = 'https://chaver-lederech.vercel.app';

  try {
    // ---------------------------------------------------------
    // MULTI-TRACK JOURNEY TEST
    // ---------------------------------------------------------
    console.log("--- TEST: Multi-Track Journey (No Refresh) ---");
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // 1. Start Track A ("תפילה מהלב" -> track-06)
    console.log("Starting Track A (track-06)...");
    await page.click('a[href="/tracks/track-06"]');
    await page.waitForLoadState('networkidle');
    await page.click('text=אני מתחיל את המסלול');
    
    // Wait for Day 1 button to appear and complete it, so it's on Day 2
    console.log("Completing Day 1 of Track A...");
    await page.waitForSelector('text=סיימתי ✓');
    await page.click('text=סיימתי ✓');
    await page.waitForSelector('text=למה בכלל מתפללים?');
    console.log("Track A is now actively on Day 2.");
    
    // Go to Homepage WITHOUT refresh
    console.log("Navigating to Homepage...");
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // 2. Start Track B ("השבת הראשונה שלי" -> track-07)
    console.log("Starting Track B (track-07)...");
    await page.click('a[href="/tracks/track-07"]');
    await page.waitForLoadState('networkidle');
    await page.click('text=אני מתחיל את המסלול');
    
    // Complete ALL 7 days of Track B to finish it
    for (let i = 1; i <= 7; i++) {
        console.log(`Completing Day ${i} of Track B...`);
        await page.waitForSelector('text=סיימתי ✓');
        await page.click('text=סיימתי ✓');
        await page.waitForTimeout(1000); // Wait for transition and db update
    }

    // Verify Completion UI for Track B
    console.log("Checking Completion UI for Track B...");
    await page.waitForSelector('text=כל הכבוד!');
    console.log("Track B is completely finished.");

    // 3. Go to Homepage WITHOUT refresh
    console.log("Going back to Homepage WITHOUT refresh...");
    await page.click('a[href="/"]'); // Click logo or home link, or use page.goto
    // Wait, there might not be a direct home link easily clickable, let's just use pushState navigation or page.goto
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // 4. Verify Continue Journey points to Track A (track-06)
    console.log("Verifying Continue Journey defaults back to Track A...");
    const continueText = await page.textContent('text=תפילה מהלב');
    if (continueText) {
        console.log("SUCCESS: Continue Journey correctly points to Track A!");
    } else {
        throw new Error("Continue Journey did not point to Track A");
    }
    
    // Verify it says "יום 2"
    const activeDayText = await page.textContent('text=יום 2 במסלול');
    if (activeDayText) {
        console.log("SUCCESS: Continue Journey correctly shows Day 2 for Track A!");
    } else {
        throw new Error("Continue Journey did not show Day 2");
    }
    
    // 5. Click continue and ensure Track A opens
    console.log("Clicking continue...");
    await page.click('text=להמשיך במסלול');
    await page.waitForLoadState('networkidle');
    
    await page.waitForSelector('text=למה בכלל מתפללים?');
    console.log("SUCCESS: Track A opened successfully to Day 2!");

    console.log("ALL E2E TESTS PASSED SUCCESSFULLY.");

  } catch (error) {
    console.error("E2E TEST FAILED:", error);
  } finally {
    await browser.close();
  }
})();
