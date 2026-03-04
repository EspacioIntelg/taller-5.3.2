import { Page } from '@playwright/test';

export type TestUser = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
  address1: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
};

export class AuthPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async clickContinueNewCustomer() {
    await this.page.getByRole('button', { name: /Continue/i }).first().click();
  }

  async fillRegistrationForm(user: TestUser) {
    // Use label-based selectors where possible for robustness
    await this.page.getByLabel(/First name/i).fill(user.firstName);
    await this.page.getByLabel(/Last name/i).fill(user.lastName);
    await this.page.getByLabel(/E-Mail/i).fill(user.email);
    await this.page.getByLabel(/Telephone/i).fill(user.telephone);
    await this.page.getByLabel(/Password/i).fill(user.password);
    await this.page.getByLabel(/Confirm Password/i).fill(user.password);
    await this.page.getByLabel(/Address/i).first().fill(user.address1);
    await this.page.getByLabel(/City/i).fill(user.city);
    await this.page.getByLabel(/Region/i).fill(user.region);
    await this.page.getByLabel(/Post Code/i).fill(user.postcode);
    // Country is usually a select
    const countrySelect = this.page.getByLabel(/Country/i);
    if (await countrySelect.count()) {
      await countrySelect.selectOption({ label: user.country });
    }
    // Newsletter: select No
    const newsletterNo = this.page.getByLabel(/^No$/i);
    if (await newsletterNo.count()) await newsletterNo.check();
  }

  async acceptPrivacyPolicy() {
    // Try by label first, fallback to input[name=agree]
    const privacy = this.page.getByLabel(/Privacy Policy/i);
    if (await privacy.count()) {
      await privacy.check();
    } else {
      await this.page.locator('input[name="agree"]').check({ force: true });
    }
  }

  async submitRegistration() {
    await this.page.getByRole('button', { name: /Continue/i }).first().click();
  }

  async login(email: string, password: string) {
    await this.page.getByLabel(/E-Mail/i).fill(email);
    await this.page.getByLabel(/Password/i).fill(password);
    await this.page.getByRole('button', { name: /Login/i }).click();
  }
}
