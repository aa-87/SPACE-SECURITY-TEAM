const {test,expect}=require('@playwright/test');
test('academy guided learning and isolation',async({page})=>{
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('/');await page.evaluate(()=>localStorage.setItem('sst.journal.v1','[]'));
await page.getByRole('link',{name:'Learn MUMPS',exact:true}).click();
await expect(page.locator('#academyLessons .academy-card')).toHaveCount(10);
await page.locator('#academyBegin').click();await expect(page).toHaveURL(/learn\/lesson\/01$/);
await page.locator('#messageInput').fill('A "quote"');await page.locator('#messageRun').click();await expect(page.locator('#messageCode')).toHaveText('WRITE "A ""quote""",!');await expect(page.locator('#messageOutput')).toContainText('A "quote"');
await expect(page.locator('#completeLesson')).toBeDisabled();await page.locator('#traceNext').click();await expect(page.locator('#traceOutput')).toContainText('Hello, world!');
await page.locator('#quizChoices button').nth(0).click();await expect(page.locator('#completeLesson')).toBeDisabled();await page.locator('#quizChoices button').nth(1).click();await page.locator('#completeLesson').click();await expect(page.locator('#academyProgressText')).toHaveText('1 of 10 lessons completed');
await page.reload();await expect(page.locator('#completeLesson')).toHaveText('Completed ✓');
expect(await page.evaluate(()=>localStorage.getItem('sst.journal.v1'))).toBe('[]');
await page.goto('/learn');await expect(page.locator('#academyBegin')).toHaveAttribute('href','/learn/lesson/02');
for(let i=1;i<=10;i++){await page.goto('/learn/lesson/'+String(i).padStart(2,'0'));await expect(page.locator('#academyLesson')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBeTruthy()}
await page.goto('/learn/reference');await expect(page.locator('#academyReference')).toBeVisible();expect(errors).toEqual([]);
});
