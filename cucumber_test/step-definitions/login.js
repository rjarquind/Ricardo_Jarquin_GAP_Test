
module.exports = function(){
    
    this.When(/^I go to the page$/, async function() {
        const loginpage = await helpers.loadPage('https://vacations-management.herokuapp.com/users/sign_in');
   
        const userName = await driver.wait(until.elementLocated(By.id("user_email")), DEFAULT_TIMEOUT)
        await userName.sendKeys("gap-automation-test@mailinator.com")

        const userPassword = await driver.wait(until.elementLocated(By.id("user_password")), DEFAULT_TIMEOUT)
        await userPassword.sendKeys("12345678")
        
        const loginButton = await driver.wait(until.elementLocated(By.className('submit')), DEFAULT_TIMEOUT)
        await loginButton.click()
        console.log('holaaaa a a a a a    00d0d0d0')
        const logotexta = await driver.wait(until.elementLocated(By.id('logo_text')), DEFAULT_TIMEOUT).getTagName().then(function(value){
            console.log("Tag name is: " + value)
        })
        

    });

    this.Then(/^verify the objects exist$/, async function() {
        const LogoExist =  await driver.wait(until.elementLocated(By.id('logo_text')), DEFAULT_TIMEOUT).getTagName()
        expect (LogoExist).to.be.eq('div')
        
        const userLogged =  await driver.wait(until.elementLocated(By.id('user_information')), DEFAULT_TIMEOUT).getText()
        expect (userLogged).to.be.eq('Welcome gap, Logout')
        
        const bannerLogin =  await driver.wait(until.elementLocated(By.css('[class = flash_notice]')), DEFAULT_TIMEOUT).getText()
        expect (bannerLogin).to.be.eq('Signed in successfully.')
   })
   this.Then(/^create a new user$/, async function(){
    //this variabbles are used to create the customer
    const newUserInformation = {
        FirstName: 'James',
        LastName: 'Smith',
        email: 'chuck@gap.com',
        id: '1234567890',
        employeeLeaderName: 'Ricardo Jarquin'
    }
    const newUser =  await driver.findElement(By.xpath('//A[@href="/employees/new"][text()="Create a new employee"]'))
    await newUser.click()
    const employeeFirstName =  await driver.wait(until.elementLocated(By.id('employee_first_name')), DEFAULT_TIMEOUT)
    await employeeFirstName.sendKeys(newUserInformation.FirstName)
    const employeeLastName =  await driver.wait(until.elementLocated(By.id('employee_last_name')), DEFAULT_TIMEOUT)
    await employeeLastName.sendKeys(newUserInformation.LastName)
    const employeeEmail =  await driver.wait(until.elementLocated(By.id('employee_email')), DEFAULT_TIMEOUT)
    await employeeEmail.sendKeys(newUserInformation.email)
    const employeeID =  await driver.wait(until.elementLocated(By.id('employee_identification')), DEFAULT_TIMEOUT)
    await employeeID.sendKeys(newUserInformation.id)
    const employeeLeaderName =  await driver.wait(until.elementLocated(By.id('employee_leader_name')), DEFAULT_TIMEOUT)
    await employeeLeaderName.sendKeys(newUserInformation.employeeLeaderName)

    //Date Values
    try {
        selectFromDropDownYear('2014')
    } catch (error) {
        console.log('the error is: ' + error)
    }
    selectFromDropDownMonth('1')
    SelectFromDropDownDay('21')
  
    
    
    const createEmployeeButton = await driver.findElement(By.css('[name=commit]'))

    createEmployeeButton.click();
    
    async function selectFromDropDownYear(value) {
        const valueSelected =  By.css('[id="employee_start_working_on_1i"]' + ' option[value="' + value + '"]')
         await driver.findElement(By.id('employee_start_working_on_1i')).click()
         await driver.findElement(valueSelected).click()
    }
    async function selectFromDropDownMonth(value) {
         const valueSelected =  By.css('[id="employee_start_working_on_2i"]' + ' option[value="' + value + '"]')
         await driver.findElement(By.id('employee_start_working_on_1i')).click()
         await driver.findElement(valueSelected).click()
    }
    
    async function SelectFromDropDownDay(value) {
         const valueSelected =  By.css('[id="employee_start_working_on_3i"]' + ' option[value="' + value + '"]')
         await driver.findElement(By.id('employee_start_working_on_1i')).click()
         await driver.findElement(valueSelected).click()
    }
    const backButton =  await driver.wait(until.elementLocated(By.xpath('//A[@href="/employees"][text()="Back"]')), DEFAULT_TIMEOUT)
    await backButton.click()
})
    this.Then(/^Verify User created$/, async function(){
    const rowsNumber = await driver.wait(until.elementLocated(By.xpath('//TD[text()="Ricardo Jarquin"]')), DEFAULT_TIMEOUT).getText().then(function(valuetable){
        console.log("Tag name is: " + valuetable)
    
        expect (valuetable).to.be.eq('Ricardo Jarquin', "User created not found")

    })

   })
   this.Then(/^Delete User$/, async function(){
   const deleteButton = await driver.wait(until.elementLocated(By.xpath('//TD[text()="Ricardo Jarquin"]/..//A[text()="Delete"]')), DEFAULT_TIMEOUT)
   await deleteButton.click();
   await driver.switchTo().alert().accept();

})
this.When(/^Verify User Deleted$/, async function(){
    try {
        const deletedEmployee = By.xpath('//TD[text()="Ricardo Jarquin"]')
        
        
    } catch (error) {
        console.log(error)
    }
    //expect (deletedEmployee).to.be.eq(null)
 
 })





};