import { Page } from '@playwright/test';

export class RegisterSuccessPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async isRegistrationSuccessful() {
    // Tolerant check: site may show different success messages; check for common signs
    return (await this.page.getByText(/Your Account Has Been Created|Success|My Account/i).count()) > 0;
  }
}
