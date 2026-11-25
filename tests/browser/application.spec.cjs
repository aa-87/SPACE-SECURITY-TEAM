const {test,expect}=require('@playwright/test');
const base='/public/space-security/';
test('navigation, theme and mobile layout',async({page})=>{
const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
await page.locator('#themeToggle').click();const theme=await page.locator('html').getAttribute('data-theme');
for(const [name,folder] of [['Smoking cessation','tracker'],['Breath observation','breath-log'],['Milk consumption','milk-log']]){
await page.locator('#trackerMenuToggle').click();await page.locator('#trackerMenu').getByRole('link',{name:new RegExp(name)}).click();
await expect(page).toHaveURL(new RegExp(folder+'/index.html'));await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
await expect(page.locator('#trackerMenu a[aria-current="page"]')).toHaveAttribute('href',base+folder+'/index.html');
expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBeTruthy();
}
expect(errors).toEqual([]);
});
test('demo is read-only and does not modify personal records',async({page})=>{
await page.goto('/');await page.evaluate(()=>localStorage.setItem('sst.journal.v1',JSON.stringify([{id:'private',date:new Date().toISOString(),scope:'general',title:'Private sentinel',body:'Private test'}])));
await page.goto('/?demo=1');await expect(page.locator('#demoBanner')).toBeVisible();await expect(page.locator('#dashTotal')).toHaveText('72');await expect(page.locator('#journalForm')).toBeHidden();await expect(page.locator('#backupExport')).toBeHidden();await expect(page.locator('#personalTimeline')).not.toContainText('Private sentinel');expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('sst.journal.v1'))[0].id)).toBe('private');
await page.goto('/');await expect(page.locator('#journalList')).toContainText('Private sentinel');
});
test('create and edit tracker records and journal',async({page})=>{
await page.goto(base+'tracker/index.html');await page.locator('#entryType').selectOption('cigarette');await page.locator('#quantity').fill('2');await page.locator('#entryForm button[type=submit]').click();await expect(page.locator('#entryCount')).toHaveText('1');await page.locator('[data-edit]').click();await page.locator('#quantity').fill('3');await page.locator('#entryForm button[type=submit]').click();await expect(page.locator('#cigarettesLogged')).toHaveText('3');
await page.goto(base+'breath-log/index.html');await page.locator('#minutes').fill('0');await page.locator('#seconds').fill('12');await page.locator('#entryForm button[type=submit]').click();await expect(page.locator('#count')).toContainText('1 RECORD');await page.locator('[data-edit]').click();await page.locator('#notes').fill('Edited synthetic observation');await page.locator('#entryForm button[type=submit]').click();await expect(page.locator('#history')).toContainText('Edited synthetic observation');
await page.goto(base+'milk-log/index.html');await page.locator('#ml').fill('150');await page.locator('#milkSave').click();await expect(page.locator('#history')).toContainText('150 mL');await page.locator('#history').getByRole('button',{name:'Edit'}).click();await page.locator('#ml').fill('200');await page.locator('#milkSave').click();await expect(page.locator('#history')).toContainText('200 mL');
await page.goto('/');await page.locator('#journalScope').selectOption('milk');await page.locator('#journalTitle').fill('Synthetic note');await page.locator('#journalBody').fill('Recorded context');await page.locator('#journalSave').click();await expect(page.locator('#journalList')).toContainText('Synthetic note');await expect(page.locator('#dashTotal')).toHaveText('4');
await page.reload();await expect(page.locator('#dashTotal')).toHaveText('4');await page.locator('#timelineType').selectOption('milk');await expect(page.locator('#timelineShown')).toHaveText('1 RECORD');
});
