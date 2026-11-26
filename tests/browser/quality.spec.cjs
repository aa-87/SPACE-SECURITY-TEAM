const {test,expect}=require('@playwright/test');
const base='/public/space-security/';
const routes=['/','/?demo=1',base+'tracker/index.html',base+'breath-log/index.html',base+'milk-log/index.html','/learn','/learn/reference','/learn/lesson/17','/learn/lesson/30','/learn/lesson/40','/learn/lesson/50',...['trees','expressions','flow','memory','routines','construction','strings','patterns','application','reliability'].map(x=>'/learn/lab/'+x)];
for(const width of [320,375,430,768]){
 test('quality reflow and attribution at '+width+'px',async({page})=>{
  test.setTimeout(120000);
  await page.setViewportSize({width,height:740});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const theme of ['dark','light']){
   await page.goto('/');await page.evaluate(t=>localStorage.setItem('sst.landing.theme',t),theme);
   for(const route of routes){
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
    const over=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
    expect(over.scroll,route+' '+theme+' horizontal overflow').toBeLessThanOrEqual(over.width+2);
    const credit=page.locator('.sst-attribution');
    await expect(credit).toHaveCount(1);
    await expect(credit.getByRole('link',{name:'Project repository',exact:true})).toHaveAttribute('href','https://github.com/aa-87/efuhair.com');
    await expect(credit.getByRole('link',{name:'MUMPS.IO web server',exact:true})).toHaveAttribute('href','https://github.com/aa-87/mumps.io');
    await page.locator('#trackerMenuToggle').click();
    const menu=page.locator('.tracker-menu-panel');await expect(menu).toBeVisible();
    const rect=await menu.boundingBox();expect(rect.x,route+' dropdown left').toBeGreaterThanOrEqual(-1);expect(rect.x+rect.width,route+' dropdown right').toBeLessThanOrEqual(width+1);
    await page.keyboard.press('Escape');await expect(menu).toBeHidden();
   }
  }
  expect(errors).toEqual([]);
 });
}
test('curriculum count and module headings are derived from the lessons',async({page})=>{
 await page.goto('/learn');
 const count=await page.evaluate(()=>window.SSTLessons.length);
 await expect(page.locator('#academyLessonHeading')).toHaveText(count+' small steps');
 await expect(page.locator('#academyLessons .academy-card')).toHaveCount(count);
 await expect(page.locator('#academyProgressBar')).toHaveAttribute('max',String(count));
 await expect(page.locator('.academy-module')).toHaveCount(Math.ceil(count/10));
});
