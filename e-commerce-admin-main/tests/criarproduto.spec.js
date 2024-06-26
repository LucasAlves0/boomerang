// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Criar produto', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Criar produto', async function() {
    // Test name: Criar produto
    // Step # | name | target | value
    // 1 | open | /eac0b83f-4c81-44ef-b79e-82672c0816cd | 
    await driver.get("http://localhost:3000/eac0b83f-4c81-44ef-b79e-82672c0816cd")
    // 2 | setWindowSize | 1936x1048 | 
    await driver.manage().window().setRect({ width: 1936, height: 1048 })
    // 3 | click | linkText=Produtos | 
    await driver.findElement(By.linkText("Produtos")).click()
    // 4 | click | css=.bg-primary | 
    await driver.findElement(By.css(".bg-primary")).click()
    // 5 | click | id=:r16:-form-item | 
    await driver.findElement(By.id(":r16:-form-item")).click()
    // 6 | type | id=:r16:-form-item | produto teste 2
    await driver.findElement(By.id(":r16:-form-item")).sendKeys("produto teste 2")
    // 7 | click | id=:r17:-form-item | 
    await driver.findElement(By.id(":r17:-form-item")).click()
    // 8 | mouseOver | id=:r18:-form-item | 
    {
      const element = await driver.findElement(By.id(":r18:-form-item"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 9 | type | id=:r17:-form-item | 10
    await driver.findElement(By.id(":r17:-form-item")).sendKeys("10")
    // 10 | mouseOut | id=:r18:-form-item | 
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 11 | click | css=html | 
    await driver.findElement(By.css("html")).click()
    // 12 | select | css=.space-y-2:nth-child(3) > select | label=Manuais
    {
      const dropdown = await driver.findElement(By.css(".space-y-2:nth-child(3) > select"))
      await dropdown.findElement(By.xpath("//option[. = 'Manuais']")).click()
    }
    // 13 | mouseUp | css=.\__className_aaf875 | 
    {
      const element = await driver.findElement(By.css(".\\__className_aaf875"))
      await driver.actions({ bridge: true }).moveToElement(element).release().perform()
    }
    // 14 | selectFrame | index=0 | 
    await driver.switchTo().frame(0)
    // 15 | click | name=file | 
    await driver.findElement(By.name("file")).click()
  })
})
