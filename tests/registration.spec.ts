import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AuthPage } from '../pages/AuthPage';
import { HeaderComponent } from '../pages/HeaderComponent';
import { createTestUser } from '../utils/testData';

test('Happy path: register and login on AutomationTestStore', async ({ page }) => {
  const user = createTestUser();

  const home = new HomePage(page);
  await home.goTo();
  await home.clickLoginOrRegister();

  const auth = new AuthPage(page);
  // Click 'Continue' under "I am a new customer"
  await auth.clickContinueNewCustomer();

  await auth.fillRegistrationForm({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    telephone: user.telephone,
    password: user.password,
    address1: user.address1,
    city: user.city,
    region: user.region,
    postcode: user.postcode,
    country: user.country
  });

  await auth.acceptPrivacyPolicy();
  await auth.submitRegistration();

  const header = new HeaderComponent(page);
  await expect(await header.isLoggedIn()).toBeTruthy();

  // Logoff flow
  await header.clickLogoff();
  await header.clickContinueAfterLogoff();

  // Login with created credentials
  await home.clickLoginOrRegister();
  await auth.login(user.email, user.password);

  await expect(await header.isLoggedIn()).toBeTruthy();
});
