const {test,expect}=require('@playwright/test');
test('academy guided learning and isolation',async({page})=>{
 test.setTimeout(60000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('/');await page.evaluate(()=>localStorage.setItem('sst.journal.v1','[]'));
await page.getByRole('link',{name:'Learn MUMPS',exact:true}).click();
await expect(page.locator('#academyLessons .academy-card')).toHaveCount(30);
await page.locator('#academyBegin').click();await expect(page).toHaveURL(/learn\/lesson\/01$/);
await page.locator('#messageInput').fill('A "quote"');await page.locator('#messageRun').click();await expect(page.locator('#messageCode')).toHaveText('WRITE "A ""quote""",!');await expect(page.locator('#messageOutput')).toContainText('A "quote"');
await expect(page.locator('#completeLesson')).toBeDisabled();await page.locator('#traceNext').click();await expect(page.locator('#traceOutput')).toContainText('Hello, world!');
await page.locator('#quizChoices button').nth(0).click();await expect(page.locator('#completeLesson')).toBeDisabled();await page.locator('#quizChoices button').nth(1).click();await page.locator('#completeLesson').click();await expect(page.locator('#academyProgressText')).toHaveText('1 of 30 lessons completed');
await page.reload();await expect(page.locator('#completeLesson')).toHaveText('Completed ✓');
expect(await page.evaluate(()=>localStorage.getItem('sst.journal.v1'))).toBe('[]');
await page.goto('/learn');await expect(page.locator('#academyBegin')).toHaveAttribute('href','/learn/lesson/02');
for(let i=1;i<=30;i++){await page.goto('/learn/lesson/'+String(i).padStart(2,'0'));await expect(page.locator('#academyLesson')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBeTruthy()}
await page.goto('/learn/reference');await expect(page.locator('#academyReference')).toBeVisible();expect(errors).toEqual([]);
});

test('visual laboratories and progress compatibility',async({page})=>{
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('/learn');await page.evaluate(()=>localStorage.setItem('sst.academy.progress.v1',JSON.stringify(['01','10'])));
await page.reload();await expect(page.locator('#academyProgressText')).toHaveText('2 of 30 lessons completed');
await page.getByRole('link',{name:'Visual Laboratory',exact:true}).click();await expect(page.locator('#labContent .academy-card')).toHaveCount(6);
await page.goto('/learn/lab/trees');await page.getByLabel('Person',{exact:true}).selectOption('Alex');await page.getByLabel('Node',{exact:true}).selectOption('');
await page.getByRole('button',{name:'$DATA — inspect',exact:true}).click();await expect(page.locator('.lab-status')).toHaveText('10');
await page.getByLabel('Value (empty is allowed)').fill('');await page.getByRole('button',{name:'SET — store'}).click();await page.getByRole('button',{name:'$DATA — inspect',exact:true}).click();await expect(page.locator('.lab-status')).toHaveText('11');
await page.getByRole('button',{name:'KILL — remove branch'}).click();await page.getByRole('button',{name:'$DATA — inspect',exact:true}).click();await expect(page.locator('.lab-status')).toHaveText('0');
await page.goto('/learn/lab/expressions');await expect(page.locator('.lab-status')).toHaveText('Output: 20');await page.getByLabel('Evaluation').selectOption('group');await expect(page.locator('.lab-status')).toHaveText('Output: 14');
await page.goto('/learn/lab/flow');await expect(page.locator('.lab-status').first()).toContainText('$TEST = 0');await page.getByLabel('Score (0–20)').evaluate(el=>{el.value='11';el.dispatchEvent(new Event('input',{bubbles:true}))});await expect(page.locator('.lab-status').first()).toContainText('$TEST = 1');await page.getByRole('button',{name:'Next iteration'}).click();await expect(page.locator('.lab-status').last()).toContainText('Iteration 1 of 3');
await page.goto('/learn/lab/memory');await page.getByRole('button',{name:'SET local'}).click();await page.getByRole('button',{name:'SET global'}).click();await page.getByRole('button',{name:'Restart process'}).click();await expect(page.locator('.lab-step').first()).toContainText('Undefined');await expect(page.locator('.lab-step').last()).toContainText('Hello');
expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('sst.academy.progress.v1')))).toEqual(['01','10']);
for(const kind of ['trees','expressions','flow','memory']){await page.goto('/learn/lab/'+kind);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBeTruthy()}
await page.goto('/learn/lesson/20');await expect(page.locator('#lessonLab')).toHaveAttribute('href','/learn/lab/trees');expect(errors).toEqual([]);
});
