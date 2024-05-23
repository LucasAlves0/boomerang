// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Criar categoria', function() {
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
  it('Criar categoria', async function() {
    // Test name: Criar categoria
    // Step # | name | target | value
    // 1 | open | /eac0b83f-4c81-44ef-b79e-82672c0816cd | 
    await driver.get("http://localhost:3001/eac0b83f-4c81-44ef-b79e-82672c0816cd")
    // 2 | setWindowSize | 1936x1048 | 
    await driver.manage().window().setRect({ width: 1936, height: 1048 })
    // 3 | click | css=.lg\3Aspace-x-6 | 
    await driver.findElement(By.css(".lg\\3Aspace-x-6")).click()
    // 4 | click | linkText=Categorias | 
    await driver.findElement(By.linkText("Categorias")).click()
    // 5 | click | css=.bg-primary | 
    await driver.findElement(By.css(".bg-primary")).click()
    // 6 | click | id=:r1a:-form-item | 
    await driver.findElement(By.id(":r1a:-form-item")).click()
    // 7 | mouseOver | id=:r1b:-form-item | 
    {
      const element = await driver.findElement(By.id(":r1b:-form-item"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    // 8 | type | id=:r1a:-form-item | teste
    await driver.findElement(By.id(":r1a:-form-item")).sendKeys("teste")
    // 9 | mouseOut | id=:r1b:-form-item | 
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    // 10 | click | css=html | 
    await driver.findElement(By.css("html")).click()
    // 11 | select | css=select | label=padrao
    {
      const dropdown = await driver.findElement(By.css("select"))
      await dropdown.findElement(By.xpath("//option[. = 'padrao']")).click()
    }
    // 12 | mouseUp | css=.\__className_aaf875 | 
    {
      const element = await driver.findElement(By.css(".\\__className_aaf875"))
      await driver.actions({ bridge: true }).moveToElement(element).release().perform()
    }
  })
})