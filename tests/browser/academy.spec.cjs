const {test,expect}=require('@playwright/test');
test('academy guided learning and isolation',async({page})=>{
 test.setTimeout(60000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('/');await page.evaluate(()=>localStorage.setItem('sst.journal.v1','[]'));
await page.getByRole('link',{name:'Learn MUMPS',exact:true}).click();
await expect(page.locator('#academyLessons .academy-card')).toHaveCount(50);
await page.locator('#academyBegin').click();await expect(page).toHaveURL(/learn\/lesson\/01$/);
await page.locator('#messageInput').fill('A "quote"');await page.locator('#messageRun').click();await expect(page.locator('#messageCode')).toHaveText('WRITE "A ""quote""",!');await expect(page.locator('#messageOutput')).toContainText('A "quote"');
await expect(page.locator('#completeLesson')).toBeDisabled();await page.locator('#traceNext').click();await expect(page.locator('#traceOutput')).toContainText('Hello, world!');
await page.locator('#quizChoices button').nth(0).click();await expect(page.locator('#completeLesson')).toBeDisabled();await page.locator('#quizChoices button').nth(1).click();await page.locator('#completeLesson').click();await expect(page.locator('#academyProgressText')).toHaveText('1 of 50 lessons completed');
await page.reload();await expect(page.locator('#completeLesson')).toHaveText('Completed ✓');
expect(await page.evaluate(()=>localStorage.getItem('sst.journal.v1'))).toBe('[]');
await page.goto('/learn');await expect(page.locator('#academyBegin')).toHaveAttribute('href','/learn/lesson/02');
for(let i=1;i<=50;i++){await page.goto('/learn/lesson/'+String(i).padStart(2,'0'));await expect(page.locator('#academyLesson')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBeTruthy()}
await page.goto('/learn/reference');await expect(page.locator('#academyReference')).toBeVisible();expect(errors).toEqual([]);
});

test('visual laboratories and progress compatibility',async({page})=>{
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('/learn');await page.evaluate(()=>localStorage.setItem('sst.academy.progress.v1',JSON.stringify(['01','10'])));
await page.reload();await expect(page.locator('#academyProgressText')).toHaveText('2 of 50 lessons completed');
await page.getByRole('link',{name:'Visual Laboratory',exact:true}).click();await expect(page.locator('#labContent .academy-card')).toHaveCount(10);
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

test('routine tracing and program construction',async({page})=>{
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('/learn/lab/routines');
await expect(page.getByLabel('Routine example',{exact:true})).toBeVisible();
const next=page.getByRole('button',{name:'Next instruction',exact:true});
await next.click();await next.click();await expect(page.locator('#routineStack')).toContainText('change');
await next.click();await expect(page.locator('#routineMemory')).toContainText('Undefined');
await next.click();await next.click();await next.click();await expect(page.locator('#routineOutput')).toHaveText('4');
await page.getByRole('button',{name:'Previous instruction'}).click();await expect(page.locator('#routineOutput')).toHaveText('');
await page.getByLabel('Routine example',{exact:true}).selectOption('reference');
for(let i=0;i<5;i++)await next.click();await expect(page.locator('#routineOutput')).toHaveText('5');
await page.getByLabel('Routine example',{exact:true}).selectOption('function');
for(let i=0;i<4;i++)await next.click();await expect(page.locator('#routineOutput')).toHaveText('8');
await page.goto('/learn/lab/construction');
await page.getByRole('button',{name:'Check program'}).click();await expect(page.locator('#buildFeedback')).toContainText('Not yet');
await page.getByLabel('Choose the missing instruction',{exact:true}).selectOption('1');
await page.getByRole('button',{name:'Check program'}).click();await expect(page.locator('#buildOutput')).toHaveText('5');await expect(page.locator('#buildFeedback')).toContainText('Correct!');
await page.getByLabel('Challenge',{exact:true}).selectOption('4');await page.getByLabel('Choose the missing instruction',{exact:true}).selectOption('1');await page.getByRole('button',{name:'Check program'}).click();await expect(page.locator('#buildOutput')).toHaveText('8');
expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBeTruthy();
await page.goto('/learn/lesson/30');await expect(page.locator('#lessonLab')).toHaveAttribute('href','/learn/lab/construction');expect(errors).toEqual([]);
});

test('string diagrams, patterns and searchable reference',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/learn/lab/strings');
 await page.getByLabel('Source text',{exact:true}).fill('A||B');
 await page.getByLabel('Operation',{exact:true}).selectOption('pieces');
 await expect(page.locator('#stringResult')).toHaveText('Result: 3');
 await expect(page.locator('#stringCells .string-cell')).toHaveCount(3);
 await page.getByLabel('Operation',{exact:true}).selectOption('piece');
 await page.getByLabel('Start position',{exact:true}).fill('2');
 await page.getByLabel('End position',{exact:true}).fill('2');
 await expect(page.locator('#stringResult')).toHaveText('Result: ""');
 await page.getByLabel('Operation',{exact:true}).selectOption('find');
 await page.getByLabel('Search text',{exact:true}).fill('B');
 await expect(page.locator('#stringResult')).toContainText('Result: 5');
 await page.getByLabel('Operation',{exact:true}).selectOption('length');
 await page.getByLabel('Source text',{exact:true}).fill('é');
 await expect(page.locator('#stringResult')).toContainText('ASCII');
 await page.goto('/learn/lab/patterns');
 await expect(page.locator('#patternResult')).toContainText('Result: 1');
 await page.getByLabel('Test value',{exact:true}).fill('a12');
 await expect(page.locator('#patternResult')).toContainText('Result: 0');
 await page.getByLabel('Score',{exact:true}).evaluate(e=>{e.value='11';e.dispatchEvent(new Event('input',{bubbles:true}))});
 await expect(page.locator('#selectResult')).toHaveText('Score 11 → High');
 await page.getByLabel('Delimited record',{exact:true}).fill('Alex|Boston|12');
 await expect(page.locator('#formatResult')).toHaveText('Invalid code');
 await page.goto('/learn/reference');
 await page.getByLabel('Search language reference',{exact:true}).fill('$PIECE');
 await expect(page.locator('.reference-card')).toHaveCount(1);
 await expect(page.locator('.reference-card h3')).toHaveText('$PIECE');
 await page.getByLabel('Category',{exact:true}).selectOption('Command');
 await expect(page.locator('.reference-card')).toHaveCount(0);
 await page.getByLabel('Search language reference',{exact:true}).fill('');
 await page.getByLabel('Category',{exact:true}).selectOption('YottaDB environment');
 await expect(page.locator('.reference-card')).toHaveCount(2);
 await page.goto('/learn/lesson/40');
 await expect(page.locator('#lessonLab')).toHaveAttribute('href','/learn/lab/patterns');
 expect(errors).toEqual([]);
});
